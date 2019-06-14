import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { EventService } from "src/app/services/event/event.service";
import { EventFilter } from "src/app/classes/event-fitler/event-filter";
import { FilterComponent } from "../../shared/filter-component/filter/filter.component";

@Component({
  selector: "app-events",
  templateUrl: "./events.component.html",
  styleUrls: ["./events.component.scss"]
})
export class EventsComponent implements OnInit, OnDestroy {
  @ViewChild(FilterComponent) filterComponent: FilterComponent;
  filter: EventFilter;

  constructor(public eventService: EventService) {
    this.filter = new EventFilter(this.eventService);
  }

  ngOnInit() {}
  ngOnDestroy(): void {
    this.eventService.ngOnDestroy();
  }
}
