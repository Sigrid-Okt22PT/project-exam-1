function myNav() {
    var x = document.getElementById("navMobile");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}

// Fetch posts from WordPress API
const url = "https://sigridjohanne.site/wp-json/wp/v2/";
let posts = [];
let currentIndex = 0;
const postsPerPage = 10;

async function fetchBlogPosts() {
    try {
        const response = await fetch(url + 'posts');
        posts = await response.json();
        displayCarouselPosts(posts);
        displayListPosts();
        return posts;
    } catch (error) {
        console.error('Error fetching blog posts:', error);
    }
}

// Fetch image from WordPress API
async function getImageUrl(mediaId) {
    try {
        const response = await fetch(url + `media/${mediaId}`);
        const media = await response.json();
        return media.source_url;
    } catch (error) {
        console.error('Error fetching media:', error);
        return '';
    }
}

// Carousel
async function displayCarouselPosts(posts) {
    const carouselInner = document.getElementById('carouselInner');
    carouselInner.innerHTML = '';

    for (let i = 0; i < posts.length; i += 3) {
        const slide = document.createElement('div');
        slide.classList.add('slide');

        for (let j = i; j < i + 3 && j < posts.length; j++) {
            const post = posts[j];
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
            slide.appendChild(blogPostElement);
        }
        carouselInner.appendChild(slide);
    }

    let currentIndex = 0;

    function showSlide(index) {
        const totalSlides = document.querySelectorAll('.slide').length;
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

// List of posts with "Load More" functionality
function displayListPosts(filteredPosts = posts) {
    const postList = document.getElementById('postList');
    const endIndex = currentIndex + postsPerPage;
    const postToShow = filteredPosts.slice(currentIndex, endIndex);

    postToShow.forEach(post => {
        const listItem = document.createElement('li');
        listItem.classList.add('post-item');
        listItem.innerHTML = `
            <a href="blog.html?id=${post.id}">
                <h2>${post.title.rendered}</h2>
                <p>${post.excerpt.rendered}</p>
            </a>
        `;
        postList.appendChild(listItem);
    });

    currentIndex += postsPerPage;

    if (currentIndex >= filteredPosts.length) {
        document.getElementById('loadMoreBtn').style.display = 'none';
    } else {
        document.getElementById('loadMoreBtn').style.display = 'block';
    }
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
    await fetchBlogPosts();

    const searchInput = document.getElementById('searchInput');
    const sortSelect = document.getElementById('sortSelect');

    searchInput.addEventListener('input', () => {
        const query = searchInput.value;
        const filteredPosts = searchPosts(posts, query);
        currentIndex = 0;  // Reset the current index for pagination
        document.getElementById('postList').innerHTML = '';  // Clear the current posts
        displayListPosts(filteredPosts);
    });

    sortSelect.addEventListener('change', () => {
        const criteria = sortSelect.value;
        const sortedPosts = sortPosts(posts, criteria);
        currentIndex = 0;  // Reset the current index for pagination
        document.getElementById('postList').innerHTML = '';  // Clear the current posts
        displayListPosts(sortedPosts);
    });

    document.getElementById('loadMoreBtn').addEventListener('click', () => {
        displayListPosts();
    });

    // Initially display the first set of posts
    displayListPosts();
});
