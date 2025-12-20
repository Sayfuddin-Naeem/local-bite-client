import { ArrowRight } from "lucide-react";

const CTABanner = ({ title, description, buttonText, onClick, bgGradient }) => {
  return (
    <div
      className={`${bgGradient} rounded-2xl p-8 lg:p-12 text-center shadow-2xl`}
    >
      <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 font-popins">
        {title}
      </h2>
      <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto font-inter">
        {description}
      </p>
      <button
        onClick={onClick}
        className="btn btn-lg bg-white text-primary border-0 rounded-full hover:scale-105 transition-transform shadow-xl gap-2"
      >
        {buttonText}
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default CTABanner;