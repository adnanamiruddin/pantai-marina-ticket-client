export default function LoadingButton({ loading, children }) {
  return (
    <button
      type="submit"
      className={`btn bg-orange-500 w-full border-0 text-white text-lg hover:bg-orange-400 focus:bg-orange-600 ${
        loading ? "brightness-75" : ""
      }`}
    >
      {loading ? (
        <span className="loading loading-dots loading-sm"></span>
      ) : (
        children
      )}
    </button>
  );
}
