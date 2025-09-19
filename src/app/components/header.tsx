import { UtensilsCrossed } from 'lucide-react';
import { FavoritesSheet } from './favorites-sheet';

export function AppHeader() {
  return (
    <header className="bg-primary shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <UtensilsCrossed className="h-7 w-7 text-primary-foreground" />
          <h1 className="text-2xl font-headline tracking-wider text-primary-foreground">
            ReciPea
          </h1>
        </div>
        <FavoritesSheet />
      </div>
    </header>
  );
}
