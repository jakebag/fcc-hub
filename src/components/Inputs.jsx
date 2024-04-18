function convertToId(value) {
  return value.toLowerCase().split(" ").join("-");
}

export function TextInput({ value, onChange, placeholder, children }) {
  return (
    <div className="w-full">
      <label
        htmlFor={convertToId(children)}
        className="block text-sm font-medium text-gray-700"
      >
        {children}
      </label>
      <div className="mt-1">
        <input
          type="text"
          minLength={3}
          required
          name={convertToId(children)}
          id={convertToId(children)}
          className="shadow-sm focus:ring-rose-500 focus:border-rose-500 block w-full sm:text-sm border-gray-300 rounded-md"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
}

export function PasswordInput({ value, onChange, placeholder, children }) {
  return (
    <div>
      <label
        htmlFor={convertToId(children)}
        className="block text-sm font-medium text-gray-700"
      >
        {children}
      </label>
      <div className="mt-1">
        <input
          type="password"
          minLength={6}
          required
          name={convertToId(children)}
          id={convertToId(children)}
          className="shadow-sm focus:ring-rose-500 focus:border-rose-500 block w-full sm:text-sm border-gray-300 rounded-md"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
