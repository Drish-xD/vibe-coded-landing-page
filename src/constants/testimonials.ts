export interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  image: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Small Business Owner',
    quote: 'The loan process was incredibly simple and fast. I had funds in my account within 24 hours!',
    image: '/images/testimonials/sarah.jpg',
  },
  {
    id: 2,
    name: 'Mark Peters',
    role: 'Freelance Developer',
    quote: 'As someone with an irregular income pattern, I was surprised how easy it was to get approved. The rates are fantastic too.',
    image: '/images/testimonials/mark.jpg',
  },
  {
    id: 3,
    name: 'Amira Khan',
    role: 'Retail Store Manager',
    quote: 'The customer service team was exceptional. They guided me through every step and found me the perfect loan option.',
    image: '/images/testimonials/amira.jpg',
  },
  {
    id: 4,
    name: 'Daniel Rodriguez',
    role: 'Healthcare Professional',
    quote: 'I needed emergency funds for a medical situation, and their same-day approval saved me a lot of stress.',
    image: '/images/testimonials/daniel.jpg',
  },
]; 