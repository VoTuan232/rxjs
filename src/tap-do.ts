import { from, of, throwError } from 'rxjs';
import { map, tap } from 'rxjs/operators';

const source = of(1, 2, 3, 4, 5);
// transparently log values from source with 'tap'
const example = source.pipe(
    tap(val => console.log(`BEFORE MAP: ${val}`)),
    map(val => val + 10),
    tap(val => console.log(`AFTER MAP: ${val}`))
);

//'tap' does not transform values
//output: 11...12...13...14...15
example.subscribe(val => console.log(val));

// tap also accepts an object map to log next, error, and complete
const example2 = source
    .pipe(
        map(val => val + 10),
        tap({
            next: val => {
                // on next 11, etc.
                console.log('on next', val);
            },
            error: error => {
                console.log('on error', error.message);
            },
            complete: () => console.log('on complete')
        })
    )
    // output: 11, 12, 13, 14, 15
    .subscribe(val => console.log(val));

function logItem(val: any) {
    var node = document.createElement('li');
    var textnode = document.createTextNode(val);
    node.appendChild(textnode);
    document.getElementById("list").appendChild(node);
}
