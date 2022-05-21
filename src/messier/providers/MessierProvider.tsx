import { createContext, PropsWithChildren, useState } from 'react'
import { MessierObject } from '../types/MessierObject';
import { updateWeight } from '../utils/updateWeight';

export interface MessierContextType {
    openFilter:boolean,
    changeOpenFilter: (value: boolean) => void,

    objects: MessierObject[],
    changeObjects: (values: MessierObject[]) => void

    filter: string,
    changeFilter: (value:string) => void
}

export const MessierContext = createContext<Partial<MessierContextType>>({})

export const MessierProvider = ({ children }: PropsWithChildren<{}>) => {
  const [openFilter, setOpenFilter] = useState<boolean>(false)
  const [objects, setObjects] = useState<MessierObject[]>([])
  const [filter, setFilter] = useState<string>('DEFAULT')

  const changeFilter = (filter: string) => {
    setObjects(updateWeight(filter, objects))
    setFilter(filter);
  }

  return (
    <MessierContext.Provider
      value={{
        openFilter,
        changeOpenFilter: (value: boolean) => setOpenFilter(value),

        objects,
        changeObjects: (v) => setObjects(updateWeight(filter, v)),

        filter,
        changeFilter,
      }}
    >
      {children}
    </MessierContext.Provider>
  )
}
