import PokemonStats from "./pokemonStats";
import PokemonType from "./pokemonType";
import Move from "./move";

class Pokemon {
  public name: string;
  public baseStats: PokemonStats;
  public stats: PokemonStats;
  public level: number;
  public type: PokemonType;
  public moves: Move[];

  constructor(name: string, baseStats: PokemonStats, level: number, type: PokemonType, moves: Move[]) {
    this.name = name;
    this.baseStats = baseStats;
    this.level = level;
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

  calculateStat(baseStat: number): number {
    return Math.floor((baseStat * 2 * this.level) / 100) + 5;
  }

  calculateHP(): number {
    if (this.baseStats.hp) {
        return (
            Math.floor((this.baseStats.hp * 2 * this.level) / 100) + this.level + 10
          );
    }
    throw new Error(`Base HP not set on Pokemon ${this.name}`);
  }

  takeDamage(amount: number): void {
    if (this.stats.currentHP) {
        this.stats.currentHP += amount;
        if (this.stats.currentHP < 0) {
            this.stats.currentHP = 0;
        }
    }
    throw new Error(`Current HP not set on Pokemon ${this.name}`);
  }

  heal(amount: number): void {
    if (this.stats.currentHP && this.stats.maxHP) {
        this.stats.currentHP += amount;
        if (this.stats.currentHP > this.stats.maxHP) {
            this.stats.currentHP = this.stats.maxHP;
        }
    }
    throw new Error(`Current HP / Max HP not set on Pokemon ${this.name}`)
  }

  isFainted(): boolean {
    if (this.stats.currentHP) {
        return this.stats.currentHP <= 0;
    }
    throw new Error(`Current HP not set on Pokemon ${this.name}`)
  }
}

export default Pokemon;