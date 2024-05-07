function (ctx,a) { // t:#s.some.npc, p:0

    if (!a || !a.t)
        return "need target"

    let p = a.p ? a.p : null,
    c = r => (p && p.project ? [].concat((r = a.t.call(p)).msg ? r.msg : r).filter(l => !/^<.*>$/.exec(l)) : [].concat(a.t.call(p))).join`\n`.replaceAll(/`.(.)`/g, "$1").split``,
    r = c(),
    f = !0

    while (f) {
        if (_END - Date.now() < 500) break
        f = !1
        c().forEach((n, i) => {
            if (/[¡¢Á¤Ã¦§¨©ª]/.test(r[i])) {
                r[i] = n
                f = !0
            }
        });
    }

    return r.join``
}