"use client";
import React from "react";
import { useUserStore } from "@/lib/zustand";
import { Card, CardContent } from "@/components/ui/card";

const fonts = [
  { name: "Roboto", value: "'Roboto', sans-serif" },
  { name: "Open Sans", value: "'Open Sans', sans-serif" },
  { name: "Lato", value: "'Lato', sans-serif" },
  { name: "Montserrat", value: "'Montserrat', sans-serif" },
  { name: "Poppins", value: "'Poppins', sans-serif" },
  { name: "Playfair Display", value: "'Playfair Display', serif" },
  { name: "Merriweather", value: "'Merriweather', serif" },
  { name: "Source Code Pro", value: "'Source Code Pro', monospace" },
  { name: "Ubuntu", value: "'Ubuntu', sans-serif" },
  { name: "Nunito", value: "'Nunito', sans-serif" },
];

const colorThemes = [
  { name: "Light", primary: "#ffffff", secondary: "#f0f0f0", text: "#000000" },
  { name: "Dark", primary: "#1a1a1a", secondary: "#2a2a2a", text: "#ffffff" },
  { name: "Blue", primary: "#e6f2ff", secondary: "#b3d9ff", text: "#00366d" },
  { name: "Green", primary: "#e6fff2", secondary: "#b3ffd9", text: "#003d1a" },
  { name: "Purple", primary: "#f3e6ff", secondary: "#d9b3ff", text: "#3d0066" },
  { name: "Coral", primary: "#fff0e6", secondary: "#ffcbb3", text: "#663000" },
  { name: "Teal", primary: "#e6fffd", secondary: "#b3fff7", text: "#006663" },
  { name: "Amber", primary: "#fff8e6", secondary: "#ffebb3", text: "#664d00" },
  { name: "Rose", primary: "#ffe6f0", secondary: "#ffb3d1", text: "#660033" },
  { name: "Slate", primary: "#f0f4f8", secondary: "#d9e2ec", text: "#1f2933" },
];

const ThemeSelector: React.FC = () => {
  const { font, setFont, colorTheme, setColorTheme } = useUserStore();

  return (
    <Card className="mx-auto w-[90%]">
      <CardContent className="p-4 bg-white rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-6">Theme Settings</h2>
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Font</label>
          <select
            value={font}
            onChange={(e) => setFont(e.target.value)}
            className="w-full p-2 border rounded"
          >
            {fonts.map((f) => (
              <option
                key={f.name}
                value={f.value}
                style={{ fontFamily: f.value }}
              >
                {f.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Color Theme</label>
          <div className="flex flex-col space-y-2">
            {colorThemes.map((theme) => (
              <button
                key={theme.name}
                onClick={() => setColorTheme(theme)}
                className={`p-3 rounded flex justify-between items-center transition-all duration-200 ${
                  colorTheme.name === theme.name
                    ? "ring-2 ring-blue-500"
                    : "hover:ring-2 hover:ring-blue-300"
                }`}
                style={{
                  backgroundColor: theme.primary,
                  color: theme.text,
                }}
              >
                <span>{theme.name}</span>
                <div className="flex space-x-2">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: theme.primary }}
                  ></div>
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: theme.secondary }}
                  ></div>
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: theme.text }}
                  ></div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ThemeSelector;
