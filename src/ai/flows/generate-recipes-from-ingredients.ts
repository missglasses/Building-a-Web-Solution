'use server';
/**
 * @fileOverview Generates recipe suggestions based on the ingredients input by the user.
 *
 * - generateRecipesFromIngredients - A function that handles the recipe generation process.
 * - GenerateRecipesFromIngredientsInput - The input type for the generateRecipesFromIngredients function.
 * - GenerateRecipesFromIngredientsOutput - The return type for the generateRecipesFromIngredients function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateRecipesFromIngredientsInputSchema = z.object({
  ingredients: z
    .string()
    .describe('A comma-separated list of ingredients the user has on hand.'),
});
export type GenerateRecipesFromIngredientsInput =
  z.infer<typeof GenerateRecipesFromIngredientsInputSchema>;

const RecipeSchema = z.object({
  title: z.string().describe('The name of the recipe.'),
  ingredients: z.array(z.string()).describe('The ingredients for the recipe.'),
});

const GenerateRecipesFromIngredientsOutputSchema = z.object({
  recipes: z
    .array(RecipeSchema)
    .describe('An array of recipe suggestions based on the provided ingredients.'),
});
export type GenerateRecipesFromIngredientsOutput =
  z.infer<typeof GenerateRecipesFromIngredientsOutputSchema>;

export async function generateRecipesFromIngredients(
  input: GenerateRecipesFromIngredientsInput
): Promise<GenerateRecipesFromIngredientsOutput> {
  return generateRecipesFromIngredientsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateRecipesFromIngredientsPrompt',
  input: {schema: GenerateRecipesFromIngredientsInputSchema},
  output: {schema: GenerateRecipesFromIngredientsOutputSchema},
  prompt: `You are a recipe suggestion expert. Given a list of ingredients, you will suggest recipes that can be made with those ingredients.

Ingredients: {{{ingredients}}}

Suggest 3-5 recipes that can be made using the ingredients above. Respond in a JSON format. Each recipe should include the recipe title and a list of ingredients.`,
});

const generateRecipesFromIngredientsFlow = ai.defineFlow(
  {
    name: 'generateRecipesFromIngredientsFlow',
    inputSchema: GenerateRecipesFromIngredientsInputSchema,
    outputSchema: GenerateRecipesFromIngredientsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
