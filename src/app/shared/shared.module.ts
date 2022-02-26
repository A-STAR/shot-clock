import { NgModule } from "@angular/core";

import { ShotClockComponent } from "./shot-clock/shot-clock.component";

@NgModule({
  declarations: [ShotClockComponent],
  exports: [ShotClockComponent]
})
export class SharedModule {}
