import { Component, OnInit } from "@angular/core";
import "rxjs/Rx";
import { WeatherService } from "src/app/services/weather/weather.service";
import { Weather } from "src/app/classes/currentWeather/current-weather";

@Component({
  selector: "app-weather",
  templateUrl: "./weather.component.html",
  styleUrls: ["./weather.component.scss"]
})
export class WeatherComponent implements OnInit {
  weather: Weather;

  constructor(private weatherSer: WeatherService) {}

  location: any = {};
  ngOnInit() {
    navigator.geolocation.getCurrentPosition(pos => {
      this.location = pos.coords;
      const lat = this.location.latitude;
      const lon = this.location.longitude;
      this.weatherSer.localweather(lat, lon).subscribe(data => {
        this.weather = new Weather(
          data.name,
          data.main.temp,
          data.weather[0].icon,
          data.weather[0].description,
          data.main.temp_max,
          data.main.temp_min,
          data.main.humidity,
          data.main.pressure,
          data.wind.speed,
          data.clouds.all
        );
      });
    });
  }
}
