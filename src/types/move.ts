import PokemonType from "./pokemonType";
import movesData from "../data/moves.json";

class Move {
  public name: string;
  public type: PokemonType;
  public power: number;
  public isPhysical: boolean;

  constructor(
    name: string,
    type: PokemonType,
    power: number,
    isPhysical: boolean
  ) {
    this.name = name;
    this.type = type;
    this.power = power;
    this.isPhysical = isPhysical;
  }

  static load_all(): Move[] {
    const moves = movesData.map((moveData) => {
      return new Move(
        moveData.name,
        PokemonType[moveData.type as keyof typeof PokemonType],
        moveData.power,
        moveData.isPhysical
      );
    });
    return moves;
  }
}

export default Move;
