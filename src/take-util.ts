import { take, tap, takeUntil, mergeMap, map, filter, scan, withLatestFrom } from 'rxjs/operators';
import { of, interval, fromEvent, timer } from 'rxjs';

/* TakeUtil: Emit values until provided observable emits.*/

/** Ex1:  Take values until timer emits */
//emit value every 1s
const source = interval(1000);
//after 5 seconds, emit value
const timer$ = timer(5000);
//when timer emits after 5s, complete source
const example = source.pipe(takeUntil(timer$));
//output: 0,1,2,3
const subscribe = example.subscribe(val => console.log(val));

/** Ex2: Take mouse events on mouse down until mouse up */
const mousedown$ = fromEvent(document, 'mousedown');
const mouseup$ = fromEvent(document, 'mouseup');
const mousemove$ = fromEvent(document, 'mousemove');

// after mousedown, take position until mouse up
mousedown$
    .pipe(
        mergeMap(_ => {
            return mousemove$.pipe(
                map((e: any) => ({
                    x: e.clientX,
                    y: e.clientY
                })),
                // complete inner observable on mouseup event
                takeUntil(mouseup$)
            );
        })
    )
    .subscribe(console.log);

/** Ex3:  Take the first 5 even numbers */
//emit value every 1s
const source3 = interval(1000);
//is number even?
const isEven = (val: any) => val % 2 === 0;
//only allow values that are even
const evenSource = source3.pipe(filter(isEven));
//keep a running total of the number of even numbers out
const evenNumberCount = evenSource.pipe(scan((acc, _) => acc + 1, 0));
//do not emit until 5 even numbers have been emitted
const fiveEvenNumbers = evenNumberCount.pipe(filter(val => val > 5));

const example3 = evenSource.pipe(
    //also give me the current even number count for display
    withLatestFrom(evenNumberCount),
    map(([val, count]) => `Even number (${count}) : ${val}`),
    //when five even numbers have been emitted, complete source observable
    takeUntil(fiveEvenNumbers)
);
/*
    Even number (1) : 0,
  Even number (2) : 2
    Even number (3) : 4
    Even number (4) : 6
    Even number (5) : 8
*/
const subscribe3 = example3.subscribe(val => console.log(val));

function logItem(val: any) {
    var node = document.createElement('li');
    var textnode = document.createTextNode(val);
    node.appendChild(textnode);
    document.getElementById("list").appendChild(node);
}
