import { chess } from '../../app';

describe('availableMoves', function() {
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
    _rook.toPosition(2, 0, chess);
    expect(_rook.availableMoves(chess).length).toEqual(11);
  });
  it('should return a list of 9 positions', function() {
    chess.players.player1.pieces.pawn1.toPosition(3, 0, false, chess);
    _rook.toPosition(2, 0, chess);
    expect(_rook.availableMoves(chess).length).toEqual(9);
  });
  it('should return a list of 3 positions', function() {
    _rook.toPosition(7, 1, chess);
    expect(_rook.availableMoves(chess).length).toEqual(3);
  });
});