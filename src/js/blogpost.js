function getPostIdFromQueryString() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

async function fetchBlogPost(postId) {
    try {
        const response = await fetch(`https://sigridjohanne.site/wp-json/wp/v2/posts/${postId}`);
        const post = await response.json();
        const imageUrl = await getImageUrl(post.featured_media);
        displayBlogPost(post, imageUrl);
    } catch (error) {
        console.error('Error fetching blog post:', error);
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

function displayBlogPost(post, imageUrl) {
    const blogPostContent = document.getElementById('blogPostContent');
    blogPostContent.innerHTML = `
        <img src="${imageUrl}" alt="${post.title.rendered}">
         <h1>${post.title.rendered}</h1>
        <div>${post.content.rendered}</div>
        
    `;
}

// Fetch and display the blog post by its ID from the query string
const postId = getPostIdFromQueryString();
fetchBlogPost(postId);