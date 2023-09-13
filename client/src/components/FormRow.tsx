interface Input {
  type: string;
  name: string;
  labelText?: string;
  defaultValue?: string;
  onChange?: any
}

const FormRow = ({ type, name, labelText, defaultValue, onChange }: Input) => {

  return (
    <div className="form-row">
      <label htmlFor="name" className="form-label">
        {labelText || name}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        className="form-input"
        defaultValue={defaultValue || ""}
        required
        onChange={onChange}
      />
    </div>
  );
};

export default FormRow;
