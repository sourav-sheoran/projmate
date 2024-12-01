// Fetch content from JSON files
document.addEventListener('DOMContentLoaded', () => {
    loadLanguageData('english'); // Default language
});

// Handle language change
document.getElementById('language').addEventListener('change', function () {
    const selectedLanguage = this.value;
    loadLanguageData(selectedLanguage);
});

// Toggle "Learn More" content
document.getElementById('learn-more-btn').addEventListener('click', () => {
    const content = document.getElementById('learn-more-content');
    content.classList.toggle('visible');
    if (content.classList.contains('visible')) {
        document.getElementById('learn-more-btn').textContent = 'Show Less';
    } else {
        document.getElementById('learn-more-btn').textContent = 'Learn More';
    }
});

// Function to load language data from JSON
function loadLanguageData(language) {
    fetch('language.json')
        .then(response => response.json())
        .then(data => {
            const content = data[language];
            document.getElementById('main-title').textContent = content.mainTitle;
            document.getElementById('main-description').textContent = content.mainDescription;
            document.getElementById('learn-more-title').textContent = content.learnMoreTitle;
            document.getElementById('learn-more-text').textContent = content.learnMoreText;
        })
        .catch(error => console.error('Error loading language data:', error));
}
