import { Component } from "@angular/core";
import { Observable } from "rxjs";

import { ShotClockService } from "./shot-clock.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  providers: [ShotClockService]
})
export class AppComponent {
  #backboards = Array(2);

  constructor (private shotClockService: ShotClockService) { }

  get backboards(): any[] {
    return this.#backboards;
  }

  get count$(): Observable<number> {
    return this.shotClockService.count$;
  }

  togglePause() {
    this.shotClockService.togglePause();
  }

  reset() {
    this.shotClockService.reset();
  }
}
