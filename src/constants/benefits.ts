export interface Benefit {
  id: string;
  traditional: string;
  platform: string;
}

export interface MetricBenefit {
  id: string;
  label: string;
  traditional: number;
  platform: number;
  unit: string;
}

export const benefits: Benefit[] = [
  {
    id: 'process',
    traditional: 'Lengthy paperwork and multiple visits',
    platform: 'Fully digital process, no paperwork',
  },
  {
    id: 'approval',
    traditional: 'Days to weeks approval time',
    platform: 'Approval in minutes',
  },
  {
    id: 'disbursal',
    traditional: 'Funds available after approval + processing',
    platform: 'Same day fund disbursal',
  },
  {
    id: 'flexibility',
    traditional: 'Fixed repayment schedules',
    platform: 'Flexible repayment options',
  },
  {
    id: 'support',
    traditional: 'Limited support hours',
    platform: '24/7 customer service',
  },
];

export const metricBenefits: MetricBenefit[] = [
  {
    id: 'approval-rate',
    label: 'Approval Rate',
    traditional: 60,
    platform: 95,
    unit: '%',
  },
  {
    id: 'processing-time',
    label: 'Processing Time',
    traditional: 72,
    platform: 2,
    unit: 'hrs',
  },
  {
    id: 'interest-rates',
    label: 'Avg. Interest Rate',
    traditional: 15,
    platform: 9,
    unit: '%',
  },
]; 