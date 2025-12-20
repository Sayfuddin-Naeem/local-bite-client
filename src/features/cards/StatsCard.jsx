// eslint-disable-next-line no-unused-vars
const StatsCard = ({ icon: Icon, value, label, color }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform">
      <div className={`w-12 h-12 ${color}/10 rounded-full flex items-center justify-center mx-auto mb-3`}>
        <Icon className={`w-6 h-6 ${color}`} />
      </div>
      <div className="text-3xl font-bold font-popins text-base-content mb-1">
        {value}
      </div>
      <div className="text-sm text-neutral font-inter">
        {label}
      </div>
    </div>
  );
};

export default StatsCard;