"use client";
import React, { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { IoIosLink } from "react-icons/io";
import { FaTags, FaFlag, FaRegTrashCan } from "react-icons/fa6";
import { MdAttachMoney, MdOutlinePhotoCamera } from "react-icons/md";
import { useUserStore } from "@/lib/zustand";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
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
import Image from "next/image";
import { z } from "zod";

interface StartupCardProps {
  company: {
    image: string;
    name: string;
    description: string;
    website?: string;
    tags?: string;
    flag?: string;
    funding?: string;
  };
  index: number;
  onRemove: () => void;
}

const nameSchema = z.string().min(1, "Company name is required");
const descriptionSchema = z.string().min(1, "Description is required");
const urlSchema = z.string().url({ message: "Invalid URL format" });
const fundingSchema = z
  .string()
  .regex(/^\d+$/, { message: "Funding must be a number" });

const StartupCard: React.FC<StartupCardProps> = ({
  company,
  index,
  onRemove,
}) => {
  const { updateCompany } = useUserStore();
  const [activeSection, setActiveSection] = useState<
    "link" | "tags" | "flag" | "money" | null
  >(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<{
    name?: string;
    description?: string;
    website?: string;
    funding?: string;
  }>({});

  const toggleSection = (section: "link" | "tags" | "flag" | "money") => {
    setActiveSection((currentSection) =>
      currentSection === section ? null : section
    );
  };

  const handleInputChange = (field: string, value: string) => {
    const updatedCompany = { ...company, [field]: value };
    updateCompany(index, updatedCompany);
    const validationError = handleValidation(field, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: validationError,
    }));
  };

  const handleValidation = (field: string, value: any): string | null => {
    try {
      switch (field) {
        case "name":
          nameSchema.parse(value);
          break;
        case "description":
          descriptionSchema.parse(value);
          break;
        case "website":
          urlSchema.parse(value);
          break;
        case "funding":
          fundingSchema.parse(value);
          break;
        default:
          break;
      }
      return null;
    } catch (error) {
      if (error instanceof z.ZodError) {
        return error.message;
      } else {
        return "Unknown validation error";
      }
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleInputChange("image", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const categoryOptions = [
    { value: "Artificial Intelligence", emoji: "🤖" },
    { value: "Productivity", emoji: "⏱️" },
    { value: "Education", emoji: "📚" },
    { value: "No Code", emoji: "🔧" },
    { value: "Social Media", emoji: "📱" },
    { value: "E-commerce", emoji: "🛒" },
    { value: "Analytics", emoji: "📊" },
    { value: "Web 3", emoji: "🌐" },
    { value: "Design Tools", emoji: "🎨" },
    { value: "Developer Tools", emoji: "💻" },
    { value: "Marketing", emoji: "📢" },
    { value: "Finance", emoji: "💰" },
    { value: "Others", emoji: "🔹" },
  ];

  const statusOptions = [
    { value: "Building", emoji: "🚧" },
    { value: "Active", emoji: "✅" },
    { value: "On Hold", emoji: "⏸️" },
    { value: "For Sale", emoji: "🏷️" },
    { value: "Acquired", emoji: "🤝" },
    { value: "Discontinued", emoji: "🚫" },
  ];

  return (
    <Card>
      <CardContent className="flex flex-col items-center">
        <div
          className="w-20 h-20 my-4 rounded-full overflow-hidden cursor-pointer flex items-center justify-center bg-gray-200"
          onClick={handleAvatarClick}
        >
          {company.image ? (
            <Image
              src={company.image}
              alt={company.name}
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
            className={cn(
              "mb-2 w-full text-lg font-semibold",
              errors.name && "border-red-500"
            )}
            placeholder="Company Name"
            value={company.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>
        <Textarea
          className={cn("w-full mb-4", errors.description && "border-red-500")}
          placeholder="Description"
          value={company.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description}</p>
        )}
        <div
          className={cn(
            "flex justify-start w-full gap-3",
            activeSection && "mb-4"
          )}
        >
          <div
            className={`p-3 rounded-full ${
              activeSection === "link" ? "bg-gray-300" : "bg-gray-200"
            } hover:bg-gray-300 transition-colors duration-300 cursor-pointer`}
            onClick={() => toggleSection("link")}
          >
            <IoIosLink size={20} />
          </div>
          <div
            className={`p-3 rounded-full ${
              activeSection === "tags" ? "bg-gray-300" : "bg-gray-200"
            } hover:bg-gray-300 transition-colors duration-300 cursor-pointer`}
            onClick={() => toggleSection("tags")}
          >
            <FaTags size={20} />
          </div>
          <div
            className={`p-3 rounded-full ${
              activeSection === "flag" ? "bg-gray-300" : "bg-gray-200"
            } hover:bg-gray-300 transition-colors duration-300 cursor-pointer`}
            onClick={() => toggleSection("flag")}
          >
            <FaFlag size={20} />
          </div>
          <div
            className={`p-3 rounded-full ${
              activeSection === "money" ? "bg-gray-300" : "bg-gray-200"
            } hover:bg-gray-300 transition-colors duration-300 cursor-pointer`}
            onClick={() => toggleSection("money")}
          >
            <MdAttachMoney size={20} />
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <div className="p-3 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors duration-300 cursor-pointer">
                <FaRegTrashCan size={20} color="red" />
              </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  startup card.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={onRemove}>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        {activeSection && <Separator className="mb-4" />}
        {activeSection === "link" && (
          <div className="w-full">
            <h3 className="text-lg font-semibold mb-3">URL</h3>
            <Input
              className={cn("w-full", errors.website && "border-red-500")}
              placeholder="Enter website URL"
              value={company.website || ""}
              onChange={(e) => handleInputChange("website", e.target.value)}
            />
            {errors.website && (
              <p className="text-red-500 text-sm mt-1">{errors.website}</p>
            )}
          </div>
        )}
        {activeSection === "money" && (
          <div className="w-full">
            <h3 className="text-lg font-semibold mb-3">Revenue</h3>
            <Input
              className={cn("w-full", errors.funding && "border-red-500")}
              placeholder="Enter funding amount"
              value={company.funding || ""}
              onChange={(e) => handleInputChange("funding", e.target.value)}
            />
            {errors.funding && (
              <p className="text-red-500 text-sm mt-1">{errors.funding}</p>
            )}
          </div>
        )}
        {activeSection === "tags" && (
          <div className="w-full">
            <h3 className="text-lg font-semibold mb-3">Category</h3>
            <DropdownMenu>
              <DropdownMenuTrigger className="w-full">
                <div className="w-full border border-gray-300 rounded-md py-2 px-3 text-left">
                  {company.tags || "Select Category"}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {categoryOptions.map((option) => (
                  <DropdownMenuItem
                    key={option.value}
                    onClick={() => handleInputChange("tags", option.value)}
                  >
                    {option.emoji} {option.value}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
        {activeSection === "flag" && (
          <div className="w-full">
            <h3 className="text-lg font-semibold mb-3">Status</h3>
            <DropdownMenu>
              <DropdownMenuTrigger className="w-full">
                <div className="w-full border border-gray-300 rounded-md py-2 px-3 text-left">
                  {company.flag || "Select Status"}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {statusOptions.map((option) => (
                  <DropdownMenuItem
                    key={option.value}
                    onClick={() => handleInputChange("flag", option.value)}
                  >
                    {option.emoji} {option.value}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StartupCard;
