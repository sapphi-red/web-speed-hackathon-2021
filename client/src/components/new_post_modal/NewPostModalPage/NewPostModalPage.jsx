import { useState, useCallback } from 'react';

import { faImages, faMusic, faVideo } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '../../foundation/FontAwesomeIcon';
import { ModalErrorMessage } from '../../modal/ModalErrorMessage';
import { ModalSubmitButton } from '../../modal/ModalSubmitButton';
import { AttachFileInputButton } from '../AttachFileInputButton';

const MAX_UPLOAD_BYTES_LIMIT = 10 * 1024 * 1024;

/**
 * @typedef {object} SubmitParams
 * @property {'signin' | 'signup'} type
 * @property {string} username
 * @property {string} name
 * @property {string} password
 */

/**
 * @typedef {object} Props
 * @property {(params: SubmitParams) => void} onSubmit
 * @property {() => void} onResetError
 * @property {boolean} isLoading
 * @property {boolean} hasError
 */

/** @type {React.VFC<Props>} */
const NewPostModalPage = ({ onSubmit, onResetError, isLoading, hasError }) => {
  const [params, setParams] = useState({ text: '', movie: undefined, sound: undefined, images: [] });

  const [hasFileError, setHasFileError] = useState(false);

  /** @type {React.ChangeEventHandler<HTMLInputElement>} */
  const handleChangeText = useCallback((ev) => {
    const value = ev.currentTarget.value;
    setParams((params) => ({ ...params, text: value }));
  }, []);

  /** @type {React.ChangeEventHandler<HTMLInputElement>} */
  const handleChangeImages = useCallback((ev) => {
    const files = Array.from(ev.currentTarget.files).slice(0, 4);
    const isValid = files.every((file) => file.size <= MAX_UPLOAD_BYTES_LIMIT);

    setHasFileError(isValid !== true);
    if (isValid) {
      setParams((params) => ({ ...params, images: files, movie: undefined, sound: undefined }));
    }
  }, []);

  /** @type {React.ChangeEventHandler<HTMLInputElement>} */
  const handleChangeSound = useCallback((ev) => {
    const file = ev.currentTarget.files[0];
    const isValid = file?.size <= MAX_UPLOAD_BYTES_LIMIT;

    setHasFileError(isValid !== true);
    if (isValid) {
      setParams((params) => ({ ...params, sound: file, images: [], movie: undefined }));
    }
  }, []);

  /** @type {React.ChangeEventHandler<HTMLInputElement>} */
  const handleChangeMovie = useCallback((ev) => {
    const file = ev.currentTarget.files[0];
    const isValid = file?.size <= MAX_UPLOAD_BYTES_LIMIT;

    setHasFileError(isValid !== true);
    if (isValid) {
      setParams((params) => ({ ...params, movie: file, images: [], sound: undefined }));
    }
  }, []);

  const handleSubmit = useCallback(() => {
    onResetError();
    onSubmit(params);
  }, [params, onSubmit, onResetError]);

  return (
    <section className="flex flex-col items-center w-full">
      <textarea
        className="placeholder-gray-300 p-4 w-full h-24 border border-gray-300 rounded resize-none"
        placeholder="いまなにしてる？"
        onChange={handleChangeText}
      />
      <p className="flex items-center justify-evenly mt-4 w-full text-gray-900">
        <AttachFileInputButton
          accept="image/*"
          active={params.images.length !== 0}
          icon={<FontAwesomeIcon icon={faImages} />}
          onChange={handleChangeImages}
        />
        <AttachFileInputButton
          accept="audio/*"
          active={params.sound !== undefined}
          icon={<FontAwesomeIcon icon={faMusic} />}
          onChange={handleChangeSound}
        />
        <AttachFileInputButton
          accept="video/*"
          active={params.movie !== undefined}
          icon={<FontAwesomeIcon icon={faVideo} />}
          onChange={handleChangeMovie}
        />
      </p>
      <p className="mt-4">
        <ModalSubmitButton disabled={isLoading || params.text === ''} loading={isLoading} onClick={handleSubmit}>
          投稿する
        </ModalSubmitButton>
      </p>
      <p className="mt-4">
        <ModalErrorMessage>
          {hasFileError ? '10 MB より小さくしてください' : hasFileError ? '投稿ができませんでした' : null}
        </ModalErrorMessage>
      </p>
    </section>
  );
};

export { NewPostModalPage };
