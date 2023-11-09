import React, { ChangeEvent, useEffect, useState } from 'react';

interface ImageUploaderProps {
  onChange: (value: string[]) => void;
  value: string[];
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onChange, value }) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  useEffect(() => {
    // Esto es para manejar las imágenes preexistentes o las que se pasan como valor inicial
    if (value && value.length > 0) {
      // Aquí podrías convertir las URLs de nuevo a objetos File si es necesario,
      // o simplemente dejarlas como están si estás usando URLs
    }
  }, [value]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 5) {
      alert('No puedes seleccionar más de 5 imágenes');
      return;
    }

    setSelectedFiles(files);
    Promise.all(files.map(file => convertToBase64(file)))
      .then(base64Files => {
        onChange(base64Files);
      });
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <div>
      <input
      
        type="file"
        accept=".png, .jpg, .jpeg"
        multiple
        onChange={handleImageChange}
        
      />
      {/* Mostrar miniaturas de las imágenes seleccionadas */}
      <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        {selectedFiles.map((file, index) => (
          <img
            key={index}
            src={URL.createObjectURL(file)}
            alt={file.name}
            width={200}
            height={200}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;