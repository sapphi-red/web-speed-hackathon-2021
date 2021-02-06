const createFetchError = res =>
  new Error(`Failed to fetch(${res.status}): ${res.statusText}`)

/**
 * @param {object} params
 * @param {string} params.url
 * @returns {Promise<Object>}
 */
async function fetchJson({ url }) {
  const res = await fetch(url)
  if (!res.ok) throw createFetchError(res)
  return res.json()
}

/**
 * @param {object} params
 * @param {string} params.url
 * @returns {Promise<ArrayBuffer>}
 */
async function fetchBinary({ url }) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to fetch(${res.status}): ${res.statusText}`)
  return res.arrayBuffer()
}

/**
 * @param {object} params
 * @param {string} params.postId
 * @returns {Promise<Post>}
 */
async function fetchPost({ postId }) {
  return fetchJson({
    url: `/api/v1/posts/${postId}`
  })
}

/**
 * @param {object} params
 * @param {string} postId
 * @param {number} limit
 * @param {number} offset
 * @returns {Promise<Array<Comment>>}
 */
async function fetchCommentsByPost({ postId, limit, offset }) {
  const searchParams = new URLSearchParams();
  if (limit) {
    searchParams.append('limit', limit);
  }
  if (offset) {
    searchParams.append('offset', offset);
  }

  return fetchJson({
    url: `/api/v1/posts/${postId}/comments`
  })
}

/**
 * @param {object} params
 * @param {number} limit
 * @param {number} offset
 * @returns {Promise<Array<Post>>}
 */
async function fetchTimeline({ limit, offset }) {
  const searchParams = new URLSearchParams();
  if (limit) {
    searchParams.append('limit', limit);
  }
  if (offset) {
    searchParams.append('offset', offset);
  }

  return fetchJson({
    url: `/api/v1/posts?${searchParams}`
  })
}

/**
 * @param {object} params
 * @param {string} userId
 * @param {number} limit
 * @param {number} offset
 * @returns {Promise<Array<Post>>}
 */
async function fetchTimelineByUser({ userId, limit, offset }) {
  const searchParams = new URLSearchParams();
  if (limit) {
    searchParams.append('limit', limit);
  }
  if (offset) {
    searchParams.append('offset', offset);
  }

  return fetchJson({
    url: `/api/v1/users/${userId}/posts`
  })
}

/**
 * @param {object} params
 * @param {string} params.userId
 * @returns {Promise<User>}
 */
async function fetchUser({ userId }) {
  return fetchJson({
    url: `/api/v1/users/${userId}`
  })
}

/**
 * @returns {Promise<User>}
 */
async function fetchActiveUser() {
  return fetchJson({
    url: '/api/v1/me'
  })
}

/**
 * @param {object} params
 * @param {string} params.username
 * @param {string} params.name
 * @param {string} params.password
 * @returns {Promise<User>}
 */
async function sendRegister(params) {
  const res = await fetch('/api/v1/signup', {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (!res.ok) throw createFetchError(res)
  return res.json()
}

/**
 * @param {object} params
 * @param {string} params.username
 * @param {string} params.password
 * @returns {Promise<User>}
 */
async function sendSignin(params) {
  const res = await fetch('/api/v1/signin', {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json',
    }
  });
  if (!res.ok) throw createFetchError(res)
  return res.json()
}

/**
 * @param {object} params
 * @param {File} params.movie
 * @returns {Promise<Movie>}
 */
async function sendNewMovie({ movie }) {
  const res = await fetch('/api/v1/movies', {
    method: 'POST',
    body: movie,
    headers: {
      'Content-Type': 'application/octet-stream',
    }
  });
  if (!res.ok) throw createFetchError(res)
  return res.json()
}

/**
 * @param {object} params
 * @param {File} params.sound
 * @returns {Promise<Sound>}
 */
async function sendNewSound({ sound }) {
  const res = await fetch('/api/v1/sounds', {
    method: 'POST',
    body: sound,
    headers: {
      'Content-Type': 'application/octet-stream',
    }
  });
  if (!res.ok) throw createFetchError(res)
  return res.json()
}

/**
 * @param {object} params
 * @param {File} params.image
 * @returns {Promise<Image>}
 */
async function sendNewImage({ image }) {
  const res = await fetch('/api/v1/images', {
    method: 'POST',
    body: image,
    headers: {
      'Content-Type': 'application/octet-stream',
    }
  });
  if (!res.ok) throw createFetchError(res)
  return res.json()
}

/**
 * @param {object} params
 * @param {File} [params.movie]
 * @param {File} [params.sound]
 * @param {Array<File>} [params.images]
 * @param {string} params.text
 * @returns {Promise<Post>}
 */
async function sendNewPost({ movie, sound, images, text }) {
  const payload = {
    text,
    movie: movie ? await sendNewMovie({ movie }) : undefined,
    sound: sound ? await sendNewSound({ sound }) : undefined,
    images: images ? await Promise.all(images.map((image) => sendNewImage({ image }))) : [],
  };

  const res = await fetch('/api/v1/posts', {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    }
  });
  if (!res.ok) throw createFetchError(res)
  return res.json()
}

export {
  fetchBinary,
  fetchActiveUser,
  fetchPost,
  fetchCommentsByPost,
  fetchTimeline,
  fetchTimelineByUser,
  fetchUser,
  sendRegister,
  sendSignin,
  sendNewPost,
};
