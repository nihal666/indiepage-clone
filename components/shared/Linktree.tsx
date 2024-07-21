"use client";

import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/lib/zustand";
import StartupCard from "./StartupCard";

const Linktree: React.FC = () => {
  const { companies, addCompany, removeCompany } = useUserStore();
  const [currentStartup, setCurrentStartup] = useState<string>("");
  const [showInput, setShowInput] = useState<boolean>(false);

  const handleAddStartup = () => {
    if (currentStartup.trim() !== "") {
      addCompany({
        image: "",
        name: currentStartup,
        description: "Company description...",
      });
      setCurrentStartup("");
      setShowInput(false);
    }
  };

  const handleRemoveStartup = (index: number) => {
    removeCompany(index);
  };

  return (
    <Card className="mx-auto py-6 pb-0 w-[90%]">
      <CardContent className="flex flex-col items-center">
        {companies.map((company, index) => (
          <div key={index} className="w-full mb-4">
            <StartupCard
              company={company}
              index={index}
              onRemove={() => handleRemoveStartup(index)}
            />
          </div>
        ))}

        {showInput && (
          <div className="flex items-center gap-2 mb-4 w-full">
            <Input
              className="p-2 border border-gray-300 rounded-md flex-1"
              type="text"
              placeholder="Enter startup name"
              value={currentStartup}
              onChange={(e) => setCurrentStartup(e.target.value)}
            />
            <Button
              className="bg-green-500 text-white p-2 rounded-md"
              onClick={handleAddStartup}
            >
              Add
            </Button>
            <AiOutlineDelete
              className="text-red-500 cursor-pointer"
              size={24}
              onClick={() => setShowInput(false)}
            />
          </div>
        )}

        <Button
          className="bg-blue-500 text-white p-2 rounded-md w-full"
          onClick={() => setShowInput(true)}
        >
          Add Startup
        </Button>
      </CardContent>
    </Card>
  );
};

export default Linktree;
