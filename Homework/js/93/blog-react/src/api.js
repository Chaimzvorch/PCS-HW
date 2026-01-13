const API_BASE = 'https://jsonplaceholder.typicode.com';

export const fetchUsers = async () =>
  fetch(`${API_BASE}/users`).then(r => r.json());

export const fetchPostsByUser = async (userId) =>
  fetch(`${API_BASE}/posts?userId=${userId}`).then(r => r.json());

export const fetchCommentsByPost = async (postId) =>
  fetch(`${API_BASE}/comments?postId=${postId}`).then(r => r.json());
