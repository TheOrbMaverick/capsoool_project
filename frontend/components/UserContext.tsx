import React, { Dispatch, PropsWithChildren, SetStateAction, createContext, useContext, useState } from 'react';

export interface User {
  confirmed_email: number;
  created_at: string;
  email: string;
  first_name: string;
  id: number;
  last_login: string;
  last_name: string;
  phone_number: string;
  tier: number;
  updated_at: string;
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
