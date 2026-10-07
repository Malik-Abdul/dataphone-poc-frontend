import { Fragment } from "react/jsx-runtime";

interface InputProms {
  label: string;
  type?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  name?: string;
}

const Input = ({
  label,
  type = "text",
  value,
  onChange,
  required = false,
  name,
}: InputProms) => {
  return (
    <Fragment>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type={type}
        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={value}
        onChange={onChange}
        required={required}
        name={name}
      />
    </Fragment>
  );
};
export default Input;
