import { checkPosition } from './checkPosition';

describe('Check Position', function() {
  it('should return "friendly" in a position with a piece from the same side', function() {
    expect(checkPosition(1, 1, 'white')).toEqual('friendly');
  });
  it('should return "enemy" in a position with a piece from the opposite side', function() {
    expect(checkPosition(1, 1, 'black')).toEqual('enemy');
  });
});