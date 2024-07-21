"use server";

import connectToDb from "../database";
import User from "../database/User.model";

// In your userActions.ts file
export async function createUser(clerkId: string, email: string) {
  try {
    await connectToDb();
    const existingUser = await User.findOne({ clerkId });
    if (existingUser) {
      return { message: "User already exists", user: existingUser };
    }
    const newUser = new User({
      clerkId,
      email,
      name: "New User",
      avatar: "default-avatar-url", // Provide a default avatar URL
      bio: "New user bio",
      colorTheme: {
        name: "Default",
        primary: "#ffffff",
        secondary: "#f0f0f0",
        text: "#000000",
      },
    });
    await newUser.save();
    return { message: "User created successfully", user: newUser };
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

export async function saveUserData(userData: any) {
  try {
    await connectToDb();

    const existingUser = await User.findOne({ clerkId: userData.clerkId });
    if (existingUser) {
      // Update existing user
      await User.updateOne({ clerkId: userData.clerkId }, userData);
    } else {
      // Create new user
      const newUser = new User(userData);
      await newUser.save();
    }

    return { message: "User data saved successfully" };
  } catch (error) {
    console.error("Error saving user data:", error);
    throw error;
  }
}

export async function getUserByClerkId(clerkId: string) {
  try {
    await connectToDb();

    const user = await User.findOne({ clerkId });

    if (!user) {
      return { success: false, message: "User not found" };
    }

    return {
      success: true,
      message: "User found",
      user: {
        clerkId: user.clerkId,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        bio: user.bio,
        location: user.location,
        price: user.price,
        socialProfiles: user.socialProfiles,
        companies: user.companies,
        font: user.font,
        colorTheme: user.colorTheme,
      },
    };
  } catch (error) {
    console.error("Error fetching user:", error);
    return { success: false, message: "Error fetching user data" };
  }
}

export async function getEmailByClerkId(
  clerkId: string
): Promise<string | null> {
  try {
    await connectToDb();

    const user = await User.findOne({ clerkId });

    if (!user) {
      return null;
    }

    return user.email; // Return only the email string
  } catch (error) {
    console.error("Error fetching user email:", error);
    return null;
  }
}
