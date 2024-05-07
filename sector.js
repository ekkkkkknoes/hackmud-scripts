function (ctx,a) { // t:"", l:0
    if (!a || !a.t) {
        return {ok: false, msg: "need t:sector"}
    }
    #ms.chats.join({channel: a.t})
    let r
    switch (a.l) {
        case 0:
            r = #fs.scripts.nullsec({sector: a.t})
            break;
        case 1:
            r = #fs.scripts.lowsec({sector: a.t})
            break;
        case 2:
            r = #fs.scripts.midsec({sector: a.t})
            break;
        case 3:
            r = #fs.scripts.highsec({sector: a.t})
            break;
        case 4:
            r = #fs.scripts.fullsec({sector: a.t})
            break;
    }
    #ms.chats.leave({channel: a.t})
    return r
}