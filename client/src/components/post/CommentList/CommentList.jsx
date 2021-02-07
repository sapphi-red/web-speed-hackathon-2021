import { CommentItem } from '../CommentItem';

/**
 * @typedef {object} Props
 * @property {Array<*>} comments
 */

/** @type {React.VFC<Props>} */
const CommentList = ({ comments }) => {
  return (
    <div>
      {comments.map((comment) => {
        return <CommentItem key={comment.id} comment={comment} />;
      })}
    </div>
  );
};

export { CommentList };
