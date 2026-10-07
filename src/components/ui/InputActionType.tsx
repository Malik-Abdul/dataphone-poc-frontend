import { Fragment } from "react/jsx-runtime";

interface InputProms {
  label: string;
  type?: string;
  required?: boolean;
  name?: string;
  defaultValue?: string | number | undefined;
  readOnly?: boolean;
  disabled?: boolean;
}

const InputActionType = ({
  label,
  type = "text",
  required = false,
  name,
  defaultValue = undefined,
  readOnly = false,
  disabled = false,
}: InputProms) => {
  return (
    <Fragment>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type={type}
        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required={required}
        name={name}
        defaultValue={defaultValue}
        readOnly={readOnly}
        disabled={disabled}
      />
    </Fragment>
  );
};
export default InputActionType;
