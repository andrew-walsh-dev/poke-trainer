import PokemonStats from "./pokemonStats";

class Pokemon {
    public name: string;
    public baseStats: PokemonStats;
    public stats: PokemonStats;
    public level: number;

    constructor(name: string, baseStats: PokemonStats, level: number) {
      this.name = name;
      this.baseStats = baseStats;
      this.level = level;
  
      // Set initial stats (ignoring IVs and EVs for simplicity)
      this.stats = {
        hp: this.calculateHP(),
        attack: this.calculateStat(this.baseStats.attack),
        defense: this.calculateStat(this.baseStats.defense),
        specialAttack: this.calculateStat(this.baseStats.specialAttack),
        specialDefense: this.calculateStat(this.baseStats.specialDefense),
        speed: this.calculateStat(this.baseStats.speed),
      };
    }
  
    calculateStat(baseStat: number) {
      return Math.floor((baseStat * 2 * this.level) / 100) + 5;
    }
  
    calculateHP() {
      return Math.floor((this.baseStats.hp * 2 * this.level) / 100) + this.level + 10;
    }
  }
  