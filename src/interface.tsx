export interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  abilities?: {
    ability: string;
    name: string;
  }[];
}
