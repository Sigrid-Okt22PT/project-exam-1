function myNav() {
    var x = document.getElementById("navMobile");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }

  async function fetchBlogPosts() {
    try {
        const response = await fetch('https://sigridjohanne.site/wp-json/wp/v2/posts');
        const blogPosts = await response.json();
        displayBlogPosts(blogPosts);
    } catch (error) {
        console.error('Error fetching blog posts:', error);
    }
}

fetchBlogPosts();

const carouselInner = document.getElementById('carouselInner');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentIndex = 0;

function displayBlogPosts(blogPosts) {
    carouselInner.innerHTML = '';
    blogPosts.forEach(post => {
        const blogPostElement = document.createElement('div');
        blogPostElement.classList.add('blog-post');
        blogPostElement.innerHTML = `
            <img src="${post.featured_media}" alt="${post.title.rendered}">
            <h2>${post.title.rendered}</h2>
            <p>${post.excerpt.rendered}</p>
        `;
        carouselInner.appendChild(blogPostElement);
    });
}

function showSlide(index) {
    const totalSlides = document.querySelectorAll('.blog-post').length;
    if (index >= totalSlides) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = totalSlides - 1;
    } else {
        currentIndex = index;
    }
    const offset = -currentIndex * 100;
    carouselInner.style.transform = `translateX(${offset}%)`;
}

prevBtn.addEventListener('click', () => {
    showSlide(currentIndex - 1);
});

nextBtn.addEventListener('click', () => {
    showSlide(currentIndex + 1);
});

