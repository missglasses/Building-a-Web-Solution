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

export default function Home() {
  const [generatedRecipeTitles, setGeneratedRecipeTitles] = useState<string[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (ingredients: string) => {
    setLoading(true);
    setError(null);
    setSelectedRecipe(null);
    setGeneratedRecipeTitles([]);

    const result = await handleGenerateRecipesAction(ingredients);

    if (result.success && result.recipes) {
      setGeneratedRecipeTitles(result.recipes);
    } else {
      setError(result.error ?? 'An unknown error occurred.');
    }
    setLoading(false);
  };

  const handleSelectRecipe = (title: string) => {
    const recipeData = allRecipes.find((r) => r.title.toLowerCase() === title.toLowerCase());
    if (recipeData) {
      setSelectedRecipe(recipeData);
    } else {
      // Fallback for recipes that might be generated but not in our mock data
      const fallbackRecipe: Recipe = {
        id: title.replace(/\s+/g, '-').toLowerCase(),
        title: title,
        description: 'A delicious dish to try.',
        ingredients: ['Your ingredients', 'Love'],
        instructions: ['Combine your ingredients.', 'Cook with love.', 'Enjoy!'],
        imageId: 'recipe-fallback',
        imageHint: 'food meal',
      };
      setSelectedRecipe(fallbackRecipe);
    }
  };

  const handleBack = () => {
    setSelectedRecipe(null);
  };

  const getFilteredRecipes = () => {
    return allRecipes.filter((recipe) =>
      generatedRecipeTitles.some((title) => title.toLowerCase() === recipe.title.toLowerCase())
    );
  };

  const filteredRecipes = getFilteredRecipes();

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

            {!loading && generatedRecipeTitles.length > 0 && (
              <div>
                <h2 className="font-headline text-3xl text-center my-8">Recipe Ideas</h2>
                {filteredRecipes.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredRecipes.map((recipe) => (
                      <RecipeCard key={recipe.id} recipe={recipe} onSelect={() => handleSelectRecipe(recipe.title)} />
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="p-6 text-center">
                      <p>Our AI came up with some creative ideas, but we don't have matching cards for them yet!</p>
                      <ul className="mt-4 space-y-2">
                        {generatedRecipeTitles.map(title => (
                           <li key={title} className="font-semibold">{title}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {!loading && generatedRecipeTitles.length === 0 && (
              <Card className="mt-8 border-dashed">
                <CardContent className="p-10 text-center">
                  <Image
                    src="https://picsum.photos/seed/welcome/600/400"
                    alt="Assortment of fresh vegetables"
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
