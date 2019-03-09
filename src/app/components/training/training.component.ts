import { Component, OnInit } from "@angular/core";
import { Training } from "../../interfaces/training";
import { TrainingService } from "../../services/training/training.service";

@Component({
  selector: "app-training",
  templateUrl: "./training.component.html",
  styleUrls: ["./training.component.scss"]
})
export class TrainingComponent implements OnInit {
  training: Array<Training> = [];

  constructor(private service: TrainingService) {}

  ngOnInit() {
    this.getTraining();
  }
  getTraining() {
    this.training = this.service.getTraining();
  }
}
