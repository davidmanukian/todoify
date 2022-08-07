const rxjs = require("rxjs")

// import {from, groupBy, mergeMap, of, reduce, toArray, zip} from "rxjs";

const data = [
    {"list": "Section 1", "dueDate": "Today", "task": "Tree "},
    {"list": "Section 1", "dueDate": "Tomorrow", "task": "Police "},
    {"list": "Section 2", "dueDate": "Tomorrow", "task": "Police "},
]

let result = []

rxjs.from(data)
    .pipe(
        rxjs.groupBy(task => task.list),
        rxjs.mergeMap(group => rxjs.zip(rxjs.of({"section": group.key}), group.pipe(rxjs.toArray())))
    )
    .subscribe(e => {
        result = e
    })

