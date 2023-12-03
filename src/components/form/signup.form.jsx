import React from "react";
import TextInput from "../text.input.component";
import googleIcon from "../../imgs/google.png";
import { Link } from "react-router-dom";

const SignUpForm = ({ signUpForm, handleWithGoogle }) => {
  return (
    <>
     
      <form onSubmit={signUpForm.handleSubmit}>
        <TextInput
          name={"fullname"}
          type={"text"}
          value={signUpForm.values.fullname}
          onChange={signUpForm.handleChange}
          error={
            signUpForm.touched.fullname && Boolean(signUpForm.errors.fullname)
          }
          onBlur={signUpForm.handleBlur}
          helperText={signUpForm.errors.fullname}
          placeholder={"Full Name"}
          icon={"fi-rr-user"}
        />
        <TextInput
          name={"email"}
          type={"email"}
          value={signUpForm.values.email}
          onChange={signUpForm.handleChange}
          placeholder={"Email"}
          icon={"fi-rr-envelope"}
          error={signUpForm.touched.email && Boolean(signUpForm.errors.email)}
          onBlur={signUpForm.handleBlur}
          helperText={signUpForm.errors.email}
        />
        <TextInput
          name={"password"}
          type={"password"}
          placeholder={"Password"}
          value={signUpForm.values.password}
          onChange={signUpForm.handleChange}
          icon={"fi-rr-key"}
          error={
            signUpForm.touched.password && Boolean(signUpForm.errors.password)
          }
          onBlur={signUpForm.handleBlur}
          helperText={signUpForm.errors.password}
        />
        <button className="btn-dark center mt-14" type="submit">
          Sign Up
        </button>
      </form>
      
    </>
  );
};

export default SignUpForm;
