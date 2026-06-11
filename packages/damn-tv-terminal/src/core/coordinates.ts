/** Map world Y to playfield screen Y. Camera advances forward so entities scroll down toward the player. */
export function worldToScreenY(worldY: number, cameraY: number): number {
  return cameraY - worldY;
}

export function worldRectToScreen(
  entity: { x: number; y: number; w: number; h: number },
  cameraY: number,
): { x: number; y: number; w: number; h: number } {
  return {
    x: entity.x,
    y: worldToScreenY(entity.y, cameraY),
    w: entity.w,
    h: entity.h,
  };
}
