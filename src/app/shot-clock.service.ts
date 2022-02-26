import { Injectable } from "@angular/core";

import { Observable, BehaviorSubject, EMPTY, timer } from "rxjs";
import { switchMap, tap, map, takeWhile, share } from "rxjs/operators";

interface ShotClockState {
  reset: boolean;
  pause: boolean;
}

const MS_IN_SECOND = 1000;
const INITIAL_COUNT = 24;

const SHOT_CLOCK_DEFAULT_STATE = {
  reset: true,
  pause: false
};

@Injectable()
export class ShotClockService {
  #count: number = INITIAL_COUNT + 1;
  #shotClockTrigger$: BehaviorSubject<ShotClockState>;
  #shotClock$: Observable<number | never>;

  constructor() {
    this.#shotClockTrigger$ = new BehaviorSubject(SHOT_CLOCK_DEFAULT_STATE);

    const countdownTimer$: Observable<number> = timer(0, MS_IN_SECOND).pipe(
      tap(() => {
        this.#count--;
      }),
      map(() => this.#count),
      takeWhile(() => this.#count >= 0)
    );

    this.#shotClock$ = this.#shotClockTrigger$.pipe(
      tap(({ reset }) => {
        if (reset) {
          this.#count = INITIAL_COUNT + 1;
        }
      }),
      switchMap(({ reset, pause }) => (pause ? EMPTY : countdownTimer$)),
      share()
    );
  }

  get count$(): Observable<number> {
    return this.#shotClock$;
  }

  togglePause() {
    this.#shotClockTrigger$.next({
      reset: false,
      pause: !this.#shotClockTrigger$.value.pause
    });
  }

  reset() {
    this.#shotClockTrigger$.next(SHOT_CLOCK_DEFAULT_STATE);
  }
}
