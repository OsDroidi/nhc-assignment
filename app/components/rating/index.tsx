import { useMemo } from 'react';
import { GrayStar, Star } from '@/components/svgs'; // Ensure correct path to SVGs

interface StarRatingProps {
  rating: number;
}

export default function StarRating({ rating }: StarRatingProps) {
  const starRating = useMemo(() => {
    const filledStars = Math.floor(rating);
    const emptyStars = 5 - filledStars;

    return (
      <>
        {[...Array(filledStars)].map((_, i) => (
          <Star key={i} />
        ))}
        {[...Array(emptyStars)].map((_, i) => (
          <GrayStar key={i + filledStars} />
        ))}
      </>
    );
  }, [rating]);

  return <div style={{ display: 'flex', gap: '5px' }}>{starRating}</div>;
}
