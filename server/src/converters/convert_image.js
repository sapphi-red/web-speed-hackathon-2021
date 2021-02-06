import sharp from 'sharp';

/**
 * @param {Buffer} buffer
 * @param {object} options
 * @param {number} [options.width]
 * @param {number} [options.height]
 * @param {number} [options.extension]
 * @returns {Promise<Uint8Array>}
 */
async function convertImage(buffer, options) {
  return sharp(buffer)
    .resize({
      fit: 'contain',
      width: options.width,
      height: options.height,
    })
    .toFormat(options.extension ?? 'webp')
    .toBuffer();
}

export { convertImage };
