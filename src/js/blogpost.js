function getPostIdFromQueryString() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

async function fetchBlogPost(postId) {
    try {
        const response = await fetch(`https://sigridjohanne.site/wp-json/wp/v2/posts/${postId}`);
        const post = await response.json();
        const mediaInfo = await getMediaInfo(post.featured_media);
        displayBlogPost(post, mediaInfo);
    } catch (error) {
        console.error('Error fetching blog post:', error);
    }
}

async function getMediaInfo(mediaId) {
    try {
        const response = await fetch(`https://sigridjohanne.site/wp-json/wp/v2/media/${mediaId}`);
        const media = await response.json();
        return {
            link: media.source_url,
            title: media.title.rendered,
            // Add other properties as needed
        };
    } catch (error) {
        console.error('Error fetching media:', error);
        return {};
    }
}

function displayBlogPost(post, mediaInfo) {
    const blogPostContent = document.getElementById('blogPostContent');
    blogPostContent.innerHTML = `
        <img src="${mediaInfo.link}" alt="${mediaInfo.title}">
        <h1>${post.title.rendered}</h1>
        <div>${post.content.rendered}</div>
    `;
    // Add title to browser tab
    document.title = `${post.title.rendered} | Outdoor Adventure`;

    // Modal for larger picture
    const modal = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");
    const closeModal = document.getElementById("closeModal");

    // Open modal for featured image
    document.querySelector('.blog-post-page img').addEventListener('click', () => {
        modal.style.display = "flex";
        modalImage.src = mediaInfo.link;
        modalImage.alt = mediaInfo.title;
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = "none";
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    // Open modal for other images inside the post
    const images = document.querySelectorAll('.blog-post-page img');
    images.forEach((img) => {
        img.addEventListener('click', (event) => {
            modal.style.display = "flex";
            modalImage.src = event.target.src;
        });
    });
}

// Fetch and display the blog post by its ID from the query string
const postId = getPostIdFromQueryString();
fetchBlogPost(postId);
