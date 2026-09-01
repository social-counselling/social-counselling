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
    label: "Services",
    href: "/services",
  },
  {
    label: "Counsellors",
    href: "/counsellors",
  },
  {
    label: "Resources",
    href: "/resources",
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