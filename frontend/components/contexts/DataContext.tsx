import React, { createContext, useContext, useEffect, useState, Dispatch, SetStateAction, PropsWithChildren } from 'react';
import { UserContext } from '@/components/contexts/UserContext';

export interface TextData {
  id: string;
  title: string;
  content: string;
  recipients: string;
  createdAt: string;
  updatedAt: string;
  authorId: number;
}

export interface VideoData {
  id: string,
  title: string;
  recipients: string;
  thumbnail: string;
  video: string;
  createdAt: string;
}

export interface ImageData {
  id: string;
  filename: string;
  filepath: string;
  recipients: string;
  createdAt: string;
}

export interface Trusted {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  tp_image: string;
  createdAt: string;
  updatedAt: string;
  authorId: number;
}

export interface Recipient {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  tp_image: string;
  createdAt: string;
  updatedAt: string;
  authorId: number;
}

type Data = [TextData[], Trusted[], VideoData[], ImageData[], Recipient[]];

type ContextState = {
  allData: Data | null;
  setAllData: Dispatch<SetStateAction<Data | null>>;
};

export const DataContext = createContext<ContextState>({} as ContextState);

export const DataProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [allData, setAllData] = useState<Data | null>(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.id) return;
      
      try {
        const response = await fetch(`http://localhost:5000/home/${user?.id}/alldata`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setAllData(data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, [user?.id]);

  const values: ContextState = {
    allData,
    setAllData
  };

  return (
    <DataContext.Provider value={values}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
