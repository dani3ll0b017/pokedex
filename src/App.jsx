import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import PokemonCard from "./components/PokemonCard";
import SearchBar from "./components/SearchBar";
import logo from "./assets/Pokemon logo.png";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    async function cargarPokemon() {
      try {
        const respuesta = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=50"
        );

        const datos = await Promise.all(
          respuesta.data.results.map((p) => axios.get(p.url))
        );

        setPokemon(datos.map((d) => d.data));
      } catch (error) {
        console.error(error);
      }
    }

    cargarPokemon();
  }, []);

  const filtrados = pokemon.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">

      <header className="hero">

        <img
  src={logo}
  alt="Pokemon"
  className="logo"
  onLoad={() => console.log("La imagen cargó correctamente")}
  onError={() => console.log("ERROR: la imagen no pudo cargarse")}
/>

       <h1 className="titulo">Pokédex</h1>

<p className="subtitulo">
  Explora los primeros 50 Pokémon
</p>
        <SearchBar
          search={search}
          setSearch={setSearch}
        />

      </header>

      <div className="contenedor">
        {filtrados.map((poke) => (
          <div
            key={poke.id}
            onClick={() => setSelected(poke)}
          >
            <PokemonCard pokemon={poke} />
          </div>
        ))}
      </div>

      {selected && (
        <div
          className="modal"
          onClick={() => setSelected(null)}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >

            <img
              src={
                selected.sprites.other["official-artwork"]
                  .front_default
              }
              alt={selected.name}
            />

            <h2>{selected.name.toUpperCase()}</h2>

            <h3>
              #{selected.id.toString().padStart(3, "0")}
            </h3>

            <p>
              <strong>Altura:</strong> {selected.height}
            </p>

            <p>
              <strong>Peso:</strong> {selected.weight}
            </p>

            <h3>Estadísticas</h3>

            {selected.stats.map((s) => (
              <div
                key={s.stat.name}
                className="stat"
              >
                <strong>{s.stat.name}</strong>

                <div className="barra">
                  <div
                    className="valor"
                    style={{
                      width: `${Math.min(
                        s.base_stat,
                        100
                      )}%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}

            <button
              onClick={() => setSelected(null)}
            >
              Cerrar
            </button>

          </div>
        </div>
      )}

      <footer className="footer">
        <p>Desarrollado por Daniel Lobo</p>
        <p>React • Vite • PokéAPI</p>
      </footer>

    </div>
  );
}

export default App;