import React, { Dispatch, PropsWithChildren, SetStateAction, createContext, useContext, useState } from 'react';

export interface User {
  confirmed_email: number;
  createdAt: string;
  email: string;
  firstName: string;
  id: number;
  lastLogin: string;
  lastName: string;
  phoneNumber: string;
  tier: number;
  updatedAt: string;
}

type ContextState = {
   user: User | null
   setUser: Dispatch<SetStateAction<User | null>>
}

export const UserContext  = createContext<ContextState>({} as ContextState);

const UserProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null)

const values: ContextState = {
 user,
 setUser
}

  return (
    <UserContext.Provider value={values}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider
