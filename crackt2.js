function (_,a) { // t:#s.some.npc
    if (!a || !a.t)
        return ":("
    let p = a.p ? a.p : {},
    d = #db.f({_id: 'cracks'}).first(),
    c = r => [].concat((r = a.t.call(p)).msg ? r.msg : r).join`\n`,
    r = c(),
    l,
    k,
    b,
    out = [],
    log = x => {
        out.push(`[\`2${(Date.now() - _START + "").padStart(4)}\`] ` + x)
        return out
    }
    log(`Cracking ${a.t.name}`)
    while (!/nection terminated.$/.exec(r)) {
        if (_END - Date.now() < 500)
            return {ok: !1, msg: [...log("`DHit timeout!`"), r, p]}
        if (!((l = /`N(.*)` (lock.|is missing.)$/.exec(r)) && (l = l[1])))
            return {ok: !1, msg: [...out, r, p]}
        log(`Found \`N${l}\``)
        switch (l) {
        case "sn_w_glock":
            b = #ms.shia.labank({d:1})
            if (!b.ok)
                return {ok: !1, msg: [...log('`DBanking error`'), b.msg, p]}
            p[l] = ""
            b = #ms.shia.labank({l: c()})
            if (!b.ok)
                return {ok: !1, msg: [...log('`DBanking error`'), b.msg, p]}
            r = c()
            log(`Solved \`N${l}\` (hopefully, I'm not checking)`)
            break
        case "magnara":
            p[l] = ""
            for (k of #fs.bash.aaagmnr({w: (r = c()).split` `.pop()})) {
                p[l] = k
                b = (r = c()).split` `
                if (b[b.length - 3].split``.sort().join`` != "ilnoostu") {
                    log(`Found \`N${l}\` solution: \`V${k}\``)
                    break
                }
            }
            break
        case "DATA_CHECK":
            p[l] = ''
            p[l] = c().split`\n`.map(x => d[l][x]).join``
            r = c()
            log(`Found \`N${l}\` solution: \`V${p[l]}\``)
            break
        default:
            if (!(l in d))
                return {ok: !1, msg: [...log("\`DUnkown lock/parameter`"), r, p]}
            for (k of d[l]) {
                p[l] = k
                if (!/is not the cor/.exec(r = c())) {
                    log(`Found \`N${l}\` solution: \`V${k}\``)
                    break
                }
            }
            break
        }
    }
    return {ok: !0, msg: [...log("`LCracking finished!`"), r, p]}
}