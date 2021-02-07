/**
 * @typedef {object} Props
 * @property {icon} Object
 */

/** @type {React.VFC<Props>} */
const FontAwesomeIcon = ({ icon }) => {
  const i = icon.icon
  return (
    <svg className="font-awesome inline-block leading-none fill-current" viewBox={`0 0 ${i[0]} ${i[1]}`}>
      <path d={i[4]}></path>
    </svg>
  );
};

export { FontAwesomeIcon };
