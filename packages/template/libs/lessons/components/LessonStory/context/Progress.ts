import { createContext } from "react";
import { ProgressContext } from "../interfaces";

export default createContext<ProgressContext>({
  currentId: 0,
  videoDuration: 0,
  bufferAction: false,
  pause: false,
  next: () => {},
});
