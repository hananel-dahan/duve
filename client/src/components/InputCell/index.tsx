import React from "react";
import "./styles.scss";

const InputCell = ({
  label,
  fieldName,
  inputType,
  register,
  errors,
  validation,
}: {
  label: string;
  fieldName: string;
  inputType?: string;
  register: any;
  errors: any;
  validation: {};
}) => {

  return (
    <div className="input-cell">
      <label htmlFor={fieldName}>{label}</label>
      <input
        {...register(fieldName, validation)}
        type={inputType || "text"}
        name={fieldName}
      />
      {errors[fieldName] && <p>{label} is required.</p>}
    </div>
  );
};
export default InputCell;
