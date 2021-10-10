import { useState } from "react";

function Favorite() {
  const [favs] = useState(function () {
    const value = localStorage.getItem("pokemon");
    if (value) {
      return JSON.parse(value);
    }
    return [];
  });
  return favs.length ? (
    <div>
      <h3>Your Favorite Pokemons</h3>
      {favs.map((fav) => {
        return <p>{fav}</p>;
      })}
    </div>
  ) : null;
}
export { Favorite };
