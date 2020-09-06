import { Observable, BehaviorSubject, fromEvent, Subject, ReplaySubject, merge, interval, from } from 'rxjs';
import { map, mergeMap, switchMap } from 'rxjs/operators';

const input1 = document.querySelector('#input1');
const input2 = document.querySelector('#input2');
const span = document.querySelector('span');

const button = document.querySelector('#button1');
const ob1 = fromEvent(button, 'click');
const ob2 = interval(1000);

/** swithMap */
// ob1.subscribe(x => ob2.subscribe(y => console.log(y)))
// remove old subscription
ob1.pipe(switchMap(x => ob2)).subscribe(y => console.log(y))

function logItem(val: any) {
    var node = document.createElement('li');
    var textnode = document.createTextNode(val);
    node.appendChild(textnode);
    document.getElementById("list").appendChild(node);
}
