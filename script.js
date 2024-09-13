let popCount = 0;
let soundIndex = 0; // To alternate between different pop sounds
const bubbleWrap = document.getElementById('bubble-wrap');

// List of pop sound files
const popSounds = ['pop1.mp3', 'pop2.mp3', 'pop3.mp3', 'pop4.mp3'];

// List of funny YouTube video URLs
const funnyVideos = [
    "https://www.youtube.com/watch?v=dQw4w9WgXcQ",  // Rick Astley - Never Gonna Give You Up
    "https://www.youtube.com/watch?v=ZZ5LpwO-An4",  // He-Man Sings
    "https://www.youtube.com/watch?v=3YxaaGgTQYM",  // Evanescence - Bring Me To Life
    "https://www.youtube.com/watch?v=j5a0jTc9S10",  // Sneezing Panda
    "https://www.youtube.com/watch?v=9bZkp7q19f0",  // Gangnam Style
    "https://www.youtube.com/watch?v=04854XqcfCY",  // Queen - Bohemian Rhapsody
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

                // Send event to Google Analytics
                gtag('event', 'bubble_popped', {
                    'event_category': 'engagement',
                    'event_label': 'Bubble Pop',
                    'value': popCount
                });

                if (popCount % 50 === 0) {
                    createBigBubble();
                }
            }
        });
    }
}

// Function to create a big bubble after 50 pops
function createBigBubble() {
    const bigBubble = document.createElement('div');
    bigBubble.classList.add('big-bubble');
    bubbleWrap.appendChild(bigBubble);

    bigBubble.addEventListener('click', function () {
        if (!this.classList.contains('popped')) {
            this.classList.add('popped');
            playBigPopSound();
            bubbleWrap.removeChild(bigBubble);

            // Send event to Google Analytics for big bubble
            gtag('event', 'big_bubble_popped', {
                'event_category': 'engagement',
                'event_label': 'Big Bubble Pop',
                'value': popCount
            });

            redirectToRandomVideo();
        }
    });
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

// Play the regular pop sound
function playPopSound() {
    let popSound = new Audio(popSounds[soundIndex]);
    popSound.play();
    soundIndex = (soundIndex + 1) % popSounds.length; // Cycle through the sounds
}

// Play the big bubble pop sound
function playBigPopSound() {
    let popSound = new Audio('pop5.mp3');
    popSound.play();
}

// Redirect to a random funny YouTube video
function redirectToRandomVideo() {
    const randomIndex = Math.floor(Math.random() * funnyVideos.length);
    const randomVideoUrl = funnyVideos[randomIndex];
    window.location.href = randomVideoUrl;
}

// Initial bubble creation
createBubbles(1000); // Start with 200 bubbles

// Attach the scroll event to load more bubbles
window.addEventListener('scroll', loadMoreBubbles);
