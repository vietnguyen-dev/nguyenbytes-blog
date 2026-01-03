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

  return (
    <div className="form-control mb-6">
      <input
        type="text"
        placeholder="Search articles..."
        className="input input-bordered w-full"
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  );
};

export default Search;
