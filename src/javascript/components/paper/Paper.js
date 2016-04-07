// Paper and Paper class references
let Paper = null;
let Size = null;
let Path = null;
let Point = null;
let Shape = null;

// Wait for the window to be read before importing paper
if (typeof window !== 'undefined') {
    // Core
    Paper = require('paper/dist/paper-core');

    // Aliases
    Size = Paper.Size;
    Path = Paper.Path;
    Point = Paper.Point;
    Shape = Paper.Shape;
}

export { Paper, Path, Point, Size, Shape };
