function Header() {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "center",
        backgroundColor: "lightgrey",
      }}
    >
      <img
        src="https://static.wikia.nocookie.net/pokemon-fano/images/6/6f/Poke_Ball.png"
        width={75}
        height={75}
        style={{ margin: "5px" }}
        alt="poke-ball"
      />
      <h1>My Pokedex</h1>
    </header>
  );
}

export { Header };
