import Label from "./Label";

function CategoryField({register, error}) {
  return (
    <div>
      <Label label={"Category *"} />
      <select
        {...register("category")}
        className={`select select-bordered w-full rounded-[1.25rem] focus:outline-primary/30 focus:outline-2 ${
          error ? "select-error" : ""
        }`}
      >
        <option value="">Select category</option>
        <option value="Street Food">🍢 Street Food</option>
        <option value="Homemade">🏠 Homemade</option>
        <option value="Traditional">🍛 Traditional</option>
        <option value="Snacks">🍿 Snacks</option>
        <option value="Fast Food">🍔 Fast Food</option>
        <option value="Dessert">🍰 Dessert</option>
        <option value="Drinks">🥤 Drinks</option>
        <option value="Others">📦 Others</option>
      </select>
      {error && (
        <p className="text-error text-sm mt-1">{error.message}</p>
      )}
    </div>
  );
}

export default CategoryField;
