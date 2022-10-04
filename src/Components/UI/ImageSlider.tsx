import React, { useState } from "react";
import { ISliderProps } from "../../Interfaces/ISliderModel";
import classes from "./ImageSlider.module.css";
import Image from "next/image";

const ImageSlider: React.FC<ISliderProps> = (props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  if (!Array.isArray(props.slides) || props.slides.length <= 0) {
    return null;
  }

  const nextSlide = () => {
    setCurrentIndex(
      currentIndex === props.slides.length - 1 ? 0 : currentIndex + 1
    );
  };

  const previousSlide = () => {
    setCurrentIndex(
      currentIndex === 0 ? props.slides.length - 1 : currentIndex - 1
    );
  };

  return (
    <section className={classes.slider}>
      <button className={classes.leftArrow} onClick={previousSlide}>
        prev
      </button>
      <button className={classes.rightArrow} onClick={nextSlide}>
        next
      </button>
      {props.slides.map((image, index) => {
        return (
          <div key={index}>
            {index === currentIndex && (
              <>
                {image.sex === "male" ? <p>male</p> : <p>female</p>}
                <Image
                  key={image.index}
                  src={image.url}
                  alt="poodle red"
                  className={classes.sliderImage}
                  width={300}
                  height={300}
                  objectFit="cover"
                  priority
                />
              </>
            )}
          </div>
        );
      })}
    </section>
  );
};

export default ImageSlider;
