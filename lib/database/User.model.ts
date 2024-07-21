import mongoose, { Document, Schema } from "mongoose";

// Define interfaces for our nested objects
interface SocialProfile {
  platform: string;
  url: string;
}

interface Company {
  name: string;
  image: string;
  description: string;
  website?: string;
  tags?: string[];
  flag?: string;
  size?: string;
  funding?: string;
}

interface ColorTheme {
  name: string;
  primary: string;
  secondary: string;
  text: string;
}

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
    avatar: { type: String, required: true, default: "default-avatar-url" }, // Add default value
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
  },
  {
    timestamps: true,
  }
);

// Create and export the model
const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default User;
