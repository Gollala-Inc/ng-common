import { CommaSeparateNumberPipe } from './comma-separate-number.pipe';

describe('CommaSeparateNumberPipe', () => {
  it('create an instance', () => {
    const pipe = new CommaSeparateNumberPipe();
    expect(pipe).toBeTruthy();
  });
});
