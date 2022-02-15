import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";
import PokemonColection from "./components/PokemonColection";
import { Pokemon } from "./interface";

interface Pokemons {
  name: string;
  url: string;
}
export interface Detail {
  id: number;
  isOpen: boolean;
}
function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [nextUrl, setNextUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [viewDetail, setDetail] = useState<Detail>({
    id: 0,
    isOpen: false,
  });

  const setPokemonData = (res: AxiosResponse<any, any>) => {
    Promise.all(
      res.data.results.map(async (result: Pokemons) => {
        return await axios.get(result.url);
      }),
    ).then((datas) => {
      const pokemon: Pokemon[] = datas.map(({ data }: { data: Pokemon }) => {
        return {
          id: data.id,
          name: data.name,
          sprites: {
            front_default: data.sprites.front_default,
          },
          abilities: data.abilities,
        };
      });

      setNextUrl(res.data.next);
      setPokemons((pokemons) => {
        return [...pokemons, ...pokemon];
      });
      setLoading(false);
    });
  };

  useEffect(() => {
    const getPokemons = async () => {
      const res = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0",
      );
      setPokemonData(res);
    };

    getPokemons();
  }, []);
  const handleNextPage = async () => {
    setLoading(true);
    const resNextPage = await axios.get(nextUrl);
    setPokemonData(resNextPage);
  };
  return (
    <div className="App">
      <div className="container">
        <header className="pokemon-header"> Pokemon</header>
        <PokemonColection
          pokemons={pokemons}
          viewDetail={viewDetail}
          setDetail={setDetail}
        />
        {viewDetail.isOpen ? (
          ""
        ) : (
          <div className="btn">
            <button onClick={handleNextPage} disabled={loading}>
              {loading ? "Loading..." : "Load more"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
