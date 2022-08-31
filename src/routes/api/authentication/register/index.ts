import { RequestHandler } from "@builder.io/qwik-city";
import bcrypt from "bcrypt";
import User from "../../../../../models/user/user.model";

declare type RegisterRequest = RegisterData | null;

interface RegisterData {
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

// declare type SetupProfileRequest = {
//   firstName: string;
//   lastName: string;
//   idNumber: number;
//   age: number;
//   gender: string;
//   ethnicity: string;
//   businessName: string;
//   businessType: string;
//   businessTypeDescription: string;
//   businessRegistered: boolean;
//   numberOfEmployees: number;
//   numberOfChildren?: number;
//   websiteUrl?: string;
//   facebookPageUrl?: string;
//   instagramPageUrl?: string;
//   youtubeChannelUrl?: string;
//   accountNumber: number;
//   bankName: string;
//   bankBranchCode: number;
//   streetAddress: string;
//   suburb: string;
//   ward?: number;
//   city: string;
//   areaCode: number;
//   province: string;
//   country: string;
// };

export const onPost: RequestHandler = async ({ request, response }) => {
  const body = await request.json();
  const errors = [];

  if (body.password.trim() !== body.confirmPassword.trim())
    errors.push({ message: "Passwords do not match." });

  if (body.password.length < 8)
    errors.push({ message: "Password needs to be at least 8 characters." });

  if (errors.length > 0) {
    return {
      errors,
    };
  } else {
    const found = await User.findOne({ userEmail: body.email });

    if (found) {
      return {
        errors: [
          {
            message: "Email is already in use, please use another email.",
          },
        ],
      };
    } else {
      const hashedPassword = bcrypt.hashSync(body.password, 2048);

      const newUser = new User({
        userEmail: body.email,
        userPassword: hashedPassword,
        userAgreedToTerms: body.agreeToTerms,
      });

      const saved = await newUser.save();

      if (saved.errors) {
        return {
          errors: [{ message: "Unable to create new user." }],
        };
      } else {
        return {
          success: "Registered successfully.",
        };
      }
    }
  }
};
