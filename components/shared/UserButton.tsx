"use client";

import { getEmailByClerkId, saveUserData } from "@/lib/actions";
import { useUserStore } from "@/lib/zustand";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function CreateAndSaveUserButton() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState("");
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [shareLink, setShareLink] = useState("");
  const clerkId = useParams();

  const {
    avatar,
    name,
    bio,
    location,
    price,
    socialProfiles,
    companies,
    font,
    colorTheme,
  } = useUserStore();

  const handleCreateAndSave = async () => {
    setIsProcessing(true);
    setMessage("");
    const email = await getEmailByClerkId(clerkId.id as string);

    if (!email) {
      setMessage("Email not found for the provided Clerk ID");
      setIsProcessing(false);
      return;
    }

    try {
      const finalAvatar = avatar || "https://via.placeholder.com/150";
      const finalName = name || "John Doe";
      const finalBio = bio || "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";

      const validSocialProfiles = Object.entries(socialProfiles)
        .filter(([platform, url]) => /^https?:\/\/.+\..+/.test(url))
        .map(([platform, url]) => ({ platform, url }));

      const updateUserData = {
        clerkId: clerkId.id,
        email,
        name: finalName,
        avatar: finalAvatar,
        bio: finalBio,
        location: location || "",
        price: price || "",
        socialProfiles: validSocialProfiles,
        companies: companies.map((company) => ({
          ...company,
          name: company.name || "Demo Company",
          image: company.image || "https://via.placeholder.com/150",
          description: company.description || "This is a demo company",
        })),
        font: font || "Arial, sans-serif",
        colorTheme: {
          name: colorTheme.name || "Default",
          primary: colorTheme.primary || "#ffffff",
          secondary: colorTheme.secondary || "#f0f0f0",
          text: colorTheme.text || "#000000",
        },
      };

      console.log("Update User Data:", updateUserData);

      const saveResult = await saveUserData(updateUserData);
      console.log("Save User Data Result:", saveResult);

      setMessage(`User created and data saved successfully. ClerkId: ${clerkId.id}`);
      setShareLink(`http://localhost:3000/site/${clerkId.id}`);
      setShowAlertDialog(true);

    } catch (error) {
      setMessage("An error occurred while creating and saving user data");
      console.error("Error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareLink);
    setMessage("Link copied to clipboard!");
  };

  return (
    <div>
      <Button
        onClick={handleCreateAndSave}
        disabled={isProcessing}
        className="px-4 py-2"
      >
        {isProcessing ? "Processing..." : "Save And Deploy"}
      </Button>
      {message && <p className="mt-2 text-sm">{message}</p>}

      <AlertDialog open={showAlertDialog} onOpenChange={setShowAlertDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Here's your share link</AlertDialogTitle>
            <AlertDialogDescription>
              <a href={shareLink} target="_blank" rel="noopener noreferrer">
                {shareLink}
              </a>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowAlertDialog(false)}>Close</AlertDialogCancel>
            <AlertDialogAction onClick={copyToClipboard}>Copy Link</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
