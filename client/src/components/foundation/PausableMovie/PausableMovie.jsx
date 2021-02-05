import classNames from 'classnames';
import gifler from 'gifler';
import React from 'react';

import { fetchBinary } from '../../../utils/fetchers';
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
  /** @type {React.RefObject<HTMLImageElement>} */
  const canvasRef = React.useRef(null);
  /** @type {React.RefObject<import('gifler').Animator>} */
  const animatorRef = React.useRef(null);

  React.useEffect(() => {
    (async () => {
      const data = await fetchBinary({ url: src });
      // gifler.Gif は GIF を解析する
      const gif = new gifler.Gif(Promise.resolve(data));
      // gif.animate でアニメーションを制御 Animator が作られる
      const animator = await gif.animate(canvasRef.current);
      animatorRef.current = animator;
    })();

    return () => animatorRef.current?.stop();
  }, []);

  const [isPlaying, setIsPlaying] = React.useState(true);

  const handleClick = React.useCallback(() => {
    if (isPlaying) {
      animatorRef.current?.stop();
      setIsPlaying(false);
    } else {
      animatorRef.current?.start();
      setIsPlaying(true);
    }
  }, [isPlaying]);

  return (
    <button className="group relative block w-full h-full" type="button" onClick={handleClick}>
      <canvas ref={canvasRef} className="w-full" />
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