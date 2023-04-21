import React, { Fragment } from "react";
import Pokemon from "@/types/pokemon";
import PokemonCard from "./PokemonCard";

interface CardsProps {
    pokemons: Pokemon[];
    title?: string;
}

const PokemonCards: React.FC<CardsProps> = (props) => {
    return (
        <Fragment>
            <h2 className="my-5">{props.title || ""}</h2>
            <div className="flex flex-wrap text-black">
                {props.pokemons.map((pokemon) => <PokemonCard key={pokemon.name} pokemon={pokemon} />)}
            </div>
        </Fragment>
    );
}

export default PokemonCards;