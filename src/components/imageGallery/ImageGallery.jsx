import React from "react";
import styles from "../imageGallery/imageGallery.module.css";
import ImageGalleryItem from "../imageGalleryItem/ImageGalleryItem";

const ImageGallery = ({ images, openModal }) => {
  console.log(images);
  return (
    <ul className={styles.ImageGallery}>
      {images.map((image) => (
        <ImageGalleryItem openModal={openModal} key={image.id} image={image} />
      ))}
    </ul>
  );
};

export default ImageGallery;
