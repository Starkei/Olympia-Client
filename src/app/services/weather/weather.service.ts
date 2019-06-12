import { Injectable } from "@angular/core";
import { Weather } from "src/app/classes/currentWeather/current-weather";
import { Http, Response } from "@angular/http";
import "rxjs/Rx";
@Injectable({
  providedIn: "root"
})
export class WeatherService {
  current: Weather;

  constructor(private http: Http) {}

  localweather(lat: string, lon: string) {
    return this.http
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=53.9&lon=27.5667&appid=fdcd2f230eeadf67a55c6599dcd3045b&units=metric&lang=ru`
      )
      .map((response: Response) => response.json());
  }
}
