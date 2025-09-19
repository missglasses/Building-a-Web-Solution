'use client';

import Image from 'next/image';
import { Heart, Sheet, Trash2, UtensilsCrossed } from 'lucide-react';
import { useFavorites } from '@/app/hooks/use-favorites';
import { Button } from '@/components/ui/button';
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { findImage } from '../data/recipes';

export function FavoritesSheet() {
  const { favorites, removeFavorite } = useFavorites();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Heart className="h-6 w-6 text-primary-foreground" />
          <span className="sr-only">Open favorites</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px] bg-background">
        <SheetHeader>
          <SheetTitle className="font-headline text-2xl">Favorite Recipes</SheetTitle>
          <SheetDescription>Your hand-picked collection of culinary delights.</SheetDescription>
        </SheetHeader>
        <Separator className="my-4" />
        <ScrollArea className="h-[calc(100%-8rem)]">
          {favorites.length > 0 ? (
            <div className="space-y-4 pr-4">
              {favorites.map((recipe) => {
                const image = findImage(recipe.imageId);
                return (
                  <div key={recipe.id} className="flex items-center space-x-4 group">
                    {image && (
                      <Image
                        src={image.imageUrl}
                        alt={recipe.title}
                        width={80}
                        height={80}
                        className="rounded-md object-cover"
                        data-ai-hint={recipe.imageHint}
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="font-bold">{recipe.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {recipe.description}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeFavorite(recipe.id)}
                      aria-label={`Remove ${recipe.title} from favorites`}
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <UtensilsCrossed className="w-16 h-16 text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground">You haven't saved any favorites yet.</p>
              <p className="text-sm text-muted-foreground/80">
                Click the heart icon on a recipe to add it here.
              </p>
            </div>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
