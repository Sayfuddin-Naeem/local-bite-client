// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router";
import FoodReview from "../../assets/ReviewNotFound.webp";

export default function ReviewNotFound() {
  return (
    <div className="min-h-[70vh] bg-gradient flex flex-col items-center justify-center text-center px-4 py-10 font-popins">
      {/* Floating Food Image */}
      <motion.img
        src={FoodReview}
        alt="No Reviews"
        className="w-150 mb-6 rounded-2xl drop-shadow-md"
        initial={{ y: -20, opacity: 0.7}}
        animate={{ y: [0, -10, 0], opacity: 0.8}}
        transition={{ duration: 2, repeat: Infinity }}
      />

      <motion.h2
        className="text-3xl font-bold text-primary mb-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        No Tasty Reviews Yet! 🍽️
      </motion.h2>

      <motion.p
        className="text-base-content/80 max-w-md mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        Looks like nobody has shared their delicious experience here. Be the
        first foodie to drop a review! 😋
      </motion.p>

      {/* Button CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <Link to="/add-review">
          <button className="btn btn-primary rounded-box px-6 text-primary-content">
            Add Review Now
          </button>
        </Link>
      </motion.div>
    </div>
  );
}
