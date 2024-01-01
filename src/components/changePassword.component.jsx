import React from "react";
import AnimationWrapper from "./animation/animation.wrapper";
import TextInput from "./text.input.component";
import { useFormik } from "formik";

const ChangePasswordComponent = () => {
  const changePassword = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
    },
  });
  return (
    <AnimationWrapper>
      <form>
        <h1 className="max-md:hidden mb-2 text-2xl font-medium">
          Change Password
        </h1>
        <div className="py-10 w-full md:max-w-[400px]">
          <TextInput
            type={"password"}
            name={"currentPassword"}
            className={"profile-edit-input"}
            placeholder={"Current Password"}
            icon={"fi-rr-unlock"}
          />
          <TextInput
            type={"password"}
            name={"currentPassword"}
            className={"profile-edit-input"}
            placeholder={"New Password"}
            icon={"fi-rr-unlock"}
          />
          <button className="btn-dark">Change Password</button>
        </div>
      </form>
    </AnimationWrapper>
  );
};

export default ChangePasswordComponent;
