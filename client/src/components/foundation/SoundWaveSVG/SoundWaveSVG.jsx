import React from 'react';

/**
 * @typedef {object} Props
 * @property {string} src
 */

/**
 * @type {React.VFC<Props>}
 */
const SoundWaveSVG = ({ src }) => {
  return (
    <img src={`${src}.meta.svg`} className="w-full h-full" />
  );
};

export { SoundWaveSVG };
