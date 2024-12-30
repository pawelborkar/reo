export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Reo",
  description: "Share files from anywhere to anywhere in the world.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Pricing",
      href: "/pricing",
    },
    {
      label: "About",
      href: "/about",
    },
  ],

  links: {
    github: "https://github.com/pawelborkar/reo",
    twitter: "https://x.com/reohq",
    docs: "https://reo.im",
  },
};
