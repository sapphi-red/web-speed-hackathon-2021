import React from 'react';

const mean = nums => {
  let total = 0
  for (const n of nums) {
    total += n
  }
  return total / nums.length
}

const bimean = (arr1, arr2) => arr1.map((n, i) => (n + arr2[i]) / 2)

const chunk = (arr, chunkSize = 1, cache = []) => {
  if (chunkSize <= 0) return cache
  const max = Math.ceil(arr.length / chunkSize)
  for (let i = 0; i < max; i++) {
    cache.push(arr.subarray(i * chunkSize, (i+1) * chunkSize))
  }
  return cache
}

/**
 * @typedef {object} Props
 * @property {ArrayBuffer} soundData
 */

/**
 * @type {React.VFC<Props>}
 */
const SoundWaveSVG = ({ soundData }) => {
  const uniqueIdRef = React.useRef(Math.random().toString(16));
  const [{ max, peaks }, setPeaks] = React.useState({ max: 0, peaks: [] });

  React.useEffect(async () => {
    const audioCtx = new OfflineAudioContext(2, soundData.byteLength, 44100);

    // 音声をデコードする
    const buffer = await audioCtx.decodeAudioData(soundData.slice(0));
    // 左の音声データの絶対値を取る
    const leftData = buffer.getChannelData(0).map(Math.abs);
    // 右の音声データの絶対値を取る
    const rightData = buffer.getChannelData(1).map(Math.abs);

    // 左右の音声データの平均を取る
    const normalized = bimean(leftData, rightData);
    // 100 個の chunk に分ける
    const chunks = chunk(normalized, Math.ceil(normalized.length / 100));
    // chunk ごとに平均を取る
    const peaks = chunks.map(mean);
    // chunk の平均の中から最大値を取る
    const max = Math.max(...peaks);

    setPeaks({ max, peaks });
  }, [soundData]);

  return (
    <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 1">
      {peaks.map((peak, idx) => {
        const ratio = peak / max;
        return (
          <rect
            key={`${uniqueIdRef.current}#${idx}`}
            fill="#2563EB"
            height={ratio}
            stroke="#EFF6FF"
            strokeWidth="0.01"
            width="1"
            x={idx}
            y={1 - ratio}
          />
        );
      })}
    </svg>
  );
};

export { SoundWaveSVG };
