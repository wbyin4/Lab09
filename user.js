document.addEventListener('DOMContentLoaded', () => {
    const userDetails = document.getElementById('user-details');
    const viewPostsButton = document.getElementById('view-posts');
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('id');

    // Fetch user details
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then(response => response.json())
        .then(user => {
            userDetails.innerHTML = `
                <h2>${user.name}</h2>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Phone:</strong> ${user.phone}</p>
                <p><strong>Website:</strong> <a href="http://${user.website}" target="_blank">${user.website}</a></p>
                <p><strong>Address:</strong> ${user.address.street}, ${user.address.city}, ${user.address.zipcode}</p>
                <p><strong>Company:</strong> ${user.company.name}</p>
            `;

            // Add event listener to the button
            viewPostsButton.addEventListener('click', () => {
                window.location.href = `posts.html?userId=${userId}`;
            });
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            userDetails.innerHTML = '<p>Failed to load user data.</p>';
        });
});