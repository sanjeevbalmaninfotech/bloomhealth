export function InputField({ label, name, value, onChange, isEditing, icon }) {
  return (
    <div className='flex flex-col bg-white p-4 rounded-lg shadow-sm'>
      <label className='text-gray-600 text-sm mb-1'>{label}</label>
      <div className='flex items-center gap-2'>
        {icon}
        {isEditing ? (
          <input
            type='text'
            name={name}
            value={value || ''}
            onChange={onChange}
            className='w-full border rounded-md px-3 py-1 text-gray-700 focus:ring focus:ring-[#157fc1] outline-none'
          />
        ) : (
          <span className='text-gray-800'>{value || '—'}</span>
        )}
      </div>
    </div>
  );
}