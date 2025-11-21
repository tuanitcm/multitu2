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
  slug: string; // Added for SEO friendly URLs (e.g., 'tinh-phan-tram')
  title: string;
  description: string;
  keywords?: string[];
  icon: React.ReactNode;
  category: 'math' | 'text' | 'security' | 'dev';
  popular?: boolean;
  component: React.ReactNode;
  details?: React.ReactNode;
  faqs?: FAQItem[];
}

export type Category = 'all' | 'math' | 'text' | 'security' | 'dev';