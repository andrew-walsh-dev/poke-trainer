import Image from 'next/image'
import { Inter } from 'next/font/google'
import Pokemon from '@/types/pokemon';
import { useState } from 'react';
import CreatePokemonForm from '@/components/CreatePokemonForm';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  
  return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <CreatePokemonForm setPokemons={setPokemons} />
      </main>
  );
}
