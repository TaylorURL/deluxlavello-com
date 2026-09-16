// What each route puts in the document head. The prerender writes it into the
// served HTML, and the client restates it when the reader moves between pages
// without a reload.

export const ORIGIN = 'https://deluxlavello.com';

export const META = {
  '/': {
    title: 'Delux Financial Solutions | Credit Education in Houston, TX',
    description:
      'Credit education, credit building, and financial guidance in Houston, Texas. Virtual and mobile in-person consultations available by appointment.',
  },
  '/services/': {
    title: 'Credit Services in Houston, TX | Delux Financial Solutions',
    description:
      'Credit Building, Credit Growth, the combined path, and Debt Lawsuit Response Support. Find the path that fits your situation.',
  },
  '/services/credit-building/': {
    title: 'Credit Building | Delux Financial Solutions',
    description:
      'Establish or rebuild your credit foundation with education and structured guidance: payment history, utilization, credit mix, and long-term habits.',
  },
  '/services/credit-growth/': {
    title: 'Credit Growth | Delux Financial Solutions',
    description:
      'Strengthen and optimize the credit you already have with continued guidance and education for your overall credit profile.',
  },
  '/services/credit-building-and-growth/': {
    title: 'Credit Building + Credit Growth | Delux Financial Solutions',
    description:
      'The complete path: establish your credit foundation and keep developing it with continued guidance, all under one consistent plan.',
  },
  '/services/debt-lawsuit-response/': {
    title: 'Debt Lawsuit Response Support | Delux Financial Solutions',
    description:
      'Sued over a consumer debt? Educational and organizational support to help you understand the process, organize your information, and prepare next steps.',
  },
  '/how-it-works/': {
    title: 'How It Works | Delux Financial Solutions',
    description:
      'From first consultation to ongoing progress: how Delux Financial Solutions guides you through understanding, building, and growing your credit.',
  },
  '/education/': {
    ogType: 'article',
    title: 'Credit Education and Resources | Delux Financial Solutions',
    description:
      'Plain-language credit education: credit reports, credit scores, utilization, payment history, credit mix, and the mistakes that cost people the most.',
  },
  '/partners/': {
    title: 'Partner With Us | Delux Financial Solutions',
    description:
      'Referral partnerships for auto sales professionals, realtors, mortgage professionals, and consumer-service businesses whose clients need credit help.',
  },
  '/about/': {
    title: 'About | Delux Financial Solutions',
    description:
      'Delux L Avello LLC | Financial Solutions is the company; Darian Avello | The Credit Coach is the educator. One purpose: credit you understand and control.',
  },
  '/contact/': {
    title: 'Schedule a Consultation | Delux Financial Solutions',
    description:
      'Schedule a consultation with Delux Financial Solutions in Houston, TX. Call (770) 758-6195 or email support@deluxlavello.com for appointment times.',
  },
  '/privacy/': {
    title: 'Privacy Policy | Delux Financial Solutions',
    description:
      'What this website collects, what it does not, and what happens to the information you send Delux Financial Solutions when you get in touch.',
  },
  '/terms/': {
    title: 'Terms of Use | Delux Financial Solutions',
    description:
      'The terms that cover this website: what the education here is and is not, what Delux L Avello LLC does not promise, and how services are actually agreed.',
  },
  '/disclaimer/': {
    title: 'Credit Disclaimer | Delux Financial Solutions',
    description:
      'What Delux L Avello LLC provides, what it does not guarantee, and how to read any result, example or testimonial shown anywhere on this site.',
  },
};

export const NOT_FOUND = {
  title: 'Page Not Found | Delux Financial Solutions',
  description:
    'That address is not on this site. The services, the credit education, and the ways to reach Delux Financial Solutions are all one click from here.',
  robots: 'noindex, follow',
};
