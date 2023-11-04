type Props = React.InputHTMLAttributes<HTMLInputElement>;

export function Input(props: Props): JSX.Element {
  return (
    <input
      {...props}
      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm sm:leading-6"
    />
  );
}
