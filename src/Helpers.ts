export function* takeWhile(str: string, fn: (char: string)=> boolean){
    for (let x of str)
        if (fn(x))
            yield x;
        else
            break;
}

