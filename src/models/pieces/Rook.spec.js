import { chess } from '../../app';

describe('availableMoves', function() {
  beforeEach(function () {
    chess.reset();
  });
  afterEach(function () {
    chess.reset();
  });
  it('should return an empty array', function() {
    expect(chess.player1.pieces.rook1.availableMoves()).toEqual([]);
  });
  it('should return a list of 11 positions', function() {
    chess.player1.pieces.rook1.toPosition(3, 1);
    expect(chess.player1.pieces.rook1.availableMoves().length).toEqual(11);
  });
  it('should return a list of 9 positions', function() {
    chess.player1.pieces.pawn1.toPosition(4, 1);
    chess.player1.pieces.rook1.toPosition(3, 1);
    expect(chess.player1.pieces.rook1.availableMoves().length).toEqual(9);
  });
  it('should return a list of 3 positions', function() {
    console.log(chess.player1.pieces.pawn1.position)
    chess.player1.pieces.rook1.toPosition(8, 2);
    expect(chess.player1.pieces.rook1.availableMoves().length).toEqual(3);
  });
});