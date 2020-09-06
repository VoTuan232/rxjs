import { concat, of, empty, interval } from 'rxjs';
import { startWith, delay } from 'rxjs/operators';

/** Concat: Subscribe to observables in order as previous completes */

/** Ex1: Basic concat usage with three observables */
concat(
    of(1, 2, 3),
    // subscribed after first completes
    of(4, 5, 6),
    // subscribed after second completes
    of(7, 8, 9)
)
    // log: 1, 2, 3, 4, 5, 6, 7, 8, 9
    .subscribe(console.log);

/** Ex2: Display message using concat with delayed observables */
// elems
const userMessage = document.getElementById('message');
// helper
const delayedMessage = (message: any, delayedTime = 1000) => {
    return empty().pipe(startWith(message), delay(delayedTime))
};

concat(
    delayedMessage('Get Ready!'),
    delayedMessage(3),
    delayedMessage(2),
    delayedMessage(1),
    delayedMessage('Go!'),
    delayedMessage('', 2000)
)
    .subscribe((message: any) => userMessage.innerHTML = message);

/** Ex3:  (Warning!) concat with source that does not complete */
// when source never completes, any subsequent observables never run
concat(interval(1000), of('This', 'Never', 'Runs'))
    // log: 1,2,3,4.....
    .subscribe(console.log);

function logItem(val: any) {
    var node = document.createElement('li');
    var textnode = document.createTextNode(val);
    node.appendChild(textnode);
    document.getElementById("list").appendChild(node);
}
