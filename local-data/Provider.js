import { useReducer } from "react";
import Context from "./Context";
import InitState from "./InitState";
import reducer from "./reducer";

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, InitState);
  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export default Provider
