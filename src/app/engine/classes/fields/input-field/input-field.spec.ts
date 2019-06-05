import { InputField } from './input-field';

describe('InputField', () => {
  it('should create an instance', () => {
    expect(new InputField("test", "number")).toBeTruthy();
  });
});
