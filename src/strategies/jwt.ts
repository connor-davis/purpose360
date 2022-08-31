import { readFileSync } from "fs";
import { ExtractJwt, Strategy } from "passport-jwt";

const publicKey = readFileSync("certs/publicKey.pem", {
  encoding: "utf-8",
});

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: publicKey,
  alorgithms: ["RS256"],
};

export default new Strategy(
  options,
  async (payload: Object, done: (error: any, success: any) => void) => {
    console.log(payload);
  }
);
