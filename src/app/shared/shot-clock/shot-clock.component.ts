import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-shot-clock",
  templateUrl: "./shot-clock.component.html",
  styleUrls: ["./shot-clock.component.scss"]
})
export class ShotClockComponent {
  #count: number = 0;

  @Input() set count(count: number) {
    this.#count = count;
  }

  @Output() togglePause = new EventEmitter<void>();
  @Output() reset = new EventEmitter<void>();

  get count(): number {
    return this.#count;
  }
}
