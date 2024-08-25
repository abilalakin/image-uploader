import React, { useState, ChangeEvent } from 'react';

const ImageUpload: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await fetch('http://localhost:5001/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                alert('File uploaded successfully!');
            } else {
                alert('Failed to upload file.');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Error uploading file.');
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
};

export default ImageUpload;
