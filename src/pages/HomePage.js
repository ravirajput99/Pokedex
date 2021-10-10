import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Button } from "@mui/material";
import { pokemons } from "../pokemonList";
import { PokemonGallery } from "../components/PokemonGallery";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Favorite } from "../components/Favorite";

function HomePage() {
  const [select, setSelect] = useState(null);
  return (
    <>
      <div style={{ marginTop: "20px", display: "flex" }}>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={pokemons}
          getOptionLabel={(option) => {
            const { name } = option;
            return name[0].toUpperCase() + name.substring(1);
          }}
          sx={{ width: 300, flexGrow: "1", marginRight: "20px" }}
          renderInput={(params) => <TextField {...params} label="Pokemons" />}
          onChange={(event, selection) => {
            setSelect(selection);
          }}
        />
        <Link
          to={select ? "/pokemon/" + select.name : "/"}
          component={(props) => {
            return (
              <Button variant="contained" color="primary" {...props}>
                Go to Pokemon
              </Button>
            );
          }}
        ></Link>
      </div>
      <h1>Pokemon Gallery</h1>
      <Favorite />
      <PokemonGallery />
    </>
  );
}
export { HomePage };
