import React from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import FormikControl from "./FormikControl";

const LoginForm = () => {
  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalide format").required("Required!!!!!!!!!"),
    password: Yup.string().required("Required").min(6,"Password must be at least 6 characters").max(10,"up to 10 limit ")
  });
  const onSubmit = (value) => {
    console.log(value, "value");
  };
  return (
    <>
      <center>
        <h1>Login Form</h1>
      </center>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
            console.log(formik,"formik");
          return (
            <Form>
              <FormikControl
                // control="input"
                type="email"
                label="Email"
                name="email"
              />
              <FormikControl
                // control="input"
                type="password"
                label="Password"
                name="password"
              />
              <button type="submit">Submit</button>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default LoginForm;
