var randomizeButton = document.getElementById('randomize-btn');

function randomizeCube() {
    // Determine how many random rotations we want to make
    var rotations = Math.floor(Math.random() * 40) + 20; // Random number between 20 and 60

    // We want the rotations to happen quickly and not be easily followed by the human eye
    // This queues up the rotations and executes them in quick succession
    var i = 0;
    var interval = setInterval(function() {
        // Choose a random face (0 to 5)
        var face = Math.floor(Math.random() * 6);

        // Choose a random direction (clockwise or counter-clockwise)
        var cw = Math.floor(Math.random() * 2);

        // Execute the rotation
        animateRotation(face, cw, Date.now());

        i++;
        if (i >= rotations) {
            clearInterval(interval);
        }
    }, 200); // Execute a rotation every 200ms
}

randomizeButton.addEventListener('click', randomizeCube);