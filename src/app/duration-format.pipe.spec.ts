import { DurationFormatPipe } from "./customer/duration-format.pipe";


describe('DurationFormatPipe', () => {
  it('create an instance', () => {
    const pipe = new DurationFormatPipe();
    expect(pipe).toBeTruthy();
  });
});
