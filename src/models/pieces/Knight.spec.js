import { chess } from '../../app';

describe('availableMoves', function() {
  let _knight;
  
  beforeEach(function () {
    chess.reset();
    _knight = chess.player1.pieces.knight1;
  });
  afterEach(function () {
    chess.reset();
  });
  it('should return a list of 2 positions', function() {
    expect(_knight.availableMoves().length).toEqual(2);
  });
  it('should return a list of 6 positions', function() {
    _knight.toPosition(3, 3);
    expect(_knight.availableMoves().length).toEqual(6);
  });
  it('should return a list of 4 positions', function() {
    _knight.toPosition(3, 1);
    expect(_knight.availableMoves().length).toEqual(4);
  });
});