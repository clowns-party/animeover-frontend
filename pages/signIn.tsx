import React, { FC } from "react";
import { SignInForm } from "../src/Elements/signInForm/signInForm";

const signIn: FC = () => {
  return (
    <div>
      <SignInForm type="_login" />
    </div>
  );
};
export default signIn;
