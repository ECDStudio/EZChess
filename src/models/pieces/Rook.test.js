import Chess from '../Chess';

describe('availableMoves', function() {
  let chess = new Chess();
  let _rook;

  beforeEach(function () {
    chess.reset();
    _rook = chess.players.player1.pieces.rook1;
  });
  afterEach(function () {
    chess.reset();
  });
  it('should return an empty array', function() {
    expect(_rook.availableMoves(chess)).toEqual([]);
  });
  it('should return a list of 11 positions', function() {
    _rook.toPosition(chess, { x: 2, y: 0 });
    expect(_rook.availableMoves(chess).length).toEqual(11);
  });
  it('should return a list of 9 positions', function() {
    chess.players.player1.pieces.pawn1.toPosition(chess, { x: 3, y: 0 });
    _rook.toPosition(chess, { x: 2, y: 0 });
    expect(_rook.availableMoves(chess).length).toEqual(9);
  });
  it('should return a list of 3 positions', function() {
    _rook.toPosition(chess, { x: 7, y: 1 });
    expect(_rook.availableMoves(chess).length).toEqual(3);
  });
});