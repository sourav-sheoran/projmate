let projects = [];
let currentProjectIndex = 0;

// Fetch projects from JSON file
async function loadProjects() {
    const response = await fetch('projects.json');
    projects = await response.json();
    showProject();
}

// Display the current project card
function showProject() {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = ''; // Clear previous card

    if (currentProjectIndex < projects.length) {
        const project = projects[currentProjectIndex];
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${project.image}" alt="${project.title}" class="card-image">
            <p class="card-text">${project.description}</p>
            <div class="action-buttons">
                <button class="button dislike" onclick="rejectProject()">❌</button>
                <button class="chat-button"><a href="/chat">Chat</a></button>
                <button class="button like" onclick="likeProject()">❤️</button>
            </div>
        `;
        cardContainer.appendChild(card);
    } else {
        cardContainer.innerHTML = '<p>No more projects to show.</p>';
    }
}

// Reject current project and move to next
function rejectProject() {
    currentProjectIndex++;
    showProject();
}

// Like current project and add to Matches
function likeProject() {
    const project = projects[currentProjectIndex];
    const matchesContainer = document.getElementById('matches');
    
    const matchItem = document.createElement('p');
    matchItem.textContent = project.title;
    matchesContainer.appendChild(matchItem);

    currentProjectIndex++;
    showProject();
}

loadProjects();
