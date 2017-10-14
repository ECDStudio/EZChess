import { chess } from '../app';
import Piece from './Piece';

describe('Piece', function() {
  let piece;

  beforeEach(function () {
    piece = new Piece('white', 0, 0);
  });

  it('should create an instance of a piece', function() {
    expect(piece.side).toEqual('white');
    expect(piece.position.x).toEqual(0);
    expect(piece.position.y).toEqual(0);
    expect(piece.step).toEqual(0);
  });

  describe('toPosition', function() {

    it('should change the position of the piece to [5, 5]', function() {
      piece.toPosition(5, 5);
      expect(piece.position.x).toEqual(5);
      expect(piece.position.y).toEqual(5);
    });

    it('should not change the position of the piece', function() {
      piece.toPosition(-1, 5);
      expect(piece.position.x).toEqual(0);
      expect(piece.position.y).toEqual(0);
    });

    it('should not change the position of the piece', function() {
      piece.toPosition(4, 8);
      expect(piece.position.x).toEqual(0);
      expect(piece.position.y).toEqual(0);
    });

    it('should not change the position of the piece', function() {
      piece.toPosition('5', 5);
      expect(piece.position.x).toEqual(0);
      expect(piece.position.y).toEqual(0);
    });

    it('should change the position of the piece to [-1, -1]', function() {
      piece.toPosition(-1, -1);
      expect(piece.position.x).toEqual(-1);
      expect(piece.position.y).toEqual(-1);
    });
  });
});