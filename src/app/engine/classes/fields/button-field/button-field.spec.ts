import { ButtonField } from './button-field';

describe('ButtonField', () => {
  it('should create an instance', () => {
    expect(new ButtonField("test", "icon", () => { })).toBeTruthy();
  });
});
