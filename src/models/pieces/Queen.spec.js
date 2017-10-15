import { chess } from '../../app';

describe('availableMoves', function() {
  let _queen;

  beforeEach(function () {
    chess.reset();
    _queen = chess.players.player1.pieces.queen;
  });
  afterEach(function () {
    chess.reset();
  });
  it('should return an empty array', function() {
    expect(_queen.availableMoves(chess)).toEqual([]);
  });
  it('should return a list of 19 positions', function() {
    _queen.toPosition(3, 3, chess);
    expect(_queen.availableMoves(chess).length).toEqual(19);
  });
  it('should return a list of 15 positions', function() {
    _queen.toPosition(2, 0, chess);
    expect(_queen.availableMoves(chess).length).toEqual(15);
  });
});