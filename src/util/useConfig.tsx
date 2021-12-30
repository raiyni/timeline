import { Config, Events } from "../store";
import { useContext } from "preact/hooks";

export const useConfig = () => useContext(Config)
export const useEvents = () => useContext(Events)
