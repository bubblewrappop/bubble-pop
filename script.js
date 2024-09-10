let popCount = 0;
let isPop1 = true; // To alternate between pop1 and pop2 sounds
const bubbleWrap = document.getElementById('bubble-wrap');

// List of funny YouTube video URLs
const funnyVideos = [
    "https://www.youtube.com/watch?v=dQw4w9WgXcQ",  // Rick Astley - Never Gonna Give You Up
    // "https://www.youtube.com/watch?v=ZZ5LpwO-An4",  // He-Man Sings
    // "https://www.youtube.com/watch?v=3YxaaGgTQYM",  // Evanescence - Bring Me To Life
    // "https://www.youtube.com/watch?v=j5a0jTc9S10",  // Sneezing Panda
    // "https://www.youtube.com/watch?v=9bZkp7q19f0",  // Gangnam Style
    // "https://www.youtube.com/watch?v=04854XqcfCY",  // Queen - Bohemian Rhapsody
];

// Function to create and add bubbles
function createBubbles(count) {
    for (let i = 0; i < count; i++) {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        bubbleWrap.appendChild(bubble);
        
        bubble.addEventListener('click', function () {
            if (!this.classList.contains('popped')) {
                this.classList.add('popped');
                playPopSound();
                popCount++;
                if (popCount % 10 === 0) {
                    redirectToRandomVideo();
                }
            }
        });
    }
}

// Function to load more bubbles as you scroll
function loadMoreBubbles() {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const bodyHeight = document.body.offsetHeight;

    if (scrollTop + windowHeight >= bodyHeight - 100) {
        createBubbles(100); // Add 100 more bubbles when nearing the bottom
    }
}

// Play the pop sound
function playPopSound() {
    let popSound = new Audio(isPop1 ? 'pop1.mp3' : 'pop2.mp3');
    popSound.play();
    isPop1 = !isPop1; // Alternate the sound for the next pop
}

// Redirect to a random funny YouTube video
function redirectToRandomVideo() {
    const randomIndex = Math.floor(Math.random() * funnyVideos.length);
    const randomVideoUrl = funnyVideos[randomIndex];
    window.location.href = randomVideoUrl;
}

// Initial bubble creation
createBubbles(400); // Start with 200 bubbles

// Attach the scroll event to load more bubbles
window.addEventListener('scroll', loadMoreBubbles);
