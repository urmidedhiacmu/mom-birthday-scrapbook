// Firebase configuration and initialization
let db;
let storage;

function initializeFirebase() {
    // Firebase Firestore
    db = firebase.firestore();
    
    // Firebase Storage
    storage = firebase.storage();
    
    console.log("Firebase initialized successfully");
}

initializeFirebase();

// Password Protection Functions
function checkAuth() {
    return localStorage.getItem('scrapbookAuth') === 'true';
}

function showLoginScreen() {
    const overlay = document.createElement('div');
    overlay.className = 'login-overlay';
    
    const loginBox = document.createElement('div');
    loginBox.className = 'login-box';
    
    const heading = document.createElement('h2');
    heading.textContent = 'Enter Password';
    
    const passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.placeholder = 'Password';
    passwordInput.id = 'password-input';
    
    const loginButton = document.createElement('button');
    loginButton.textContent = 'Enter';
    loginButton.addEventListener('click', function() {
        const password = document.getElementById('password-input').value;
        // Set your desired password here
        if (password === 'mom50birthday') {
            localStorage.setItem('scrapbookAuth', 'true');
            overlay.remove();
            window.location.reload(); // Reload to initialize all components correctly
        } else {
            alert('Incorrect password. Please try again.');
        }
    });
    
    // Add enter key support
    passwordInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            loginButton.click();
        }
    });
    
    loginBox.appendChild(heading);
    loginBox.appendChild(passwordInput);
    loginBox.appendChild(loginButton);
    overlay.appendChild(loginBox);
    document.body.appendChild(overlay);
}

function addLogoutButton() {
    const nav = document.querySelector('nav ul');
    const logoutItem = document.createElement('li');
    const logoutLink = document.createElement('a');
    logoutLink.href = '#';
    logoutLink.innerHTML = '<i class="fas fa-sign-out-alt"></i> Logout';
    logoutLink.addEventListener('click', function(e) {
        e.preventDefault();
        localStorage.removeItem('scrapbookAuth');
        window.location.reload();
    });
    logoutItem.appendChild(logoutLink);
    nav.appendChild(logoutItem);
}

// Confetti Animation
function celebrateWithConfetti() {
    const duration = 3 * 1000;
    const end = Date.now() + duration;
    
    (function frame() {
        confetti({
            particleCount: 2,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#8e44ad', '#e84393', '#3498db', '#f1c40f']
        });
        
        confetti({
            particleCount: 2,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#8e44ad', '#e84393', '#3498db', '#f1c40f']
        });
        
        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}

// Countdown Timer
function createCountdown() {
    // Set the date we're counting down to (format: YYYY-MM-DD)
    // Replace with your mom's birthday
    const birthdayDate = "2025-04-06"; 
    
    // Create countdown element in the header
    const titleContainer = document.querySelector('.title-container');
    if (!titleContainer) return; // Safety check
    
    const countdownContainer = document.createElement('div');
    countdownContainer.className = 'countdown-container';
    
    const countdownTitle = document.createElement('p');
    countdownTitle.className = 'countdown-title';
    countdownTitle.textContent = 'Countdown to the big day:';
    
    const countdownTimer = document.createElement('div');
    countdownTimer.className = 'countdown-timer';
    countdownTimer.innerHTML = `
        <div class="countdown-item">
            <span id="countdown-days">00</span>
            <span class="countdown-label">Days</span>
        </div>
        <div class="countdown-item">
            <span id="countdown-hours">00</span>
            <span class="countdown-label">Hours</span>
        </div>
        <div class="countdown-item">
            <span id="countdown-minutes">00</span>
            <span class="countdown-label">Minutes</span>
        </div>
        <div class="countdown-item">
            <span id="countdown-seconds">00</span>
            <span class="countdown-label">Seconds</span>
        </div>
    `;
    
    countdownContainer.appendChild(countdownTitle);
    countdownContainer.appendChild(countdownTimer);
    titleContainer.appendChild(countdownContainer);
    
    // Update the countdown every 1 second
    const countdownFunction = setInterval(function() {
        // Get today's date and time
        const now = new Date().getTime();
        
        // Set the birthday date
        const birthday = new Date(birthdayDate).getTime();
        
        // Find the distance between now and the birthday date
        const distance = birthday - now;
        
        // If the birthday is in the past, show a celebration message
        if (distance < 0) {
            clearInterval(countdownFunction);
            countdownTimer.innerHTML = '<div class="birthday-message">Happy 50th Birthday Mom! 🎉</div>';
            return;
        }
        
        // Time calculations for days, hours, minutes and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Display the result
        const daysElement = document.getElementById("countdown-days");
        const hoursElement = document.getElementById("countdown-hours");
        const minutesElement = document.getElementById("countdown-minutes");
        const secondsElement = document.getElementById("countdown-seconds");
        
        if (daysElement) daysElement.textContent = days.toString().padStart(2, '0');
        if (hoursElement) hoursElement.textContent = hours.toString().padStart(2, '0');
        if (minutesElement) minutesElement.textContent = minutes.toString().padStart(2, '0');
        if (secondsElement) secondsElement.textContent = seconds.toString().padStart(2, '0');
    }, 1000);
}

// Quiz Functionality

function formatDate(dateString) {
    // Convert date string to a more readable format
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Uses local date format
}

function displayLeaderboard(container, leaderboard) {
    console.log("leaderboard visual")
    if (!container) return; // Safety check
    
    // Create leaderboard element
    const leaderboardElement = document.createElement('div');
    leaderboardElement.className = 'quiz-leaderboard';
    
    // Create leaderboard header
    const leaderboardHeader = document.createElement('h3');
    leaderboardHeader.textContent = 'Quiz Leaderboard';
    
    // Create leaderboard table
    const leaderboardTable = document.createElement('table');
    leaderboardTable.className = 'leaderboard-table';
    
    // Create table header
    const tableHeader = document.createElement('thead');
    tableHeader.innerHTML = `
        <tr>
            <th class="leaderboard-rank">Rank</th>
            <th class="leaderboard-name">Name</th>
            <th class="leaderboard-score">Score</th>
            <th class="leaderboard-date">Date</th>
        </tr>
    `;
    
    // Create table body
    const tableBody = document.createElement('tbody');
    
    // Add entries to table
    leaderboard.forEach((entry, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="leaderboard-rank">${index + 1}</td>
            <td class="leaderboard-name">${entry.name}</td>
            <td class="leaderboard-score">${entry.score}%</td>
            <td class="leaderboard-date">${formatDate(entry.date)}</td>
        `;
        tableBody.appendChild(row);
    });
    
    // Assemble the leaderboard
    leaderboardTable.appendChild(tableHeader);
    leaderboardTable.appendChild(tableBody);
    leaderboardElement.appendChild(leaderboardHeader);
    leaderboardElement.appendChild(leaderboardTable);
    
    // Add to the container
    container.appendChild(leaderboardElement);
}

function addLeaderboardEntryToFirebase(entry) {
    return db.collection('quizLeaderboard').add(entry);
}

function loadLeaderboardFromFirebase() {
    console.log("leaderboard from firebase called")
    return db.collection('quizLeaderboard')
        .orderBy('score', 'desc')
        .get()
        .then(snapshot => {
            const leaderboard = [];
            snapshot.forEach(doc => {
                leaderboard.push(doc.data());
            });
            return leaderboard;
        });
}

function setupQuiz() {
    // Sample quiz questions - replace with real questions about your mom
    const quizQuestions = [
        {
            question: "What is Mom's favorite color?",
            options: ["Blue", "Purple", "Red", "Green"],
            correct: 1 // Purple (index 1)
        },
        {
            question: "Where was Mom born?",
            options: ["New York", "Chicago", "Los Angeles", "Boston"],
            correct: 0 // New York (index 0)
        },
        {
            question: "What is Mom's favorite food?",
            options: ["Pizza", "Sushi", "Chocolate", "Pasta"],
            correct: 3 // Pasta (index 3)
        },
        {
            question: "What hobby has Mom enjoyed the longest?",
            options: ["Gardening", "Reading", "Painting", "Cooking"],
            correct: 1 // Reading (index 1)
        },
        {
            question: "What's Mom's favorite holiday?",
            options: ["Christmas", "Thanksgiving", "Birthday", "New Year"],
            correct: 0 // Christmas (index 0)
        }
    ];
    
    // Get the quiz container
    const quizContainer = document.querySelector('.quiz-container');
    if (!quizContainer) return; // Safety check
    
    // Create quiz intro with leaderboard
    const quizIntro = document.createElement('div');
    quizIntro.className = 'quiz-intro';
    quizIntro.innerHTML = `
        <p>Test your knowledge about the birthday girl! Answer these questions and see how well you know Mom.</p>
        <button id="start-quiz" class="quiz-button">Start Quiz</button>
    `;
    
    // Clear the container first
    quizContainer.innerHTML = '';
    quizContainer.appendChild(quizIntro);
    
    // Load leaderboard from Firebase and display it
    loadLeaderboardFromFirebase().then(leaderboard => {
        console.log("Load leaderboard from Firebase and display it")
        // Display leaderboard only once at the start
        displayLeaderboard(quizContainer, leaderboard);
        
        // Variables to track quiz state
        let currentQuestion = 0;
        let score = 0;
        
        // Start quiz when button is clicked
        const startButton = document.getElementById('start-quiz');
        if (startButton) {
            startButton.addEventListener('click', startQuiz);
        }
        
        function startQuiz() {
            // Reset quiz state
            currentQuestion = 0;
            score = 0;
            
            // Remove leaderboard
            const existingLeaderboard = quizContainer.querySelector('.quiz-leaderboard');
            if (existingLeaderboard) {
                existingLeaderboard.remove();
            }
            
            // Show first question
            showQuestion();
        }
        
        function showQuestion() {
            // Get current question data
            const questionData = quizQuestions[currentQuestion];
            
            // Create question element
            const questionElement = document.createElement('div');
            questionElement.className = 'quiz-question';
            
            // Question number and text
            questionElement.innerHTML = `
                <h3>Question ${currentQuestion + 1} of ${quizQuestions.length}</h3>
                <p class="question-text">${questionData.question}</p>
                <div class="quiz-options"></div>
            `;
            
            // Add options
            const optionsContainer = questionElement.querySelector('.quiz-options');
            questionData.options.forEach((option, index) => {
                const optionButton = document.createElement('button');
                optionButton.className = 'quiz-option';
                optionButton.textContent = option;
                
                // Add click event for option
                optionButton.addEventListener('click', () => {
                    // Check if correct
                    if (index === questionData.correct) {
                        score++;
                        optionButton.classList.add('correct');
                    } else {
                        optionButton.classList.add('wrong');
                        // Show which one was correct
                        const correctButton = optionsContainer.querySelectorAll('.quiz-option')[questionData.correct];
                        if (correctButton) {
                            correctButton.classList.add('correct');
                        }
                    }
                    
                    // Disable all option buttons
                    optionsContainer.querySelectorAll('.quiz-option').forEach(btn => {
                        btn.disabled = true;
                    });
                    
                    // Show next button
                    const nextButton = document.createElement('button');
                    nextButton.className = 'quiz-button next-button';
                    nextButton.textContent = currentQuestion < quizQuestions.length - 1 ? 'Next Question' : 'See Results';
                    nextButton.addEventListener('click', () => {
                        if (currentQuestion < quizQuestions.length - 1) {
                            currentQuestion++;
                            showQuestion();
                        } else {
                            showResults();
                        }
                    });
                    questionElement.appendChild(nextButton);
                });
                
                optionsContainer.appendChild(optionButton);
            });
            
            // Add to quiz container
            quizContainer.innerHTML = '';
            quizContainer.appendChild(questionElement);
        }
        
        function showResults() {
            // Calculate percentage
            const percentage = Math.round((score / quizQuestions.length) * 100);
            
            // Determine message based on score
            let message;
            if (percentage >= 80) {
                message = "Amazing! You really know Mom well!";
            } else if (percentage >= 60) {
                message = "Good job! You know quite a bit about Mom.";
            } else if (percentage >= 40) {
                message = "Not bad, but there's more to learn about Mom!";
            } else {
                message = "Time to get to know Mom better!";
            }
            
            // Create results element
            const resultsElement = document.createElement('div');
            resultsElement.className = 'quiz-results';
            resultsElement.innerHTML = `
                <h3>Quiz Results</h3>
                <div class="score-display">
                    <div class="score-circle">
                        <span class="score-value">${percentage}%</span>
                    </div>
                </div>
                <p class="result-message">${message}</p>
                <p>You got ${score} out of ${quizQuestions.length} questions correct.</p>
                
                <div class="quiz-name-input">
                    <label for="leaderboard-name">Add your name to the leaderboard:</label>
                    <input type="text" id="leaderboard-name" placeholder="Your Name">
                    <button id="save-score" class="quiz-button">Save Score</button>
                </div>
            `;
            
            // Add to quiz container
            quizContainer.innerHTML = '';
            quizContainer.appendChild(resultsElement);
            
            // Add save score functionality
            const saveButton = document.getElementById('save-score');
            if (saveButton) {
                saveButton.addEventListener('click', function() {
                    const nameInput = document.getElementById('leaderboard-name');
                    if (!nameInput) return;
                    
                    const name = nameInput.value;
                    if (name.trim() === '') {
                        alert('Please enter your name to save your score.');
                        return;
                    }
                    
                    // Add to leaderboard
                    const date = new Date().toISOString().split('T')[0];
                    const newEntry = { name, score: percentage, date };
                    
                    // Save to Firebase
                    addLeaderboardEntryToFirebase(newEntry).then(() => {
                        alert('Your score has been added to the leaderboard!');
                        
                        // Show just a nice message
                        quizContainer.innerHTML = '';
                        const messageElement = document.createElement('p');
                        messageElement.textContent = 'See if someone else can beat your score!';
                        messageElement.style.textAlign = 'center';
                        messageElement.style.marginTop = '1rem';
                        quizContainer.appendChild(messageElement);
                    }).catch(error => {
                        console.error("Error adding score to leaderboard: ", error);
                        alert('There was an error saving your score. Please try again.');
                    });
                });
            }
        }
    }).catch(error => {
        console.log("catch block")
        console.error("Error loading leaderboard: ", error);
        // If there's an error, use sample data
        const leaderboard = [
            { name: "Sarah", score: 100, date: "2023-02-15" },
            { name: "Dad", score: 80, date: "2023-02-14" },
            { name: "Mike", score: 60, date: "2023-02-13" }
        ];
        displayLeaderboard(quizContainer, leaderboard);
    });
}

// Rest of the functions remain the same as in the original code

// Add CSS to improve option styling
const styleElement = document.createElement('style');
styleElement.textContent = `
    .quiz-option {
        background-color: #f0f0f0;
        color: #333;
        border: 2px solid #ddd;
        transition: all 0.3s ease;
    }
    
    .quiz-option:hover {
        background-color: #e0e0e0;
    }
    
    .quiz-option.correct {
        background-color: #4CAF50;
        color: white;
    }
    
    .quiz-option.wrong {
        background-color: #f44336;
        color: white;
    }
    
    .quiz-option:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
`;
document.head.appendChild(styleElement);

// Hero Slideshow
function setupHeroSlideshow() {
    // Array of background images for the slideshow
    // Replace with your own images
    const slideshowImages = [
        'https://source.unsplash.com/random/1920x1080/?family,1',
        'https://source.unsplash.com/random/1920x1080/?mother,2',
        'https://source.unsplash.com/random/1920x1080/?birthday,3',
        'https://source.unsplash.com/random/1920x1080/?celebration,4'
    ];
    
    // Get the cover image element
    const coverImage = document.querySelector('.cover-image');
    if (!coverImage) return; // Safety check
    
    // Current slide index
    let currentSlide = 0;
    
    // Function to change the background image
    function changeBackground() {
        // Fade out
        coverImage.style.opacity = '0';
        
        // After fade out, change image and fade in
        setTimeout(() => {
            coverImage.style.backgroundImage = `url('${slideshowImages[currentSlide]}')`;
            coverImage.style.opacity = '1';
            
            // Update current slide index
            currentSlide = (currentSlide + 1) % slideshowImages.length;
        }, 1000);
    }
    
    // Add transition effect to cover image
    coverImage.style.transition = 'opacity 1s ease-in-out';
    
    // Start the slideshow
    setInterval(changeBackground, 5000);
}

// Main content functions
function loadGallery(photos) {
    const galleryContainer = document.querySelector('.gallery-container');
    if (!galleryContainer) return; // Safety check

    galleryContainer.innerHTML = ''; // Clear container first

    photos.forEach(photo => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';

        const img = document.createElement('img');
        img.src = photo.src;
        img.alt = photo.caption;
        img.loading = 'lazy';

        const caption = document.createElement('div');
        caption.className = 'gallery-caption';
        caption.textContent = photo.caption;

        galleryItem.appendChild(img);
        galleryItem.appendChild(caption);

        // Add click event to open modal
        galleryItem.addEventListener('click', function() {
            openModal(photo.src, photo.caption);
        });

        galleryContainer.appendChild(galleryItem);
    });
}

function loadMessages(messages) {
    const messagesContainer = document.querySelector('.messages-container');
    if (!messagesContainer) return; // Safety check

    messagesContainer.innerHTML = ''; // Clear container first

    messages.forEach(msg => {
        const messageCard = document.createElement('div');
        messageCard.className = 'message-card';

        const messageHeader = document.createElement('div');
        messageHeader.className = 'message-header';

        const messageSender = document.createElement('div');
        messageSender.className = 'message-sender';
        messageSender.textContent = msg.name;

        const messageDate = document.createElement('div');
        messageDate.className = 'message-date';
        messageDate.textContent = formatDate(msg.date);

        const messageText = document.createElement('div');
        messageText.className = 'message-text';
        messageText.textContent = msg.text;

        messageHeader.appendChild(messageSender);
        messageHeader.appendChild(messageDate);
        messageCard.appendChild(messageHeader);
        messageCard.appendChild(messageText);

        messagesContainer.appendChild(messageCard);
    });
}

function formatDate(dateString) {
    if (!dateString) return '';
    
    try {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    } catch (e) {
        console.error('Error formatting date:', e);
        return dateString; // Return the original string if there's an error
    }
}

function loadVideos(videos) {
    const videosContainer = document.querySelector('.videos-container');
    if (!videosContainer) return; // Safety check

    videosContainer.innerHTML = ''; // Clear container first

    videos.forEach(video => {
        const videoItem = document.createElement('div');
        videoItem.className = 'video-item';

        const iframe = document.createElement('iframe');
        iframe.src = video.embedUrl;
        iframe.title = video.title;
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        iframe.allowFullscreen = true;

        videoItem.appendChild(iframe);
        videosContainer.appendChild(videoItem);
    });
}

function loadTimeline(timelineEvents) {
    const timelineContainer = document.querySelector('.timeline-container');
    if (!timelineContainer) return; // Safety check

    timelineContainer.innerHTML = ''; // Clear container first

    timelineEvents.forEach((event, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.className = `timeline-item ${index % 2 === 0 ? 'left' : 'right'}`;

        const timelineContent = document.createElement('div');
        timelineContent.className = 'timeline-content';

        const timelineDate = document.createElement('div');
        timelineDate.className = 'timeline-date';
        timelineDate.textContent = event.date;

        const timelineText = document.createElement('div');
        timelineText.className = 'timeline-text';
        timelineText.textContent = event.text;

        const timelineImage = document.createElement('img');
        timelineImage.className = 'timeline-image';
        timelineImage.src = event.image;
        timelineImage.alt = event.text;
        timelineImage.loading = 'lazy';

        timelineContent.appendChild(timelineDate);
        timelineContent.appendChild(timelineText);
        timelineContent.appendChild(timelineImage);
        timelineItem.appendChild(timelineContent);

        timelineContainer.appendChild(timelineItem);
    });
}

function setupMessageForm(messages) {
    const messageForm = document.getElementById('message-form');
    if (!messageForm) return; // Safety check

    messageForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const nameInput = document.getElementById('name');
        const messageInput = document.getElementById('message');
        
        if (!nameInput || !messageInput) return;
        
        const name = nameInput.value;
        const message = messageInput.value;
        const date = new Date().toISOString().split('T')[0];

        // Add the new message to the messages array
        messages.unshift({ name, date, text: message });

        // Clear the form
        messageForm.reset();

        // Reload the messages
        loadMessages(messages);

        // Show confirmation
        alert('Thank you! Your message has been added.');
    });
}

function setupModal() {
    const modal = document.getElementById('image-modal');
    if (!modal) return; // Safety check
    
    const closeModal = document.querySelector('.close-modal');
    if (!closeModal) return;

    // Close the modal when the X is clicked
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Close the modal when clicking outside the image
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

function openModal(src, captionText) {
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    const caption = document.getElementById('caption');
    
    if (!modal || !modalImg || !caption) return;

    modal.style.display = 'block';
    modalImg.src = src;
    caption.textContent = captionText;
}

function setupSmoothScrolling() {
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Guest Book Functionality
// Guest Book Functionality with Firebase Integration
function setupGuestBook() {
    // First, check if the Guest Book section exists in HTML
    // If not, create it
    if (!document.getElementById('guestbook')) {
        createGuestBookSection();
    }
    
    // Load entries from Firebase
    loadGuestEntriesFromFirebase()
        .then(entries => {
            // If no entries in Firebase, use sample entries
            if (entries.length === 0) {
                const sampleEntries = [
                    { name: 'John Smith', location: 'New York', date: '2023-02-20', message: 'Happy 50th Birthday! Wishing you all the best on your special day.' },
                    { name: 'Mary Johnson', location: 'Chicago', date: '2023-02-19', message: 'Such a beautiful tribute to your mom! Happy Birthday to her!' },
                    { name: 'Robert Davis', location: 'Los Angeles', date: '2023-02-18', message: 'Congratulations on reaching this milestone. Have a wonderful celebration!' }
                ];
                
                // Add sample entries to Firebase
                const promises = sampleEntries.map(entry => addGuestEntryToFirebase(entry));
                return Promise.all(promises)
                    .then(() => loadGuestEntriesFromFirebase());
            }
            
            return entries;
        })
        .then(entries => {
            // Load entries into the DOM
            loadGuestEntries(entries);
            
            // Setup the form
            setupGuestBookForm();
            
            // Add to navigation menu
            addGuestBookNavItem();
        })
        .catch(error => {
            console.error("Error setting up guest book:", error);
        });
}

// Function to load guest entries from Firebase
function loadGuestEntriesFromFirebase() {
    return db.collection('guestEntries')
        .orderBy('date', 'desc')
        .get()
        .then(snapshot => {
            const entries = [];
            snapshot.forEach(doc => {
                entries.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            return entries;
        });
}

// Function to add a guest entry to Firebase
function addGuestEntryToFirebase(entry) {
    return db.collection('guestEntries').add(entry);
}

function createGuestBookSection() {
    const main = document.querySelector('main');
    if (!main) return;
    
    const guestbookSection = document.createElement('section');
    guestbookSection.id = 'guestbook';
    guestbookSection.className = 'section';
    
    guestbookSection.innerHTML = `
        <h2><i class="fas fa-book-open"></i> Guest Book</h2>
        <div class="guestbook-container">
            <div class="guestbook-entries">
                <!-- Entries will be added here by JavaScript -->
            </div>
            <div class="add-entry">
                <h3>Sign the Guest Book</h3>
                <form id="guestbook-form">
                    <input type="text" id="guest-name" placeholder="Your Name" required>
                    <input type="text" id="guest-location" placeholder="Where You're From (optional)">
                    <textarea id="guest-message" placeholder="Your Message" required></textarea>
                    <button type="submit">Sign Guest Book <i class="fas fa-pen-fancy"></i></button>
                </form>
            </div>
        </div>
    `;
    
    // Add the guestbook section before the footer
    const footer = document.querySelector('footer');
    if (footer) {
        main.insertBefore(guestbookSection, footer);
    } else {
        main.appendChild(guestbookSection);
    }
    
    // Add CSS for Guest Book if not already present
    addGuestBookCSS();
}

function addGuestBookCSS() {
    // Check if the styles are already added
    if (document.querySelector('style#guestbook-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'guestbook-styles';
    style.textContent = `
        /* Guest Book Styles */
        .guestbook-container {
            display: flex;
            flex-direction: column;
            gap: 2rem;
        }

        .guestbook-entries {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            max-height: 500px;
            overflow-y: auto;
            padding-right: 1rem;
        }

        .guestbook-entry {
            background-color: #f8f4ff;
            border-left: 4px solid #8e44ad;
            padding: 1.5rem;
            border-radius: 0 8px 8px 0;
            box-shadow: 0 3px 8px rgba(142, 68, 173, 0.1);
        }

        .guestbook-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 0.8rem;
        }

        .guest-name {
            font-weight: bold;
            color: #8e44ad;
            font-size: 1.1rem;
        }

        .guest-location {
            font-style: italic;
            color: #777;
            font-size: 0.9rem;
        }

        .guest-date {
            color: #999;
            font-size: 0.8rem;
        }

        .guest-message {
            line-height: 1.6;
        }

        .add-entry {
            background-color: #f0e6f6;
            padding: 2rem;
            border-radius: 10px;
        }

        .add-entry h3 {
            margin-bottom: 1rem;
        }

        #guestbook-form {
            display: flex;
            flex-direction: column;
            gap: 15px;
        }

        #guestbook-form input,
        #guestbook-form textarea {
            padding: 12px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-family: 'Montserrat', sans-serif;
        }

        #guest-location {
            margin-top: -5px;
        }

        #guestbook-form textarea {
            min-height: 100px;
            resize: vertical;
        }

        #guestbook-form button {
            background-color: #8e44ad;
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-weight: bold;
            transition: background-color 0.3s ease;
        }

        #guestbook-form button:hover {
            background-color: #732d91;
        }
    `;
    
    document.head.appendChild(style);
}

function loadGuestEntries(entries) {
    const guestbookContainer = document.querySelector('.guestbook-entries');
    if (!guestbookContainer) return; // Safety check
    
    guestbookContainer.innerHTML = ''; // Clear container first
    
    entries.forEach(entry => {
        const entryElement = document.createElement('div');
        entryElement.className = 'guestbook-entry';
        
        const headerElement = document.createElement('div');
        headerElement.className = 'guestbook-header';
        
        const nameLocationElement = document.createElement('div');
        
        const nameElement = document.createElement('div');
        nameElement.className = 'guest-name';
        nameElement.textContent = entry.name;
        
        nameLocationElement.appendChild(nameElement);
        
        if (entry.location) {
            const locationElement = document.createElement('div');
            locationElement.className = 'guest-location';
            locationElement.textContent = `from ${entry.location}`;
            nameLocationElement.appendChild(locationElement);
        }
        
        const dateElement = document.createElement('div');
        dateElement.className = 'guest-date';
        dateElement.textContent = formatDate(entry.date);
        
        const messageElement = document.createElement('div');
        messageElement.className = 'guest-message';
        messageElement.textContent = entry.message;
        
        headerElement.appendChild(nameLocationElement);
        headerElement.appendChild(dateElement);
        
        entryElement.appendChild(headerElement);
        entryElement.appendChild(messageElement);
        
        guestbookContainer.appendChild(entryElement);
    });
}

function setupGuestBookForm() {
    const guestBookForm = document.getElementById('guestbook-form');
    if (!guestBookForm) return; // Safety check
    
    guestBookForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nameInput = document.getElementById('guest-name');
        const locationInput = document.getElementById('guest-location');
        const messageInput = document.getElementById('guest-message');
        
        if (!nameInput || !messageInput) return;
        
        const name = nameInput.value;
        const location = locationInput ? locationInput.value : '';
        const message = messageInput.value;
        const date = new Date().toISOString().split('T')[0];
        
        // Create entry object
        const entry = { name, location, date, message };
        
        // Add entry to Firebase
        addGuestEntryToFirebase(entry)
            .then(() => {
                // Clear the form
                guestBookForm.reset();
                
                // Reload entries from Firebase
                return loadGuestEntriesFromFirebase();
            })
            .then(entries => {
                // Display the updated entries
                loadGuestEntries(entries);
                
                // Show confirmation
                alert('Thank you for signing the guest book!');
            })
            .catch(error => {
                console.error("Error adding entry to guest book: ", error);
                alert('There was an error adding your entry. Please try again.');
            });
    });
}

function addGuestBookNavItem() {
    const nav = document.querySelector('nav ul');
    if (!nav) return; // Safety check
    
    // Check if the item already exists
    if (!document.querySelector('nav a[href="#guestbook"]')) {
        const guestbookItem = document.createElement('li');
        const guestbookLink = document.createElement('a');
        guestbookLink.href = '#guestbook';
        guestbookLink.innerHTML = '<i class="fas fa-book-open"></i> Guest Book';
        guestbookItem.appendChild(guestbookLink);
        
        // Insert before the logout button if it exists
        const logoutItem = document.querySelector('nav li:last-child a[href="#"]');
        if (logoutItem) {
            nav.insertBefore(guestbookItem, logoutItem.parentElement);
        } else {
            nav.appendChild(guestbookItem);
        }
        
        // Add smooth scrolling to this new nav item
        guestbookLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    }
}

// Setup real-time updates for guest book entries
function setupGuestBookRealTimeUpdates() {
    db.collection('guestEntries')
        .orderBy('date', 'desc')
        .onSnapshot(snapshot => {
            const entries = [];
            snapshot.forEach(doc => {
                entries.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            
            loadGuestEntries(entries);
        }, error => {
            console.error("Error setting up real-time guest book updates:", error);
        });
}
            

// 50 Facts About Mom
function setup50Facts() {
    // Array of 50 facts about Mom - replace these with real facts!
    const momFacts = [
        "She was born in Springfield on April 6, 1975.",
        "Her favorite color is purple.",
        "She makes the world's best chocolate chip cookies.",
        "She played basketball in high school.",
        "Her first job was as a lifeguard.",
        "She has visited 12 countries.",
        "She can speak two languages fluently.",
        "Her favorite movie is 'The Sound of Music'.",
        "She once won a karaoke contest.",
        "She has a secret talent for drawing.",
        "She's afraid of spiders.",
        "Her favorite season is autumn.",
        "She met Dad at a bookstore.",
        "She can solve a Rubik's cube in under 3 minutes.",
        "Her first car was a blue Volkswagen Beetle.",
        "She loves gardening and has over 30 houseplants.",
        "She wrote poetry in college.",
        "Her favorite book is 'Pride and Prejudice'.",
        "She can make perfect pancake flips.",
        "She once hiked the Grand Canyon rim-to-rim.",
        "Her favorite holiday is Christmas.",
        "She collects vintage teacups.",
        "She's a night owl rather than an early bird.",
        "She was the class president in high school.",
        "Her dream vacation is to visit New Zealand.",
        "She's amazing at remembering birthdays.",
        "She has never broken a bone.",
        "Her favorite ice cream flavor is mint chocolate chip.",
        "She taught herself how to play the piano.",
        "She loves thunderstorms.",
        "She's completed three marathons.",
        "Her guilty pleasure is reality TV shows.",
        "She can wiggle her ears.",
        "Her first pet was a goldfish named Bubbles.",
        "She has the same birthday as Albert Einstein.",
        "She makes the best homemade pizza.",
        "She's terrified of roller coasters.",
        "She once appeared as an extra in a movie.",
        "Her favorite flower is the sunflower.",
        "She can recite the alphabet backwards.",
        "She has perfect pitch.",
        "She loves crossword puzzles.",
        "She's never had a cavity.",
        "She still has her childhood teddy bear.",
        "She worked as a camp counselor for three summers.",
        "Her coffee order is always the same: vanilla latte with an extra shot.",
        "She can touch her nose with her tongue.",
        "She once met a famous actor at the grocery store.",
        "She makes amazing Halloween costumes from scratch.",
        "Her smile can light up any room."
    ];

    const factsGrid = document.getElementById('facts-grid');
    if (!factsGrid) return;

    const prevButton = document.getElementById('prev-facts');
    const nextButton = document.getElementById('next-facts');
    const factsCounter = document.getElementById('facts-counter');
    
    const factsPerPage = 10;
    let currentPage = 0;
    const totalPages = Math.ceil(momFacts.length / factsPerPage);
    
    // Function to display facts for the current page
    function displayFacts() {
        factsGrid.innerHTML = '';
        
        const startIndex = currentPage * factsPerPage;
        const endIndex = Math.min(startIndex + factsPerPage, momFacts.length);
        
        for (let i = startIndex; i < endIndex; i++) {
            const factCard = document.createElement('div');
            factCard.className = 'fact-card';
            
            const factNumber = document.createElement('div');
            factNumber.className = 'fact-number';
            factNumber.textContent = i + 1;
            
            const factText = document.createElement('div');
            factText.className = 'fact-text';
            factText.textContent = momFacts[i];
            
            factCard.appendChild(factNumber);
            factCard.appendChild(factText);
            
            factsGrid.appendChild(factCard);
        }
        
        // Update counter
        factsCounter.textContent = `${startIndex + 1}-${endIndex} of ${momFacts.length}`;
        
        // Update button states
        prevButton.disabled = currentPage === 0;
        nextButton.disabled = currentPage === totalPages - 1;
    }
    
    // Add event listeners for navigation
    prevButton.addEventListener('click', function() {
        if (currentPage > 0) {
            currentPage--;
            displayFacts();
        }
    });
    
    nextButton.addEventListener('click', function() {
        if (currentPage < totalPages - 1) {
            currentPage++;
            displayFacts();
        }
    });
    
    // Initial display
    displayFacts();
    
    // Add navigation item to the main navigation
    addFactsNavItem();
}

function addFactsNavItem() {
    const nav = document.querySelector('nav ul');
    if (!nav) return;
    
    // Check if the item already exists
    if (!document.querySelector('nav a[href="#facts"]')) {
        const factsItem = document.createElement('li');
        const factsLink = document.createElement('a');
        factsLink.href = '#facts';
        factsLink.innerHTML = '<i class="fas fa-lightbulb"></i> 50 Facts';
        factsItem.appendChild(factsLink);
        
        // Insert before the logout button if it exists, otherwise before guestbook
        const logoutItem = document.querySelector('nav li:last-child a[href="#"]');
        const guestbookItem = document.querySelector('nav a[href="#guestbook"]');
        
        if (logoutItem) {
            nav.insertBefore(factsItem, logoutItem.parentElement);
        } else if (guestbookItem) {
            nav.insertBefore(factsItem, guestbookItem.parentElement);
        } else {
            nav.appendChild(factsItem);
        }
        
        // Add smooth scrolling
        factsLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    }
}

// Virtual Birthday Card
function setupBirthdayCard() {
    const card = document.getElementById('birthday-card-element');
    const signatureContainer = document.getElementById('card-signatures');
    const cardForm = document.getElementById('card-form');
    
    if (!card || !signatureContainer || !cardForm) return;
    
    // Load saved signatures from localStorage
    let signatures = loadSignaturesFromStorage();
    
    // Display signatures
    displaySignatures(signatures, signatureContainer);
    console.log('signture ---- ' + signatures)
    
    // Toggle card open/close
    card.addEventListener('click', function() {
        this.classList.toggle('open');
    });
    
    // Handle form submission
    cardForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nameInput = document.getElementById('card-name');
        const messageInput = document.getElementById('card-message-input');
        
        if (!nameInput || !messageInput) return;
        
        const name = nameInput.value.trim();
        const message = messageInput.value.trim();
        
        if (name && message) {
            // Add new signature
            const newSignature = {
                name: name,
                message: message,
                date: new Date().toISOString()
            };
            
            signatures.push(newSignature);
            
            // Save to localStorage
            saveSignaturesToStorage(signatures);
            
            // Update display
            displaySignatures(signatures, signatureContainer);
            
            // Clear form
            cardForm.reset();
            
            // Open the card to show the new signature
            card.classList.add('open');
            
            // Scroll to the new signature
            setTimeout(() => {
                signatureContainer.scrollTop = signatureContainer.scrollHeight;
            }, 500);
            
            // Show confirmation
            alert('Thank you for signing the birthday card!');
        }
    });
    
    // Add navigation item
    addBirthdayCardNavItem();
}

function displaySignatures(signatures, container) {
    if (!container) return;
    
    container.innerHTML = '';
    
    if (signatures.length === 0) {
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = 'Be the first to sign this card!';
        emptyMessage.style.textAlign = 'center';
        emptyMessage.style.fontStyle = 'italic';
        emptyMessage.style.color = '#888';
        container.appendChild(emptyMessage);
        return;
    }
    
    signatures.forEach(sig => {
        const signatureElement = document.createElement('div');
        signatureElement.className = 'card-signature';
        
        const nameElement = document.createElement('div');
        nameElement.className = 'signature-name';
        nameElement.textContent = sig.name;
        
        const messageElement = document.createElement('div');
        messageElement.className = 'signature-message';
        messageElement.textContent = sig.message;
        
        signatureElement.appendChild(nameElement);
        signatureElement.appendChild(messageElement);
        
        container.appendChild(signatureElement);
    });
}

function loadSignaturesFromStorage() {
    const savedSignatures = localStorage.getItem('birthdayCardSignatures');
    return savedSignatures ? JSON.parse(savedSignatures) : [];
}

function saveSignaturesToStorage(signatures) {
    localStorage.setItem('birthdayCardSignatures', JSON.stringify(signatures));
}

function addBirthdayCardNavItem() {
    const nav = document.querySelector('nav ul');
    if (!nav) return;
    
    // Check if the item already exists
    if (!document.querySelector('nav a[href="#birthday-card"]')) {
        const cardItem = document.createElement('li');
        const cardLink = document.createElement('a');
        cardLink.href = '#birthday-card';
        cardLink.innerHTML = '<i class="fas fa-birthday-cake"></i> Birthday Card';
        cardItem.appendChild(cardLink);
        
        // Insert at the appropriate position
        const logoutItem = document.querySelector('nav li:last-child a[href="#"]');
        const factsItem = document.querySelector('nav a[href="#facts"]');
        
        if (logoutItem) {
            nav.insertBefore(cardItem, logoutItem.parentElement);
        } else if (factsItem) {
            nav.insertBefore(cardItem, factsItem.parentElement);
        } else {
            nav.appendChild(cardItem);
        }
        
        // Add smooth scrolling
        cardLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    }
}

// Mom's Favorites Section
function setupMomsFavorites() {
    // Define mom's favorites for each category
    const favorites = {
        books: [
            {
                title: "Pride and Prejudice",
                subtitle: "Jane Austen",
                description: "Mom's all-time favorite book that she's read at least 10 times.",
                image: "https://source.unsplash.com/random/400x300/?book,classic",
                link: "#"
            },
            {
                title: "The Alchemist",
                subtitle: "Paulo Coelho",
                description: "She loves the inspirational journey and life lessons in this book.",
                image: "https://source.unsplash.com/random/400x300/?book,journey",
                link: "#"
            },
            {
                title: "To Kill a Mockingbird",
                subtitle: "Harper Lee",
                description: "A book that made a lasting impression on her in high school.",
                image: "https://source.unsplash.com/random/400x300/?book,classic",
                link: "#"
            },
            {
                title: "The Secret Garden",
                subtitle: "Frances Hodgson Burnett",
                description: "Her favorite book from childhood that she still rereads.",
                image: "https://source.unsplash.com/random/400x300/?garden,book",
                link: "#"
            },
            {
                title: "Becoming",
                subtitle: "Michelle Obama",
                description: "A recent favorite biography that inspired her.",
                image: "https://source.unsplash.com/random/400x300/?book,biography",
                link: "#"
            }
        ],
        movies: [
            {
                title: "The Sound of Music",
                subtitle: "1965",
                description: "She knows all the songs by heart and watches it every year.",
                image: "https://source.unsplash.com/random/400x300/?mountains,music",
                link: "#"
            },
            {
                title: "Roman Holiday",
                subtitle: "1953",
                description: "Her favorite Audrey Hepburn film that she loves for its romance and setting.",
                image: "https://source.unsplash.com/random/400x300/?rome,vacation",
                link: "#"
            },
            {
                title: "Mamma Mia",
                subtitle: "2008",
                description: "Makes her laugh and sing along every time she watches it.",
                image: "https://source.unsplash.com/random/400x300/?greece,beach",
                link: "#"
            },
            {
                title: "The Notebook",
                subtitle: "2004",
                description: "Her go-to romantic film that always makes her cry.",
                image: "https://source.unsplash.com/random/400x300/?romance,lake",
                link: "#"
            },
            {
                title: "Little Women",
                subtitle: "2019",
                description: "A recent adaptation of one of her favorite stories.",
                image: "https://source.unsplash.com/random/400x300/?vintage,family",
                link: "#"
            }
        ],
        foods: [
            {
                title: "Homemade Pasta",
                subtitle: "Italian",
                description: "She makes the best homemade pasta from her grandmother's recipe.",
                image: "https://source.unsplash.com/random/400x300/?pasta,homemade",
                link: "#"
            },
            {
                title: "Chocolate Cake",
                subtitle: "Dessert",
                description: "Her birthday favorite that she requests every year.",
                image: "https://source.unsplash.com/random/400x300/?chocolate,cake",
                link: "#"
            },
            {
                title: "Garden Salad",
                subtitle: "Fresh",
                description: "Made with vegetables from her own garden in summer.",
                image: "https://source.unsplash.com/random/400x300/?salad,fresh",
                link: "#"
            },
            {
                title: "Salmon",
                subtitle: "Seafood",
                description: "Her favorite healthy dinner option with herbs and lemon.",
                image: "https://source.unsplash.com/random/400x300/?salmon,dinner",
                link: "#"
            },
            {
                title: "Coffee",
                subtitle: "Vanilla Latte",
                description: "Can't start her day without her favorite coffee blend.",
                image: "https://source.unsplash.com/random/400x300/?coffee,latte",
                link: "#"
            }
        ],
        places: [
            {
                title: "Paris, France",
                subtitle: "Dream Destination",
                description: "Her dream vacation spot that she finally visited for her 40th birthday.",
                image: "https://source.unsplash.com/random/400x300/?paris,eiffel",
                link: "#"
            },
            {
                title: "Grandma's Farm",
                subtitle: "Childhood Memories",
                description: "Where she spent summers as a child and learned to garden.",
                image: "https://source.unsplash.com/random/400x300/?farm,countryside",
                link: "#"
            },
            {
                title: "Lake House",
                subtitle: "Family Vacation Spot",
                description: "Our family's favorite summer destination for 15 years.",
                image: "https://source.unsplash.com/random/400x300/?lake,cabin",
                link: "#"
            },
            {
                title: "The Local Bookstore",
                subtitle: "Weekly Visit",
                description: "Where she spends every Saturday morning browsing new books.",
                image: "https://source.unsplash.com/random/400x300/?bookstore,cozy",
                link: "#"
            },
            {
                title: "The Garden",
                subtitle: "Home",
                description: "Her sanctuary where she spends hours tending to her plants.",
                image: "https://source.unsplash.com/random/400x300/?garden,flowers",
                link: "#"
            }
        ],
        music: [
            {
                title: "Fleetwood Mac",
                subtitle: "1970s Rock",
                description: "The soundtrack of her college years that she still loves.",
                image: "https://source.unsplash.com/random/400x300/?concert,vintage",
                link: "#"
            },
            {
                title: "Piano Classics",
                subtitle: "Mozart & Chopin",
                description: "What she plays when she needs to relax and unwind.",
                image: "https://source.unsplash.com/random/400x300/?piano,classical",
                link: "#"
            },
            {
                title: "ABBA",
                subtitle: "Pop",
                description: "Her go-to music for cleaning the house and dancing around.",
                image: "https://source.unsplash.com/random/400x300/?disco,dancing",
                link: "#"
            },
            {
                title: "Carole King",
                subtitle: "Tapestry",
                description: "The album she knows every word to and sings along with.",
                image: "https://source.unsplash.com/random/400x300/?vinyl,retro",
                link: "#"
            },
            {
                title: "Beatles",
                subtitle: "60s Classics",
                description: "Her first concert was a Beatles tribute band.",
                image: "https://source.unsplash.com/random/400x300/?beatles,music",
                link: "#"
            }
        ]
    };
    
    const favoritesGrid = document.getElementById('favorites-grid');
    const favoriteTabs = document.querySelectorAll('.favorite-tab');
    
    if (!favoritesGrid || !favoriteTabs.length) return;
    
    // Show initial category (books)
    displayFavorites('books', favorites, favoritesGrid);
    
    // Set up tab switching
    favoriteTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            favoriteTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Get category and display favorites
            const category = this.getAttribute('data-category');
            displayFavorites(category, favorites, favoritesGrid);
        });
    });
    
    // Add navigation item
    addFavoritesNavItem();
}

function displayFavorites(category, favorites, container) {
    if (!container) return;
    
    // Clear container
    container.innerHTML = '';
    
    // Check if category exists
    if (!favorites[category]) return;
    
    // Add items for the selected category
    favorites[category].forEach(item => {
        const favoriteItem = document.createElement('div');
        favoriteItem.className = 'favorite-item';
        
        favoriteItem.innerHTML = `
            <img class="favorite-image" src="${item.image}" alt="${item.title}">
            <div class="favorite-details">
                <div class="favorite-title">${item.title}</div>
                <div class="favorite-subtitle">${item.subtitle}</div>
                <div class="favorite-description">${item.description}</div>
            </div>
        `;
        
        container.appendChild(favoriteItem);
    });
}

function addFavoritesNavItem() {
    const nav = document.querySelector('nav ul');
    if (!nav) return;
    
    // Check if the item already exists
    if (!document.querySelector('nav a[href="#favorites"]')) {
        const favoritesItem = document.createElement('li');
        const favoritesLink = document.createElement('a');
        favoritesLink.href = '#favorites';
        favoritesLink.innerHTML = '<i class="fas fa-heart"></i> Favorites';
        favoritesItem.appendChild(favoritesLink);
        
        // Insert before the logout button if it exists
        const logoutItem = document.querySelector('nav li:last-child a[href="#"]');
        const birthdayCardItem = document.querySelector('nav a[href="#birthday-card"]');
        
        if (logoutItem) {
            nav.insertBefore(favoritesItem, logoutItem.parentElement);
        } else if (birthdayCardItem) {
            nav.insertBefore(favoritesItem, birthdayCardItem.parentElement);
        } else {
            nav.appendChild(favoritesItem);
        }
        
        // Add smooth scrolling
        favoritesLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    }
}

// Theme Toggle Functionality
function setupThemeToggle() {
    const themeButtons = document.querySelectorAll('.theme-button');
    
    if (!themeButtons.length) return;
    
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme) {
        applyTheme(savedTheme);
        
        // Update active button
        themeButtons.forEach(button => {
            if (button.getAttribute('data-theme') === savedTheme) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }
    
    // Add CSS variables with RGB values for opacity support
    addRGBVariables();
    
    // Set up button click events
    themeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const theme = this.getAttribute('data-theme');
            
            // Remove active class from all buttons
            themeButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Apply theme
            applyTheme(theme);
            
            // Save to localStorage
            localStorage.setItem('selectedTheme', theme);
        });
    });
}

function applyTheme(theme) {
    // Remove all theme classes
    document.body.classList.remove('theme-blue', 'theme-pink', 'theme-green', 'theme-vintage');
    
    // Add the selected theme class (except for default)
    if (theme && theme !== 'default') {
        document.body.classList.add(`theme-${theme}`);
    }
    
    // Update RGB variables for the new theme
    addRGBVariables();
}

function addRGBVariables() {
    // Get the computed value of primary color
    const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim();
    
    // Convert hex to RGB if it's a hex color
    let rgb = hexToRgb(primaryColor);
    
    // Set the RGB variable
    if (rgb) {
        document.documentElement.style.setProperty('--primary-color-rgb', `${rgb.r}, ${rgb.g}, ${rgb.b}`);
    }
}

function hexToRgb(hex) {
    // Check if it's already in rgb format
    if (hex.startsWith('rgb')) {
        const rgbValues = hex.match(/\d+/g);
        if (rgbValues && rgbValues.length >= 3) {
            return {
                r: parseInt(rgbValues[0]),
                g: parseInt(rgbValues[1]),
                b: parseInt(rgbValues[2])
            };
        }
        return null;
    }
    
    // If it's a hex color, convert it
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

// This Day in History Section
function setupThisDayInHistory() {
    // Mom's birthday - adjust as needed
    const momBirthDate = "April 6, 1975";
    
    // Update the displayed date
    const birthdayDateElement = document.querySelector('.birthday-date');
    if (birthdayDateElement) {
        birthdayDateElement.textContent = momBirthDate;
    }
    
    // Historical events on this day
    // These are example events - you should research the actual events on your mom's birth date
    const historicalEvents = [
        {
            category: "World Events",
            title: "Microsoft Founded",
            description: "Bill Gates and Paul Allen founded Microsoft Corporation on April 4, 1975, just days before Mom was born."
        },
        {
            category: "Entertainment",
            title: "Super Hit Song",
            description: "'Philadelphia Freedom' by Elton John was at the top of the charts that week."
        },
        {
            category: "Sports",
            title: "Champion Boxer",
            description: "Muhammad Ali was the reigning Heavyweight Champion of the world."
        },
        {
            category: "Technology",
            title: "First Personal Computer",
            description: "The Altair 8800, one of the first personal computers, had just been released a few months earlier."
        },
        {
            category: "Movies",
            title: "Academy Awards",
            description: "'The Godfather Part II' had just won the Oscar for Best Picture at the 47th Academy Awards."
        },
        {
            category: "Politics",
            title: "US President",
            description: "Gerald Ford was the President of the United States."
        },
        {
            category: "Culture",
            title: "Fashion Trends",
            description: "Bell-bottom pants, platform shoes, and disco styles were all the rage."
        },
        {
            category: "Cost of Living",
            title: "Average Prices",
            description: "A gallon of gas cost about 57 cents, a new house averaged $42,600, and the average income was $14,100 per year."
        },
        {
            category: "Science",
            title: "Space Exploration",
            description: "NASA was preparing for the Apollo-Soyuz Test Project, the first joint U.S.-Soviet space mission."
        },
        {
            category: "Television",
            title: "Popular TV Shows",
            description: "'All in the Family', 'M*A*S*H', and 'The Waltons' were among the most popular TV shows."
        }
    ];
    
    // Display the events
    displayHistoricalEvents(historicalEvents);
    
    // Add navigation item
    addHistoryNavItem();
}

function displayHistoricalEvents(events) {
    const historyTimeline = document.querySelector('.history-timeline');
    if (!historyTimeline) return;
    
    // Clear existing content
    historyTimeline.innerHTML = '';
    
    // Add each event to the timeline
    events.forEach(event => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        
        const historyContent = document.createElement('div');
        historyContent.className = 'history-content';
        
        historyContent.innerHTML = `
            <div class="history-category">${event.category}</div>
            <div class="history-title">${event.title}</div>
            <div class="history-description">${event.description}</div>
        `;
        
        historyItem.appendChild(historyContent);
        historyTimeline.appendChild(historyItem);
    });
}

function addHistoryNavItem() {
    const nav = document.querySelector('nav ul');
    if (!nav) return;
    
    // Check if the item already exists
    if (!document.querySelector('nav a[href="#history"]')) {
        const historyItem = document.createElement('li');
        const historyLink = document.createElement('a');
        historyLink.href = '#history';
        historyLink.innerHTML = '<i class="fas fa-history"></i> History';
        historyItem.appendChild(historyLink);
        
        // Insert before the logout button if it exists
        const logoutItem = document.querySelector('nav li:last-child a[href="#"]');
        const favoritesItem = document.querySelector('nav a[href="#favorites"]');
        
        if (logoutItem) {
            nav.insertBefore(historyItem, logoutItem.parentElement);
        } else if (favoritesItem) {
            nav.insertBefore(historyItem, favoritesItem.parentElement);
        } else {
            nav.appendChild(historyItem);
        }
        
        // Add smooth scrolling
        historyLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    }
}

// Word Cloud Functionality with Firebase Integration
function setupWordCloud() {
    // Check if D3 is available
    if (!window.d3) {
        console.error('D3.js is required for the word cloud');
        return;
    }
    
    // Get container
    const cloudContainer = document.getElementById('wordcloud-canvas');
    if (!cloudContainer) return;
    
    // Get form
    const wordCloudForm = document.getElementById('wordcloud-form');
    if (!wordCloudForm) return;
    
    // Load words from Firebase
    loadWordsFromFirebase().then(words => {
        // If no words in Firebase, use sample words
        if (words.length === 0) {
            const sampleWords = [
                { text: "Loving", contributor: "Dad" },
                { text: "Kind", contributor: "Sarah" },
                { text: "Creative", contributor: "Mike" },
                { text: "Thoughtful", contributor: "Aunt Jane" },
                { text: "Funny", contributor: "Uncle Bob" },
                { text: "Caring", contributor: "Grandma" },
                { text: "Smart", contributor: "Cousin Tom" },
                { text: "Generous", contributor: "Friends" },
                { text: "Patient", contributor: "Neighbor" },
                { text: "Strong", contributor: "Coworker" },
                { text: "Beautiful", contributor: "Sister" },
                { text: "Inspiring", contributor: "Teacher" },
                { text: "Supportive", contributor: "Brother" },
                { text: "Dedicated", contributor: "Boss" },
                { text: "Talented", contributor: "Friend" }
            ];
            
            // Add sample words to Firebase
            const promises = sampleWords.map(word => addWordToFirebase(word));
            return Promise.all(promises).then(() => loadWordsFromFirebase());
        }
        
        return words;
    }).then(words => {
        // Group similar words and calculate sizes based on frequency
        const processedWords = processWordsForCloud(words);
        
        // Generate the word cloud
        generateWordCloud(processedWords, cloudContainer);
        
        // Handle form submission
        wordCloudForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = document.getElementById('contributor-name');
            const wordInput = document.getElementById('word-input');
            
            if (!nameInput || !wordInput) return;
            
            const name = nameInput.value.trim();
            const word = wordInput.value.trim();
            
            if (name && word) {
                // Add new word
                const newWord = {
                    text: word.charAt(0).toUpperCase() + word.slice(1), // Capitalize first letter
                    contributor: name,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                };
                
                // Add to Firebase
                addWordToFirebase(newWord)
                    .then(() => {
                        // Clear form
                        wordCloudForm.reset();
                        
                        // Show confirmation
                        alert('Thank you for adding your word!');
                        
                        // The cloud will update automatically via the onSnapshot listener
                    })
                    .catch(error => {
                        console.error("Error adding word:", error);
                        alert('There was an error adding your word. Please try again.');
                    });
            }
        });
        
        // Add navigation item
        addWordCloudNavItem();
        
        // Setup real-time updates
        setupWordCloudRealTimeUpdates(cloudContainer);
    }).catch(error => {
        console.error("Error setting up word cloud:", error);
    });
}

// Function to process words for the cloud - group similar words and size them by frequency
function processWordsForCloud(words) {
    // Group words by text (case insensitive)
    const wordGroups = {};
    
    words.forEach(word => {
        const text = word.text.toLowerCase();
        if (!wordGroups[text]) {
            wordGroups[text] = {
                text: word.text, // Keep original capitalization of the first occurrence
                count: 0,
                contributors: []
            };
        }
        wordGroups[text].count++;
        wordGroups[text].contributors.push(word.contributor);
    });
    
    // Convert to array suitable for the cloud
    const processedWords = Object.values(wordGroups).map(group => {
        // Base size on count - starts at 40 for a single occurrence and grows by 10 for each additional
        const size = 40 + (group.count - 1) * 10;
        
        return {
            text: group.text,
            size: Math.min(size, 100), // Cap size at 100
            count: group.count,
            // Join all contributors or show count if there are many
            contributor: group.contributors.length <= 3 
                ? group.contributors.join(', ') 
                : `${group.contributors.length} people`
        };
    });
    
    return processedWords;
}

function generateWordCloud(words, container) {
    // Clear the container
    container.innerHTML = '';
    
    // Size variables
    const width = container.offsetWidth;
    const height = container.offsetHeight;
    
    // Generate color scale - use the primary color as basis
    const computedStyle = getComputedStyle(document.documentElement);
    const primaryColor = computedStyle.getPropertyValue('--primary-color').trim();
    const accentColor = computedStyle.getPropertyValue('--accent-color').trim();
    
    // Use D3's color interpolation
    const colorScale = d3.scaleLinear()
        .domain([0, 1])
        .range([primaryColor || '#8e44ad', accentColor || '#e84393']);
    
    // Create the layout
    const layout = d3.layout.cloud()
        .size([width, height])
        .words(words)
        .padding(5)
        .rotate(function() { return ~~(Math.random() * 2) * 90; })
        .font('Dancing Script')
        .fontSize(function(d) { return d.size; })
        .on('end', draw);
    
    // Generate the layout
    layout.start();
    
    // Create tooltip
    const tooltip = d3.select('body').append('div')
        .attr('class', 'word-tooltip')
        .style('opacity', 0);
    
    // Draw the word cloud
    function draw(words) {
        d3.select(container).append('svg')
            .attr('width', layout.size()[0])
            .attr('height', layout.size()[1])
            .append('g')
            .attr('transform', 'translate(' + layout.size()[0] / 2 + ',' + layout.size()[1] / 2 + ')')
            .selectAll('text')
            .data(words)
            .enter().append('text')
            .style('font-size', function(d) { return d.size + 'px'; })
            .style('font-family', 'Dancing Script, cursive')
            .style('fill', function() { return colorScale(Math.random()); })
            .attr('text-anchor', 'middle')
            .attr('class', 'word-cloud-word')
            .attr('transform', function(d) {
                return 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')';
            })
            .text(function(d) { return d.text; })
            .on('mouseover', function(d) {
                d3.select(this).style('opacity', 0.7);
                
                tooltip.transition()
                    .duration(200)
                    .style('opacity', 0.9);
                
                let tooltipText = 'Added by: ' + d.contributor;
                if (d.count > 1) {
                    tooltipText += ' • Mentioned ' + d.count + ' times';
                }
                
                tooltip.html(tooltipText)
                    .style('left', (d3.event.pageX + 10) + 'px')
                    .style('top', (d3.event.pageY - 28) + 'px');
            })
            .on('mouseout', function() {
                d3.select(this).style('opacity', 1);
                
                tooltip.transition()
                    .duration(500)
                    .style('opacity', 0);
            });
    }
}

// Function to load words from Firebase
function loadWordsFromFirebase() {
    return db.collection('wordCloudWords')
        .get()
        .then(snapshot => {
            const words = [];
            snapshot.forEach(doc => {
                words.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            return words;
        });
}

// Function to add a word to Firebase
function addWordToFirebase(word) {
    // Make sure there's a timestamp
    if (!word.createdAt) {
        word.createdAt = firebase.firestore.FieldValue.serverTimestamp();
    }
    return db.collection('wordCloudWords').add(word);
}

function addWordCloudNavItem() {
    const nav = document.querySelector('nav ul');
    if (!nav) return;
    
    // Check if the item already exists
    if (!document.querySelector('nav a[href="#word-cloud"]')) {
        const wordCloudItem = document.createElement('li');
        const wordCloudLink = document.createElement('a');
        wordCloudLink.href = '#word-cloud';
        wordCloudLink.innerHTML = '<i class="fas fa-cloud"></i> Word Cloud';
        wordCloudItem.appendChild(wordCloudLink);
        
        // Insert before the logout button if it exists
        const logoutItem = document.querySelector('nav li:last-child a[href="#"]');
        const historyItem = document.querySelector('nav a[href="#history"]');
        
        if (logoutItem) {
            nav.insertBefore(wordCloudItem, logoutItem.parentElement);
        } else if (historyItem) {
            nav.insertBefore(wordCloudItem, historyItem.parentElement);
        } else {
            nav.appendChild(wordCloudItem);
        }
        
        // Add smooth scrolling
        wordCloudLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    }
}

// Setup real-time updates for the word cloud
function setupWordCloudRealTimeUpdates(container) {
    db.collection('wordCloudWords')
        .onSnapshot(snapshot => {
            const words = [];
            snapshot.forEach(doc => {
                words.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            
            // Process words to group similar ones and adjust sizes
            const processedWords = processWordsForCloud(words);
            
            // Only regenerate the cloud if we have words
            if (processedWords.length > 0) {
                generateWordCloud(processedWords, container);
            }
        }, error => {
            console.error("Error setting up real-time word cloud:", error);
        });
}

// Add custom CSS for the tooltip
function addWordCloudCSS() {
    // Check if the styles are already added
    if (document.querySelector('style#wordcloud-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'wordcloud-styles';
    style.textContent = `
        .word-tooltip {
            position: absolute;
            padding: 8px 12px;
            background-color: rgba(0, 0, 0, 0.7);
            color: white;
            border-radius: 4px;
            font-size: 0.9rem;
            pointer-events: none;
            z-index: 100;
            transition: opacity 0.3s;
        }
    `;
    
    document.head.appendChild(style);
}

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check auth first
    if (!checkAuth()) {
        showLoginScreen();
        return; // Don't initialize the rest until authenticated
    } else {
        addLogoutButton();
    }
    
    // Initialize Firebase
    try {
        initializeFirebase();
        
        // Setup theme toggle first so styles apply properly
        setupThemeToggle();
        
        // Sample data - you would replace these with your actual content
        const photos = [
            { src: 'https://source.unsplash.com/random/800x600/?family,1', caption: 'Family vacation 2010' },
            { src: 'https://source.unsplash.com/random/800x600/?mother,2', caption: 'Mom\'s graduation' },
            { src: 'https://source.unsplash.com/random/800x600/?birthday,3', caption: 'Mom\'s 40th birthday' },
            { src: 'https://source.unsplash.com/random/800x600/?family,4', caption: 'Christmas 2018' },
            { src: 'https://source.unsplash.com/random/800x600/?mother,5', caption: 'Mom and me' },
            { src: 'https://source.unsplash.com/random/800x600/?family,6', caption: 'Family reunion' },
            { src: 'https://source.unsplash.com/random/800x600/?mother,7', caption: 'Mom\'s garden' },
            { src: 'https://source.unsplash.com/random/800x600/?birthday,8', caption: 'Surprise party' }
        ];

        const videos = [
            { title: 'Birthday Wishes', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
            { title: 'Family Trip Memories', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
        ];

        const timelineEvents = [
            { date: '1975', text: 'Born in Springfield', image: 'https://source.unsplash.com/random/800x600/?baby,1' },
            { date: '1993', text: 'Graduated from college', image: 'https://source.unsplash.com/random/800x600/?graduation,2' },
            { date: '1997', text: 'Got married', image: 'https://source.unsplash.com/random/800x600/?wedding,3' },
            { date: '1999', text: 'Had her first child', image: 'https://source.unsplash.com/random/800x600/?baby,4' },
            { date: '2005', text: 'Started her dream career', image: 'https://source.unsplash.com/random/800x600/?office,5' },
            { date: '2015', text: 'Family trip to Europe', image: 'https://source.unsplash.com/random/800x600/?europe,6' },
            { date: '2025', text: 'Celebrating 50 amazing years!', image: 'https://source.unsplash.com/random/800x600/?celebration,7' }
        ];

        // Initialize all components
        loadGallery(photos);
        loadVideos(videos);
        loadTimeline(timelineEvents);
        setupModal();
        setupSmoothScrolling();
        createCountdown();
        setupHeroSlideshow();
        celebrateWithConfetti();
        
        // Firebase-integrated components
        setupQuiz();                    // Quiz with Firebase
        setupGuestBook();               // Guest Book with Firebase
        setup50Facts();                 // 50 Facts about Mom with Firebase
        setupBirthdayCard();            // Birthday Card with Firebase
        setupMomsFavorites();           // Mom's Favorites with Firebase
        setupThisDayInHistory();        // This Day in History with Firebase
        setupWordCloud();               // Word Cloud with Firebase
        addWordCloudCSS();              // Add word cloud tooltip styles
        
        // Set up real-time updates for all components
        setupRealtimeUpdates();
    } catch (error) {
        console.error("Error initializing the application:", error);
        alert("There was an error initializing the application. Please reload the page and try again.");
    }
});

function setupLeaderboardRealTimeUpdates() {
    console.log("setupLeaderboardRealTimeUpdates")
    db.collection('quizLeaderboard')
        .orderBy('score', 'desc')
        .onSnapshot(snapshot => {
            const leaderboard = [];
            snapshot.forEach(doc => {
                leaderboard.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            
            // const quizContainer = document.querySelector('.quiz-container');
            // if (quizContainer && quizContainer.querySelector('.quiz-leaderboard')) {
            //     // Only update the leaderboard if it's currently displayed (not during a quiz)
            //     displayLeaderboard(quizContainer, leaderboard);
            // }
        }, error => {
            console.error("Error setting up real-time leaderboard:", error);
        });
}

// Setup all real-time updates in one function
function setupRealtimeUpdates() {
    // Messages real-time updates
    db.collection('messages')
        .orderBy('date', 'desc')
        .onSnapshot(snapshot => {
            const messages = [];
            snapshot.forEach(doc => {
                messages.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            loadMessages(messages);
        }, error => {
            console.error("Error setting up real-time messages:", error);
        });

    // Guest Book real-time updates
    setupGuestBookRealTimeUpdates();
    
    // Quiz Leaderboard real-time updates
    setupLeaderboardRealTimeUpdates();
    
    // Birthday Card real-time updates
    db.collection('birthdayCardSignatures')
        .orderBy('createdAt', 'asc')
        .onSnapshot(snapshot => {
            const signatures = [];
            snapshot.forEach(doc => {
                signatures.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            const signatureContainer = document.getElementById('card-signatures');
            if (signatureContainer) {
                displaySignatures(signatures, signatureContainer);
            }
        }, error => {
            console.error("Error setting up real-time signatures:", error);
        });
    
    // Word Cloud real-time updates
    const cloudContainer = document.getElementById('wordcloud-canvas');
    if (cloudContainer) {
        setupWordCloudRealTimeUpdates(cloudContainer);
    }
    
    // Theme settings real-time updates
    db.collection('siteSettings').doc('theme')
        .onSnapshot(doc => {
            if (doc.exists) {
                const theme = doc.data();
                const themeButtons = document.querySelectorAll('.theme-button');
                
                if (theme && theme.name) {
                    applyTheme(theme.name);
                    
                    // Update active button
                    themeButtons.forEach(button => {
                        if (button.getAttribute('data-theme') === theme.name) {
                            button.classList.add('active');
                        } else {
                            button.classList.remove('active');
                        }
                    });
                }
            }
        }, error => {
            console.error("Error setting up theme updates:", error);
        });
}