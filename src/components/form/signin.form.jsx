import React from "react";
import TextInput from "../text.input.component";
import googleIcon from "../../imgs/google.png";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const SignInForm = ({ signInForm }) => {
  const { values, touched, handleBlur, errors, handleChange, handleSubmit } = signInForm;
  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        name={"email"}
        value={values.email}
        onChange={handleChange}
        error={touched.email && Boolean(errors.email)}
        onBlur={signInForm.handleBlur}
        helperText={errors.email}
        type={"email"}
        placeholder={"Email"}
        icon={"fi-rr-envelope"}
      />
      <TextInput
        name={"password"}
        type={"password"}
        value={values.password}
        onChange={handleChange}
        error={touched.password && Boolean(errors.password)}
        onBlur={handleBlur}
        helperText={errors.password}
        placeholder={"Password"}
        icon={"fi-rr-key"}
      />
      <button className="btn-dark center mt-14" type="submit">
        Sign In
      </button>
    </form>
  );
};

export default SignInForm;
