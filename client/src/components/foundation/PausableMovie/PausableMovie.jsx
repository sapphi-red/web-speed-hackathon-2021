import classNames from 'classnames';
import React from 'react';

import { FontAwesomeIcon } from '../FontAwesomeIcon/FontAwesomeIcon';

/**
 * @typedef {object} Props
 * @property {string} src
 */

/**
 * クリックすると再生・一時停止を切り替えます。
 * @type {React.VFC<Props>}
 */
const PausableMovie = ({ src }) => {
  /** @type {React.RefObject<HTMLVideoElement>} */
  const videoRef = React.useRef(null);

  const [isPlaying, setIsPlaying] = React.useState(true);

  const handleClick = React.useCallback(() => {
    if (isPlaying) {
      videoRef.current?.pause();
      setIsPlaying(false);
    } else {
      videoRef.current?.play();
      setIsPlaying(true);
    }
  }, [isPlaying]);

  return (
    <button className="group relative block w-full h-full" type="button" onClick={handleClick}>
      <video src={src} ref={videoRef} className="w-full" muted autoPlay loop />
      <div
        className={classNames(
          'absolute left-1/2 top-1/2 flex items-center justify-center w-16 h-16 text-white text-3xl bg-black bg-opacity-50 rounded-full transform -translate-x-1/2 -translate-y-1/2',
          { 'opacity-0 group-hover:opacity-100': isPlaying },
        )}
      >
        <FontAwesomeIcon iconType={isPlaying ? 'pause' : 'play'} styleType="solid" />
      </div>
    </button>
  );
};

export { PausableMovie };
