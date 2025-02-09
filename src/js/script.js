function myNav() {
    var x = document.getElementById("navMobile");
    if (x.style.display === "flex") {
        x.style.display = "none";
    } else {
        x.style.display = "flex";
    }
}

// Fetch posts from WordPress API
const url = "https://sigridjohanne.site/wp-json/wp/v2/";
let posts = [];
let currentIndex = 0;
const postsPerPage = 10;
let page = 1; 
let totalPages = 1; 

async function fetchBlogPosts() {
    try {
        while (page <= totalPages) {
            const response = await fetch(`${url}posts?page=${page}`);
            const newPosts = await response.json();
            posts = posts.concat(newPosts);
            const totalPagesHeader = response.headers.get('X-WP-TotalPages');
            totalPages = totalPagesHeader ? parseInt(totalPagesHeader) : 1;
            page++;
        }
        displayCarouselPosts(posts.slice(0,9)); //Only display the 9 most recent blogs 
        displayListPosts(); 
    } catch (error) {
        console.error('Error fetching blog posts:', error);
    }
}

// Fetch image URL from WordPress API
async function getImageUrl(mediaId) {
    try {
        const response = await fetch(`${url}media/${mediaId}`);
        const media = await response.json();
        return {
            link: media.link,
            slug: media.slug,
            title: media.title.rendered,
        };
    } catch (error) {
        console.error('Error fetching media:', error);
        return '';
    }
}

// Carousel
async function displayCarouselPosts(posts) {
    const carouselInner = document.getElementById('carouselInner');
    if (!carouselInner) return;
    
    carouselInner.innerHTML = '';

    for (let i = 0; i < posts.length; i += 3) {
        const slide = document.createElement('div');
        slide.classList.add('slide');

        for (let j = i; j < i + 3 && j < posts.length; j++) {
            const post = posts[j];
            const imageInfo = await getImageUrl(post.featured_media);
            const blogPostElement = document.createElement('div');
            blogPostElement.classList.add('blog-post');
            blogPostElement.innerHTML = `
                <img src="${imageInfo.link}" alt="${imageInfo.title}">
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

    document.getElementById('phoneBtn').addEventListener('click', () => {
        showSlide(currentIndex + 1);
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// List of posts 
function displayListPosts(filteredPosts = posts) {
    const postList = document.getElementById('postList');
    if (!postList) return;
    
    const endIndex = currentIndex + postsPerPage;
    const postToShow = filteredPosts.slice(currentIndex, endIndex);


    postToShow.forEach(post => {
        const listItem = document.createElement('li');
        listItem.classList.add('post-item');
        listItem.innerHTML = `
            <a href="blog.html?id=${post.id}">
                <h2>${post.title.rendered}</h2>
                <span>${post.date}</span>
                <p>${post.excerpt.rendered}</p>
            </a>
        `;
        postList.appendChild(listItem);
    });

    // Update currentIndex
    currentIndex += postsPerPage;

    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (!loadMoreBtn) return;

    // Hide when no more posts
    if (currentIndex >= filteredPosts.length) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'block';
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
        currentIndex = 0;  
        document.getElementById('postList').innerHTML = '';  
        displayListPosts(filteredPosts);
    });

    sortSelect.addEventListener('change', () => {
        const criteria = sortSelect.value;
        const sortedPosts = sortPosts(posts, criteria);
        currentIndex = 0;  
        document.getElementById('postList').innerHTML = '';  
        displayListPosts(sortedPosts);
    });

    document.getElementById('loadMoreBtn').addEventListener('click', () => {
        displayListPosts(posts);  
    });
    

});
