import React from "react";
const imgStyle = { width: "200px", height: "200px", objectFit: "cover" };
const Product = ({ product }) => {
  return (
      <div className="card_container">
        <div className="card_image">
          <img src={product.data.thumbnail} style={imgStyle} />
        </div>
        <div className="card_text">
          <div className="card_text_title">{product.data.name}</div>
          <div className="card_text_desc">
            {product.data.description && product.data.description.length > 160
              ? product.data.description.substring(0, 160) + "... "
              : product.data.description}
          </div>
          <div className="card_text_more">Read more</div>
        </div>
      </div>
  );
};

export default Product;
