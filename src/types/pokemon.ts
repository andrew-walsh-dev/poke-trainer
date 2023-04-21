import PokemonStats from "./pokemonStats";
import PokemonType from "./pokemonType";
import Move from "./move";
import pokemonData from "@/data/pokemon.json";

class Pokemon {
  public name: string;
  public baseStats: PokemonStats;
  public stats: PokemonStats;
  public level: number;
  public exp: number;
  public type: PokemonType;
  public moves: Move[];

  constructor(
    name: string,
    baseStats: PokemonStats,
    level: number,
    type: PokemonType,
    moves: Move[]
  ) {
    this.name = name;
    this.baseStats = baseStats;
    this.level = level;
    this.exp = Pokemon.getExpForLevel(level);
    this.type = type;
    this.moves = moves;

    this.stats = {
      maxHP: this.calculateHP(),
      currentHP: this.calculateHP(),
      attack: this.calculateStat(this.baseStats.attack),
      defense: this.calculateStat(this.baseStats.defense),
      specialAttack: this.calculateStat(this.baseStats.specialAttack),
      specialDefense: this.calculateStat(this.baseStats.specialDefense),
      speed: this.calculateStat(this.baseStats.speed),
    };
  }

  static load_all(): Partial<Pokemon>[] {
    const partialPokemons = pokemonData.map((pokemonDatum) => {
      return {
        name: pokemonDatum.name,
        type: PokemonType[pokemonDatum.type as keyof typeof PokemonType],
        baseStats: pokemonDatum.baseStats,
      };
    });

    return partialPokemons;
  }

  static getExpForLevel(level: number): number {
    return Math.floor(
      (6 / 5) * Math.pow(level, 3) - 15 * Math.pow(level, 2) + 100 * level - 140
    );
  }

  calculateStat(baseStat: number): number {
    return Math.floor((baseStat * 2 * this.level) / 100) + 5;
  }

  calculateHP(): number {
    if (this.baseStats.hp) {
      return (
        Math.floor((this.baseStats.hp * 2 * this.level) / 100) + this.level + 10
      );
    }
    else throw new Error(`Base HP not set on Pokemon ${this.name}`);
  }

  takeDamage(amount: number): void {
    if (this.stats.currentHP) {
      this.stats.currentHP -= amount;
      if (this.stats.currentHP < 0) {
        this.stats.currentHP = 0;
      }
    } else throw new Error(`Current HP not set on Pokemon ${this.name}`);
  }

  heal(amount: number): void {
    if (this.stats.currentHP && this.stats.maxHP) {
      this.stats.currentHP += amount;
      if (this.stats.currentHP > this.stats.maxHP) {
        this.stats.currentHP = this.stats.maxHP;
      }
    }
    else throw new Error(`Current HP / Max HP not set on Pokemon ${this.name}`);
  }

  isFainted(): boolean {
    if (this.stats.currentHP) {
      return this.stats.currentHP <= 0;
    }
    else throw new Error(`Current HP not set on Pokemon ${this.name}`);
  }

  getRandomMove(): Move {
    const randomIndex = Math.floor(Math.random() * this.moves.length);
    return this.moves[randomIndex];
  }
}

export default Pokemon;
