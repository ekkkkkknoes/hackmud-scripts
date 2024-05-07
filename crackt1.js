function (_,a) { // t:#s.some.npc
    if (!a || !a.t)
        return ":("
    let p = a.p ? a.p : {},
    d = #db.f({_id: 'cracks'}).first(),
    c = r => [].concat((r = a.t.call(p)).msg ? r.msg : r).join`\n`,
    r = c(),
    l,
    k
    while (!/nection terminated.$/.exec(r) && _END - Date.now() > 500) {
        if (!((l = /`N(.*)` (lock.|is missing.)$/.exec(r)) && (l = l[1]) && l in d))
            return [r, p]
        if (/A_C/.exec(l)) {
            p[l] = ''
            p[l] = c().split`\n`.map(x => d[l][x]).join``
            r = c()
        } else for (k of d[l]) {
            p[l] = k
            if (!/is not the cor/.exec(r = c())) break
        }
    }
    return r
}