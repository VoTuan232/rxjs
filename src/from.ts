import { Observable, BehaviorSubject, fromEvent, Subject, ReplaySubject, merge, interval, from, of } from 'rxjs';
import { mergeMap, switchMap } from 'rxjs/operators';

// emit array
const from1 = from([1, 2, 3]);
from1.subscribe(x => console.log('from 1: ', x)) // out put: 1, 2, 3

// emit string
const from2 = from('xin chao');
from2.subscribe(x => console.log('from 2: ', x)) // out put: x, i, n, , c, h , a, o

//emit result of promise
const promiseSource = from(new Promise(resolve => resolve('Hello World!')));
//output: 'Hello World'
promiseSource.subscribe(val => console.log(val));

//emit collections
const map = new Map();
map.set(1, 'Hi');
map.set(2, 'Bye');
const mapSource = from(map);
//output: [1, 'Hi'], [2, 'Bye']
mapSource.subscribe(val => console.log(val));

function logItem(val: any) {
    var node = document.createElement('li');
    var textnode = document.createTextNode(val);
    node.appendChild(textnode);
    document.getElementById("list").appendChild(node);
}
