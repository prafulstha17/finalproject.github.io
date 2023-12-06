import React from "react";
import "./Pictures.css";

export default function Pictures() {
  const imageFolder = "/Images/jpg";
  const imageCount = 12;

  return (
    <div className="product-categories">
      <h2 className="categories-title">For all tastes and all desires</h2>
      <div className="categories-container">
          {[...Array(imageCount)].map((_, index) => (
            <div
              key={index}
              className="category-item"
              style={{
                backgroundImage: `url(${process.env.PUBLIC_URL}${imageFolder}/${
                  index + 1
                }.jpg)`,
              }}
            >
              <div className="image-backdrop" />
            </div>
          ))}
      </div>
    </div>
  );
}
