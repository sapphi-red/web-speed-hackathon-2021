import classNames from 'classnames';

import { getImagePath } from '../../../utils/get_path';
import { AspectRatioBox } from '../../foundation/AspectRatioBox';
import { CoveredImage } from '../../foundation/CoveredImage';

/**
 * @typedef {object} Props
 * @property {Array<*>} images
 */

/** @type {React.VFC<Props>} */
const ImageArea = ({ images }) => {
  return (
    <AspectRatioBox aspectHeight={9} aspectWidth={16}>
      <div className="grid gap-1 grid-cols-2 grid-rows-2 w-full h-full border border-gray-300 rounded-lg overflow-hidden">
        {images.map((image, idx) => {
          return (
            <div
              key={image.id}
              // CSS Grid で表示領域を指定する
              className={classNames('bg-gray-300', {
                'row-span-1': images.length > 2 && (images.length !== 3 || idx !== 0),
                'row-span-2': images.length <= 2 || (images.length === 3 && idx === 0),
                'col-span-1': images.length !== 1,
                'col-span-2': images.length === 1,
              })}
            >
              <CoveredImage
                alt={image.alt}
                src={getImagePath(image.id, images.length >= 2)}
              >
                {
                  images.length === 1
                    ? <source media="(max-width: 400px)" srcSet={getImagePath(image.id, true)} />
                    : null
                }
              </CoveredImage>
            </div>
          );
        })}
      </div>
    </AspectRatioBox>
  );
};

export { ImageArea };
