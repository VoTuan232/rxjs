import { take, tap } from 'rxjs/operators';
import { of, interval, fromEvent } from 'rxjs';

/**Take: Emit provided number of values before completing.. */

/** Ex1:  Take 1 value from source  */
//emit 1,2,3,4,5
const source = of(1, 2, 3, 4, 5);
//take the first emitted value then complete
const example = source.pipe(take(1));
//output: 1
const subscribe = example.subscribe((val: any) => console.log(val));

/** Ex2: Take the first 5 values from source */
//emit value every 1s
const interval$ = interval(1000);
//take the first 5 emitted values
const example2 = interval$.pipe(take(5));
//output: 0,1,2,3,4
const subscribe2 = example2.subscribe(val => console.log(val));

/** Ex3: Taking first click location */
const oneClickEvent = fromEvent(document, 'click').pipe(
    take(1),
    tap((v: MouseEvent) => {
        document.getElementById(
            'locationDisplay'
        ).innerHTML = `Your first click was on location ${v.screenX}:${v.screenY}`;
    })
);

const subscribe3 = oneClickEvent.subscribe();


function logItem(val: any) {
    var node = document.createElement('li');
    var textnode = document.createTextNode(val);
    node.appendChild(textnode);
    document.getElementById("list").appendChild(node);
}
