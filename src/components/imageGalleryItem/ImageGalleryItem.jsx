import React from "react";
import styles from "../imageGalleryItem/imageGalleryItem.module.css";

const ImageGalleryItem = ({ image, openModal }) => {
  const { webformatURL, tags } = image;

  return (
    <li className={styles.ImageGalleryItem} id={image.id} onClick={openModal}>
      <img
        src={webformatURL}
        alt={tags}
        className={styles.ImageGalleryItem_image}
      />
    </li>
  );
};

export default ImageGalleryItem;
