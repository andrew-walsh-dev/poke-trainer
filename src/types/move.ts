import PokemonType from "./pokemonType";

class Move {
    public name: string;
    public type: PokemonType;
    public power: number;
    public isPhysical: boolean;

    constructor(name: string, type: PokemonType, power: number, isPhysical: boolean) {
        this.name = name;
        this.type = type;
        this.power = power;
        this.isPhysical = isPhysical;
    }
}

export default Move;