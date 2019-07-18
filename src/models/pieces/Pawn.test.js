import Chess from '../Chess';

describe('availableMoves', function() {
  let chess = new Chess();
  let pawn1,
      pawn2;
  
  beforeEach(function () {
    chess.reset();
    pawn1 = chess.players.player1.pieces.pawn3;
    pawn2 = chess.players.player2.pieces.pawn2;
  });
  afterEach(function () {
    chess.reset();
  });
  it('should return a list of 2 positions', function() {
    expect(pawn1.availableMoves(chess).length).toEqual(2);
  });
  it('should return a list of 1 positions', function() {
    pawn1.toPosition(chess, { x: 2, y: 2 });
    expect(pawn1.availableMoves(chess).length).toEqual(1);
  });
  it('should include diagonal captures', function() {
    pawn1.toPosition(chess, { x: 3, y: 2 });
    pawn2.toPosition(chess, { x: 4, y: 1 });
    expect(pawn1.availableMoves(chess).length).toEqual(2);
  });

  describe('En Passant Scenerio:', function() {
    it('should return a list of 2 positions', function() {
      pawn1.toPosition(chess, { x: 4, y: 2 });
      chess.turn += 1;
      pawn2.toPosition(chess, { x: 4, y: 1, enPassMove: true });
      chess.turn += 1;
      setTimeout(() => {
        expect(pawn1.availableMoves(chess).length).toEqual(2);
      }, 1);
    });
    it('should return a position of [-1, -1]', function() {
      pawn1.toPosition(chess, { x: 4, y: 2 });
      chess.turn += 1;
      pawn2.toPosition(chess, { x: 4, y: 1, enPassMove: true });
      chess.turn += 1;
      setTimeout(() => {
        pawn1.toPosition(chess, { x: 5, y: 1, enPassMove: true });
        expect(pawn2.position.x).toEqual(-1);
        expect(pawn2.position.y).toEqual(-1);
      }, 1);
    });
    it('should return a list of 1 positions', function() {
      pawn1.toPosition(chess, { x: 4, y: 2 });
      chess.turn += 1;
      pawn2.toPosition(chess, { x: 4, y: 1, enPassMove: true });
      chess.turn += 1;
      setTimeout(() => {
        chess.turn += 1;
        expect(pawn1.availableMoves(chess).length).toEqual(1);
      }, 1);
    });
  })
  describe('Promotion', function() {
    it('should return false', function() {
      pawn1.toPosition(chess, { x: 4, y: 2 });
      expect(pawn1.promotion).toEqual(false);
    });
    it('should return true', function() {
      pawn1.toPosition(chess, { x: 7, y: 2 });
      expect(pawn1.promotion).toEqual(true);
    });
    it('should return false', function() {
      pawn2.toPosition(chess, { x: 4, y: 1 });
      expect(pawn2.promotion).toEqual(false);
    });
    it('should return true', function() {
      pawn2.toPosition(chess, {x: 0, y: 1 });
      expect(pawn2.promotion).toEqual(true);
    });
  })
})