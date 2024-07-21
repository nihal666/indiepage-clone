"use client";

import React, { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { useUserStore } from "@/lib/zustand";
import { MdAttachMoney, MdOutlinePhotoCamera } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { z } from "zod";

const nameSchema = z.string().min(1, { message: "Name is required" });
const bioSchema = z.string().min(1, { message: "Bio is required" });
const locationSchema = z.string().min(1, { message: "Location is required" });
const priceSchema = z
  .number()
  .min(0, { message: "Price must be a positive number" })
  .or(z.string().regex(/^\d+$/, { message: "Price must be a number" }));

const UserCard: React.FC = () => {
  const {
    avatar,
    name,
    bio,
    location,
    price,
    setAvatar,
    setName,
    setBio,
    setLocation,
    setPrice,
  } = useUserStore();
  const [activeSection, setActiveSection] = useState<
    "money" | "location" | null
  >(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleSection = (section: "money" | "location") => {
    setActiveSection((currentSection) =>
      currentSection === section ? null : section
    );
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleValidation = (
    schema: z.ZodType<any, any>,
    value: any
  ): string | null => {
    try {
      schema.parse(value);
      return null;
    } catch (error: unknown) {
      if (error instanceof z.ZodError) {
        return error.errors[0].message;
      } else {
        throw error;
      }
    }
  };

  const [nameError, setNameError] = useState<string | null>(null);
  const [bioError, setBioError] = useState<string | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [priceError, setPriceError] = useState<string | null>(null);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    setNameError(handleValidation(nameSchema, value));
  };

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setBio(value);
    setBioError(handleValidation(bioSchema, value));
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocation(value);
    setLocationError(handleValidation(locationSchema, value));
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPrice(value);
    setPriceError(handleValidation(priceSchema, value));
  };

  return (
    <Card className="mx-auto pt-4 w-[90%]">
      <CardContent className="flex flex-col items-center">
        <div
          className="w-20 h-20 mb-4 rounded-full overflow-hidden cursor-pointer flex items-center justify-center bg-gray-200"
          onClick={handleAvatarClick}
        >
          {avatar ? (
            <Image
              src={avatar}
              alt={name}
              width={80}
              height={80}
              objectFit="cover"
            />
          ) : (
            <Avatar className="flex items-center justify-center">
              <MdOutlinePhotoCamera size={24} />
            </Avatar>
          )}
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
        <div className="w-full mb-3">
          <Input
            className={`mb-2 w-full text-lg font-semibold ${
              nameError ? "border-red-500" : ""
            }`}
            placeholder="Name"
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <Textarea
          className={`w-full mb-4 ${bioError ? "border-red-500" : ""}`}
          placeholder="Bio"
          value={bio}
          onChange={handleBioChange}
        />
        <div
          className={cn(
            "flex justify-start w-full gap-3",
            activeSection && "mb-4"
          )}
        >
          <div
            className={`p-2 rounded-full ${
              activeSection === "money" ? "bg-gray-300" : "bg-gray-200"
            } hover:bg-gray-300 transition-colors duration-300 cursor-pointer`}
            onClick={() => toggleSection("money")}
          >
            <MdAttachMoney size={24} />
          </div>
          <div
            className={`p-2 rounded-full ${
              activeSection === "location" ? "bg-gray-300" : "bg-gray-200"
            } hover:bg-gray-300 transition-colors duration-300 cursor-pointer`}
            onClick={() => toggleSection("location")}
          >
            <IoLocationSharp size={24} />
          </div>
        </div>
        {activeSection && <Separator className="mb-4" />}
        {activeSection === "money" && (
          <div className="w-full mb-4">
            <h3 className="text-lg font-semibold mb-3">Pricing</h3>
            <Input
              className={`w-full ${priceError ? "border-red-500" : ""}`}
              placeholder="Enter your pricing"
              value={price}
              onChange={handlePriceChange}
              type="number"
            />
          </div>
        )}
        {activeSection === "location" && (
          <div className="w-full mb-4">
            <h3 className="text-lg font-semibold mb-3">Location</h3>
            <Input
              className={`w-full ${locationError ? "border-red-500" : ""}`}
              placeholder="Enter your location"
              value={location}
              onChange={handleLocationChange}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UserCard;
