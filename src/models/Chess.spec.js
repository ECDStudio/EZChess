import { chess } from '../app';
import Chess from './Chess';

describe('Chess', function() {
  let game = new Chess();

  it('should create an instance of a chess game', function() {
    expect(game.turn).toEqual(0);
    expect(typeof(game.players)).toEqual('object');
    expect(typeof(game.players.player1)).toEqual('object');
    expect(typeof(game.players.player2)).toEqual('object');
  });

  describe('reset', function() {
    it('should set game turn to 0', function() {
      game.turn = 4;
      expect(game.turn).toEqual(4);
      game.reset();
      expect(game.turn).toEqual(0);
    });
    it('should reset default position of any piece', function() {
      let rook = game.players.player1.pieces.rook1;
      expect(rook.position.x).toEqual(0);
      expect(rook.position.y).toEqual(0);
      rook.toPosition(4, 4, game);
      expect(rook.position.x).toEqual(4);
      expect(rook.position.y).toEqual(4);
      game.reset();
      const newRook = game.players.player1.pieces.rook1;
      expect(newRook.position.x).toEqual(0);
      expect(newRook.position.y).toEqual(0);
    });
  });

  it('should initial with turn of player1 as true and player2 as false', function() {
    expect(game.players.player1.isTurn).toEqual(true);
    expect(game.players.player2.isTurn).toEqual(false);
  });

  describe('switchTurn', function() {
    it('should set turn of player1 to false and player2 to true', function() {
      game.switchTurn();
      expect(game.players.player1.isTurn).toEqual(false);
      expect(game.players.player2.isTurn).toEqual(true);
    });
  });
});