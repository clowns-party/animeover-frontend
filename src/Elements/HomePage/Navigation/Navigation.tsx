import React from "react";
import { SignInForm } from "../../signInForm/SignInForm";
import styles from "./navigation.module.scss";
import { AnimeTags } from "./animeTags/AnimeTags";

export const Navigation = () => {
  return (
    <div className={styles.navigation_container}>
      <div className={styles.nav_item}>
        <SignInForm />
      </div>
      <div className={styles.nav_item}>
        <AnimeTags />
      </div>
    </div>
  );
};
