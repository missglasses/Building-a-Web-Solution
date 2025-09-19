'use client';

import { useState } from 'react';
import { AppHeader } from '@/app/components/header';
import { IngredientForm } from '@/app/components/ingredient-form';
import { handleGenerateRecipesAction } from '@/app/actions';
import { RecipeCard } from '@/app/components/recipe-card';
import { RecipeDetails } from '@/app/components/recipe-details';
import { allRecipes, Recipe } from '@/app/data/recipes';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { UtensilsCrossed } from 'lucide-react';
import type { GenerateRecipesFromIngredientsOutput } from '@/ai/flows/generate-recipes-from-ingredients';

type GeneratedRecipe = GenerateRecipesFromIngredientsOutput['recipes'][number];

export default function Home() {
  const [generatedRecipes, setGeneratedRecipes] = useState<GeneratedRecipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (ingredients: string) => {
    setLoading(true);
    setError(null);
    setSelectedRecipe(null);
    setGeneratedRecipes([]);

    const result = await handleGenerateRecipesAction(ingredients);

    if (result.success && result.recipes) {
      setGeneratedRecipes(result.recipes);
    } else {
      setError(result.error ?? 'An unknown error occurred.');
    }
    setLoading(false);
  };

  const handleSelectRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleBack = () => {
    setSelectedRecipe(null);
  };

  const getDisplayRecipes = () => {
    if (generatedRecipes.length === 0) return [];

    const matchedRecipes = generatedRecipes
      .map(genRecipe => {
        const existingRecipe = allRecipes.find(r => r.title.toLowerCase() === genRecipe.title.toLowerCase());
        if (existingRecipe) {
          return existingRecipe;
        }
        return {
          id: genRecipe.title.replace(/\s+/g, '-').toLowerCase(),
          title: genRecipe.title,
          description: 'A new recipe suggestion from our AI chef!',
          ingredients: genRecipe.ingredients,
          instructions: ['Ask our AI chef for detailed instructions!'],
          imageId: 'recipe-fallback',
          imageHint: 'food meal',
        } as Recipe;
      });

    return matchedRecipes;
  };

  const displayRecipes = getDisplayRecipes();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AppHeader />
      <main className="flex-1 container mx-auto py-8 px-4">
        {selectedRecipe ? (
          <RecipeDetails recipe={selectedRecipe} onBack={handleBack} />
        ) : (
          <div className="max-w-3xl mx-auto">
            <Card className="mb-8 shadow-lg border-2 border-primary/20">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <h1 className="font-headline text-4xl md:text-5xl text-primary-foreground tracking-wide">
                    What's in your kitchen?
                  </h1>
                  <p className="text-muted-foreground mt-2 text-lg">
                    Let our AI chef inspire your next meal.
                  </p>
                </div>
                <IngredientForm onGenerate={handleGenerate} loading={loading} />
              </CardContent>
            </Card>

            {loading && (
              <div className="flex justify-center items-center mt-8">
                <UtensilsCrossed className="h-8 w-8 animate-spin text-primary" />
                <p className="ml-4 text-lg">Our chef is thinking...</p>
              </div>
            )}
            {error && (
              <p className="text-center text-destructive mt-4 font-semibold">{error}</p>
            )}

            {!loading && generatedRecipes.length > 0 && (
              <div>
                <h2 className="font-headline text-3xl text-center my-8">Recipe Ideas</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayRecipes.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} onSelect={() => handleSelectRecipe(recipe)} />
                  ))}
                </div>
              </div>
            )}

            {!loading && generatedRecipes.length === 0 && (
              <Card className="mt-8 border-dashed">
                <CardContent className="p-10 text-center">
                  <Image
                    src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=600&h=400&auto=format&fit=crop"
                    alt="A vibrant bowl of salad with fresh vegetables."
                    width={600}
                    height={400}
                    className="w-full h-auto max-w-sm mx-auto rounded-lg shadow-md mb-6"
                    data-ai-hint="vegetables kitchen"
                  />
                  <h3 className="font-headline text-2xl">Welcome to ReciPea!</h3>
                  <p className="text-muted-foreground mt-2">
                    Enter some ingredients you have on hand, like "chicken, rice, broccoli", and see what culinary magic awaits.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </main>
      <footer className="text-center p-4 text-muted-foreground text-sm">
        <p>Crafted with &hearts; by ReciPea</p>
      </footer>
    </div>
  );
}
