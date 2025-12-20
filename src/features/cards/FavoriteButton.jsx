import { Heart } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const FavoriteButton = ({
  isFavorited,
  onToggle,
  isLoggedIn,
  setSignInModal,
  foodName,
}) => {
  const handleClick = () => {
    if (!isLoggedIn) {
      setSignInModal({ isOpen: true, foodName: foodName });
      return;
    }
    onToggle();
  };

  return (
    <motion.button
      whileTap={{ scale: 0.85 }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
      onClick={handleClick}
      className={`btn btn-circle btn-sm ${
        isFavorited
          ? "bg-primary border-0 text-white"
          : "bg-base-content-300 border-2 border-base-content-300 hover:border-primary hover:bg-primary hover:text-white"
      } shadow-lg transition-all duration-300`}
    >
      <Heart className={`w-4 h-4 ${isFavorited ? "fill-white" : ""}`} />
    </motion.button>
  );
};

export default FavoriteButton;
