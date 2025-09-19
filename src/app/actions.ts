'use server';

import {
  generateRecipesFromIngredients,
  GenerateRecipesFromIngredientsInput,
} from '@/ai/flows/generate-recipes-from-ingredients';

export async function handleGenerateRecipesAction(ingredients: string): Promise<{
  success: boolean;
  recipes?: string[];
  error?: string;
}> {
  if (!ingredients || ingredients.trim().length < 3) {
    return { success: false, error: 'Please enter at least one ingredient.' };
  }

  try {
    const input: GenerateRecipesFromIngredientsInput = { ingredients };
    const result = await generateRecipesFromIngredients(input);

    if (result && result.recipes && result.recipes.length > 0) {
      return { success: true, recipes: result.recipes };
    } else {
      return {
        success: false,
        error: "Our AI chef couldn't think of any recipes. Try different ingredients!",
      };
    }
  } catch (error) {
    console.error('Error generating recipes:', error);
    return {
      success: false,
      error: 'The kitchen is a bit busy right now. Please try again in a moment.',
    };
  }
}
