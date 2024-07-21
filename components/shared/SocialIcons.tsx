"use client";
import React, { useState } from "react";
import {
  FaGithub,
  FaTiktok,
  FaInstagram,
  FaYoutube,
  FaLinkedin,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { CgMail } from "react-icons/cg";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useUserStore } from "@/lib/zustand";
import { Separator } from "../ui/separator";
import { z } from "zod";

type SocialPlatform =
  | "github"
  | "twitter"
  | "tiktok"
  | "instagram"
  | "youtube"
  | "linkedin"
  | "email";

const icons = {
  github: FaGithub,
  twitter: FaXTwitter,
  tiktok: FaTiktok,
  instagram: FaInstagram,
  youtube: FaYoutube,
  linkedin: FaLinkedin,
  email: CgMail,
};

const urlSchema = z.string().url({ message: "Invalid URL format" });

const SocialIcons: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SocialPlatform | null>(
    null
  );
  const { socialProfiles, setSocialProfile } = useUserStore();
  const [errors, setErrors] = useState<{ [key in SocialPlatform]?: string }>(
    {}
  );

  const toggleSection = (section: SocialPlatform) => {
    setActiveSection((currentSection) =>
      currentSection === section ? null : section
    );
  };

  const handleInputChange = (platform: SocialPlatform, value: string) => {
    setSocialProfile(platform, value);
    const validationError = handleValidation(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [platform]: validationError,
    }));
  };

  const handleValidation = (value: string): string | null => {
    try {
      urlSchema.parse(value);
      return null;
    } catch (error: unknown) {
      if (error instanceof Error && "errors" in error) {
        return (error as any).errors[0].message;
      }
      return null;
    }
  };

  return (
    <Card className="mx-auto pt-6 w-[90%]">
      <CardContent className="flex flex-col items-center">
        <div className="flex justify-start w-full gap-4 flex-wrap">
          {Object.entries(icons).map(([platform, Icon]) => (
            <div
              key={platform}
              className={`p-2 rounded-full ${
                activeSection === platform ? "bg-gray-300" : "bg-gray-200"
              } hover:bg-gray-300 transition-colors duration-300 cursor-pointer`}
              onClick={() => toggleSection(platform as SocialPlatform)}
            >
              <Icon size={25} />
            </div>
          ))}
        </div>
        {activeSection && <Separator className="mb-2 mt-4" />}
        {activeSection && (
          <div className="w-full mt-4">
            <h3 className="text-lg font-semibold mb-3 capitalize">
              {activeSection}
            </h3>
            <Input
              className={`w-full ${
                errors[activeSection] ? "border-red-500" : ""
              }`}
              placeholder={`Enter your ${activeSection} profile URL`}
              value={socialProfiles[activeSection]}
              onChange={(e) => handleInputChange(activeSection, e.target.value)}
            />
            {errors[activeSection] && (
              <p className="text-red-500 text-sm mt-1">
                {errors[activeSection]}
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SocialIcons;
