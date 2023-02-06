import React from "react";
import { PropTypes } from "prop-types";

const Rating = ({ value, text, color = "yellow" }) => {
  const stars = [1, 2, 3, 4, 5].map((index) => (
    <i
      key={index}
      style={{ color }}
      className={
        value >= index
          ? "fas fa-star"
          : value >= index - 0.5
          ? "fas fa-star-half-alt"
          : "far fa-star"
      }
    ></i>
  ));

  return (
    <div className="rating">
      <span className="fa-beat-fade starAnimation">{stars}</span>
      <span>{text}</span>
    </div>
  );
};

// This one is for checking proptypes like typescript
Rating.prototype = {
  value: PropTypes.number.isRquired,
  text: PropTypes.string.isRquired,
  color: PropTypes.string,
};

export default Rating;
