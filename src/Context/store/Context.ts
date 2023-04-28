import { createContext } from 'react';

// interface
export interface IInitState {
   width: number;
}
export const initState: IInitState = {
   width: 300,
};
const Context = createContext(initState);
export default Context;
