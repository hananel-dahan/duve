import React from "react";
import "./styles.scss";

const InputSelectCell = ({
  label,
  fieldName,
  selectOptions,
  register,
  errors,
  validation,
}: {
  label: string;
  fieldName: string;
  selectOptions: { id: number; value: string }[];
  register: any;
  errors: any;
  validation: {};
}) => {

  return (
    <div className="input-cell">
    <label htmlFor={fieldName}>{label}</label>
    <select {...register(fieldName, validation)} name="country">
      {selectOptions.map((option) => (
        <option key={option.id} value={option.value}>
          {option.value}
        </option>
      ))}
    </select>
    {errors[fieldName] && <p>{label} is required.</p>}
  </div>
  );
};
export default InputSelectCell;
