export default class Piece {
  constructor(side, x, y) {
    this.side = side;
    this.position = { x, y };
    this.step = 0;
  }

  toPosition(game, position) {
    const { x, y } = position;

    if (typeof x !== 'number' || typeof y !== 'number')
      return this.position;

    // validate target position
    if (x >= 0 && x < 8 && y >= 0 && y < 8) {
      this.position = { x, y };
      this.step += 1;

      // Capture enemy piece in target Position
      for (let player of Object.values(game.players)) {
        if (player.side === this.side) continue; // not enemy

        for (let piece of Object.values(player.pieces)) {
          if (piece.position.x !== x || piece.position.y !== y) continue;

          piece.position = { x: -1, y: -1 };
        }
      }
    }

    // [-1, -1] position is being captured
    if (x === -1 && y === -1)
      this.position = { x, y };

    return this.position;
  }
}