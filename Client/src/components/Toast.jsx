export default function Toast({ message, type }) {
  if (!message) return null;

  return (
    <div
      className={`
        fixed top-5 right-5 px-4 py-3 rounded-xl text-white shadow-lg z-[9999]
        ${type === "success" ? "bg-green-600" : "bg-red-600"}
      `}
    >
      {message}
    </div>
  );
}
