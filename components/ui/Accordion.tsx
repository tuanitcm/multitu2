import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface AccordionItemProps {
  question: string;
  answer: string;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-800 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 flex items-center justify-between gap-4 text-left group"
        aria-expanded={isOpen}
      >
        <span className={`font-semibold text-base md:text-lg transition-colors ${isOpen ? 'text-indigo-400' : 'text-slate-200 group-hover:text-indigo-300'}`}>
          {question}
        </span>
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-indigo-500/20 text-indigo-400 rotate-180' : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700'}`}>
          {isOpen ? <Minus size={16} /> : <Plus size={16} />}
        </div>
      </button>
      <div 
        className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 mb-4' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="overflow-hidden">
          <div className="text-slate-400 leading-relaxed pr-4">
            {answer}
          </div>
        </div>
      </div>
    </div>
  );
};

interface AccordionProps {
  items: { question: string; answer: string }[];
}

export const Accordion: React.FC<AccordionProps> = ({ items }) => {
  return (
    <div className="w-full">
      {items.map((item, index) => (
        <AccordionItem key={index} question={item.question} answer={item.answer} />
      ))}
    </div>
  );
};