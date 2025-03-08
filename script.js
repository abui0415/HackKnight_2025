function buttonClick() {
    
}

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

    let moodImages = document.querySelectorAll(".mood");

    moodImages.forEach(img => {
        img.onclick = updateStreak; // Ensures only one event listener per image
    });
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
