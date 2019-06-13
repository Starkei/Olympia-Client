export class Weather {
  constructor(
    public cityName: string,
    public temp: string,
    public icon: string,
    public weatherKind: string,
    public tempMax: string,
    public tempMin: string,
    public humidity: string,
    public pressure: string,
    public speed: string,
    public all: string
  ) {}
}
