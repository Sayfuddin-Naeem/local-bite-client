// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router";
import lostBurger from '../../assets/lost_burger.webp';

export default function PageNotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center bg-gradient font-popins p-6">
      <motion.img
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
        src={lostBurger}
        alt="Lost Burger"
        className="w-64 md:w-80 mb-6 drop-shadow-lg"
      />

      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-4xl font-bold text-primary mb-2"
      >
        Oops! This Bite is Missing 🍔
      </motion.h1>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.35 }}
        className="text-base-content max-w-md mb-6"
      >
        Looks like the page you're craving doesn't exist or maybe it got eaten by someone else.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Link to="/" className="btn btn-primary rounded-full px-6 text-primary-content shadow-lg">
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
}
