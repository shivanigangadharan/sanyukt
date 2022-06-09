import React, { createContext, useContext, useReducer } from 'react';
// import { dataReducer } from '../reducer/dataReducer';

const initialState = {
    bookmarks: [],

}

const StateContext = createContext();
export const useStateContext = () => useContext(StateContext);

export const StateProvider = ({ children }) => {
    const [state, dispatch] = useReducer(dataReducer, initialState);
    return (
        <StateContext.Provider value={{ state, dispatch }}>
            {children}
        </StateContext.Provider>
    )
}