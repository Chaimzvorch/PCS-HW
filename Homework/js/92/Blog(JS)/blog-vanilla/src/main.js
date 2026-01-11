import {
  getUsers,
  getPostsByUser,
  getCommentsByPost
} from "./api";

// DOM elements
const app = document.getElementById("app");
const homeLink = document.getElementById("homeLink");

// "State"
let currentUser = null;
let currentPosts = [];
let currentPage = 0;
const POSTS_PER_PAGE = 3;

// ---------------- USERS ----------------
async function renderUsers() {
  app.innerHTML = "<h1>Blogs</h1>";
  const users = await getUsers();

  users.forEach(user => {
    const div = document.createElement("div");

    div.innerHTML = `
      <h2>${user.name}</h2>
      <p>Website: ${user.website}</p>
      <p>Company: ${user.company.name}</p>
      <button>View Posts</button>
      <hr />
    `;

    div.querySelector("button").addEventListener("click", () => {
      loadUserPosts(user);
    });

    app.appendChild(div);
  });
}

// ---------------- POSTS ----------------
async function loadUserPosts(user) {
  currentUser = user;
  currentPage = 0;
  currentPosts = await getPostsByUser(user.id);
  renderPosts();
}

function renderPosts() {
  app.innerHTML = `<h1>${currentUser.name}'s Posts</h1>`;

  const start = currentPage * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;
  const postsToShow = currentPosts.slice(start, end);

  postsToShow.forEach(post => {
    const postDiv = document.createElement("div");
    postDiv.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.body}</p>
      <button>Show Comments</button>
      <div class="comments"></div>
      <hr />
    `;

    const button = postDiv.querySelector("button");
    const commentsDiv = postDiv.querySelector(".comments");
    let commentsVisible = false;

    button.addEventListener("click", async () => {
      if (!commentsVisible) {
        const comments = await getCommentsByPost(post.id);
        commentsDiv.innerHTML = comments
          .map(c => `<p><strong>${c.email}</strong>: ${c.body}</p>`)
          .join("");
        button.textContent = "Hide Comments";
      } else {
        commentsDiv.innerHTML = "";
        button.textContent = "Show Comments";
      }
      commentsVisible = !commentsVisible;
    });

    app.appendChild(postDiv);
  });

  renderPaginationControls();
}

// ---------------- PAGINATION ----------------
function renderPaginationControls() {
  const controls = document.createElement("div");

  const prev = document.createElement("button");
  prev.textContent = "Prev";
  prev.disabled = currentPage === 0;
  prev.onclick = () => {
    currentPage--;
    renderPosts();
  };

  const next = document.createElement("button");
  next.textContent = "Next";
  next.disabled =
    (currentPage + 1) * POSTS_PER_PAGE >= currentPosts.length;
  next.onclick = () => {
    currentPage++;
    renderPosts();
  };

  controls.append(prev, next);
  app.appendChild(controls);
}

// ---------------- NAV ----------------
homeLink.addEventListener("click", e => {
  e.preventDefault();
  renderUsers();
});

// Initial load
renderUsers();
