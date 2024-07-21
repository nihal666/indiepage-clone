"use client";

import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MdAttachMoney } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import {
  FaGithub,
  FaTiktok,
  FaInstagram,
  FaYoutube,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import { CgMail } from "react-icons/cg";
import { IoIosLink } from "react-icons/io";
import { FaTags, FaFlag } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import axios from "axios";

const icons = {
  github: FaGithub,
  twitter: FaTwitter,
  tiktok: FaTiktok,
  instagram: FaInstagram,
  youtube: FaYoutube,
  linkedin: FaLinkedin,
  email: CgMail,
};

interface UserData {
  avatar: string;
  name: string;
  bio: string;
  location: string;
  price: string;
  socialProfiles: { [key: string]: string };
  companies: Company[];
  font: string;
  colorTheme: {
    primary: string;
    secondary: string;
    text: string;
  };
}

interface Company {
  image: string;
  name: string;
  description: string;
  website?: string;
  tags?: string;
  flag?: string;
  funding?: string;
}

const Site: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id: clerkId } = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api?query=${clerkId}`);
        if (response.data.success && response.data.user) {
          setUserData(response.data.user);
        } else {
          throw new Error(response.data.message || "Failed to fetch user data");
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [clerkId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!userData) return <div>No user data available</div>;

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
  } = userData;

  const InfoItem = ({
    icon,
    text,
  }: {
    icon: React.ReactNode;
    text: React.ReactNode;
  }) => (
    <div className="flex items-center space-x-2 text-xs sm:text-sm">
      {icon}
      <span className="truncate">{text}</span>
    </div>
  );

  return (
    <div
      className="flex flex-col lg:flex-row min-h-screen w-full overflow-auto p-2 sm:p-4 md:p-6 lg:p-8"
      style={{
        fontFamily: font,
        background: `linear-gradient(135deg, ${colorTheme.primary}, ${colorTheme.secondary})`,
        color: colorTheme.text,
      }}
    >
      {/* Left Column: User Info */}
      <div className="w-full lg:w-1/2 flex justify-center items-center p-2 sm:p-4 lg:p-8">
        <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 w-full max-w-md transition-all duration-300 hover:shadow-2xl">
          <div className="flex flex-col items-center space-y-4 sm:space-y-6">
            <Avatar className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 ring-4 ring-white ring-opacity-50 shadow-lg transition-transform duration-300 hover:scale-105">
              <AvatarImage src={avatar} alt={name} />
              <AvatarFallback>
                {name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <h1 className="text-2xl sm:text-3xl font-bold text-center">
              {name}
            </h1>
            <div className="flex justify-center space-x-4">
              {location && (
                <InfoItem
                  icon={<IoLocationSharp size={16} />}
                  text={location}
                />
              )}
              {price && (
                <InfoItem icon={<MdAttachMoney size={16} />} text={price} />
              )}
            </div>
            <p className="text-center text-sm sm:text-base lg:text-lg">{bio}</p>
            <div className="flex justify-center space-x-3 sm:space-x-4">
              {Object.entries(socialProfiles).map(([platform, url]) => {
                if (url) {
                  const Icon = icons[platform as keyof typeof icons];
                  return (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-transform duration-300 hover:scale-110"
                    >
                      <Icon size={20} />
                    </a>
                  );
                }
                return null;
              })}
            </div>
          </div>
          <div className="mt-6 sm:mt-8 bg-white bg-opacity-10 p-3 sm:p-4 rounded-lg sm:rounded-xl">
            <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
              <input
                className="flex-grow p-2 sm:p-3 text-xs sm:text-sm border rounded-lg bg-opacity-20 focus:outline-none focus:ring-2"
                type="email"
                placeholder="Enter your email"
              />
              <Button className="text-xs sm:text-sm px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-opacity-90 transition-colors duration-300">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Companies */}
      <div className="w-full lg:w-1/2 p-2 sm:p-4 lg:p-8 lg:overflow-auto">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">
          Companies
        </h2>
        <div className="space-y-4 sm:space-y-6">
          {companies.map((company: Company, index: number) => (
            <div
              key={index}
              className="bg-white bg-opacity-10 rounded-lg sm:rounded-xl p-4 sm:p-6 transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                <Avatar className="w-12 h-12 sm:w-16 sm:h-16">
                  <AvatarImage src={company.image} alt={company.name} />
                  <AvatarFallback>
                    {company.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl font-semibold truncate">
                    {company.name}
                  </h3>
                  <p className="text-xs sm:text-sm mb-2 sm:mb-3">
                    {company.description}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2 text-black">
                    {company.website && (
                      <InfoItem
                        icon={<IoIosLink size={14} />}
                        text={
                          <a
                            href={company.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                          >
                            {company.website}
                          </a>
                        }
                      />
                    )}
                    {company.tags && (
                      <InfoItem
                        icon={<FaTags size={14} />}
                        text={company.tags}
                      />
                    )}
                    {company.flag && (
                      <InfoItem
                        icon={<FaFlag size={14} />}
                        text={company.flag}
                      />
                    )}
                    {company.funding && (
                      <InfoItem
                        icon={<MdAttachMoney size={14} />}
                        text={company.funding}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Site;
