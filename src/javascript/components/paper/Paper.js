// Paper and Paper class references
let Paper = null;
let Group = null;
let Size = null;
let Path = null;
let Point = null;
let Shape = null;
let Rectangle = null;

// Wait for the window to be read before importing paper
if (typeof window !== 'undefined') {
    // Core
    Paper = require('paper/dist/paper-core');

    // Aliases
    Group = Paper.Group;
    Size = Paper.Size;
    Path = Paper.Path;
    Point = Paper.Point;
    Shape = Paper.Shape;
    Rectangle = Paper.Rectangle;
}

export { Paper, Group, Path, Point, Size, Shape, Rectangle };
