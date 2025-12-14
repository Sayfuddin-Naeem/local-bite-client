const StarRatingInput = ({ value, onChange, error }) => {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text font-inter font-medium">Rating</span>
      </label>
      <div className="rating rating-lg gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <input
            key={star}
            type="radio"
            name="rating"
            value={star}
            className="mask mask-star-2 bg-primary cursor-pointer hover:scale-110 transition-transform"
            checked={value === star}
            onChange={() => onChange(star)}
          />
        ))}
      </div>
      {error && <span className="text-error text-sm mt-2">{error.message}</span>}
    </div>
  );
};

export default StarRatingInput;