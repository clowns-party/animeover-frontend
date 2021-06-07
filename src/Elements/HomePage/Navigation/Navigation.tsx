import React from "react";
import { SignInForm } from "../../signInForm/signInForm";
import styles from "./navigation.module.scss";
import { AnimeTags } from "./animeTags/AnimeTags";
import { useAuth } from "../../../bus/auth/hooks/useAuth";

export const Navigation = () => {
  const { data, isFetching, error } = useAuth();

  return <div className={styles.navigation_container}>fd</div>;
};
