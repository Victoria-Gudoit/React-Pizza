import React from "react";

type CategoriesProps = {
  value: number;
  onChangeCategory: (i: number) => void;
};

const categories = [
  "Все",
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];

export const Categories: React.FC<CategoriesProps> = ({
  value,
  onChangeCategory,
}) => {
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
