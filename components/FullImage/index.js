import React from "react";
import Image from "next/image";
import styles from "./Image.module.scss";

const FullImage = ({ width, maxWidth, layout = "fill", alt = "", ...rest }) => {
  let widths = {};
  width ? (widths["width"] = width) : "100%";
  maxWidth ? (widths["maxWidth"] = maxWidth) : "100%";

  return (
    <div className={styles.imageContainer}>
      <Image
        priority={true}
        alt={alt}
        layout={layout}
        className={styles.image}
        {...rest}
      />
    </div>
  );
};
export default FullImage;
