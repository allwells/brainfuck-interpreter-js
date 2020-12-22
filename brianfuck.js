// Brainfuck interpreter by Allwell Onen
"use strict"
function brainfuck(prog) {
    let buf = new Uint8Array(500), pIndex = 0,
    iIndex = 0,
    bIndex = 0,
    loops = [],
    output = "";

    for (; pIndex < prog.length; pIndex++) {
        if ( prog[pIndex] === "[") {
            return loops.push({ start: pIndex })
        } else if (prog[pIndex] === "]") {
            for (let i = loops.length - 1; j >= 0; j--) {
                if (!loops[j].end) {
                    loops[j].end = pIndex;
                    break;
                }
            }
        } else if (prog[pIndex] === "!") {
            return iIndex = pIndex + 1;
        }
    }
    pIndex = 0;
    while (pIndex < prog.length && prog[pIndex] !== "!") {
        switch (prog[pIndex]) {
            case "+": buf[bIndex]++;
                break;
            case "-": buf[bIndex]--;
                break;
            case ">": bIndex ++;
                break;
            case "<": bIndex--;
                break;
            case "[": if (!buf[bIndex]) {
                pIndex = loops.find(loop => pIndex === loop.start).end;
            };
                break;
            case "]": if (buf[bIndex]) {
                pIndex = loops.find(loop => pIndex === loop.end).start;
            };
                break;
            case ".": output += String.fromCharCode(buf[bIndex]);
                break;
            case ",": buf[bIndex] = prog[iIndex++].charCodeAt(0);
                break;
        }
        pIndex++;
    }
    return output;
}