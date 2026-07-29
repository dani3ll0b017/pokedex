const colores = {
  grass: "#78C850",
  poison: "#A040A0",
  fire: "#F08030",
  water: "#6890F0",
  electric: "#F8D030",
  bug: "#A8B820",
  normal: "#A8A878",
  ground: "#E0C068",
  fairy: "#EE99AC",
  fighting: "#C03028",
  psychic: "#F85888",
  rock: "#B8A038",
  ghost: "#705898",
  ice: "#98D8D8",
  dragon: "#7038F8",
  dark: "#705848",
  steel: "#B8B8D0",
  flying: "#A890F0",
};

const nombres = {
  grass: "🌿 Planta",
  poison: "☠️ Veneno",
  fire: "🔥 Fuego",
  water: "💧 Agua",
  electric: "⚡ Eléctrico",
  bug: "🐛 Bicho",
  normal: "⚪ Normal",
  ground: "🟤 Tierra",
  fairy: "🧚 Hada",
  fighting: "🥊 Lucha",
  psychic: "🔮 Psíquico",
  rock: "🪨 Roca",
  ghost: "👻 Fantasma",
  ice: "❄️ Hielo",
  dragon: "🐉 Dragón",
  dark: "🌑 Siniestro",
  steel: "⚙️ Acero",
  flying: "🪽 Volador",
};

function PokemonCard({ pokemon }) {
  const color = colores[pokemon.types[0].type.name] || "#888";

  return (
    <div
      className="card"
      style={{
        background: `linear-gradient(to bottom, ${color}35, #ffffff)`,
        borderTop: `8px solid ${color}`,
      }}
    >
      <img
        src={pokemon.sprites.other["official-artwork"].front_default}
        alt={pokemon.name}
      />

      <h2>{pokemon.name.toUpperCase()}</h2>

      <h3>#{pokemon.id.toString().padStart(3, "0")}</h3>

      <div className="tipos">
        {pokemon.types.map((tipo) => (
          <span
            key={tipo.type.name}
            className="tipo"
            style={{
              backgroundColor: colores[tipo.type.name],
            }}
          >
            {nombres[tipo.type.name]}
          </span>
        ))}
      </div>

      <p>⚖️ Peso: {pokemon.weight}</p>

      <p>📏 Altura: {pokemon.height}</p>
    </div>
  );
}

export default PokemonCard;