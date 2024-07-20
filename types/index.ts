export interface SocialProfile {
  platform: string;
  url: string;
}

export interface Company {
  name: string;
  image: string;
  description: string;
  website?: string;
  tags?: string[];
  flag?: string;
  size?: string;
  funding?: string;
}

export interface ColorTheme {
  name?: string;
  primary?: string;
  secondary?: string;
  text?: string;
}
