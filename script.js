function updateStreak() {
    let streak = parseInt(localStorage.getItem("streak")) || 0;
    let lastCheckIn = localStorage.getItem("lastCheckIn");

    const today = new Date().toDateString();

    if (lastCheckIn === today) {
        alert("You've already checked in today!");
        return;
    }

    // Increase the streak
    streak++;

    // Save new streak and last check-in date
    localStorage.setItem("streak", streak);
    localStorage.setItem("lastCheckIn", today);

    // Update UI
    document.getElementById("streakDisplay").innerText = `⭐Streak: ${streak}`;

    alert(`Check-in completed! ${streak} days of being super`);
}

document.addEventListener("DOMContentLoaded", function () {
    let savedStreak = localStorage.getItem("streak") || 0;
    document.getElementById("streakDisplay").innerText = `⭐Streak: ${savedStreak}`;

    let lastCheckIn = localStorage.getItem("lastCheckIn"); // ⬅️ Move this up
    const today = new Date().toDateString();

    let moodImages = document.querySelectorAll(".mood");
    let mainContent = document.querySelector(".main-content");
    let goalSection = document.querySelector(".goal-container");
    let buttonContainer = document.querySelector(".button-container");

    // Initially hide the goals and buttons
    goalSection.style.display = "none";
    buttonContainer.style.display = "none";

    if (lastCheckIn === today) {
        // If the user has already checked in, skip to the goals section
        showNeedsSection();
    } else {
        // Otherwise, show the mood check-in
        moodImages.forEach(img => {
            img.addEventListener("click", function () {
                updateStreak();
                transitionToNeeds();
            });
        });
    }

    function updateStreak() {
        let streak = parseInt(localStorage.getItem("streak")) || 0;
        let lastCheckIn = localStorage.getItem("lastCheckIn"); // Retrieve again in case of updates
        const today = new Date().toDateString();

        if (lastCheckIn === today) {
            alert("You've already checked in today!");
            return;
        }

        streak++;
        localStorage.setItem("streak", streak);
        localStorage.setItem("lastCheckIn", today);
        document.getElementById("streakDisplay").innerText = `Streak: ${streak}`;
    }

    function transitionToNeeds() {
        // Fade out "How are you feeling today?"
        mainContent.style.opacity = "0";

        setTimeout(() => {
            showNeedsSection();
        }, 500);
    }

    function showNeedsSection() {
        mainContent.innerHTML = "<h1>Goals of the Day</h1>";
        mainContent.style.opacity = "1";

        displayRandomGoals();
    }

    function displayRandomGoals() {
        let allGoals = document.querySelectorAll(".goal-card");
    
        if (allGoals.length === 0) {
            console.error("No goal cards found! Make sure they exist in the HTML.");
            return;
        }
    
        // Make sure goal section is visible first
        goalSection.style.display = "flex";
        buttonContainer.style.display = "flex";
    
        // Hide all goals initially
        allGoals.forEach(goal => {
            goal.style.display = "none";
            goal.style.opacity = "0";
        });
    
        // Randomly shuffle and select 3 goals
        let shuffledGoals = [...allGoals].sort(() => 0.5 - Math.random()).slice(0, 3);
    
        // Show the selected goals with a fade-in effect
        shuffledGoals.forEach((goal, index) => {
            goal.style.display = "flex";
            requestAnimationFrame(() => {
                setTimeout(() => {
                    goal.style.opacity = "1";
                }, index * 200); // Adds slight delay for a staggered fade-in effect
            });
        });
    
        console.log("Displayed goals:", shuffledGoals);
    }
    
    
});


// Affirmations
const affirmations = document.getElementById("affirmation-message");
const positiveMessageButton = document.getElementById("positive-message");
let affirmationsList = []; // Declare the affirmations list here

// Load affirmations when the page is first loaded
document.addEventListener("DOMContentLoaded", () => {
    fetch("Affirmations.txt")
        .then(response => response.text())
        .then(data => {
            affirmationsList = data.split(/\r?\n/); // Store affirmations globally
        })
        .catch(err => console.log("Error reading the file:", err)); // Handle any fetch errors
});

// Handle button click for random affirmation
positiveMessageButton.addEventListener("click", () => {
    if (affirmationsList.length > 0) {
        randomAffirm(affirmationsList); // Randomize and show new affirmation
    } else {
        console.log("Affirmations not loaded yet!");
    }
});

function randomAffirm(results) {
    let affirmationIndex = Math.floor(Math.random() * results.length); // Get random index
    const chosenAffirmation = results[affirmationIndex]; // Get the affirmation at that index
    console.log(chosenAffirmation); // Log to check

    // Ensure the modal content is updated with the new affirmation
    affirmations.innerText = chosenAffirmation; // Display the affirmation in the modal
    
    // Open the modal programmatically
    let modal = new bootstrap.Modal(document.getElementById("exampleModal"));
    
    // To ensure the modal shows the updated content each time, we hide and show it
    modal.hide(); // Hide the modal
    modal.show(); // Show the modal again with the updated content
}
