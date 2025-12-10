// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router";
import Food from "../../assets/FoodNotFound.webp";

export default function FoodNotFound() {
  return (
    <div className="min-h-[70vh] bg-gradient flex flex-col items-center justify-center text-center px-4 py-10 font-popins">
      {/* Floating Animation */}
      <motion.img
        src={Food}
        alt="Empty Food List"
        className="w-120 mb-6 rounded-2xl"
        initial={{ y: -20, opacity: 0.7 }}
        animate={{ y: [0, -10, 0], opacity: 1 }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      <motion.h2
        className="text-3xl font-bold text-primary mb-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        No Foods Found Here 🍽️
      </motion.h2>

      <motion.p
        className="text-base-content/80 max-w-md mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        Seems a bit empty, right? Discover delicious dishes and see what others
        are eating around you! 😍
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <Link to="/">
          <button className="btn btn-secondary rounded-box px-6 text-secondary-content">
            Explore Foods
          </button>
        </Link>
      </motion.div>
    </div>
  );
}
