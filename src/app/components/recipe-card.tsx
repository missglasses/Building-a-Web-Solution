'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Recipe } from '@/app/data/recipes';
import { findImage } from '@/app/data/recipes';
import { CheckCircle2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

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
        <CardDescription>{recipe.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col">
        <Separator className="my-2" />
        <h4 className="font-bold text-sm mb-2">Ingredients</h4>
        <ul className="space-y-1 text-sm text-muted-foreground flex-grow">
          {recipe.ingredients.slice(0, 4).map((item, index) => (
            <li key={index} className="flex items-start">
              <CheckCircle2 className="h-4 w-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
              <span className="line-clamp-1">{item}</span>
            </li>
          ))}
          {recipe.ingredients.length > 4 && (
             <li className="text-xs text-center text-muted-foreground/80 pt-1">...and more</li>
          )}
        </ul>
      </CardContent>
    </Card>
  );
}
