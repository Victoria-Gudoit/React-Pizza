import React from "react";
import { useState } from "react";

export const Categories = ({ value, onChangeCategory }) => {
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => (
          <li
            key={index}
            className={value === index ? "active" : ""}
            onClick={() => onChangeCategory(index)}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};
