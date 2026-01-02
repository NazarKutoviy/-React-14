import React from "react";

const ImageGalleryItem = ({ webformatURL, largeImageURL, onClick }) => {
  return (
    <li className="gallery-item" onClick={onClick}>
      <img src={webformatURL} alt="" />
    </li>
  );
};

export default ImageGalleryItem;
