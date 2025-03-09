document.addEventListener('DOMContentLoaded', () => {
    // Toxic voice audios
    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent page refresh
            let audioSrc = this.getAttribute('data-audio');
            console.log('Audio source:', audioSrc); // Debugging the link

            if (audioSrc) {
                // Remove existing audio players before adding a new one (except for background audio)
                document.querySelectorAll('audio').forEach(audio => {
                    if (audio.id !== 'background-audio') {
                        audio.remove(); // Only remove voice audios, not the background one
                    }
                });

                // Create the new audio player for the voice
                let audioPlayer = document.createElement('audio');
                audioPlayer.controls = true;
                audioPlayer.src = audioSrc;

                // Add event listener to check for errors
                audioPlayer.addEventListener('error', (e) => {
                    console.error('Audio error:', e);
                });

                // Append the audio player after the dropdown menu
                this.parentElement.appendChild(audioPlayer);

                // Auto-play the audio
                audioPlayer.play().then(() => {
                    console.log('Audio is playing!');
                }).catch((error) => {
                    console.error('Audio failed to play:', error);
                });
            } else {
                console.log('No audio source available.');
            }
        });
    });

    // Background Clown Music
    var backgroundAudio = document.getElementById('background-audio');
    backgroundAudio.volume = 0.2;
    backgroundAudio.loop = true; // Ensure background audio is looping

    // Check if the background music should play after page reload
    if (!localStorage.getItem('backgroundMusicPlayed')) {
        // If the music hasn't been played yet, start it
        backgroundAudio.play().then(() => {
            console.log('Background music is playing!');
            // Save the state to localStorage
            localStorage.setItem('backgroundMusicPlayed', 'true');
        }).catch((error) => {
            console.error('Background music failed to play:', error);
        });
    }
});

$(document).ready(function() {
    // Initialize time pickers
    $('#time1').datetimepicker({
        format: 'LT'  // Format for time (e.g., 8:00 AM)
    });
    $('#time2').datetimepicker({
        format: 'LT'
    });
    $('#time3').datetimepicker({
        format: 'LT'
    });
});
