const SectionHeader = ({ icon: Icon, title, subtitle, action }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
      <div>
        <div className="flex items-center gap-3 mb-2">
          {Icon && (
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <Icon className="w-6 h-6 text-white" />
            </div>
          )}
          <h2 className="text-3xl lg:text-4xl font-bold text-base-content font-popins">
            {title}
          </h2>
        </div>
        {subtitle && (
          <p className="text-neutral font-inter ml-15">{subtitle}</p>
        )}
      </div>
      {action}
    </div>
  );
};

export default SectionHeader;