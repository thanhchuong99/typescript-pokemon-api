import { Detail } from "../App";
import { Pokemon } from "../interface";
import PokemonList from "./PokemonList";
interface Props {
  pokemons: Pokemon[];
  viewDetail: Detail;
  setDetail: React.Dispatch<React.SetStateAction<Detail>>;
}
const PokemonColection: React.FC<Props> = ({
  pokemons,
  setDetail,
  viewDetail,
}) => {
  return (
    <>
      <section
        className={
          viewDetail.isOpen
            ? "collection-container-active"
            : "collection-container"
        }
      >
        {viewDetail.isOpen ? (
          <div className="overlay"></div>
        ) : (
          <div className=""></div>
        )}
        {pokemons.map((pokemon) => {
          return (
            <PokemonList
              key={pokemon.id}
              name={pokemon.name}
              id={pokemon.id}
              image={pokemon.sprites.front_default}
              abilities={pokemon.abilities}
              setDetail={setDetail}
              viewDetail={viewDetail}
            />
          );
        })}
      </section>
    </>
  );
};
export default PokemonColection;
