document.addEventListener("DOMContentLoaded", function () {
    let savedStreak = localStorage.getItem("streak") || 0;
    document.getElementById("streakDisplay").innerText = `Streak: ${savedStreak}`;

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

    // Increase the streak
    streak++;

    // Save new streak and last check-in date
    localStorage.setItem("streak", streak);
    localStorage.setItem("lastCheckIn", today);

    // Update UI
    document.getElementById("streakDisplay").innerText = `${streak}`;

    alert(`Check-in completed! ${streak} days of being super`);
}

document.addEventListener("DOMContentLoaded", function () {
    let savedStreak = localStorage.getItem("streak") || 0;
    document.getElementById("streakDisplay").innerText = `Streak: ${savedStreak}`;

    let moodImages = document.querySelectorAll(".mood");

    moodImages.forEach(img => {
        img.onclick = updateStreak; // Ensures only one event listener per image
    });
});


