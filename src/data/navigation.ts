export interface NavigationItem {
  label: string;
  href: string;
}

export const mainNavigation: NavigationItem[] = [
  {
    label: "Home",
    href: "/",
  },
  {
  label:"About Us",
  href:"/about"
  },
  {
    label:"Vision",
    href:"/vision-mission"
  },
  {
    label: "Services",
    href: "/services",
  },
  {
    label: "Counsellors",
    href: "/counsellors",
  },
  {
    label: "Blog",
    href: "/blog",
  },
  {
    label: "What we are NOT",
    href: "/contact",
  },
];

export const navigationCta = {
  label: "Book a Session",
  href: "/book-session",
};