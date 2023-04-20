import React, { Fragment } from "react";
import Battle from "@/components/Battle";
import Pokemon from "@/types/pokemon";

interface BattlePageProps {
  playerPokemon: Pokemon;
  playerBench: Pokemon[];
  enemyPokemon: Pokemon;
  enemyBench: Pokemon[];
}

const BattlePage: React.FC<BattlePageProps> = ({
  playerPokemon,
  playerBench,
  enemyPokemon,
  enemyBench,
}): JSX.Element => {
  return (
    <Fragment>
      <h1>Battle Page</h1>
      <Battle
        playerPokemon={playerPokemon}
        playerBench={playerBench}
        enemyPokemon={enemyPokemon}
        enemyBench={enemyBench}
      />
    </Fragment>
  );
};

export default BattlePage;
