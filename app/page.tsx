'use client';

import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import { SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { FC } from "react";

const HeroSection: FC = () => {
  const { userId } = useAuth();

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-900">
      <header className="px-4 lg:px-6 h-16 flex items-center bg-white shadow-sm">
        <Link
          href="#"
          className="flex items-center justify-center"
          prefetch={false}
        >
          <RocketIcon className="h-8 w-8 text-blue-600" />
          <span className="ml-2 text-xl font-bold">StartupTree</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <Button>
              <SignUpButton />
            </Button>
            <Button variant={"secondary"}>
              <SignInButton />
            </Button>
          </SignedOut>
        </nav>
      </header>
      <main className="flex-1 flex items-center justify-center">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-6">
                <div className="space-y-4">
                  <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl xl:text-6xl">
                    Showcase your{" "}
                    <span className="text-blue-600">startups</span> and get more
                    customers
                  </h1>
                  <p className="max-w-[600px] text-gray-600 md:text-xl">
                    Get an Indie Page to show your unique solopreneur journey
                    and stand out from the crowd
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link
                    href={userId ? `/dashboard/${userId}` : "#"}
                    className="inline-flex h-12 items-center justify-center rounded-md bg-blue-600 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    {userId ? "Dashboard" : "Get Your StartupTree"}
                  </Link>
                  <Link
                    href="#"
                    className="inline-flex h-12 items-center justify-center rounded-md border border-gray-300 bg-white px-8 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    View Examples
                  </Link>
                </div>
              </div>
              <div className="mt-8 lg:mt-0">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h2 className="text-2xl font-semibold mb-4">
                    Featured Startups
                  </h2>
                  <ul className="space-y-4">
                    {["TechNova", "EcoSolutions", "FinWise", "HealthHub"].map(
                      (startup) => (
                        <li
                          key={startup}
                          className="flex items-center space-x-3"
                        >
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-blue-600 font-semibold">
                              {startup[0]}
                            </span>
                          </div>
                          <span className="font-medium">{startup}</span>
                          <ArrowRightIcon className="h-4 w-4 text-gray-400 ml-auto" />
                        </li>
                      )
                    )}
                  </ul>
                  <Link
                    href="#"
                    className="mt-6 inline-flex items-center text-sm font-medium text-blue-600 hover:underline"
                    prefetch={false}
                  >
                    View all featured startups
                    <ArrowRightIcon className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HeroSection;

type IconProps = {
  className?: string;
};

const RocketIcon: FC<IconProps> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
);

const ArrowRightIcon: FC<IconProps> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);