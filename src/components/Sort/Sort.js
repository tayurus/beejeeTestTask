import React from "react";

import "./Sort.css";

export const Sort = props => {
  const { items, currentItem, direction, onItemClick } = props;

  function handleItemClick(item, index) {
    if (currentItem === item) {
      if (props.direction === "desc") {
        onItemClick(item, "asc");
      } else {
        onItemClick(item, "desc");
      }
    } else {
      onItemClick(item, "asc");
    }
  }

  return (
    <div className="Sort">
      <div className="Sort__label">Sort by:</div>
      <div className="Sort__items-row">
        {items.map((item, index) => (
          <div
            key={index}
            onClick={() => handleItemClick(item, index)}
            className={"Sort__item " + (item === currentItem ? "active " + direction : "")}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};
