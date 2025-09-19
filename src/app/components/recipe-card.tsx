'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Recipe } from '@/app/data/recipes';
import { findImage } from '@/app/data/recipes';

interface RecipeCardProps {
  recipe: Recipe;
  onSelect: () => void;
}

export function RecipeCard({ recipe, onSelect }: RecipeCardProps) {
  const image = findImage(recipe.imageId);

  return (
    <Card
      className="overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer h-full flex flex-col"
      onClick={onSelect}
      onKeyDown={(e) => e.key === 'Enter' && onSelect()}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${recipe.title}`}
    >
      {image && (
        <div className="relative w-full h-48">
          <Image
            src={image.imageUrl}
            alt={recipe.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            data-ai-hint={recipe.imageHint}
          />
        </div>
      )}
      <CardHeader>
        <CardTitle className="font-headline text-xl">{recipe.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription>{recipe.description}</CardDescription>
      </CardContent>
    </Card>
  );
}
