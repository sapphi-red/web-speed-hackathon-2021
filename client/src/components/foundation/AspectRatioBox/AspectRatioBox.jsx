import React from 'react';

/**
 * @typedef {object} Props
 * @property {number} aspectWidth
 * @property {height} aspectHeight
 * @property {React.ReactNode} children
 */

/**
 * 親要素の横幅を基準にして、指定したアスペクト比のブロック要素を作ります
 * @type {React.VFC<Props>}
 */
const AspectRatioBox = ({ aspectWidth, aspectHeight, children }) => {
  const style = {
    aspectRatio: `${aspectWidth} / ${aspectHeight}`
  }

  return (
    <div className="relative w-full" style={style}>
      {children}
    </div>
  );
};

export { AspectRatioBox };
