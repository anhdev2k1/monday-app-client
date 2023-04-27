import React, { createContext, Dispatch } from 'react';
import { IChildrenComponentProps } from '~/shared/model/global';

interface Actions {
   SET_IMAGENAME: string;
   SET_USER: string;
}

export const Actions: Actions = {
   SET_IMAGENAME: 'SET_IMAGENAME',
   SET_USER: 'SET_USER',
};

function action(type: string) {
   return { type };
}

// If payload can contain string of image or FirebaseUser instance
// it will be string | FirebaseUser
// if payload will only contain FirebaseUser instance you just need payload: FirebaseUser
export type ActionType = {
   type: string;
   payload: string;
};

function actionPayload(type: string, payload: string) {
   //here
   return { type, payload };
}

export const Dispatches = {
   setImageName: action,
   setUser: actionPayload,
};

interface State {
   imgName: string;
}

const initialState = {
   imgName: '',
};

// set Action type here
function reducer(state = initialState, action: ActionType) {
   switch (action.type) {
      case Actions.SET_IMAGENAME:
         // need to cast type herer
         return { ...state, imgName: action.payload as string };
      default:
         return state;
   }
}

export const Store = createContext<{
   state: State;
   dispatch: Dispatch<ActionType>; //action type here
}>({
   state: initialState,
   dispatch: () => null,
});

export function StoreProvider({ children }: IChildrenComponentProps): JSX.Element {
   const [state, dispatch] = React.useReducer(reducer, initialState);
   return <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>;
}
