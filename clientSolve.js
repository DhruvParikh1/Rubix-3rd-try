var solveButton = document.getElementById('solve-btn');

function getCurrentState() {
    var state = "";
    var faces = ['U', 'R', 'F', 'D', 'L', 'B'];
    var colorMapping = {
        'blue': 'U',
        'green': 'F',
        'white': 'R',
        'yellow': 'D',
        'orange': 'B',
        'red': 'L'
    };

    // Loop through each face
    for (var i = 0; i < faces.length; i++) {
        var facePieces = document.querySelectorAll('#piece' + (1 << i) + ' .sticker');
        // Loop through each piece on the face
        for (var j = 0; j < facePieces.length; j++) {
            var color = facePieces[j].className.split(' ')[1];
            state += colorMapping[color];
        }
    }

    return state;
}

function executeMoves(moves) {
    var i = 0;
    var interval = setInterval(function() {
        var move = moves[i];

        // Execute the move
        animateRotation(move.face, move.cw, Date.now());

        i++;
        if (i >= moves.length) {
            clearInterval(interval);
        }
    }, 500); 
}

solveButton.addEventListener('click', function() {
    var state = getCurrentState();

    fetch('/solve?state=' + encodeURIComponent(state))
    .then(response => response.json())
    .then(moves => {
        executeMoves(moves);
    });
});