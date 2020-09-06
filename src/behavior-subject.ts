import { Observable, BehaviorSubject, fromEvent, Subject, ReplaySubject, merge, interval, from } from 'rxjs';
import { map, mergeMap, switchMap } from 'rxjs/operators';

const input1 = document.querySelector('#input1');
const input2 = document.querySelector('#input2');
const span = document.querySelector('span');

const button = document.querySelector('#button1');
const ob1 = fromEvent(button, 'click');
const ob2 = new BehaviorSubject('Hello world');

button.addEventListener('click', () => {
    ob2.next('Xin chao');
})

ob2.subscribe(x => button.innerHTML = x)

function logItem(val: any) {
    var node = document.createElement('li');
    var textnode = document.createTextNode(val);
    node.appendChild(textnode);
    document.getElementById("list").appendChild(node);
}
