// core
import React, { FC } from "react";
import { service } from "./Services";
import { HomePage } from "./Elements/HomePage/HomePage";

const App: FC = () => {
  // не тут должно быть TEMP
  const call = async () => {
    const result = await service.me();
    console.log(result);
  };
  return (
    <div className="App">
      <HomePage />
      {/* <button type="button" onClick={call}>
        TEST AUTH ME!
      </button> */}
    </div>
  );
};

export default App;
