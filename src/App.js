// src/App.js or the parent component
import React, { useState } from "react";
import UploadPage from "./components/UploadPage";
import DragAndDropPage from "./components/DragAndDropPage";

const App = () => {
  const [images, setImages] = useState([]);
  const [rankNames, setRankNames] = useState({});
  const [currentPage, setCurrentPage] = useState("upload");

  const handleUploadImages = (newImages) => {
    setImages(newImages);
  };

  const handleNext = (rankNames) => {
    setRankNames(rankNames);
    setCurrentPage("drag-and-drop");
  };

  return (
    <div className="app">
      {currentPage === "upload" && (
        <UploadPage onNext={handleNext} onUploadImages={handleUploadImages} />
      )}
      {currentPage === "drag-and-drop" && (
        <DragAndDropPage
          images={images}
          setImages={setImages}
          rankNames={rankNames}
        />
      )}
    </div>
  );
};

export default App;
