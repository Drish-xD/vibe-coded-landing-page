export interface NavLink {
  id: string;
  label: string;
  href: string;
}

export const navigation: NavLink[] = [
  {
    id: 'home',
    label: 'Home',
    href: '#',
  },
  {
    id: 'features',
    label: 'Features',
    href: '#features',
  },
  {
    id: 'how-it-works',
    label: 'How It Works',
    href: '#how-it-works',
  },
  {
    id: 'testimonials',
    label: 'Testimonials',
    href: '#testimonials',
  },
  {
    id: 'benefits',
    label: 'Benefits',
    href: '#benefits',
  },
];

export interface FooterLink {
  id: string;
  label: string;
  href: string;
}

export interface FooterSection {
  id: string;
  title: string;
  links: FooterLink[];
}

export const footerSections: FooterSection[] = [
  {
    id: 'company',
    title: 'Company',
    links: [
      { id: 'about', label: 'About Us', href: '#' },
      { id: 'careers', label: 'Careers', href: '#' },
      { id: 'press', label: 'Press', href: '#' },
      { id: 'blog', label: 'Blog', href: '#' },
    ],
  },
  {
    id: 'support',
    title: 'Support',
    links: [
      { id: 'help', label: 'Help Center', href: '#' },
      { id: 'contact', label: 'Contact Us', href: '#' },
      { id: 'faq', label: 'FAQs', href: '#' },
      { id: 'community', label: 'Community', href: '#' },
    ],
  },
  {
    id: 'legal',
    title: 'Legal',
    links: [
      { id: 'terms', label: 'Terms of Service', href: '#' },
      { id: 'privacy', label: 'Privacy Policy', href: '#' },
      { id: 'cookies', label: 'Cookie Policy', href: '#' },
      { id: 'compliance', label: 'Compliance', href: '#' },
    ],
  },
];

export const socialLinks: FooterLink[] = [
  { id: 'twitter', label: 'Twitter', href: '#' },
  { id: 'facebook', label: 'Facebook', href: '#' },
  { id: 'instagram', label: 'Instagram', href: '#' },
  { id: 'linkedin', label: 'LinkedIn', href: '#' },
]; 