document.addEventListener('DOMContentLoaded', () => {
    const postList = document.getElementById('post-list');
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId');

    // Fetch user posts
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
        .then(response => response.json())
        .then(posts => {
            if (posts.length === 0) {
                postList.innerHTML = '<p>This user has no posts.</p>';
                return;
            }

            posts.forEach(post => {
                const postCard = document.createElement('div');
                postCard.classList.add('post-card');
                postCard.innerHTML = `
                    <h3>${post.title}</h3>
                    <p>${post.body}</p>
                    <button class="view-comments" data-post-id="${post.id}">View Comments</button>
                    <div class="comments" id="comments-${post.id}" style="display: none;"></div>
                `;
                postList.appendChild(postCard);
            });

            // Add event listeners to the buttons
            document.querySelectorAll('.view-comments').forEach(button => {
                button.addEventListener('click', (event) => {
                    const postId = event.target.getAttribute('data-post-id');
                    const commentsDiv = document.getElementById(`comments-${postId}`);
                    if (commentsDiv.style.display === 'none') {
                        fetchComments(postId, commentsDiv);
                    } else {
                        commentsDiv.style.display = 'none'; // Hide comments if already shown
                    }
                });
            });
        })
        .catch(error => {
            console.error('Error fetching user posts:', error);
            postList.innerHTML = '<p>Failed to load posts.</p>';
        });
});

// Function to fetch comments for a specific post
function fetchComments(postId, commentsDiv) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
        .then(response => response.json())
        .then(comments => {
            commentsDiv.innerHTML = ''; // Clear previous comments
            if (comments.length === 0) {
                commentsDiv.innerHTML = '<p>No comments for this post.</p>';
            } else {
                comments.forEach(comment => {
                    const commentCard = document.createElement('div');
                    commentCard.classList.add('comment-card');
                    commentCard.innerHTML = `
                        <strong>${comment.name}</strong>
                        <p>${comment.body}</p>
                        <p><em>By: ${comment.email}</em></p>
                    `;
                    commentsDiv.appendChild(commentCard);
                });
            }
            commentsDiv.style.display = 'block'; // Show comments
        })
        .catch(error => {
            console.error('Error fetching comments:', error);
            commentsDiv.innerHTML = '<p>Failed to load comments.</p>';
        });
}