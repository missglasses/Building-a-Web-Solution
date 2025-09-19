'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Recipe } from '@/app/data/recipes';
import { useToast } from '@/hooks/use-toast';

const FAVORITES_KEY = 'recipea-favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<Recipe[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const storedFavorites = localStorage.getItem(FAVORITES_KEY);
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (error) {
        console.error('Failed to load favorites from localStorage', error);
      }
    }
  }, []);

  const saveFavorites = useCallback((newFavorites: Recipe[]) => {
    try {
      setFavorites(newFavorites);
      if (typeof window !== 'undefined') {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
      }
    } catch (error) {
      console.error('Failed to save favorites to localStorage', error);
      toast({
        title: 'Error',
        description: 'Could not save your favorites.',
        variant: 'destructive',
      });
    }
  }, [toast]);

  const addFavorite = useCallback(
    (recipe: Recipe) => {
      const newFavorites = [...favorites, recipe];
      saveFavorites(newFavorites);
      toast({
        title: 'Added to Favorites!',
        description: `${recipe.title} has been saved.`,
      });
    },
    [favorites, saveFavorites, toast]
  );

  const removeFavorite = useCallback(
    (recipeId: string) => {
      const recipeToRemove = favorites.find((fav) => fav.id === recipeId);
      const newFavorites = favorites.filter((fav) => fav.id !== recipeId);
      saveFavorites(newFavorites);
      if (recipeToRemove) {
        toast({
          title: 'Removed from Favorites',
          description: `${recipeToRemove.title} has been removed.`,
        });
      }
    },
    [favorites, saveFavorites, toast]
  );

  const isFavorite = useCallback(
    (recipeId: string) => {
      return favorites.some((fav) => fav.id === recipeId);
    },
    [favorites]
  );

  return { favorites, addFavorite, removeFavorite, isFavorite };
}
