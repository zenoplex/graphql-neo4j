type Props = React.LabelHTMLAttributes<HTMLLabelElement>;

export function Label({ htmlFor, ...rest }: Props): JSX.Element {
  return (
    <label
      className="block text-sm font-medium leading-6 text-gray-900"
      // To avoide jsx-a11y/label-has-associated-control error, htmlFor is explicitly passed
      htmlFor={htmlFor}
      {...rest}
    />
  );
}
