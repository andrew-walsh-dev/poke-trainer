import Pokemon from "./pokemon";

class Battle {
  public playerPokemon: Pokemon;
  public enemyPokemon: Pokemon;
  public playerBench: Pokemon[];
  public enemyBench: Pokemon[];

  constructor(playerPokemon: Pokemon, enemyPokemon: Pokemon, playerBench: Pokemon[], enemyBench: Pokemon[]) {
    this.playerPokemon = playerPokemon;
    this.enemyPokemon = enemyPokemon;
    this.playerBench = playerBench;
    this.enemyBench = enemyBench;
  }

  initiateBattle(pokemon1: Pokemon, pokemon2: Pokemon): void {}

  calculateMoveOrder(pokemon1: Pokemon, pokemon2: Pokemon): [Pokemon, Pokemon] {
    if (pokemon1.stats.speed > pokemon2.stats.speed) {
      return [pokemon1, pokemon2];
    } else return [pokemon2, pokemon1];
  }

  executeMove(pokemon: Pokemon, move: Move, target: Pokemon): void {}

  calculateDamage(pokemon: Pokemon, move: Move, target: Pokemon): number {}

  handleFainting(pokemon: Pokemon): void {}

  checkBattleEnd(): boolean {
    return this.playerPokemon.isFainted() || this.enemyPokemon.isFainted();
  }

  handleEndOfTurn(): void {}

  switchPokemon(currentPokemon: Pokemon, newPokemon: Pokemon, team: string): void {
    if (team === "player") {
        this.playerBench.push(currentPokemon);
        this.playerPokemon = newPokemon;
        this.playerBench.filter((pokemon) => pokemon != newPokemon);
    } else {
        this.enemyBench.push(currentPokemon);
        this.enemyPokemon = newPokemon;
        this.enemyBench.filter((pokemon) => pokemon != newPokemon);
    }
  }
}
