// solve.js
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

// Converts cubejs notation to clockwise (cw) boolean
function convertMoveToCW(move) {
    if (move.length === 1) return true; 
    if (move[1] === "'") return false; 
    return true;
}

function solveCube(state) {
    var cube = new Cube(state);
    var solution = cube.solve(); 
    var moves = solution.split(" "); 

    var movesTransformed = moves.map(move => ({
        face: convertMoveToFace(move),
        cw: convertMoveToCW(move)
    }));

    return movesTransformed;
}

module.exports = solveCube;