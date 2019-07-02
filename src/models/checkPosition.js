export const checkPosition = (x, y, side, game) => {
  for (let player in game.players) {
    const target = game.players[player];

    for (let p in target.pieces) {
      const piece = target.pieces[p];

      if (piece.position.x !== x || piece.position.y !== y) continue;

      if (target.side === side)
        return 'friendly'; // if there is piece from the same side
      else return 'enemy'; // if there is piece from the other side
    }
  }
}