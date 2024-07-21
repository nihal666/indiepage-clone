"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserStore } from "@/lib/zustand";
import { MdAttachMoney } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import {
  FaGithub,
  FaTiktok,
  FaInstagram,
  FaYoutube,
  FaLinkedin,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { CgMail } from "react-icons/cg";
import { IoIosLink } from "react-icons/io";
import { FaTags, FaFlag } from "react-icons/fa";
import { Button } from "@/components/ui/button";

const icons = {
  github: FaGithub,
  twitter: FaXTwitter,
  tiktok: FaTiktok,
  instagram: FaInstagram,
  youtube: FaYoutube,
  linkedin: FaLinkedin,
  email: CgMail,
};

const MobilePreview: React.FC = () => {
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
      className="flex flex-col rounded-[40px] shadow-lg w-[375px] h-[667px] border-[15px] border-black overflow-y-auto p-4"
      style={{
        fontFamily: font,
        background: `linear-gradient(135deg, ${colorTheme.primary}, ${colorTheme.secondary})`,
        color: colorTheme.text,
      }}
    >
      {/* Left Column: User Info */}
      <div className="w-full flex justify-center items-center p-4">
        <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-xl shadow-xl p-6 w-full max-w-md transition-all duration-300 hover:shadow-2xl">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="w-24 h-24 ring-4 ring-white ring-opacity-50 shadow-lg transition-transform duration-300 hover:scale-105">
              <AvatarImage src={avatar} alt={name} />
              <AvatarFallback>
                {name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <h1 className="text-2xl font-bold text-center">{name}</h1>
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
            <p className="text-center text-sm">{bio}</p>
            <div className="flex justify-center space-x-4">
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
          <div className="mt-6 bg-white bg-opacity-10 p-3 rounded-lg">
            <div className="flex flex-col space-y-2">
              <input
                className="flex-grow p-2 text-xs border rounded-lg bg-opacity-20 focus:outline-none focus:ring-2"
                type="email"
                placeholder="Enter your email"
              />
              <Button className="text-xs px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors duration-300">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Companies */}
      <div className="w-full p-4">
        <h2 className="text-xl font-semibold mb-4">Companies</h2>
        <div className="space-y-4">
          {companies.map((company, index) => (
            <div
              key={index}
              className="bg-white bg-opacity-10 rounded-lg p-4 transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex flex-col items-start space-y-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={company.image} alt={company.name} />
                  <AvatarFallback>
                    {company.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold truncate">
                    {company.name}
                  </h3>
                  <p className="text-xs mb-2">{company.description}</p>
                  <div className="grid grid-cols-1 gap-1 text-black">
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

export default MobilePreview;
