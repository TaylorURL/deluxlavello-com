// The practice's own details, named once for every place the chrome repeats them.

export const PHONE = { href: 'tel:+17707586195', label: '(770) 758-6195' };
export const EMAIL = { href: 'mailto:support@deluxlavello.com', label: 'support@deluxlavello.com' };

// The contact page is where the consultation button leads, so on the contact
// page itself it leads to the booking page instead of back to itself.
export const BOOKING = 'https://info.deluxlavello.com/consultation';

export const SOCIAL = [
  { name: 'Instagram', icon: 'i-instagram', href: 'https://www.instagram.com/deluxlavellollc' },
  {
    name: 'Facebook',
    icon: 'i-facebook',
    href: 'https://www.facebook.com/people/Delux-L-Avello/61584260922640/',
  },
  { name: 'TikTok', icon: 'i-tiktok', href: 'https://www.tiktok.com/@deluxbydarianavello' },
  { name: 'YouTube', icon: 'i-youtube', href: 'https://www.youtube.com/@deluxbydarianavello' },
];

export const NAV = [
  { href: '/how-it-works/', label: 'Process' },
  { href: '/education/', label: 'Education' },
  { href: '/partners/', label: 'Partners' },
  { href: '/about/', label: 'About' },
];

export const SERVICE_GROUPS = [
  {
    head: 'Build and Grow',
    links: [
      {
        href: '/services/credit-building/',
        art: 'a-foundation',
        title: 'Credit Building',
        note: 'Establish a foundation, or rebuild after setbacks.',
      },
      {
        href: '/services/credit-growth/',
        art: 'a-growth',
        title: 'Credit Growth',
        note: 'Strengthen and optimize the profile you already have.',
      },
    ],
  },
  {
    head: 'Go Further',
    links: [
      {
        href: '/services/credit-building-and-growth/',
        art: 'a-combined',
        title: 'Credit Building + Credit Growth',
        note: 'The complete path, from first steps to ongoing guidance.',
      },
      {
        href: '/services/debt-lawsuit-response/',
        art: 'a-shield',
        title: 'Debt Lawsuit Response Support',
        note: 'Understand the process and organize your next steps.',
      },
    ],
  },
];

export const FOOTER_LINKS = [
  { href: '/services/', label: 'Services' },
  { href: '/how-it-works/', label: 'Process' },
  { href: '/education/', label: 'Education' },
  { href: '/about/', label: 'About' },
  { href: '/contact/', label: 'Contact' },
  { href: '/privacy/', label: 'Privacy Policy' },
  { href: '/terms/', label: 'Terms of Use' },
  { href: '/disclaimer/', label: 'Credit & Financial Disclaimer' },
];
