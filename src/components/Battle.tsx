import React, { Fragment, useState } from 'react';
import BattleEngine from '@/types/battle';
import Pokemon from '@/types/pokemon';

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
  const [turn, setTurn] = useState(1);
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

  const handleTurn = () => {
    // Execute the selected move and update the UI
    battleEngine.executeMove(playerPokemon, playerPokemon.moves[selectedMove], enemyPokemon);
    setEnemyPokemon(enemyPokemon);

    // Check if the battle has ended and handle the end of turn
    if (battleEngine.checkBattleEnd()) {
      setMessage('Battle has ended.');
    } else {
      setTurn(turn + 1);
    }
  };

  // Render the battle UI
  return (
    <Fragment>
      {/* Display player and enemy Pokemon information */}
      <div className="player-pokemon">
        {/* Render player Pokemon information */}
      </div>
      <div className="enemy-pokemon">
        {/* Render enemy Pokemon information */}
      </div>

      {/* Display move selection */}
      <div className="move-selection">
        {playerPokemon.moves.map((move, index) => (
          <button key={index} onClick={() => handleMoveSelect(index)}>
            {move.name}
          </button>
        ))}
      </div>

      {/* Display option to switch Pokemon */}
      <div className="switch-pokemon">
        {playerBench.map((benchPokemon) => (
          <button
            key={benchPokemon.name}
            onClick={() => handleSwitchPokemon(benchPokemon)}
          >
            {benchPokemon.name}
          </button>
        ))}
      </div>

      {/* Display turn and battle message */}
      <div className="battle-info">
        <p>Turn: {turn}</p>
        <p>{message}</p>
      </div>

      {/* Button to execute turn */}
      <button onClick={handleTurn}>Execute Turn</button>
    </Fragment>
  );
};

export default Battle;
