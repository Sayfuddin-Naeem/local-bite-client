// eslint-disable-next-line no-unused-vars
const InfoBadge = ({ icon: Icon, text, color = "text-neutral" }) => {
  return (
    <div className={`flex items-center gap-2 ${color}`}>
      <Icon className="w-5 h-5" />
      <span className="font-inter">{text}</span>
    </div>
  );
};

export default InfoBadge;