export const SITE_URL = 'https://sabir-dev.vercel.app';

export const PROFILE = {
  name: 'Sabir Ali',
  alternateName: 'SabirAliDev',
  jobTitle: 'Full-Stack Engineer',
  location: 'Pakistan',
  website: SITE_URL,
  image: `${SITE_URL}/Sabir.png`,
  github: 'https://github.com/sabiralidev',
  linkedin: 'https://www.linkedin.com/in/sabiralidev/',
  devto: 'https://dev.to/sabiralidev',
  facebook: 'https://www.facebook.com/sabiralidev',
  instagram: 'https://www.instagram.com/sabiralidev',
  email: 'sabirsheik12787@gmail.com',
} as const;

export const VERIFIED_SAME_AS = [
  PROFILE.github,
  PROFILE.linkedin,
  PROFILE.devto,
] as const;
