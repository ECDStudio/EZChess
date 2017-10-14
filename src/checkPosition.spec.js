import { chess } from './app';
import { checkPosition } from './checkPosition';

describe('checkPosition', function() {
  it('should return "friendly" in a position with a piece from the same side', function() {
  	let target = checkPosition(1, 1, 'white', chess);
    expect(target).toEqual('friendly');
  });
  it('should return "enemy" in a position with a piece from the opposite side', function() {
  	let target = checkPosition(1, 1, 'black', chess);
    expect(target).toEqual('enemy');
  });
  it('should return undefine in an empty position', function() {
  	let target = checkPosition(5, 5, 'black', chess);
    expect(target).toEqual(undefined);
  });
});