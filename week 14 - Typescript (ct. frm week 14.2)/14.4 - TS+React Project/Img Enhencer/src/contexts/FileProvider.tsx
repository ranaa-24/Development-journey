import { createContext, useState } from 'react';
import type { Dispatch, SetStateAction, ReactNode } from 'react';
import { baseImgUrl } from '../utils/baseImageUrl';

interface FileContextType {
  file: File | null;
  setFile: Dispatch<SetStateAction<File | null>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  enhanced: string,
  setEnhanced: Dispatch<SetStateAction<string>>;
}

export const FileContext = createContext<FileContextType>({} as FileContextType);

export function FileProvider({ children }: { children: ReactNode }) {
  const [file, setFile] = useState<File | null>(null);
  const [enhanced, setEnhanced] = useState<string>(baseImgUrl);
  const [loading, setLoading] = useState<boolean>(false);

  const value = { 
    file, setFile, loading, setLoading, enhanced, setEnhanced
  }

  return (
    <FileContext.Provider value={value} > 
      {children}
    </FileContext.Provider>
  )
}
