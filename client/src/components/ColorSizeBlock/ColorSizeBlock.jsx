import React from "react";
import "./ColorSizeBlock.css";
import { uid } from 'uid';

const ColorSizeBlock = ({ backcolor, color, handleClick, size }) => {
  return (
      <li
        key={uid()}
        className="item__size-blocks-item"
        style={{ backgroundColor: backcolor, color: color }}
        value={size.size}
        onClick={handleClick}
      >
        {size.size}
      </li>
  );
}

export default ColorSizeBlock;