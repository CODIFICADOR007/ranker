import React, { useState, useEffect, useCallback } from "react";
import "./DragAndDropPage.css";

const DragAndDropPage = ({ images, setImages, rankNames }) => {
  const [ranks, setRanks] = useState({
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
  });

  const [enlargedImage, setEnlargedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState([]);

  useEffect(() => {
    if (images.length > 0) {
      setLoadedImages(images.slice(0, 30)); // Lazy load first 30 images
      setCurrentImageIndex(0); // Reset index when images change
    }
  }, [images]);

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData("id", id);
  };

  const allowDrop = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, rank) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("id");
    const image = loadedImages.find((img) => img.id === parseInt(id));

    if (image) {
      setRanks((prevRanks) => ({
        ...prevRanks,
        [rank]: [...prevRanks[rank], image],
      }));

      setLoadedImages((prevImages) =>
        prevImages.filter((img) => img.id !== parseInt(id))
      );

      setImages((prevImages) =>
        prevImages.filter((img) => img.id !== parseInt(id))
      );
    }
  };

  const handleImageClick = (src) => {
    setEnlargedImage(src);
  };

  const handleCloseEnlarged = () => {
    setEnlargedImage(null);
  };

  const loadMoreImages = useCallback(() => {
    if (loadedImages.length < images.length) {
      const nextImages = images.slice(
        loadedImages.length,
        loadedImages.length + 30
      );
      setLoadedImages((prevImages) => [...prevImages, ...nextImages]);
    }
  }, [images, loadedImages]);

  return (
    <div className="drag-and-drop-page">
      <div className="rank-container">
        {Object.keys(ranks).map((rank) => (
          <div
            key={rank}
            className={`rank-slot rank-${rank}`} // Add rank-specific class
            onDragOver={allowDrop}
            onDrop={(e) => handleDrop(e, rank)}
          >
            <div className="rank-label">
              <h3>{rankNames[rank] || `Rank ${rank}`}</h3>
            </div>
            <div className="rank-images">
              {ranks[rank].map((image) => (
                <img
                  key={image.id}
                  src={image.src}
                  alt={`rank-${rank}`}
                  className="ranked-image"
                  onClick={() => handleImageClick(image.src)} // Click to enlarge
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="image-list">
        {loadedImages.length > 0 && currentImageIndex < loadedImages.length && (
          <img
            key={loadedImages[currentImageIndex].id}
            src={loadedImages[currentImageIndex].src}
            alt={`img-${loadedImages[currentImageIndex].id}`}
            draggable
            onDragStart={(e) =>
              handleDragStart(e, loadedImages[currentImageIndex].id)
            }
            onClick={() =>
              handleImageClick(loadedImages[currentImageIndex].src)
            }
            className="draggable-image"
          />
        )}
      </div>
      {enlargedImage && (
        <div className="enlarged-image-container">
          <span className="close-enlarged" onClick={handleCloseEnlarged}>
            &times;
          </span>
          <img src={enlargedImage} alt="enlarged" className="enlarged-image" />
        </div>
      )}
      {loadedImages.length < images.length && (
        <button onClick={loadMoreImages} className="load-more-button">
          Load More
        </button>
      )}
    </div>
  );
};

export default DragAndDropPage;
