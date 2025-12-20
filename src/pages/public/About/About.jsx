// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router";
import Tittle from "../../../components/shared/Tittle";

export default function About() {
  const aboutItem = [
    {
      title: "Discover Local Gems",
      desc: "Explore new places based on real reviews and authentic photos.",
    },
    {
      title: "Share Your Experience",
      desc: "Post your food adventures and help others find tasty bites.",
    },
    {
      title: "Connect & Engage",
      desc: "Follow foodies, comment on dishes, and celebrate local flavors.",
    },
  ];
  return (
    <Tittle titleText={"About Us | Local Bite"}>
      <div className="font-popins min-h-screen bg-base-100 text-base-content p-8 md:p-16">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-4">
            Local Bite
          </h1>
          <p className="text-lg md:text-xl text-neutral max-w-2xl mx-auto">
            Discover authentic local flavors, share your food journey, and
            connect with a community that celebrates the joy of eating.
          </p>
        </motion.section>

        {/* Mission Section */}
        <motion.section
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 bg-base-200 p-8 rounded-box shadow-md max-w-5xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-secondary mb-4">
            Our Mission
          </h2>
          <p className="text-lg text-neutral">
            We believe great food doesn’t always come with fancy labels. From
            hidden restaurants to street-side stalls and home cooks improving
            tradition, every bite has a story. Local Bite connects food lovers
            to these stories—right in their neighborhood.
          </p>
        </motion.section>

        {/* Features Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 grid md:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {aboutItem.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="p-6 rounded-box bg-base-300 shadow-sm"
            >
              <h3 className="text-xl font-bold text-primary mb-2">
                {item.title}
              </h3>
              <p className="text-neutral text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </motion.section>

        {/* Community CTA */}
        <motion.section
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-24 text-center"
        >
          <h2 className="text-3xl font-bold text-primary mb-4">
            Join the Local Bite Community
          </h2>
          <p className="text-neutral text-lg max-w-3xl mx-auto mb-6">
            Sign up, share a bite, and help others find the food worth craving.
          </p>
          <button className="btn btn-primary rounded-field text-primary-content text-base font-inter">
            <Link to={"/signup"}>Get Started</Link>
          </button>
        </motion.section>
      </div>
    </Tittle>
  );
}
