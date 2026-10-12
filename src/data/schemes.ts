import { SchemePlan } from './types';

export const initialSchemePlans: SchemePlan[] = [
  {
    id: 'plan-11-plus-1',
    name: 'Sri Ganesh Swarna Sanchay Yojana (11 + 1 Bonus)',
    code: 'SGBW-SSY-11',
    durationMonths: 11,
    bonusMonths: 1,
    minMonthlyAmount: 2000,
    maxMonthlyAmount: 50000,
    description: 'Pay 11 monthly instalments, and Sri Ganesh Bangle Works deposits the 12th month as your loyalty bonus. Plus enjoy 0% making charges (up to 18% value addition) upon maturity!',
    makingChargesWaivedPercent: 18,
    features: [
      '11 Months Installment + 1 Full Month Bonus by SGBW',
      '0% Making Charges (VA waived up to 18%) upon redemption',
      'Fixed monthly savings from ₹2,000 to ₹50,000',
      'Option to redeem for 22K Hallmarked Jewellery or 24K Bullion Coins',
      'Rate-lock protection available on payment date',
      'Free transit insurance & zero processing fees',
      'Online UPI, Net Banking, Card, and In-Store payment modes'
    ]
  },
  {
    id: 'plan-digi-gold-weight',
    name: 'Swarna Vriddhi Weight Accumulator (11 Months)',
    code: 'SGBW-SVW-11',
    durationMonths: 11,
    bonusMonths: 1,
    minMonthlyAmount: 5000,
    maxMonthlyAmount: 100000,
    description: 'Each monthly payment is instantly converted into grams of 22K gold at the day’s certified IBJA rate. Sri Ganesh adds a 5% extra gold weight bonus at maturity!',
    makingChargesWaivedPercent: 15,
    features: [
      'Gold weight locked at live market rate each month',
      'Protection against rising bullion prices over 11 months',
      '5% additional gold bonus credited at final maturity',
      'Redeemable against any antique nakshi, chokers, or bangles',
      'Instant digital passbook updates'
    ]
  }
];

export const schemeFaqs = [
  {
    q: 'How does the 11 + 1 Swarna Sanchay scheme work?',
    a: 'You pay 11 equal monthly instalments of your chosen amount (₹2,000 to ₹50,000). On the 12th month, Sri Ganesh Bangle Works contributes the full 12th installment as a gift. At the end of 12 months, you redeem jewellery for the total 12-month accumulated value with 0% making charges!'
  },
  {
    q: 'Can I redeem in cash or bullion coins?',
    a: 'You can redeem your accumulated value for any certified 22K (916) or 24K (999) gold jewellery or coins from our Hyderabad or Bengaluru flagships. Per government bullion regulations, cash refunds are not permitted.'
  },
  {
    q: 'What if I miss an installment deadline?',
    a: 'You have a 7-day grace window after your monthly due date. You can pay online via UPI, Credit/Debit card, or visit our showrooms. If an installment is delayed beyond the grace period, our concierge desk assists you with instant clearance.'
  },
  {
    q: 'Are there any hidden fees or GST charges upon redemption?',
    a: 'There are zero enrollment or processing fees. Standard government GST (3%) applies as mandated by law at the time of invoice redemption, while making charges up to 18% are 100% waived!'
  },
  {
    q: 'Is my gold scheme investment safe and insured?',
    a: 'Sri Ganesh Bangle Works has operated continuously since 1978. Every rupee deposited is secured against physical certified 916 gold reserves held in bank lockers and audited under BIS hallmarking standards.'
  }
];
