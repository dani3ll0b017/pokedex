function SearchBar({ search, setSearch }) {
  return (
    <div className="search-container">
      <input
        className="search"
        type="text"
        placeholder="🔍 Buscar un Pokémon..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;