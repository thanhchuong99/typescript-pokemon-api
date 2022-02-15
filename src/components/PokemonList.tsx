import { useEffect, useState } from "react";
import { Detail } from "../App";

interface Props {
  name: string;
  id: number;
  image: string;
  abilities: { ability: string; name: string }[] | undefined;
  viewDetail: Detail;
  setDetail: React.Dispatch<React.SetStateAction<Detail>>;
}
const PokemonList: React.FC<Props> = ({
  name,
  id,
  image,
  abilities,
  setDetail,
  viewDetail,
}) => {
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    setSelected(id === viewDetail.id);
  }, [id, viewDetail]);
  const handleViewDetail = () => {
    setDetail({ id, isOpen: true });
  };
  const handleCloseDetail = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    setDetail({ id: 0, isOpen: false });
  };
  return (
    <div onClick={handleViewDetail}>
      {selected ? (
        <section className="pokemon-list-detailed">
          <div className="detail-container">
            <p className="detail-close" onClick={handleCloseDetail}>
              X
            </p>
            <div className="detail-info">
              <img src={image} alt="pokemon" className="detail-img" />
              <p className="detail-name"> {name}</p>
            </div>
            <div className="detail-skill">
              <p className="detail-ability"> Ablities: </p>
              {abilities?.map((ab: any, index) => {
                return (
                  <div key={index} className="">
                    {ab.ability.name}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      ) : (
        <section className="pokemon-list-container">
          <p className="pokemon-name"> {name} </p>
          <img src={image} alt="pokemon" />
        </section>
      )}
    </div>
  );
};
export default PokemonList;
