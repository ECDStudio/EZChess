import Chess from '../Chess';

describe('availableMoves', function() {
  let chess = new Chess();
  let _king;

  beforeEach(function () {
    chess.reset();
    _king = chess.players.player1.pieces.king;
  });
  afterEach(function () {
    chess.reset();
  });
  it('should return an empty array', function() {
    expect(_king.availableMoves(chess)).toEqual([]);
  });
  it('should return a list of 1 positions', function() {
    chess.players.player1.pieces.bishop1.toPosition(chess, { x: -1, y: -1 });
    expect(_king.availableMoves(chess).length).toEqual(1);
  });
  it('should return a list of 8 positions', function() {
    _king.toPosition(chess, { x: 3, y: 4 });
    expect(_king.availableMoves(chess).length).toEqual(8);
  });
  it('should return a list of 5 positions', function() {
    _king.toPosition(chess, { x: 4, y: 1 });
    expect(_king.availableMoves(chess).length).toEqual(5);
  });

  describe('King Side Castling Scenerio:', function() {
    const clearPath = () => {
      chess.players.player1.pieces.knight1.toPosition(chess, { x: -1, y: -1 });
      chess.players.player1.pieces.bishop1.toPosition(chess, { x: -1, y: -1 });
    }

    it('should return a list of 2 positions', function() {
      clearPath();
      expect(_king.availableMoves(chess).length).toEqual(2);
    });
    it('rook should be at position [0, 2]', function() {
      clearPath();
      _king.toPosition(chess, { x: 0, y: 1, castle: 'king-castle' });
      expect(chess.players.player1.pieces.rook1.position.x).toEqual(0);
      expect(chess.players.player1.pieces.rook1.position.y).toEqual(2);
    });
    it('king already moved', function() {
      clearPath();
      _king.step = 1;
      expect(_king.availableMoves(chess).length).toEqual(1);
    });
    it('rook already moved', function() {
      clearPath();
      chess.players.player1.pieces.rook1.step = 1;
      expect(_king.availableMoves(chess).length).toEqual(1);
    });
    it('enemy queen marking the path to castle', function() {
      clearPath();
      chess.players.player1.pieces.pawn2.toPosition(chess, { x: -1, y: -1, enPassMove: false });
      chess.players.player2.pieces.queen.toPosition(chess, { x: 3, y: 1 });
      expect(_king.availableMoves(chess).length).toEqual(1);
    });
    it('enemy knight marking the path to castle', function() {
      clearPath();
      chess.players.player2.pieces.knight1.toPosition(chess, { x: 2, y: 1 });
      expect(_king.availableMoves(chess).length).toEqual(0);
    });
    it('king is in check', function() {
      clearPath();
      chess.players.player2.pieces.knight1.toPosition(chess, { x: 2, y: 4 });
      expect(_king.availableMoves(chess).length).toEqual(1);
    });
  });

  describe('Queen Side Castling Scenerio:', function() {
    const clearPath = () => {
      chess.players.player1.pieces.queen.toPosition(chess, { x: -1, y: -1 });
      chess.players.player1.pieces.knight2.toPosition(chess, { x: -1, y: -1 });
      chess.players.player1.pieces.bishop2.toPosition(chess, { x: -1, y: -1 });
    }

    it('should return a list of 2 positions', function() {
      clearPath();
      expect(_king.availableMoves(chess).length).toEqual(2);
    });
    it('rook should be at position [0, 4]', function() {
      clearPath();
      _king.toPosition(chess, { x: 0, y: 5, castle: 'queen-castle' });
      expect(chess.players.player1.pieces.rook2.position.x).toEqual(0);
      expect(chess.players.player1.pieces.rook2.position.y).toEqual(4);
    });
    it('king already moved', function() {
      clearPath();
      _king.step = 1;
      expect(_king.availableMoves(chess).length).toEqual(1);
    });
    it('rook already moved', function() {
      clearPath();
      chess.players.player1.pieces.rook2.step = 1;
      expect(_king.availableMoves(chess).length).toEqual(1);
    });
    it('enemy queen marking the path to castle', function() {
      clearPath();
      chess.players.player1.pieces.pawn5.toPosition(chess, { x: -1, y: -1, enPassMove: false });
      chess.players.player2.pieces.queen.toPosition(chess, { x: 3, y: 4 });
      expect(_king.availableMoves(chess).length).toEqual(0);
    });
    it('enemy knight marking the path to castle', function() {
      clearPath();
      chess.players.player2.pieces.knight1.toPosition(chess, { x: 2, y: 3 });
      expect(_king.availableMoves(chess).length).toEqual(0);
    });
    it('under checked', function() {
      clearPath();
      chess.players.player2.pieces.knight1.toPosition(chess, { x: 2, y: 4 });
      expect(_king.availableMoves(chess).length).toEqual(1);
    });
  });
});