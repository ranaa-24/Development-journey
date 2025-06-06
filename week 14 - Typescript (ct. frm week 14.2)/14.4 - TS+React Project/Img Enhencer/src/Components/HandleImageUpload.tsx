import { useContext, useEffect, useState } from "react";
import { FileContext } from "../contexts/FileProvider";
import type { DragEvent, ChangeEvent } from 'react';
import { getEnhancedImage } from "../utils/fetchImage";

const FileUpload = () => {
  const [dragActive, setDragActive] = useState<boolean>(false);
  const { file, setFile, setEnhanced } = useContext(FileContext);
  const { setLoading } = useContext(FileContext);

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    // to prevent the file form being open
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    // to prevent the file form being open
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  // api call
  useEffect(() => {
    const fetchEnhancedImage = async () => {
      if (file) {
        setLoading(true);
        try {

          const enhancedImageUrl: string = await getEnhancedImage(file);
          await new Promise(r => setTimeout(r, 3000));    // fake wait
          setEnhanced(enhancedImageUrl);

        } catch (err) {   /// err is by default unknown type so before accessing .msg we need to check if its a instence of Error or not
          if (err instanceof Error) {
            console.log(err.message);
          } else {
            console.log("An unknown error occurred");
          }
        } finally {
          setLoading(false);
        }
      }
    }

    fetchEnhancedImage();
  }, [file, setLoading, setEnhanced]);     // setLoading is stable still its a ESlint rule to specify any variable used inside useEf. should be listed inside dependency array


 
  return (
    <div
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
      className={`w-full sm:w-[95%] h-full max-w-md mx-auto p-4 border-2 border-dashed rounded-2xl transition-colors
        ${dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-white"}
      `}
    >
      <label
        htmlFor="fileInput"
        className="w-full h-full flex flex-col items-center justify-center cursor-pointer text-gray-500"
      >
        <input
          id="fileInput"
          type="file"
          onChange={handleChange}
          className="hidden"
          accept="image/*"
        />
        <span className="text-xs sm:text-lg font-medium">Drag & Drop your file here</span>
        <span className="text-[10px] sm:text-sm">or click to browse</span>
        {file && (
          <p className="mt-4 text-green-600 font-semibold text-xs sm:text-md">
            📁 Selected file: {file.name.length > 20 ? file.name.slice(0, 20) + '...' : file.name}
          </p>
        )}
      </label>
    </div>
  );
};

export default FileUpload;
