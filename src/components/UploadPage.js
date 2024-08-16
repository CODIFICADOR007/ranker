// src/components/UploadPage.js
import React, { useState } from "react";
import "./UploadPage.css";

const UploadPage = ({ onNext, onUploadImages }) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [rankNames, setRankNames] = useState({});

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const newImages = files.map((file, index) => ({
      id: index, // You can use a more unique ID generator if needed
      src: URL.createObjectURL(file),
    }));
    setSelectedImages((prevImages) => [...prevImages, ...newImages]);
    onUploadImages((prevImages) => [...prevImages, ...newImages]); // Pass images to parent component
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleRemoveImage = (id) => {
    setSelectedImages((prevImages) =>
      prevImages.filter((img) => img.id !== id)
    );
    onUploadImages((prevImages) => prevImages.filter((img) => img.id !== id)); // Update parent component
  };

  const handleRankNameChange = (rank, name) => {
    setRankNames((prevRankNames) => ({ ...prevRankNames, [rank]: name }));
  };

  const handleNext = () => {
    onNext(rankNames); // Pass rank names to parent component
  };

  return (
    <div className="upload-page">
      <div className="drop-box" onDrop={handleDrop} onDragOver={handleDragOver}>
        <h3>Drop images here</h3>
        {selectedImages.length === 0 && <p>No images selected</p>}
        <div className="image-preview">
          {selectedImages.map((image) => (
            <div key={image.id} className="image-container">
              <img
                src={image.src}
                alt={`preview-${image.id}`}
                className="preview-image"
              />
              <button
                onClick={() => handleRemoveImage(image.id)}
                className="remove-button"
              >
                X
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="rank-names">
        {[1, 2, 3, 4, 5, 6].map((rank) => (
          <div key={rank} className="rank-name-input">
            <label>Rank {rank} Name:</label>
            <input
              type="text"
              value={rankNames[rank] || ""}
              onChange={(e) => handleRankNameChange(rank, e.target.value)}
            />
          </div>
        ))}
      </div>
      <button onClick={handleNext} className="next-button">
        Next
      </button>
    </div>
  );
};

export default UploadPage;
