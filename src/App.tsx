import React, { FC } from 'react';
import "./App.css";
import RocketEditor from "src/pages/RocketEditor/RocketEditor";

interface AppProps {}

const App: FC<AppProps> = (props) => {

  return (
      <RocketEditor />
  );
};

export default App;
