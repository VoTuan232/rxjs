# rxjs

# Link setup Webpack: https://medium.com/codingthesmartway-com-blog/getting-started-with-rxjs-part-1-setting-up-the-development-environment-creating-observables-db76ce053725

#Turorial

#Link YT: https://www.youtube.com/watch?v=PhggNGsSQyg: Start
#Link YT2: https://www.youtube.com/watch?v=X9fdpGthrXA&list=PL55RiY5tL51pHpagYcrN9ubNLVXF8rGVi&index=4 : Understand Rxjs

# Hot, Cold Observable

# Subject and BehaviorSubject, ReplaySubject

- Subject:
- BehaviorSubject: Requires an initial value and emits the current value (is last value) to new subscribers
- ReplaySubject: "Replays" or emits old values to new subscribers

# Operator

- Merge:

- Of: Emit `sequences` (number, object, array or function) : once time at all items
- From: Turn `an` array, promise, or iterable into an observable.: 1 by 1 at time

💡 flatMap is an alias for mergeMap!: multiple inner subscripton
💡 If only one inner subscription should be active at a time, try switchMap!: one inner subscription
💡 If the order of emission and subscription of inner observables is important, try concatMap!

- Concat:
  💡 You can think of concat like a line at a ATM, the next transaction (subscription) cannot start until the previous completes!
  💡 If throughput, not order, is a primary concern, try merge instead!

- ForkJoin:
  💡 If you want corresponding emissions from multiple observables as they occur, try zip!
  ⚠ If an inner observable does not complete forkJoin will never emit a value!
