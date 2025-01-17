import React from 'react';

import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';

import { fetchBinary } from '../../../utils/fetchers';
import { AspectRatioBox } from '../AspectRatioBox';
import { FontAwesomeIcon } from '../FontAwesomeIcon';
import { SoundWaveSVG } from '../SoundWaveSVG';

/**
 * @typedef {object} Props
 * @property {string} src
 * @property {string} title
 * @property {string} artist
 */

/**
 * @type {React.VFC<Props>}
 */
const SoundPlayer = ({ src, title, artist }) => {
  /** @type {React.RefObject<HTMLAudioElement>} */
  const audioRef = React.useRef(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentTimeRatio, setCurrentTimeRatio] = React.useState(0);

  const handleTogglePlaying = React.useCallback(() => {
    setIsPlaying((isPlaying) => {
      isPlaying ? audioRef.current?.pause() : audioRef.current?.play();
      return !isPlaying;
    });
  }, []);

  const handleTimeUpdate = React.useCallback(() => {
    setCurrentTimeRatio(audioRef.current?.currentTime / audioRef.current?.duration);
  }, []);

  const progress = currentTimeRatio * 100
  const style = {
    aspectRatio: '15 / 2',
    WebkitMaskImage:
      'linear-gradient(' +
      'to right,' +
      'rgba(0, 0, 0, 1) 0%,' +
      `rgba(0, 0, 0, 1) ${progress}%,` +
      `rgba(0, 0, 0, .25) ${progress}%,` +
      'rgba(0, 0, 0, .25) 100%)'
  }

  return (
    <div className="flex items-center justify-center w-full h-full">
      <audio ref={audioRef} loop={true} src={src} preload="none" onTimeUpdate={handleTimeUpdate} />
      <div className="p-2">
        <button
          className="flex items-center justify-center w-8 h-8 text-white text-sm bg-blue-600 rounded-full hover:opacity-75"
          type="button"
          onClick={handleTogglePlaying}
        >
          <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
        </button>
      </div>
      <div className="flex flex-col flex-grow flex-shrink pt-2 min-w-0 h-full">
        <p className="whitespace-nowrap text-sm font-bold overflow-hidden overflow-ellipsis">{title}</p>
        <p className="text-gray-500 whitespace-nowrap text-sm overflow-hidden overflow-ellipsis">{artist}</p>
        <AspectRatioBox aspectHeight={2} aspectWidth={15}>
          <div className="w-full h-full mt-2" style={style}>
            <SoundWaveSVG src={src} />
          </div>
        </AspectRatioBox>
      </div>
    </div>
  );
};

export { SoundPlayer };
