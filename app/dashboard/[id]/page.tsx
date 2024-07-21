"use client";

import Linktree from "@/components/shared/Linktree";
import MobilePreview from "@/components/shared/MobilePreview";
import SocialIcons from "@/components/shared/SocialIcons";
import UserCard from "@/components/shared/UserCard";
import SaveUserDataButton from "@/components/shared/UserButton";
import ThemeSelector from "@/components/shared/ThemeSelector";
import axios from "axios";
import { useEffect, useState } from "react";
import { useUserStore } from "@/lib/zustand";
import { useParams } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

const Page: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const clerkId = useParams();

  const updateUserStore = useUserStore((state) => state.updateUserStore);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api?query=${clerkId.id}`);
        console.log("API Response:", response.data);
        if (response.data.success && response.data.user) {
          updateUserStore(response.data.user);
        } else {
          throw new Error(response.data.message);
        }
      } catch (err) {
        console.error("Error fetching user data:", err, clerkId.id);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [clerkId.id, updateUserStore]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        <h2>Error Fetching User Data</h2>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      <nav className="bg-gray-800 text-white p-4">
        <SaveUserDataButton />
        <UserButton />
      </nav>
      <div className="flex flex-1 overflow-hidden">
        <main className="w-2/3 bg-gray-100 p-4 overflow-y-auto">
          <div>
            <UserCard />
            <Linktree />
            <SocialIcons />
            <ThemeSelector />
          </div>
        </main>
        <aside className="w-1/3 bg-gray-200 p-4 overflow-y-auto">
          <div className="bg-white rounded-md shadow-md p-4 flex justify-center items-center">
            <MobilePreview />
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Page;
