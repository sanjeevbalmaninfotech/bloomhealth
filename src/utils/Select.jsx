export function SelectField({ label, name, value, onChange, isEditing, options = [] }) {
  return (
    <div className="flex flex-col bg-white p-4 rounded-lg shadow-sm">
      <label className="text-gray-600 text-sm mb-1">{label}</label>
      {isEditing ? (
        <select
          name={name}
          value={value || ""}
          onChange={onChange}
          className="w-full border rounded-md px-3 py-1 text-gray-700 focus:ring focus:ring-[#157fc1] outline-none"
        >
          <option value="">Select {label}</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <span className="text-gray-800">{value || "—"}</span>
      )}
    </div>
  );
}