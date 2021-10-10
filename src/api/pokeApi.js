const baseURL = "https://pokeapi.co/api/v2";
class PokeApi {
  constructor() {
    throw new Error("cannont be constructed");
  }
  static getPokemonByName(pokemonName) {
    //better to use URL constructor
    const url = baseURL + "/pokemon/" + pokemonName;
    console.log(url);
    return fetch(url, { mode: "cors" }).then((response) => {
      return response.json();
    });
  }
}
export { PokeApi };
