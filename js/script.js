"use strict";

(() => {
  // Toggle mobile menu
  const toggleNav = document.getElementById("toggle-nav");
  const navList = document.querySelector(".nav__list");

  if (toggleNav && navList) {
    toggleNav.addEventListener("click", function () {
      this.classList.toggle("toggle");
      navList.classList.toggle("show-nav");

      if (this.classList.contains("toggle")) {
        document.body.style.overflow = "hidden";
      }
    });

    navList.addEventListener("click", function (e) {
      console.log(e.target);
    });
  }

  // Footer date
  const setFooterDate = () => {
    const yearEl = document.querySelector(".year");
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  };

  setFooterDate();
})();

/* ======================
Get & Render recent posts
====================== */

document.addEventListener("DOMContentLoaded", async () => {
  const pagePostsEl = document.getElementById("posts__container");
  const homePagePostsEl = document.getElementById("posts__container-home");

  const viewMoreBtn = document.getElementById("view-more-btn");

  const posts = await getPosts();

  if (pagePostsEl) {
    renderPosts(pagePostsEl, posts);
  }

  if (homePagePostsEl) {
    let visiblePosts = 3;
    renderPosts(homePagePostsEl, posts, visiblePosts);

    viewMoreBtn.addEventListener("click", () => {
      visiblePosts += 3;
      renderPosts(homePagePostsEl, posts, visiblePosts);

      if (visiblePosts >= posts.length) {
        viewMoreBtn.style.display = "none";
      }
    });
  }
});

async function getPosts() {
  try {
    const response = await fetch("js/posts.json");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const posts = await response.json();
    return posts;
  } catch (error) {
    console.error("Error loading posts:", error);
    return [];
  }
}

async function renderPosts(postsEl, posts, postCounter = 3) {
  let postsHTML = "";

  posts.slice(0, postCounter).forEach((post) => {
    const formattedDate =
      typeof formatDateToText === "function"
        ? formatDateToText(post.date)
        : post.date;

    postsHTML += `
      <div class="post">
        <div class="post__img-container">
          <img class="post__img" src="${post.image}" alt="${post.alt}" />
          <span class="post__img-unplash"
            >Photo by
            <a
              href="${post.photographer_url}"
              target="_blank"
              class="unplash-link"
              >${post.photographer}</a
            >
            on
            <a
              href="${post.image_source}"
              target="_blank"
              class="unplash-link"
              >Unsplash</a
            ></span
          >
        </div>
        <div class="post__info">
          <span class="post__date">${formattedDate}</span>
          <h3 class="post__title">
            ${post.title}
          </h3>
          <p class="post__description">
            ${post.description}
          </p>
          <div class="post__read-more">
            <a href="#" class="read-more">Read more</a>
          </div>
        </div>
      </div>
    `;
  });

  postsEl.innerHTML = postsHTML;
}

function formatDateToText(dateString) {
  const months = [
    "JANUARY",
    "FEBRUARY",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUGUST",
    "SEPTEMBER",
    "OCTOBER",
    "NOVEMBER",
    "DECEMBER",
  ];

  const [year, month, day] = dateString.split("-");

  return `${months[parseInt(month) - 1]} ${parseInt(day)}, ${year}`;
}
