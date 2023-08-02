import { ErrorMessage, useField } from "formik";
import React from "react";

const FormikControl = ({ type, label, ...props }) => {
  console.log(props, "props");
  const [field, meta] = useField(props);
  console.log(field, "field");
  console.log(meta, "meta");
  return (
    <div>
      <label htmlFor={field.name}>{label}</label>
      <input {...field} {...props} />
      <ErrorMessage name={field.name} />
    </div>
  );
};

export default FormikControl;
