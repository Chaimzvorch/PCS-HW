const BASE_URL = "https://jsonplaceholder.typicode.com";

export async function getUsers() {
  const res = await fetch(`${BASE_URL}/users`);
  return res.json();
}

export async function getPostsByUser(userId) {
  const res = await fetch(`${BASE_URL}/posts?userId=${userId}`);
  return res.json();
}

export async function getCommentsByPost(postId) {
  const res = await fetch(`${BASE_URL}/comments?postId=${postId}`);
  return res.json();
}
