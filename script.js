function buttonClick() {
    alert("Keep your face always toward the sunshine—and shadows will fall behind you. — Walt Whitman");
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


