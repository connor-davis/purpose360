"use strict";

import dotenv from "dotenv";

dotenv.config();

import { qwikCity } from "@builder.io/qwik-city/middleware/express";
import bodyParser from "body-parser";
import express from "express";
import session from "express-session";
import mongoose from "mongoose";
import passport from "passport";
import { join } from "path";
import { fileURLToPath } from "url";
import render from "./entry.ssr";
import JwtStrategy from "./strategies/jwt";
import cors from "cors";

// directories where the static assets are located
const distDir = join(fileURLToPath(import.meta.url), "..", "..", "dist");
const buildDir = join(distDir, "build");

// create the Qwik City express middleware
const { router, notFound } = qwikCity(render);

const client = mongoose.connect("mongodb://localhost:27017/purpose360");

client.then(() => {
  console.log("Mongoose connected to MongoDB.");
});

// create the express server
const app = express();

// static asset handlers
app.use(`/build`, express.static(buildDir, { immutable: true, maxAge: "1y" }));
app.use(express.static(distDir, { redirect: false }));
app.use(
  session({
    secret: `${process.env.session_secret}`,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Passport
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  return done(null, id);
});

passport.use("jwt", JwtStrategy);

// use Qwik City's page and endpoint handler
app.use(router);

// use Qwik City's 404 handler
app.use(notFound);

// start the express server
app.listen(8080, () => {
  /* eslint-disable */
  console.log(`http://localhost:8080/`);
});
