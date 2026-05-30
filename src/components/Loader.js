import "./Loader.css";

function Loader() {
  return (
    <div className="loader-wrap" role="status" aria-live="polite">
      <div className="loader"></div>
      <span>Loading notifications...</span>
    </div>
  );
}

export default Loader;
