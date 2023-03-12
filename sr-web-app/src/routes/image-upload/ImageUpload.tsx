import React, { useState } from 'react';
import { useUploadImagesMutation } from '../../redux/ImagesApi';

function ImageUpload() {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [uploadImages, { isLoading }] = useUploadImagesMutation();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(event.target.files);
  };

  const handleUpload = async () => {
    if (selectedFiles) {
      const filesArray = Array.from(selectedFiles);
      await uploadImages(filesArray);
      setSelectedFiles(null);
    }
  };

  return (
    <div>
      <input type='file' multiple onChange={handleFileSelect} />
      <button onClick={handleUpload} disabled={!selectedFiles || isLoading}>
        Upload Images
      </button>
    </div>
  );
}

export default ImageUpload;