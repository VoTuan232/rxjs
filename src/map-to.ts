import { from, of, throwError, timer, interval, fromEvent } from 'rxjs';
import { map, tap, mapTo, share } from 'rxjs/operators';

/** Map to: Map emissions to constant value. */

//emit value every two seconds
const source = interval(2000);
//map all emissions to one value
const example = source.pipe(mapTo('HELLO WORLD!'));
//output: 'HELLO WORLD!'...'HELLO WORLD!'...'HELLO WORLD!'...
example.subscribe(val => console.log(val));

//emit every click on document
const source2 = fromEvent(document, 'click');
//map all emissions to one value
const example2 = source2.pipe(mapTo('GOODBYE WORLD!'));
//output: (click)'GOODBYE WORLD!'...
example2.subscribe(val => console.log(val));

function logItem(val: any) {
    var node = document.createElement('li');
    var textnode = document.createTextNode(val);
    node.appendChild(textnode);
    document.getElementById("list").appendChild(node);
}
