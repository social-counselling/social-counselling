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
    label:"Vision Mission & Purpose",
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
    label: "Contact Us",
    href: "/contact",
  },
];

export const navigationCta = {
  label: "Book a Session",
  href: "/book-session",
};