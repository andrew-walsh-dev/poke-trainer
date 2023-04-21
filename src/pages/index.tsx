import { Inter } from 'next/font/google'
import Pokemon from '@/types/pokemon';
import { Fragment, useState } from 'react';
import CreatePokemonForm from '@/components/CreatePokemonForm';
import PokemonCards from '@/components/PokemonCards';
import Battle from '@/components/Battle';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [inBattle, setInBattle] = useState<boolean>(false);
  const [playerTeam, setPlayerTeam] = useState<Pokemon[]>([]);
  const [enemyTeam, setEnemyTeam] = useState<Pokemon[]>([]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {inBattle && <Battle playerPokemon={playerTeam[0]} playerBench={playerTeam.slice(1)} enemyPokemon={enemyTeam[0]} enemyBench={enemyTeam.slice(1)} />}
      { !inBattle &&
        <div>
          <button className="w-50 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none" onClick={() => setInBattle(true)}>Start Battle</button>
          <CreatePokemonForm playerTeam={playerTeam} enemyTeam={enemyTeam} setPlayerTeam={setPlayerTeam} setEnemyTeam={setEnemyTeam} />
          <PokemonCards pokemons={pokemons} title="All pokemons" />
          <PokemonCards pokemons={playerTeam} title="Player pokemons" />
          <PokemonCards pokemons={enemyTeam} title="Enemy pokemons" />
        </div>
      }
    </main>
  );
}
