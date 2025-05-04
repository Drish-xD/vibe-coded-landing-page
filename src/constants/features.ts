import { type LucideIcon, Bolt, Clock, CreditCard, Heart, Lock, Percent } from 'lucide-react';

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  animationDelay: number;
}

export const features: Feature[] = [
  {
    id: 'instant-approval',
    title: 'Instant Approval',
    description: 'Get your loan approved in minutes, not days.',
    icon: Bolt,
    animationDelay: 0.2,
  },
  {
    id: 'low-interest',
    title: 'Low Interest Rates',
    description: 'Enjoy rates lower than traditional banks.',
    icon: Percent,
    animationDelay: 0.4,
  },
  {
    id: 'secure-process',
    title: 'Bank-Level Security',
    description: 'Your data is protected with military-grade encryption.',
    icon: Lock,
    animationDelay: 0.6,
  },
  {
    id: 'quick-disbursal',
    title: 'Same Day Disbursal',
    description: 'Receive funds in your account within hours.',
    icon: Clock,
    animationDelay: 0.8,
  },
  {
    id: 'zero-paperwork',
    title: 'Zero Paperwork',
    description: 'Complete the entire process digitally.',
    icon: CreditCard,
    animationDelay: 1.0,
  },
  {
    id: 'customer-first',
    title: 'Customer-Centric',
    description: 'Dedicated support throughout your loan journey.',
    icon: Heart,
    animationDelay: 1.2,
  },
]; 