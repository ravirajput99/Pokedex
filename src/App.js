import "./App.css";
import Container from "@mui/material/Container";
import { HomePage } from "./pages/HomePage";
import { Route, Switch, useParams } from "react-router-dom";
import { PokeApi } from "./api/pokeApi";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Header } from "./components/Header";

function getPokemonImageFromData(data) {
  const {
    sprites: { other },
  } = data;
  const officialArtWork = other["official-artwork"];
  const defaultImage =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQM9xm7mMLuvlFKRXJPRBoY5hZfJRBzqohjwg&usqp=CAU";
  return officialArtWork["front_default"];
}

function Pokemon(props) {
  const { data } = props;
  if (!data) {
    return null;
  }
  return (
    <div style={{ width: "100%", backgroundColor: "lightblue" }}>
      {data.name}
      {data.height}
      <img
        src={getPokemonImageFromData(data)}
        width={300}
        height={300}
        alt="pokemon-img"
      />
    </div>
  );
}

function PokemonPage() {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState(null);
  const [isError, setIsError] = useState(false);
  useEffect(function () {
    PokeApi.getPokemonByName(params.name)
      .then((data) => {
        setLoading(false);
        setPokemonData(data);
      })
      .catch(() => {
        setLoading(false);
        setIsError(true);
      });

    if (isError) {
      return (
        <div
          style={{
            display: "flex",
            height: "100vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1>There is some error at your end</h1>
        </div>
      );
    }
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress color="success" />
      </div>
    );
  }

  return (
    <>
      <h1>more data about {params.name}</h1>;
      <Pokemon data={pokemonData} />
    </>
  );
}

function App() {
  return (
    <>
      <Container maxWidth="sm">
        <Header />
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/pokemon/:name">
            <PokemonPage />
          </Route>
        </Switch>
      </Container>
    </>
  );
}

export default App;
