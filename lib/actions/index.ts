"use server";

import connectDatabase from "../database";
import User from "../database/User.model";

interface User {
  clerkId: string;
  email: string;
  imageUrl?: string;
}

export const createUser = async (userData: User) => {
  try {
    await connectDatabase();

    const newUser = new User({
      clerkId: userData.clerkId,
      email: userData.email,
      imageUrl: userData.imageUrl,
    });
    await newUser.save();

    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);

    return null;
  }
};
