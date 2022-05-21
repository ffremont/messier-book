
   
import { MessierContext, MessierContextType } from "../providers/MessierProvider";
import { useContext } from 'react';

export function useMessierContext(): MessierContextType{
    const context = useContext(MessierContext);
    if(!context){
        throw new Error('MessierContext is not defined');
    }
    return context as MessierContextType;
}