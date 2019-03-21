import { Component, OnInit } from "@angular/core";
import { EventService } from "src/app/services/event/event.service";
import { EventFilter } from "src/app/classes/event-fitler/event-filter";

@Component({
  selector: "app-events",
  templateUrl: "./events.component.html",
  styleUrls: ["./events.component.scss"]
})
export class EventsComponent implements OnInit {
  private filter: EventFilter;

  constructor(public eventService: EventService) {
    this.filter = new EventFilter(this.eventService);
  }

  ngOnInit() {}
}
