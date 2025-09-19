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
    id: 'butter-chicken',
    title: 'Butter Chicken',
    description: 'A rich and creamy classic Indian chicken curry, simmered in a buttery tomato sauce. A guaranteed crowd-pleaser.',
    ingredients: [
      '500g boneless chicken, cubed',
      '100g yogurt',
      '1 tbsp ginger-garlic paste',
      '1 tsp turmeric powder',
      '1 tsp red chili powder',
      '400g tomato puree',
      '100ml heavy cream',
      '50g butter',
      '1 tbsp garam masala',
      'Salt to taste'
    ],
    instructions: [
      'Marinate chicken in yogurt, ginger-garlic paste, turmeric, and chili powder for at least 30 minutes.',
      'In a pan, melt butter and cook the marinated chicken until golden brown.',
      'Add tomato puree and cook for 10 minutes until the sauce thickens.',
      'Stir in heavy cream and garam masala. Simmer for another 5 minutes.',
      'Serve hot with naan or rice.'
    ],
    imageId: 'recipe-1',
    imageHint: 'butter chicken',
  },
  {
    id: 'palak-paneer',
    title: 'Palak Paneer',
    description: 'A popular vegetarian dish where paneer (Indian cottage cheese) is cooked in a smooth, vibrant spinach gravy.',
    ingredients: [
      '250g paneer, cubed',
      '500g fresh spinach',
      '1 large onion, finely chopped',
      '2 tomatoes, pureed',
      '1 tbsp ginger-garlic paste',
      '1 tsp cumin seeds',
      '1 tsp garam masala',
      '50ml cream',
      '2 tbsp oil or ghee',
      'Salt to taste'
    ],
    instructions: [
      'Blanch the spinach in hot water, then blend to a smooth puree.',
      'Heat oil in a pan, add cumin seeds, then add the chopped onion and cook until golden.',
      'Add ginger-garlic paste and tomato puree. Cook until oil separates from the masala.',
      'Add the spinach puree, garam masala, and salt. Cook for 5-7 minutes.',
      'Add the paneer cubes and cream. Simmer for 2 minutes.',
      'Serve hot with roti or naan.'
    ],
    imageId: 'recipe-2',
    imageHint: 'palak paneer',
  },
  {
    id: 'masala-dosa',
    title: 'Masala Dosa',
    description: 'A famous South Indian crispy crepe made from fermented rice and lentil batter, filled with a savory spiced potato mixture.',
    ingredients: [
      '2 cups dosa rice',
      '1/2 cup urad dal (split black lentils)',
      '4 medium potatoes, boiled and mashed',
      '1 onion, finely chopped',
      '1 tsp mustard seeds',
      '1/2 tsp turmeric powder',
      '2 green chilies, chopped',
      'Oil for cooking',
      'Salt to taste'
    ],
    instructions: [
      'Soak rice and dal separately for 4-6 hours. Grind to a smooth batter and ferment overnight.',
      'For the filling, heat oil, add mustard seeds, then onions and green chilies. Sauté until onions are soft.',
      'Add turmeric powder and mashed potatoes. Mix well and cook for 2-3 minutes. This is the masala.',
      'Heat a flat non-stick pan (tava). Pour a ladleful of batter and spread it in a circular motion to make a thin crepe (dosa).',
      'Drizzle some oil. Once crispy and golden, place the potato masala in the center and fold the dosa.',
      'Serve immediately with chutney and sambar.'
    ],
    imageId: 'recipe-3',
    imageHint: 'masala dosa',
  },
  {
    id: 'dal-tadka',
    title: 'Dal Tadka',
    description: 'A comforting and flavorful lentil dish, tempered with aromatic spices in hot ghee or oil. A staple in Indian households.',
    ingredients: [
      '1 cup toor dal (split pigeon peas)',
      '1/2 tsp turmeric powder',
      'Salt to taste',
      'For tempering (Tadka):',
      '2 tbsp ghee (clarified butter)',
      '1 tsp cumin seeds',
      '2 dried red chilies',
      '1/4 tsp asafoetida (hing)',
      '1/2 tsp red chili powder'
    ],
    instructions: [
      'Pressure cook the toor dal with water, salt, and turmeric powder until soft and mushy.',
      'Whisk the cooked dal until smooth.',
      'For the tadka, heat ghee in a small pan. Add cumin seeds and dried red chilies. When they splutter, add asafoetida and red chili powder.',
      'Pour this tempering over the cooked dal.',
      'Mix well and serve hot with rice or roti.'
    ],
    imageId: 'recipe-4',
    imageHint: 'dal tadka',
  },
  {
    id: 'chicken-biryani',
    title: 'Chicken Biryani',
    description: 'An aromatic and flavorful layered rice dish made with chicken, basmati rice, and a blend of fragrant spices.',
    ingredients: [
      '500g chicken, cut into pieces',
      '2 cups basmati rice, soaked for 30 minutes',
      '2 onions, thinly sliced and fried until golden (birista)',
      '1 cup yogurt',
      '2 tbsp ginger-garlic paste',
      '1 tbsp biryani masala',
      'A pinch of saffron soaked in milk',
      'Mint and coriander leaves',
      'Ghee or oil'
    ],
    instructions: [
      'Marinate chicken with yogurt, ginger-garlic paste, biryani masala, and salt for 1 hour.',
      'Cook basmati rice until it is 70% done. Drain the water.',
      'In a heavy-bottomed pot, layer the marinated chicken at the bottom, followed by a layer of rice.',
      'Sprinkle fried onions, mint, and coriander leaves. Add another layer of rice.',
      'Drizzle saffron milk and ghee on top. Cover and cook on low heat (dum) for 20-25 minutes.',
      'Gently fluff the biryani and serve hot with raita.'
    ],
    imageId: 'recipe-5',
    imageHint: 'chicken biryani',
  },
];

export function findImage(imageId: string): ImagePlaceholder | undefined {
  return PlaceHolderImages.find((img) => img.id === imageId);
}
