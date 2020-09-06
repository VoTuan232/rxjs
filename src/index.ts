import { concat, of, empty, interval, forkJoin, throwError } from 'rxjs';
import { startWith, delay, take, mergeMap, catchError } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

/** ForkJoin: When all observables complete, emit the last emitted value from each */

/** Ex1:  Using a dictionary of sources */
/*
  when all observables complete, provide the last
  emitted value from each as dictionary
*/
forkJoin(
    // as of RxJS 6.5+ we can use a dictionary of sources
    {
        google: ajax.getJSON('https://api.github.com/users/google'),
        microsoft: ajax.getJSON('https://api.github.com/users/microsoft'),
        users: ajax.getJSON('https://api.github.com/users')
    }
)
    // { google: object, microsoft: object, users: array }
    .subscribe(x => console.log(x));

/** Ex2: Observables completing after different durations */
const myPromise = (val: any) =>
    new Promise(resolve =>
        setTimeout(() => resolve(`Promise Resolved: ${val}`), 5000)
    );

/*
  when all observables complete, give the last
  emitted value from each as an array
*/
const example = forkJoin(
    //emit 'Hello' immediately
    of('Hello'),
    //emit 'World' after 1 second
    of('World').pipe(delay(1000)),
    //emit 0 after 1 second
    interval(1000).pipe(take(1)),
    //emit 0...1 in 1 second interval
    interval(1000).pipe(take(2)),
    //promise that resolves to 'Promise Resolved' after 5 seconds
    myPromise('RESULT')
);
//output: ["Hello", "World", 0, 1, "Promise Resolved: RESULT"]
const subscribe = example.subscribe(val => console.log(val));

/** Ex3: Making a variable number of requests */
const myPromise3 = (val: any) =>
    new Promise(resolve =>
        setTimeout(() => resolve(`Promise Resolved: ${val}`), 5000)
    );

const source3 = of([1, 2, 3, 4, 5]);
//emit array of all 5 results
const example3 = source3.pipe(mergeMap(q => forkJoin(...q.map(myPromise))));
/*
  output:
  [
   "Promise Resolved: 1",
   "Promise Resolved: 2",
   "Promise Resolved: 3",
   "Promise Resolved: 4",
   "Promise Resolved: 5"
  ]
*/
const subscribe3 = example3.subscribe(val => console.log(val));

/** Ex4: Handling errors on outside */
/*
  when all observables complete, give the last
  emitted value from each as an array
*/
const example4 = forkJoin(
    //emit 'Hello' immediately
    of('Hello'),
    //emit 'World' after 1 second
    of('World').pipe(delay(1000)),
    // throw error
    throwError('This will error')
).pipe(catchError(error => of(error).pipe(delay(2000))));
//output: 'This will Error'
const subscribe4 = example4.subscribe(val => console.log(val));

/** Ex5: Getting successful results when one inner observable errors */
/*
  when all observables complete, give the last
  emitted value from each as an array
*/
const example5 = forkJoin(
    //emit 'Hello' immediately
    of('Hello'),
    //emit 'World' after 1 second
    of('World').pipe(delay(1000)),
    // throw error
    throwError('This will error').pipe(catchError(error => of(error)))
);
//output: ["Hello", "World", "This will error"]
const subscribe5 = example5.subscribe(val => console.log(val));

function logItem(val: any) {
    var node = document.createElement('li');
    var textnode = document.createTextNode(val);
    node.appendChild(textnode);
    document.getElementById("list").appendChild(node);
}
