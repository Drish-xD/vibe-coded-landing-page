import { type LucideIcon, CheckCircle, CreditCard, FormInput } from 'lucide-react';

export interface ProcessStep {
  id: string;
  step: number;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const processSteps: ProcessStep[] = [
  {
    id: 'apply',
    step: 1,
    title: 'Quick Application',
    description: 'Fill out our simple form in under 2 minutes with just basic details.',
    icon: FormInput,
  },
  {
    id: 'approval',
    step: 2,
    title: 'Instant Approval',
    description: 'Get approval within minutes based on our AI-powered risk assessment.',
    icon: CheckCircle,
  },
  {
    id: 'disbursal',
    step: 3,
    title: 'Immediate Disbursal',
    description: 'Receive funds directly in your bank account on the same day.',
    icon: CreditCard,
  },
]; 