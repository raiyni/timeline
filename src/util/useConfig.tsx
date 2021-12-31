import { useContext } from "preact/hooks";
import { Config } from "../store";

export const useConfig = () => useContext(Config)
