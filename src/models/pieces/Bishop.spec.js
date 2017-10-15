import { chess } from '../../app';

describe('availableMoves', function() {
  let _bishop;

  beforeEach(function () {
    chess.reset();
    _bishop = chess.players.player1.pieces.bishop1;
  });
  afterEach(function () {
    chess.reset();
  });
  it('should return an empty array', function() {
    expect(_bishop.availableMoves(chess)).toEqual([]);
  });
  it('should return a list of 6 positions', function() {
    _bishop.toPosition(chess, 2, 2);
    expect(_bishop.availableMoves(chess).length).toEqual(6);
  });
  it('should return a list of 6 positions', function() {
    _bishop.toPosition(chess, 2, 5);
    expect(_bishop.availableMoves(chess).length).toEqual(6);
  });
  it('should return a list of 8 positions', function() {
    _bishop.toPosition(chess, 6, 2);
    expect(_bishop.availableMoves(chess).length).toEqual(8);
  });
});