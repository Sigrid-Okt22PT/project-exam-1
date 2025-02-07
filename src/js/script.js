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
        const posts = await response.json();
        displayCarouselPosts(posts);
    } catch (error) {
        console.error('Error fetching blog posts:', error);
    }
}

async function getImageUrl(mediaId) {
    try {
        const response = await fetch(`https://sigridjohanne.site/wp-json/wp/v2/media/${mediaId}`);
        const media = await response.json();
        return media.source_url;
    } catch (error) {
        console.error('Error fetching media:', error);
        return '';
    }
}

async function displayCarouselPosts(posts) {
    const carouselInner = document.getElementById('carouselInner');
    carouselInner.innerHTML = '';

    for (const post of posts) {
        const imageUrl = await getImageUrl(post.featured_media);
        const blogPostElement = document.createElement('div');
        blogPostElement.classList.add('blog-post');
        blogPostElement.innerHTML = `
            <img src="${imageUrl}" alt="${post.title.rendered}">
            <h2>${post.title.rendered}</h2>
            <p>${post.excerpt.rendered}</p>
        `;
        carouselInner.appendChild(blogPostElement);
    }

    // Implement carousel functionality
    let currentIndex = 0;

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

    document.getElementById('prevBtn').addEventListener('click', () => {
        showSlide(currentIndex - 1);
    });

    document.getElementById('nextBtn').addEventListener('click', () => {
        showSlide(currentIndex + 1);
    });
}
// Fetch and display latest posts on page load
fetchBlogPosts();