// Summarize the recipe instructions
'use server';

/**
 * @fileOverview A recipe instruction summarization AI agent.
 *
 * - summarizeRecipeInstructions - A function that handles the recipe instruction summarization process.
 * - SummarizeRecipeInstructionsInput - The input type for the summarizeRecipeInstructions function.
 * - SummarizeRecipeInstructionsOutput - The return type for the summarizeRecipeInstructions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeRecipeInstructionsInputSchema = z.object({
  instructions: z
    .string()
    .describe('The original recipe instructions to be summarized.'),
});
export type SummarizeRecipeInstructionsInput = z.infer<
  typeof SummarizeRecipeInstructionsInputSchema
>;

const SummarizeRecipeInstructionsOutputSchema = z.object({
  summary: z
    .string()
    .describe('The summarized and concise recipe instructions.'),
});
export type SummarizeRecipeInstructionsOutput = z.infer<
  typeof SummarizeRecipeInstructionsOutputSchema
>;

export async function summarizeRecipeInstructions(
  input: SummarizeRecipeInstructionsInput
): Promise<SummarizeRecipeInstructionsOutput> {
  return summarizeRecipeInstructionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeRecipeInstructionsPrompt',
  input: {schema: SummarizeRecipeInstructionsInputSchema},
  output: {schema: SummarizeRecipeInstructionsOutputSchema},
  prompt: `You are an expert recipe summarizer. Your goal is to take a set of recipe instructions and summarize them into a concise and easy-to-follow format.

Original Instructions: {{{instructions}}}

Concise Summary:`,
});

const summarizeRecipeInstructionsFlow = ai.defineFlow(
  {
    name: 'summarizeRecipeInstructionsFlow',
    inputSchema: SummarizeRecipeInstructionsInputSchema,
    outputSchema: SummarizeRecipeInstructionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
