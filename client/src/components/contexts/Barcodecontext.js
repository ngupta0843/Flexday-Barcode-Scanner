import {createContext, useState} from 'react';

export const BarcodeContext = createContext();

export const BarcodeProvider = ({children}) => {
    const [ingredients, setIngredients] = useState([]);
    
    return (
        <BarcodeContext.Provider value={{ingredients, setIngredients}}>
            {children}
        </BarcodeContext.Provider>
    );
}