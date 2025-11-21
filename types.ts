import React from 'react';

export interface CalculationResult {
  value: number | null;
  formatted: string;
  steps: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Tool {
  id: string;
  slug: string; // Added for SEO friendly URLs
  title: string;
  description: string;
  keywords?: string[];
  icon: React.ReactNode;
  category: 'math' | 'text' | 'security' | 'dev' | 'converter' | 'electricity';
  popular?: boolean;
  component: React.ReactNode;
  details?: React.ReactNode;
  faqs?: FAQItem[];
}

export type Category = 'all' | 'math' | 'text' | 'security' | 'dev' | 'converter' | 'electricity';
