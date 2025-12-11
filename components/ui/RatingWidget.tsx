
import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';

interface RatingWidgetProps {
  toolId: string;
  initialRating: number;
  initialCount: number;
  onRate?: (newRating: number, newCount: number) => void;
}

export const RatingWidget: React.FC<RatingWidgetProps> = ({ 
  toolId, 
  initialRating, 
  initialCount,
  onRate 
}) => {
  const [rating, setRating] = useState(initialRating);
  const [count, setCount] = useState(initialCount);
  const [userRating, setUserRating] = useState<number | null>(null);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [hasRated, setHasRated] = useState(false);

  // Load user rating from local storage
  useEffect(() => {
    const storageKey = `rating_${toolId}`;
    const saved = localStorage.getItem(storageKey);
    
    if (saved) {
      const savedStar = parseInt(saved);
      setUserRating(savedStar);
      setHasRated(true);

      // Re-calculate the rating to simulate persistence
      // We assume initialProps are the baseline WITHOUT this user's vote
      const newCount = initialCount + 1;
      const newAverage = ((initialRating * initialCount) + savedStar) / newCount;
      const roundedAverage = Math.round(newAverage * 10) / 10;

      setRating(roundedAverage);
      setCount(newCount);

      // Update schema immediately on load
      if (onRate) {
          onRate(roundedAverage, newCount);
      }
    } else {
        // Reset to props if no local save found
        setRating(initialRating);
        setCount(initialCount);
        setHasRated(false);
        setUserRating(null);
    }
  }, [toolId, initialRating, initialCount]); // Re-run if tool changes

  const handleRate = (star: number) => {
    if (hasRated) return;

    const newCount = count + 1;
    // Calculate new weighted average: ((OldAvg * OldCount) + NewVote) / NewCount
    const newAverage = ((rating * count) + star) / newCount;
    
    // Round to 1 decimal place
    const roundedAverage = Math.round(newAverage * 10) / 10;

    setRating(roundedAverage);
    setCount(newCount);
    setUserRating(star);
    setHasRated(true);

    // Save to local storage
    localStorage.setItem(`rating_${toolId}`, star.toString());

    // Trigger callback for Schema update
    if (onRate) {
        onRate(roundedAverage, newCount);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <div 
        className="flex" 
        onMouseLeave={() => setHoverRating(null)}
      >
        {[1, 2, 3, 4, 5].map((star) => {
          const isFilled = (hoverRating !== null ? star <= hoverRating : star <= Math.round(rating));
          
          return (
            <button
              key={star}
              onClick={() => handleRate(star)}
              onMouseEnter={() => !hasRated && setHoverRating(star)}
              disabled={hasRated}
              className={`transition-transform duration-200 ${!hasRated ? 'hover:scale-110 cursor-pointer' : 'cursor-default'}`}
              aria-label={`Rate ${star} stars`}
            >
              <Star 
                size={20} 
                className={`transition-colors ${
                  isFilled 
                    ? 'fill-yellow-400 text-yellow-400' 
                    : 'fill-slate-100 text-slate-300'
                }`} 
              />
            </button>
          );
        })}
      </div>
      
      <div className="flex flex-col">
        <div className="flex items-baseline gap-1">
            <span className="font-bold text-slate-900 text-lg">{rating.toFixed(1)}</span>
            <span className="text-xs text-slate-500">/ 5</span>
        </div>
        <span className="text-xs text-slate-500">
            ({new Intl.NumberFormat('vi-VN').format(count)} đánh giá)
        </span>
      </div>

      {hasRated && (
        <span className="ml-2 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full animate-in fade-in zoom-in">
          Đã gửi
        </span>
      )}
    </div>
  );
};
