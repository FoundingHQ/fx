import { createContext } from "react";
import { GlobalCtx } from "../interfaces";

export const initialContext = {
  defaultInterval: 10000,
  width: "100%", // 270
  height: 480,
};

const GlobalContext = createContext<GlobalCtx>(initialContext);

export default GlobalContext;
