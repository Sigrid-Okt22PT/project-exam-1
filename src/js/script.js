function myNav() {
    var x = document.getElementById("navMobile");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }

const url ="https://sigridjohanne.site/wp-json/wp/v2/"

  async function fetchBlogPosts() {
    try {
        const response = await fetch(url+'posts');
        const posts = await response.json();
        displayCarouselPosts(posts);
        return posts;
    } catch (error) {
        console.error('Error fetching blog posts:', error);
    }
}

async function getImageUrl(mediaId) {
    try {
        const response = await fetch(url +`media/${mediaId}`);
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
        blogPostElement.addEventListener('click', () => {
            window.location.href = `blog.html?id=${post.id}`;
        });
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

fetchBlogPosts();

//list all blogposts

function displayPosts(posts) {
    const postList = document.getElementById('postList');
    postList.innerHTML = '';

    posts.forEach(post => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <h2>${post.title.rendered}</h2>
            <p>${post.date}</p>
            <p>${post.excerpt.rendered}</p>
        `;
        postList.appendChild(listItem);
    });
}

function sortPosts(posts, criteria) {
    if (criteria === 'title') {
        return posts.sort((a, b) => a.title.rendered.localeCompare(b.title.rendered));
    } else {
        return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
}

function searchPosts(posts, query) {
    return posts.filter(post => post.title.rendered.toLowerCase().includes(query.toLowerCase()));
}

document.addEventListener('DOMContentLoaded', async () => {
    let posts = await fetchBlogPosts();
    displayPosts(posts);

    const searchInput = document.getElementById('searchInput');
    const sortSelect = document.getElementById('sortSelect');

    searchInput.addEventListener('input', () => {
        const query = searchInput.value;
        const filteredPosts = searchPosts(posts, query);
        displayPosts(filteredPosts);
    });

    sortSelect.addEventListener('change', () => {
        const criteria = sortSelect.value;
        const sortedPosts = sortPosts(posts, criteria);
        displayPosts(sortedPosts);
    });
});

