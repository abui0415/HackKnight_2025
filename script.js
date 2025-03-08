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
        mainContent.innerHTML = "<h1>What do you need?</h1>";
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
