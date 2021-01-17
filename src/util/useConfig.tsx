import { Config } from "../store";
import { useContext } from "preact/hooks";

export const useConfig = () => useContext(Config)
