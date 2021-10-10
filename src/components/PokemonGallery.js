import { pokemons } from "../pokemonList";
// import sampleSize from "lodash/sampleSize";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Button } from "@mui/material";
import { useState } from "react";

function GalleryItem(props) {
  const { children, pokemonName } = props;
  const [isInLocalStorage, setIsInLocalStorage] = useState(function () {
    const val = localStorage.getItem("pokemon");
    if (!val) {
      return false;
    }
    const array = JSON.parse(val);
    const set = new Set(array);
    return set.has(pokemonName);
  });
  return (
    <div
      style={{
        border: "1px solid lightblue",
        boxShadow: "1px 0px 10px 1px lightblue",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {children}
      <img
        src="https://static.wikia.nocookie.net/pokemon-fano/images/6/6f/Poke_Ball.png"
        width={75}
        height={75}
        style={{ margin: "5px" }}
        alt="poke-ball"
      />
      <Button
        variant="contained"
        color={isInLocalStorage ? "error" : "primary"}
        onClick={function () {
          if (!isInLocalStorage) {
            setIsInLocalStorage(!isInLocalStorage);
            const key = "pokemon";
            const val = localStorage.getItem(key);
            if (val) {
              const arr = JSON.parse(val);
              arr.push(pokemonName);
              const stringifiedArray = JSON.stringify(arr);
              localStorage.setItem(key, stringifiedArray);
            } else {
              const stringifiedArray = JSON.stringify([pokemonName]);
              localStorage.setItem(key, stringifiedArray);
            }
          }
        }}
      >
        <FavoriteIcon />
      </Button>
    </div>
  );
}

function PokemonGallery() {
  // const randomPokemons = sampleSize(pokemons, 9);
  const randomPokemons = pokemons.slice(0, 9);
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3,1fr)",
        gridTemplateRows: "repeat(3,1fr)",
        height: "400px",
        gridGap: "10px",
      }}
    >
      {randomPokemons.map((pokemon, i) => {
        const { name } = pokemon;
        return (
          <GalleryItem key={i} pokemonName={name}>
            <Link to={"/pokemon/" + name}>{name.toUpperCase()}</Link>
          </GalleryItem>
        );
      })}
    </div>
  );
}
export { PokemonGallery };
