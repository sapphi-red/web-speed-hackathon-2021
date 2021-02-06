import React from 'react';
import { useParams } from 'react-router-dom';

import { PostPage } from '../../components/post/PostPage';
import { useRegisterOnReachBottom } from '../../hooks/use_register_on_reach_bottom';
import { fetchPost, fetchCommentsByPost } from '../../utils/fetchers';
import { NotFoundContainer } from '../NotFoundContainer';

const LIMIT = 10;

/** @type {React.VFC} */
const PostContainer = () => {
  const { postId } = useParams();

  const [isLoading, setIsLoading] = React.useState(true);
  const [isFetching, setIsFetching] = React.useState(false);

  const [post, setPost] = React.useState(null);

  const [comments, setComments] = React.useState([]);

  const [offset, setOffset] = React.useState(0);

  React.useEffect(() => {
    (async () => {
      setIsFetching(true);
      const post = await fetchPost({ postId });
      setPost(post);

      // 初回は10件のみ表示する
      const firstComments = await fetchCommentsByPost({
        postId,
        limit: LIMIT,
        offset: 0,
      });
      setComments(firstComments);
      setOffset(LIMIT);
    })().finally(() => {
      setIsLoading(false);
      setIsFetching(false);
    });
  }, [postId]);

  // 画面最下部までスクロールしたときには、10件読み込む
  useRegisterOnReachBottom(() => {
    if (isFetching) return
    (async () => {
      setIsFetching(true);
      const next = await fetchCommentsByPost({
        postId,
        limit: LIMIT,
        offset,
      });

      setComments((prev) => [...prev, ...next]);
      setOffset((offset) => offset + LIMIT);
    })().finally(() => {
      setIsFetching(false);
    });
  }, [isFetching, comments, offset]);

  React.useEffect(() => {
    if (isLoading) {
      document.title = '読込中- CAwitter'
    } else if (post !== null) {
      document.title = `${post.user.name} さんのつぶやき- CAwitter`
    }
  }, [isLoading, post])

  if (isLoading) {
    return null;
  }

  if (post === null) {
    return <NotFoundContainer />;
  }

  return <PostPage post={post} comments={comments} />;
};

export { PostContainer };
