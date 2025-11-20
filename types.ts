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
  title: string;
  description: string;
  keywords?: string[]; // Added for SEO
  icon: React.ReactNode;
  category: 'math' | 'text' | 'security' | 'dev';
  popular?: boolean;
  component: React.ReactNode;
  details?: React.ReactNode;
  faqs?: FAQItem[]; // Added for FAQ Schema
}

export type Category = 'all' | 'math' | 'text' | 'security' | 'dev';