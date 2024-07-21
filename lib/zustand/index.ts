import create from "zustand";

export type SocialPlatform =
  | "github"
  | "twitter"
  | "tiktok"
  | "instagram"
  | "youtube"
  | "linkedin"
  | "email";

export interface Company {
  image: string;
  name: string;
  description: string;
  website?: string;
  tags?: string;
  flag?: string;
  size?: string;
  funding?: string;
}

export interface ColorTheme {
  name: string;
  primary: string;
  secondary: string;
  text: string;
}

export interface UserState {
  avatar: string;
  name: string;
  bio: string;
  location: string;
  price: string;
  socialProfiles: Record<SocialPlatform, string>;
  companies: Company[];
  font: string;
  colorTheme: ColorTheme;
  setAvatar: (avatar: string) => void;
  setName: (name: string) => void;
  setBio: (bio: string) => void;
  setLocation: (location: string) => void;
  setPrice: (price: string) => void;
  setSocialProfile: (platform: SocialPlatform, url: string) => void;
  setCompanies: (companies: Company[]) => void;
  setFont: (font: string) => void;
  setColorTheme: (theme: ColorTheme) => void;
  addCompany: (company: Company) => void;
  updateCompany: (index: number, company: Company) => void;
  removeCompany: (index: number) => void;
  updateUserStore: (userData: Partial<UserState>) => void;
}

export const useUserStore = create<UserState>((set) => ({
  avatar: "",
  name: "",
  bio: "",
  location: "",
  price: "",
  socialProfiles: {
    github: "",
    twitter: "",
    tiktok: "",
    instagram: "",
    youtube: "",
    linkedin: "",
    email: "",
  },
  companies: [],
  font: "",
  colorTheme: {
    name: "Default",
    primary: "#ffffff",
    secondary: "#f0f0f0",
    text: "#000000",
  },
  setAvatar: (avatar) => set({ avatar }),
  setName: (name) => set({ name }),
  setBio: (bio) => set({ bio }),
  setLocation: (location) => set({ location }),
  setPrice: (price) => set({ price }),
  setSocialProfile: (platform, url) =>
    set((state) => ({
      socialProfiles: {
        ...state.socialProfiles,
        [platform]: url,
      },
    })),
  setFont: (font) => set({ font }),
  setColorTheme: (theme) => set({ colorTheme: theme }),
  setCompanies: (companies) => set({ companies }),
  addCompany: (company) =>
    set((state) => ({ companies: [...state.companies, company] })),
  updateCompany: (index, company) =>
    set((state) => ({
      companies: state.companies.map((c, i) => (i === index ? company : c)),
    })),
  removeCompany: (index) =>
    set((state) => ({
      companies: state.companies.filter((_, i) => i !== index),
    })),
  updateUserStore: (userData: Partial<UserState>) =>
    set((state) => ({
      ...state,
      ...userData,
      socialProfiles: {
        ...state.socialProfiles,
        ...(userData.socialProfiles || {}),
      },
      colorTheme: {
        ...state.colorTheme,
        ...(userData.colorTheme || {}),
      },
    })),
}));
