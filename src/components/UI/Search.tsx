import { useState } from "react";

interface iSearchProps {
  onSearch?: (searchTerm: string) => void;
}

const Search: React.FC<iSearchProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleClear = () => {
    setSearchTerm("");
    if (onSearch) {
      onSearch("");
    }
  };

  return (
    <div className="form-control mb-6 lg:w-1/2 lg:mx-auto">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search articles..."
          className="input input-bordered w-full"
          value={searchTerm}
          onChange={handleSearch}
        />
        <button
          className="btn btn-outline"
          onClick={handleClear}
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default Search;
