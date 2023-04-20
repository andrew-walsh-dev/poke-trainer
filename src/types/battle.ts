import Move from "./move";
import Pokemon from "./pokemon";
import PokemonType, { TypeEffectivenessMatrix } from "./pokemonType";

class Battle {
  public playerPokemon: Pokemon;
  public enemyPokemon: Pokemon;
  public playerBench: Pokemon[];
  public enemyBench: Pokemon[];
  public turn: "player" | "enemy";

  constructor(
    playerPokemon: Pokemon,
    enemyPokemon: Pokemon,
    playerBench: Pokemon[],
    enemyBench: Pokemon[]
  ) {
    this.playerPokemon = playerPokemon;
    this.enemyPokemon = enemyPokemon;
    this.playerBench = playerBench;
    this.enemyBench = enemyBench;
    this.turn = this.get_first_mover();
  }

  initiateBattle(pokemon1: Pokemon, pokemon2: Pokemon): void {}

  get_first_mover(): "player" | "enemy" {
    if (this.playerPokemon.stats.speed >= this.enemyPokemon.stats.speed) {
      return "player";
    } else return "enemy";
  }

  executeMove(pokemon: Pokemon, move: Move, target: Pokemon): void {
    const damage = this.calculateDamage(pokemon, move, target);
    target.takeDamage(damage);
    this.switchTurn();
  }

  switchTurn(): void {
    if (this.turn === "player") {
      this.turn = "enemy";
    } else this.turn = "player";
  }

  calculateDamage(pokemon: Pokemon, move: Move, target: Pokemon): number {
    // Get the attacker's effective Attack or Special Attack stat
    const attackStat = move.isPhysical
      ? pokemon.stats.attack
      : pokemon.stats.specialAttack;

    // Get the target's effective Defense or Special Defense stat
    const defenseStat = move.isPhysical
      ? target.stats.defense
      : target.stats.specialDefense;

    // Calculate the level factor (using the attacker's level)
    const levelFactor = Math.floor((2 * pokemon.level) / 5 + 2);

    // Calculate the base damage
    const baseDamage =
      Math.floor((levelFactor * move.power * (attackStat / defenseStat)) / 50) +
      2;

    // Calculate the type effectiveness multiplier
    const typeMultiplier = this.getTypeEffectivenessMultiplier(
      move.type,
      target.type
    );

    // Calculate the final damage
    const finalDamage = Math.floor(baseDamage * typeMultiplier);

    return finalDamage;
  }

  getTypeEffectivenessMultiplier(
    moveType: PokemonType,
    targetType: PokemonType
  ): number {
    return TypeEffectivenessMatrix[moveType][targetType];
  }

  handleFainting(pokemon: Pokemon): void {}

  checkBattleEnd(): boolean {
    return this.playerPokemon.isFainted() || this.enemyPokemon.isFainted();
  }

  handleEndOfTurn(): void {}

  switchPokemon(
    currentPokemon: Pokemon,
    newPokemon: Pokemon,
    team: string
  ): void {
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

export default Battle;
