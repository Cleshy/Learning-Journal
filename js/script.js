"use strict";

(() => {
  // Toggle mobile menu
  const toggleNav = document.getElementById("toggle-nav");
  const navList = document.querySelector(".nav__list");

  if (toggleNav && navList) {
    toggleNav.addEventListener("click", function () {
      this.classList.toggle("toggle");
      navList.classList.toggle("show-nav");
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
      <div class="blog-post">
        <div class="blog-post__image-container">
          <img class="blog-post__image" src="${post.image}" alt="${post.alt}" />
          <span class="image-credit image-credit--bottom-center image-credit--post"
            >Photo by
            <a
              href="${post.photographer_url}"
              target="_blank"
              class="credit-link"
              >${post.photographer}</a
            >
            on
            <a
              href="${post.image_source}"
              target="_blank"
              class="credit-link"
              >Unsplash</a
            ></span
          >
        </div>
        <div class="blog-post__content">
          <span class="blog-post-date">${formattedDate}</span>
          <h3 class="blog-post__title">
            ${post.title}
          </h3>
          <p class="blog-post__description">
            ${post.description}
          </p>
          <div class="blog-post__read-more">
            <a href="#" class="blog-post__read-more-link">Read more</a>
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
