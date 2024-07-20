import { ColorTheme, Company, SocialProfile } from "@/types";
import mongoose, { Document, Schema } from "mongoose";

// Define the main User interface
interface IUser extends Document {
  clerkId: string;
  email: string;
  name: string;
  avatar: string;
  bio: string;
  location?: string;
  price?: string;
  socialProfiles: SocialProfile[];
  companies: Company[];
  font: string;
  colorTheme: ColorTheme;
  imageUrl?: string; // Added imageUrl property
}

// Create the schema
const UserSchema: Schema = new Schema(
  {
    clerkId: { type: String, required: true, unique: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /\S+@\S+\.\S+/,
    },
    name: { type: String, required: true },
    avatar: { type: String, required: true },
    bio: { type: String, required: true },
    location: { type: String },
    price: { type: String },
    socialProfiles: [
      {
        platform: { type: String, required: true },
        url: {
          type: String,
          required: true,
          match: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i,
        },
      },
    ],
    companies: [
      {
        name: { type: String, required: true },
        image: { type: String, required: true },
        description: { type: String, required: true },
        website: {
          type: String,
          match: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i,
        },
        tags: { type: [String] },
        flag: { type: String },
        size: { type: String },
        funding: { type: String },
      },
    ],
    font: { type: String, default: "Arial, sans-serif" },
    colorTheme: {
      name: { type: String, required: true },
      primary: { type: String, required: true },
      secondary: { type: String, required: true },
      text: { type: String, required: true },
    },
    imageUrl: { type: String }, // Added imageUrl property
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
