var solveButton = document.getElementById('solve-btn');
var Cube = require('cubejs'); 
Cube.initSolver(); 

// Converts cubejs notation to face number
function convertMoveToFace(move) {
    var faceMapping = {
        "U": 0,
        "F": 1,
        "R": 2,
        "D": 3,
        "B": 4,
        "L": 5
    };
    return faceMapping[move[0]];
}

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

    return new Cube(state);
}

// Converts cubejs notation to clockwise (cw) boolean
function convertMoveToCW(move) {
    if (move.length === 1) return true; // e.g., "U" is a 90-degree clockwise turn
    if (move[1] === "'") return false; // e.g., "U'" is a 90-degree counter-clockwise turn
    return true; // e.g., "U2" is a 180-degree turn, which is effectively two 90-degree clockwise turns
}

function solveCube() {
    var cube = getCurrentState();
    var solution = cube.solve(); // Find solution
    var moves = solution.split(" "); // Split solution into individual moves

    // Queue the moves and execute them
    var i = 0;
    var interval = setInterval(function() {
        // Convert move to face and direction
        var face = convertMoveToFace(moves[i]);
        var cw = convertMoveToCW(moves[i]);

        // Execute the move
        animateRotation(face, cw, Date.now());

        i++;
        if (i >= moves.length) {
            clearInterval(interval);
        }
    }, 500); // Execute a move every 500ms to ensure the user can actually see each move
}

// Add an event listener to the solve button
solveButton.addEventListener('click', solveCube);