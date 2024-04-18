export function SubmitButton({ children }) {
  return (
    <button
      type="submit"
      className="inline-flex items-center w-full justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
    >
      {children}
    </button>
  );
}

export function SecondaryButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
    >
      {children}
    </button>
  );
}
