import React, { createContext, useContext, useEffect, useState, Dispatch, SetStateAction, PropsWithChildren } from 'react';
import { UserContext } from '@/components/contexts/UserContext';

export interface TextData {
  id: number;
  title: string;
  content: string;
  recipients: string;
  created_at: string;
  updated_at: string;
  author_id: number;
}

export interface VideoData {
  id: number,
  title: string;
  recipients: string;
  thumbnail: string;
  video: string;
  created_at: string;
}

export interface ImageData {
  id: number;
  filename: string;
  filepath: string;
  recipients: string;
  created_at: string;
}

interface Trusted {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;
  updated_at: string;
  author_id: number;
}

interface Recipient {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;
  updated_at: string;
  author_id: number;
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
