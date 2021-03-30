import React from "react";
import { SignInForm } from "../../signInForm/SignInForm";
import styles from "./navigation.module.scss";
import { AnimeTags } from "./animeTags/AnimeTags";
import { useAuth } from "./../../../bus/auth/hooks/useAuth";

export const Navigation = () => {
  const { data, isFetching, error } = useAuth();

  return (
    <div className={styles.navigation_container}>
      <div className={styles.nav_item}>
        {data?.user ? <div>{data?.user.email}</div> : <SignInForm />}
      </div>
      <div className={styles.nav_item}>
        <AnimeTags />
      </div>
    </div>
  );
};
