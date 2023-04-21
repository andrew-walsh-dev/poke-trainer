import Image from 'next/image'
import { Inter } from 'next/font/google'
import Pokemon from '@/types/pokemon';
import { useState } from 'react';
import CreatePokemonForm from '@/components/CreatePokemonForm';
import PokemonCard from '@/components/PokemonCard';
import PokemonCards from '@/components/PokemonCards';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <CreatePokemonForm pokemons={pokemons} setPokemons={setPokemons} />
        <PokemonCards pokemons={pokemons} />
      </main>
  );
}
