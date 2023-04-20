enum PokemonType {
    Normal = 'Normal',
    Grass = 'Grass',
    Fire = 'Fire',
    Water = 'Water',
}

export default PokemonType;

const TypeEffectivenessMatrix: Record<PokemonType, Record<PokemonType, number>> = {
  [PokemonType.Normal]: {
    [PokemonType.Normal]: 1,
    [PokemonType.Grass]: 1,
    [PokemonType.Fire]: 1,
    [PokemonType.Water]: 1,
  },
  [PokemonType.Grass]: {
    [PokemonType.Normal]: 1,
    [PokemonType.Grass]: 0.5,
    [PokemonType.Fire]: 0.5,
    [PokemonType.Water]: 2,
  },
  [PokemonType.Fire]: {
    [PokemonType.Normal]: 1,
    [PokemonType.Grass]: 2,
    [PokemonType.Fire]: 0.5,
    [PokemonType.Water]: 0.5,
  },
  [PokemonType.Water]: {
    [PokemonType.Normal]: 1,
    [PokemonType.Grass]: 0.5,
    [PokemonType.Fire]: 2,
    [PokemonType.Water]: 0.5,
  },
};

export { TypeEffectivenessMatrix };