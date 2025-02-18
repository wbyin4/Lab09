document.addEventListener('DOMContentLoaded', () => {
    const userList = document.getElementById('user-list');

    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => {
            users.forEach(user => {
                const userCard = document.createElement('div');
                userCard.classList.add('user-card');
                userCard.innerHTML = `
                    <a href="user.html?id=${user.id}" style="text-decoration: none; color: inherit;">
                        <h2>${user.name}</h2>
                        <p><strong>Email:</strong> ${user.email}</p>
                        <p><strong>Phone:</strong> ${user.phone}</p>
                        <p><strong>Website:</strong> <a href="http://${user.website}" target="_blank">${user.website}</a></p>
                    </a>
                `;
                userList.appendChild(userCard);
            });
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            userList.innerHTML = '<p>Failed to load user data.</p>';
        });
});