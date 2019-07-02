export default class Piece {
  constructor(side, pX, pY) {
    this.side = side;
    this.position = {
      x: pX,
      y: pY
    };
    this.step = 0;
  }

  toPosition(game, pX, pY) {
    if (typeof pX !== 'number' || typeof pY !== 'number') return;

    // validate target position
    if (pX >= 0 && pX < 8 && pY >= 0 && pY < 8) {
      this.position.x = pX;
      this.position.y = pY;
      this.step += 1;

      // Capture enemy piece in target Position
      for (let player in game.players) {
        const enemy = game.players[player];

        if (enemy.side === this.side) continue; // not enemy

        for (let p in enemy.pieces) {
          const piece = enemy.pieces[p];

          if (piece.position.x !== pX || piece.position.y !== pY) continue;

          piece.position.x = -1;
          piece.position.y = -1;
        }
      }
    }

    // [-1, -1] position is being captured
    if (pX === -1 && pY === -1) {
      this.position.x = pX;
      this.position.y = pY;
    }

    return [this.position.x, this.position.y];
  }
}