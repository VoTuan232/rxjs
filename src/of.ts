import { Observable, BehaviorSubject, fromEvent, Subject, ReplaySubject, merge, interval, from, of } from 'rxjs';
import { map, mergeMap, switchMap } from 'rxjs/operators';

const of1 = of(1, 2, 3, 4, 5);
of1.subscribe(x => console.log('Of 1: ', x)); // out put: 1, 2,3 ,4 ,5

const of2 = of({ name: 'Vo tuan', age: 24 }, [1, 2, 3], (() => {
    return 'Hello Viet Nam'
})());
of2.subscribe(x => console.log('Of 2: ', x));

function logItem(val: any) {
    var node = document.createElement('li');
    var textnode = document.createTextNode(val);
    node.appendChild(textnode);
    document.getElementById("list").appendChild(node);
}
