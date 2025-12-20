import { Search, X } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const SearchBar = ({ value, onChange, onClear, isSearching }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="relative max-w-2xl mx-auto"
    >
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-neutral z-10" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search reviews by food (e.g., Biryani, Burger, Pizza...)"
        className="input input-bordered h-12 w-full px-12 rounded-full focus:outline-primary/70 focus:outline-2 shadow-lg font-inter"
      />
      {value && (
        <button
          onClick={onClear}
          className="absolute right-4 top-1/2 -translate-y-1/2 btn btn-ghost btn-sm btn-circle z-10"
        >
          <X className="w-4 h-4" />
        </button>
      )}
      {isSearching && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute right-14 top-1/2 -translate-y-1/2"
        >
          <span className="loading loading-spinner loading-sm text-primary"></span>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SearchBar;
