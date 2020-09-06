import { fromEvent, of, interval } from 'rxjs';
import { mergeMap, delay, take } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

/* MergeMap - FlatMap: Map to observable, emit values. */

/** Ex1: mergeMap simulating save of click locations */
// faking network request for save
const saveLocation = (location: any) => {
    return of(location).pipe(delay(500));
};
// streams
const click$ = fromEvent(document, 'click');

click$
    .pipe(
        mergeMap((e: MouseEvent) => {
            return saveLocation({
                x: e.clientX,
                y: e.clientY,
                timestamp: Date.now()
            });
        })
    )
    // Saved! {x: 98, y: 170, ...}
    .subscribe(r => console.log('Saved!', r));

/** Ex2: mergeMap with ajax observable */
// free api url
const API_URL = 'https://jsonplaceholder.typicode.com/todos/1';

// streams
const click2$ = fromEvent(document, 'click');

click2$
    .pipe(
        /*
         * Using mergeMap for example, but generally for GET requests
         * you will prefer switchMap.
         * Also, if you do not need the parameter like
         * below you could use mergeMapTo instead.
         * ex. mergeMapTo(ajax.getJSON(API_URL))
         */
        mergeMap(() => ajax.getJSON(API_URL))
    )
    // { userId: 1, id: 1, ...}
    .subscribe(console.log);

/** Ex3: mergeMap with promise (could also use from to convert to observable) */
// helper to create promise
const myPromise = (val: any) =>
    new Promise(resolve => resolve(`${val} World From Promise!`));

// emit 'Hello'
const source$ = of('Hello');

// map to promise and emit result
source$
    .pipe(mergeMap(val => myPromise(val)))
    // output: 'Hello World From Promise'
    .subscribe(val => console.log(val));

/** Ex4: mergeMap with resultSelector */
// helper to create promise
const myPromise4 = (val: any) =>
    new Promise(resolve => resolve(`${val} World From Promise!`));

// emit 'Hello'
const source4$ = of('Hello').pipe(delay(1000));

source4$
    .pipe(
        mergeMap(
            val => myPromise4(val),
            /*
            you can also supply a second argument which receives the source value and emitted
            value of inner observable or promise
          */
            (valueFromSource, valueFromPromise) => {
                return `Source: ${valueFromSource}, Promise: ${valueFromPromise}`;
            }
        )
    )
    // output: "Source: Hello, Promise: Hello World From Promise!"
    .subscribe(val => console.log(val));

/** Ex5: mergeMap with concurrent value */
// emit value every 1s
const source5$ = interval(1000);

source5$
    .pipe(
        mergeMap(
            // project
            val => interval(5000).pipe(take(2)),
            // resultSelector
            (oVal, iVal, oIndex, iIndex) => [oIndex, oVal, iIndex, iVal],
            // concurrent
            2
        )
    )
    /*
          Output:
          [0, 0, 0, 0] <--1st inner observable
          [1, 1, 0, 0] <--2nd inner observable
          [0, 0, 1, 1] <--1st inner observable
          [1, 1, 1, 1] <--2nd inner observable
          [2, 2, 0, 0] <--3rd inner observable
          [3, 3, 0, 0] <--4th inner observable
  */
    .subscribe(val => console.log(val));

function logItem(val: any) {
    var node = document.createElement('li');
    var textnode = document.createTextNode(val);
    node.appendChild(textnode);
    document.getElementById("list").appendChild(node);
}
