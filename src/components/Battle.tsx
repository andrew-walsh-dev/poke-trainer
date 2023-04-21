import React, { Fragment, useState } from 'react';
import BattleEngine from '@/types/battle';
import Pokemon from '@/types/pokemon';
import PokemonCard from './PokemonCard';

interface BattleProps {
  playerPokemon: Pokemon;
  playerBench: Pokemon[];
  enemyPokemon: Pokemon;
  enemyBench: Pokemon[];
}

const Battle: React.FC<BattleProps> = (props) => {
  // Initialize the battle engine
  const [battleEngine] = useState(
    new BattleEngine(
      props.playerPokemon,
      props.enemyPokemon,
      props.playerBench,
      props.enemyBench
    )
  );

  // Set the initial battle state
  const [playerPokemon, setPlayerPokemon] = useState(props.playerPokemon);
  const [playerBench, setPlayerBench] = useState(props.playerBench);
  const [enemyPokemon, setEnemyPokemon] = useState(props.enemyPokemon);
  const [enemyBench, setEnemyBench] = useState(props.enemyBench);

  // Other state variables for managing UI (e.g. turn, selected move, etc.)
  const [turnCount, setTurnCount] = useState(1);
  const [turn, setTurn] = useState<"player" | "enemy">(battleEngine.getFirstMover())
  const [selectedMove, setSelectedMove] = useState(0);
  const [message, setMessage] = useState('');

  // Functions for handling user actions (e.g. move selection, switching Pokemon, etc.)
  const handleMoveSelect = (moveIndex: number) => {
    setSelectedMove(moveIndex);
  };

  const handleSwitchPokemon = (newPokemon: Pokemon) => {
    battleEngine.switchPokemon(playerPokemon, newPokemon, 'player');
    setPlayerPokemon(newPokemon);
    setPlayerBench(playerBench.filter((pokemon) => pokemon !== newPokemon));
  };

  const switchTurn = () => {
    if (turn === "player") {
      setTurn("enemy");
    } else setTurn("player");
  }

  const handleTurn = () => {
    // Execute the selected move and update the UI
    if (turn === "player") {
      battleEngine.executeMove(playerPokemon, playerPokemon.moves[selectedMove], enemyPokemon);
      setEnemyPokemon(enemyPokemon);
    } else {
      battleEngine.executeMove(enemyPokemon, enemyPokemon.getRandomMove(), playerPokemon);
      setPlayerPokemon(playerPokemon);
    }

    // Check if the battle has ended and handle the end of turn
    if (battleEngine.checkBattleEnd()) {
      setMessage('Battle has ended.');
    } else {
      setTurnCount(turnCount + 1);
    }
    switchTurn();
  };

  // Render the battle UI
  return (
    <Fragment>
      <h1>{playerPokemon.name} VS {enemyPokemon.name}</h1>
      <div className="flex justify-center gap-12">
        {/* Display player and enemy Pokemon information */}
        <div className="player-pokemon">
          {/* Render player Pokemon information */}
          <PokemonCard pokemon={playerPokemon} title="Player" />
        </div>
        <div className="enemy-pokemon">
          {/* Render enemy Pokemon information */}
          <PokemonCard pokemon={enemyPokemon} title="Enemy" />
        </div>
      </div>

      {/* Display move selection */}
      <div className="move-selection flex justify-center gap-2 mt-8">
        {playerPokemon.moves.map((move, index) => (
          <button
            key={index}
            onClick={() => handleMoveSelect(index)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {move.name}
          </button>
        ))}
      </div>

      {/* Display option to switch Pokemon */}
      <div className="switch-pokemon flex justify-center gap-2 mt-4">
        {playerBench.map((benchPokemon) => (
          <button
            key={benchPokemon.name}
            onClick={() => handleSwitchPokemon(benchPokemon)}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            {benchPokemon.name}
          </button>
        ))}
      </div>

      {/* Display turn and battle message */}
      <div className="battle-info text-center mt-8">
        <p className="font-bold">Turn: {turn}</p>
        <p className="font-bold">TurnCount: {turnCount}</p>
        <p>{message}</p>
      </div>

      {/* Button to execute turn */}
      <div className="text-center mt-8">
        <button
          onClick={handleTurn}
          className="bg-red-500 text-white px-8 py-2 rounded"
        >
          Execute Turn
        </button>
      </div>
    </Fragment>
  );
};

export default Battle;
