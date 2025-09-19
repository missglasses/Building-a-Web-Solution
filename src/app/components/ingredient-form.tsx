'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Sparkles } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

const FormSchema = z.object({
  ingredients: z
    .string()
    .min(3, {
      message: 'Please enter at least one ingredient.',
    })
    .max(200, { message: 'Please keep your ingredients under 200 characters.' }),
});

type IngredientFormProps = {
  onGenerate: (ingredients: string) => void;
  loading: boolean;
};

export function IngredientForm({ onGenerate, loading }: IngredientFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      ingredients: '',
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    onGenerate(data.ingredients);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="ingredients"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Ingredients</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="e.g., chicken, tomatoes, garlic"
                  className="resize-none text-base bg-background"
                  rows={3}
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-center">
                Separate your ingredients with commas.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full bg-accent text-accent-foreground hover:bg-accent/90 text-lg py-6"
          disabled={loading}
        >
          <Sparkles className="mr-2 h-5 w-5" />
          {loading ? 'Generating...' : 'Generate Recipes'}
        </Button>
      </form>
    </Form>
  );
}
