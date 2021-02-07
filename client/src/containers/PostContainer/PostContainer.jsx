import { lazy, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { PostPage } from '../../components/post/PostPage';
import { useRegisterOnReachBottom } from '../../hooks/use_register_on_reach_bottom';
import { fetchPost, fetchCommentsByPost } from '../../utils/fetchers';

const NotFoundContainer = lazy(() => import('../NotFoundContainer'));

const LIMIT = 10;

/** @type {React.VFC} */
const PostContainer = () => {
  const { postId } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  const [post, setPost] = useState(null);

  const [comments, setComments] = useState([]);

  const [offset, setOffset] = useState(0);

  useEffect(() => {
    (async () => {
      const post = await fetchPost({ postId });
      setPost(post);
    })().finally(() => {
      setIsLoading(false);
    });
  }, [postId]);

  useEffect(() => {
    (async () => {
      setIsFetching(true);
      // 初回は10件のみ表示する
      const firstComments = await fetchCommentsByPost({
        postId,
        limit: LIMIT,
        offset: 0,
      });
      setComments(firstComments);
      setOffset(LIMIT);
    })().finally(() => {
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

  useEffect(() => {
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
