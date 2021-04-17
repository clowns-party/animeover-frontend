// core
import React, { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { me } from "./bus/auth/actions";
import { HomePage } from "./Elements/HomePage/HomePage";

const App: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(me());
  }, []);
  return (
    <div className="App">
      <HomePage />
    </div>
  );
};

export default App;
