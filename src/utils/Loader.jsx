export default function Loader({ message = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="custom-spinner"></div>
      {message && <p className="mt-3 text-gray-600 text-sm">{message}</p>}
    </div>
  );
}

