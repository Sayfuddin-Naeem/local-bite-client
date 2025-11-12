import "./App.css";

function App() {
  return (
    <div className="bg-base-100 flex flex-col justify-center items-center gap-6 text-4xl p-12">
      <h1 className="bg-primary text-primary-content p-4 rounded-2xl capitalize">Hello, primary Boss!</h1>
      <h1 className="bg-secondary text-secondary-content p-4 rounded-2xl">Hello, secondary Boss!</h1>
      <h1 className="bg-accent text-accent-content p-4 rounded-2xl">Hello, accent Boss!</h1>
      <h1 className="bg-warning text-warning-content p-4 rounded-2xl">Hello, warning Boss!</h1>
      <h1 className="bg-info text-info-content p-4 rounded-2xl">Hello, info Boss!</h1>
      <h1 className="bg-error text-error-content p-4 rounded-2xl">Hello, error Boss!</h1>
      <h1 className="bg-success text-success-content p-4 rounded-2xl">Hello, success Boss!</h1>
      <h1 className="bg-neutral text-neutral-content p-4 rounded-2xl">Hello, neutral Boss!</h1>
      <h1 className="bg-base-300 text-base-content p-4 rounded-2xl">Hello, base 300 Boss!</h1>
    </div>
  );
}

export default App;
