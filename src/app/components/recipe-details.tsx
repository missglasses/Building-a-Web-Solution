'use client';

import Image from 'next/image';
import { ArrowLeft, CheckCircle2, Heart } from 'lucide-react';
import type { Recipe } from '@/app/data/recipes';
import { findImage } from '@/app/data/recipes';
import { useFavorites } from '@/app/hooks/use-favorites';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface RecipeDetailsProps {
  recipe: Recipe;
  onBack: () => void;
}

export function RecipeDetails({ recipe, onBack }: RecipeDetailsProps) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const image = findImage(recipe.imageId);
  const isFav = isFavorite(recipe.id);

  const handleFavoriteClick = () => {
    if (!isFav) {
      addFavorite(recipe);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center mb-4">
        <Button variant="ghost" size="icon" onClick={onBack} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
          <span className="sr-only">Back to recipes</span>
        </Button>
        <h1 className="font-headline text-3xl md:text-4xl flex-1">{recipe.title}</h1>
        
        {isFav ? (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-pressed={true}
                className="text-destructive"
              >
                <Heart className="h-7 w-7 fill-current" />
                <span className="sr-only">Remove from favorites</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will remove "{recipe.title}" from your favorites.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => removeFavorite(recipe.id)} className="bg-destructive hover:bg-destructive/90">
                  Remove
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleFavoriteClick}
            aria-pressed={false}
            className="text-destructive"
          >
            <Heart className="h-7 w-7 transition-all" />
            <span className="sr-only">Add to favorites</span>
          </Button>
        )}
      </div>
      <Card className="shadow-lg">
        <CardContent className="p-0">
          {image && (
            <div className="relative w-full h-64 md:h-80">
              <Image
                src={image.imageUrl}
                alt={recipe.title}
                fill
                className="object-cover rounded-t-lg"
                sizes="(max-width: 768px) 100vw, 50vw"
                data-ai-hint={recipe.imageHint}
                priority
              />
            </div>
          )}
          <div className="p-6 md:p-8">
            <p className="text-muted-foreground text-lg mb-6">{recipe.description}</p>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <h2 className="font-headline text-2xl mb-4">Ingredients</h2>
                <ul className="space-y-2">
                  {recipe.ingredients.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="md:col-span-2">
                <h2 className="font-headline text-2xl mb-4">Instructions</h2>
                <ol className="space-y-4">
                  {recipe.instructions.map((step, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 bg-primary text-primary-foreground h-7 w-7 rounded-full flex items-center justify-center font-bold mr-3 mt-0.5">
                        {index + 1}
                      </div>
                      <p>{step}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
