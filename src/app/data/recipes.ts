import { PlaceHolderImages, ImagePlaceholder } from '@/lib/placeholder-images';

export type Recipe = {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  imageId: string;
  imageHint: string;
};

export const allRecipes: Recipe[] = [
  {
    id: 'tomato-basil-pasta',
    title: 'Tomato and Basil Pasta',
    description: 'A classic Italian dish that is simple, fresh, and bursting with flavor. Perfect for a quick weeknight dinner.',
    ingredients: [
      '200g pasta (spaghetti or penne)',
      '400g canned chopped tomatoes',
      '2 cloves garlic, minced',
      '1 handful of fresh basil leaves',
      '2 tbsp olive oil',
      'Salt and pepper to taste',
      'Parmesan cheese, for serving',
    ],
    instructions: [
      'Cook pasta according to package directions. Drain, reserving a small amount of pasta water.',
      'While pasta is cooking, heat olive oil in a large skillet over medium heat. Add garlic and cook until fragrant, about 1 minute.',
      'Pour in the chopped tomatoes, season with salt and pepper, and bring to a simmer. Cook for 10-15 minutes, until the sauce has thickened slightly.',
      'Stir in the fresh basil leaves.',
      'Add the cooked pasta to the skillet with the sauce. Toss to combine, adding a splash of reserved pasta water if needed to loosen the sauce.',
      'Serve immediately with a generous grating of Parmesan cheese.',
    ],
    imageId: 'recipe-1',
    imageHint: 'pasta tomato',
  },
  {
    id: 'chicken-rice-stir-fry',
    title: 'Chicken and Rice Stir-fry',
    description: 'A versatile and satisfying stir-fry loaded with tender chicken, fluffy rice, and your favorite vegetables.',
    ingredients: [
      '1 boneless, skinless chicken breast, cubed',
      '1 cup cooked rice',
      '1 tbsp soy sauce',
      '1 tsp sesame oil',
      '1 cup mixed vegetables (broccoli, carrots, peas)',
      '1 tbsp vegetable oil',
      '1 clove garlic, minced',
    ],
    instructions: [
      'Heat vegetable oil in a wok or large skillet over high heat.',
      'Add chicken and cook until golden brown and cooked through. Remove from skillet.',
      'Add garlic and mixed vegetables to the skillet. Stir-fry for 3-4 minutes until tender-crisp.',
      'Return the chicken to the skillet. Add the cooked rice, soy sauce, and sesame oil.',
      'Stir everything together until well combined and heated through.',
      'Serve hot.',
    ],
    imageId: 'recipe-2',
    imageHint: 'chicken stirfry',
  },
  {
    id: 'mushroom-omelette',
    title: 'Mushroom Omelette',
    description: 'A fluffy and savory omelette filled with sautéed mushrooms and cheese. A perfect, protein-packed start to your day.',
    ingredients: [
      '2 large eggs',
      '50g mushrooms, sliced',
      '2 tbsp shredded cheese (cheddar or Swiss)',
      '1 tbsp butter',
      '1 tbsp milk or water',
      'Salt and pepper to taste',
    ],
    instructions: [
      'In a small bowl, whisk together the eggs, milk, salt, and pepper.',
      'Melt butter in a non-stick skillet over medium heat. Add the mushrooms and cook until browned and tender.',
      'Pour the egg mixture over the mushrooms in the skillet.',
      'As the eggs begin to set, gently push the cooked portions from the edges toward the center, letting the uncooked egg flow underneath.',
      'When the eggs are almost set but still a little soft in the center, sprinkle the cheese over one half of the omelette.',
      'Fold the other half over the cheese and slide the omelette onto a plate. Serve immediately.',
    ],
    imageId: 'recipe-3',
    imageHint: 'omelette mushroom',
  },
  {
    id: 'spicy-lentil-soup',
    title: 'Spicy Lentil Soup',
    description: 'A hearty and nutritious soup with a spicy kick. This vegan lentil soup is warming, flavorful, and incredibly easy to make.',
    ingredients: [
      '1 cup red lentils, rinsed',
      '1 onion, chopped',
      '2 carrots, chopped',
      '2 celery stalks, chopped',
      '4 cups vegetable broth',
      '1 tsp cumin',
      '1/2 tsp chili powder (or to taste)',
      '1 tbsp olive oil',
    ],
    instructions: [
      'Heat olive oil in a large pot or Dutch oven over medium heat.',
      'Add the onion, carrots, and celery. Cook until softened, about 5-7 minutes.',
      'Stir in the cumin and chili powder and cook for another minute until fragrant.',
      'Add the rinsed lentils and vegetable broth to the pot.',
      'Bring the soup to a boil, then reduce the heat and let it simmer for 20-25 minutes, or until the lentils are tender.',
      'Use an immersion blender to partially blend the soup for a creamier texture, or serve as is. Season with salt and pepper to taste.',
    ],
    imageId: 'recipe-4',
    imageHint: 'lentil soup',
  },
  {
    id: 'garlic-butter-shrimp',
    title: 'Garlic Butter Shrimp',
    description: 'Juicy shrimp sautéed in a rich and aromatic garlic butter sauce. Ready in under 15 minutes and perfect with pasta or crusty bread.',
    ingredients: [
      '500g shrimp, peeled and deveined',
      '4 tbsp butter',
      '4 cloves garlic, minced',
      '1/4 cup chicken or vegetable broth',
      '1 tbsp lemon juice',
      'Fresh parsley, chopped',
      'Salt and pepper',
    ],
    instructions: [
      'Pat the shrimp dry and season with salt and pepper.',
      'Melt butter in a large skillet over medium-high heat.',
      'Add the garlic and cook for about 30 seconds until fragrant.',
      'Add the shrimp to the skillet in a single layer. Cook for 1-2 minutes per side, until pink and cooked through.',
      'Remove the shrimp from the skillet and set aside.',
      'Pour the broth and lemon juice into the skillet. Bring to a simmer and cook for 2 minutes, scraping up any browned bits from the bottom of the pan.',
      'Return the shrimp to the skillet, stir in the fresh parsley, and toss to coat in the sauce.',
    ],
    imageId: 'recipe-5',
    imageHint: 'shrimp garlic',
  },
];

export function findImage(imageId: string): ImagePlaceholder | undefined {
  return PlaceHolderImages.find((img) => img.id === imageId);
}
