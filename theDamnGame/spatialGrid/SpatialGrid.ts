/* ============================
 * Spatial Grid Class
 * =========================== */

import { aabb2DIntersection } from '../gameUtils';

// adapted with slight modifications from
// https://github.com/kirbysayshi/broad-phase-bng/blob/master/lib/ro.coltech.spatial-grid.js

export default class SpatialGrid {
  idCounter: number;
  entities: any[];
  min: { x: number; y: number };
  max: { x: number; y: number };
  pxCellSize: number;
  grid: any[];
  debug: boolean;
  totalCells: number;
  collisionChecks: number;
  allocatedCells: number;
  hashChecks: number;

  constructor(minX, minY, maxX, maxY, cellSize) {
    this.idCounter = 0;
    this.entities = [];
    this.min = {
      x: minX,
      y: minY,
    };
    this.max = {
      x: maxX,
      y: maxY,
    };
    this.pxCellSize = cellSize;
    this.grid = [[]];
    this.debug = false;

    // these are purely for reporting purposes
    this.collisionChecks = 0;
    this.totalCells = 0;
    this.allocatedCells = 0;
    this.hashChecks = 0;
  }

  update({ ctx }) {
    const cGridWidth = Math.floor((this.max.x - this.min.x) / this.pxCellSize);
    const cGridHeight = Math.floor((this.max.y - this.min.y) / this.pxCellSize);

    // the total number of cells this grid will contain
    this.totalCells = cGridWidth * cGridHeight;
    this.allocatedCells = 0;

    // construct grid
    // NOTE: this is a purposeful use of the Array() constructor
    this.grid = Array(cGridWidth);

    // insert all entities into grid
    for (let i = 0; i < this.entities.length; i++) {
      const entity = this.entities[i];

      if (entity.dead) {
        this.removeEntity(entity);
        continue;
      }

      // if entity is outside the grid extents, then ignore it
      if (
        entity.bounds.x + entity.bounds.w < this.min.x ||
        entity.bounds.x > this.max.x ||
        entity.bounds.y + entity.bounds.h < this.min.y ||
        entity.bounds.y > this.max.y
      ) {
        continue;
      }

      // find extremes of cells that entity overlaps
      // subtract min to shift grid to avoid negative numbers
      const cXEntityMin = Math.floor(
        (entity.bounds.x - this.min.x) / this.pxCellSize,
      );
      const cXEntityMax = Math.floor(
        (entity.bounds.x + entity.bounds.w - this.min.x) / this.pxCellSize,
      );
      const cYEntityMin = Math.floor(
        (entity.bounds.y - this.min.y) / this.pxCellSize,
      );
      const cYEntityMax = Math.floor(
        (entity.bounds.y + entity.bounds.h - this.min.y) / this.pxCellSize,
      );

      // insert entity into each cell it overlaps
      // we're looping to make sure that all cells between extremes are found
      for (let cX = cXEntityMin; cX <= cXEntityMax; cX++) {
        // make sure a column exists, initialize if not to grid height length
        // NOTE: again, a purposeful use of the Array constructor
        if (!this.grid[cX]) {
          this.grid[cX] = Array(cGridHeight);
        }

        const gridCol = this.grid[cX];

        // loop through each cell in this column
        for (let cY = cYEntityMin; cY <= cYEntityMax; cY++) {
          // ensure we have a bucket to put entities into for this cell
          if (!gridCol[cY]) {
            gridCol[cY] = [];

            // this is for stats purposes only
            this.allocatedCells += 1;
          }

          const gridCell = gridCol[cY];

          // add entity to cell
          gridCell.push(entity);

          // draw this grid cell since it has active entities
          // @TODO move to the draw method and dupe mapping sot it's
          // easily disabled
          if (this.debug) {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.fillRect(
              cX * this.pxCellSize,
              cY * this.pxCellSize,
              this.pxCellSize,
              this.pxCellSize,
            );
          }
        }
      }
    }
  }

  addEntity(entity) {
    if (!entity.bounds) {
      throw new Error(
        'Entities added to the SpatialGrid must have a `bounds` property.',
      );
    }
    if (!entity.id) {
      entity.id = this.idCounter;
      this.idCounter += 1;
    }
    this.entities.push(entity);
  }

  removeEntity(entity) {
    this.entities.splice(this.entities.indexOf(entity), 1);
  }

  queryForCollisionPairs() {
    // store checked hash ids
    const checked = {};

    // store collision pairs
    const pairs = [];

    // reset counts, for debug/comparison purposes
    this.collisionChecks = 0;
    this.hashChecks = 0;

    // for every column in the grid...
    for (let i = 0; i < this.grid.length; i++) {
      const gridCol = this.grid[i];

      // ignore columns that have no cells
      if (!gridCol) {
        continue;
      }

      // for every cell within a column of the grid...
      for (let j = 0; j < gridCol.length; j++) {
        const gridCell = gridCol[j];

        // ignore cells that have no objects
        if (!gridCell) {
          continue;
        }

        // for every object in a cell...
        for (let k = 0; k < gridCell.length; k++) {
          const entityA = gridCell[k];

          // for every other object in a cell...
          for (let l = k + 1; l < gridCell.length; l++) {
            const entityB = gridCell[l];

            // create a unique key to mark this pair.
            // use both combinations to ensure linear time
            const hashA = entityA.id + ':' + entityB.id;
            const hashB = entityB.id + ':' + entityA.id;

            this.hashChecks += 2;

            entityA.hit = false;
            entityB.hit = false;

            if (!checked[hashA] && !checked[hashB]) {
              // mark this pair has checked
              checked[hashA] = true;
              checked[hashB] = true;

              this.collisionChecks += 1;

              if (aabb2DIntersection(entityA.bounds, entityB.bounds)) {
                pairs.push([entityA, entityB]);
              }
            }
          }
        }
      }
    }

    pairs.map((pair) => {
      pair[0].hit = true;
      pair[1].hit = true;
    });

    return pairs;
  }

  draw({ ctx, dpr }) {
    if (!this.debug) return;

    const cGridWidth = Math.floor((this.max.x - this.min.x) / this.pxCellSize);
    const cGridHeight = Math.floor((this.max.y - this.min.y) / this.pxCellSize);

    ctx.save();
    ctx.lineWidth = 1 * dpr;
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';

    for (let i = 0; i <= cGridWidth; i++) {
      const x = this.min.x + i * this.pxCellSize;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, this.max.y);
      ctx.stroke();
    }

    for (let j = 0; j <= cGridHeight; j++) {
      const y = this.min.y + j * this.pxCellSize;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(this.max.x, y);
      ctx.stroke();
    }
    ctx.restore();
    ctx.textAlign = 'left';
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    const size = 12 * dpr;
    ctx.font = `${size}px "Menlo", "Lucida Console", Monaco, monospace`;
    ctx.fillText(
      'Total Cells _________ ' + this.totalCells,
      20 * dpr,
      30 * dpr,
    );
    ctx.fillText(
      'Allocated Cells _____ ' + this.allocatedCells,
      20 * dpr,
      50 * dpr,
    );
    ctx.fillText(
      'Collision Checks ____ ' + this.collisionChecks,
      20 * dpr,
      70 * dpr,
    );
    ctx.fillText(
      'Hash Checks _________ ' + this.hashChecks,
      20 * dpr,
      90 * dpr,
    );

    ctx.fillText(
      'Entities ____________ ' + this.entities.length,
      20 * dpr,
      110 * dpr,
    );
  }
}
