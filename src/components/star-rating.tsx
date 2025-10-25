
'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface StarRatingProps {
  initialRating?: number;
  totalRatings?: number;
  postId: string;
}

export function StarRating({ initialRating = 0, totalRatings = 0, postId }: StarRatingProps) {
  const [rating, setRating] = useState(0); // Start with 0 for user rating
  const [hoverRating, setHoverRating] = useState(0);
  const [hasRated, setHasRated] = useState(false);
  const { toast } = useToast();

  const handleRating = (rate: number) => {
    if (hasRated) {
      toast({
        title: 'Already Rated',
        description: 'You have already submitted a rating for this post.',
        variant: 'destructive',
      });
      return;
    }
    setRating(rate);
    setHasRated(true);
    // In a real app, you would make an API call here to save the rating
    // e.g., saveRating(postId, rate);
    toast({
      title: 'Rating Submitted',
      description: `You rated this post ${rate} out of 5 stars.`,
    });
  };

  const displayRating = hoverRating || rating;
  const averageRating = initialRating.toFixed(1);
  const currentTotalRatings = totalRatings + (hasRated && rating !== 0 ? 1 : 0);

  return (
    <div className="flex flex-col items-end">
      <div className="flex items-center gap-2">
        <div className="flex items-center" onMouseLeave={() => setHoverRating(0)}>
          {[...Array(5)].map((_, index) => {
            const starValue = index + 1;
            return (
              <Star
                key={starValue}
                className={cn(
                  'h-6 w-6 cursor-pointer transition-colors',
                   hasRated ?
                    (starValue <= rating ? 'fill-amber-400 text-amber-500' : 'fill-muted-foreground/50 text-muted-foreground') :
                    (starValue <= displayRating ? 'fill-amber-400 text-amber-500' : 'fill-muted-foreground/50 text-muted-foreground')
                )}
                onMouseEnter={() => !hasRated && setHoverRating(starValue)}
                onClick={() => handleRating(starValue)}
              />
            );
          })}
        </div>
         {initialRating > 0 && (
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Star className="h-4 w-4 fill-amber-400 text-amber-500" />
            <span className="font-bold text-base text-foreground">{averageRating}</span>
            <span className="text-xs">({currentTotalRatings})</span>
          </div>
        )}
      </div>
    </div>
  );
}
