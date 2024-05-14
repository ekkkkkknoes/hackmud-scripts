function (ctx,a) { // t:#s.some.npc
    if (!a || !a.t)
        return ":("
    let p = a.p ? a.p : {},
    d = #db.f({_id: 'cracks'}).first(),
    c = r => [].concat((r = a.t.call(p)).msg ? r.msg : r).join`\n`,
    r = c(),
    l,
    k,
    b,
    i,
    j,
    s,
    tx,
    out = [],
    lib = #fs.scripts.lib(),
    log = x => {
        out.push(`[\`2${(Date.now() - _START + "").padStart(4)}\`] ` + x)
        return out
    },
    f = (k, v) => log(`Solved \`N${k}\`: \`V${v}\``)
    log(`Cracking ${a.t.name}`)
    while (!/nection terminated.$/.exec(r)) {
        if (_END - Date.now() < 500)
            return {ok: !1, msg: [...log("`DHit timeout!`"), r, p]}
        if (/To unlock, please load the appropriate k3y:/.test(r))
            l = "l0ckbox"
        else if (!((l = /`N(.*)` (lock.|is missing.)$/.exec(r)) && (l = l[1])))
            return {ok: !1, msg: [...log("`DCouldn't find key`"), r, p]}
        log(`Found \`N${l}\``)
        switch (l) {
        case "l0ckbox":
            k = r.split` `.pop()
            #ls.matr1x.r3dbox({return: true})
            s = #hs.sys.upgrades({full:true}).filter(x => "k3y" in x)
            #ms.sys.manage({unload: s.map(x=>x.i)})
            if (!s.find(x => x.k3y == k))
                #ls.matr1x.r3dbox({request: k})
            b = #hs.sys.upgrades({full:true}).find(x => x.k3y == k)
            if (b) {
                #ms.sys.manage({load: b.i})
                r = c()
                f(l, k)
                break
            }
            return {ok:!1, msg: [...log(`\`DDon't have k3y ${k}\``), r, p]}
        case "acct_nt":
            p[l] = ""
            r = c()
            tx = #hs.accts.transactions({count: 35})
            if (b = /^Get me the amount of a large (deposit|withdrawal) near (.+)$/.exec(r)) {
                for (k of tx.filter(x => b[1] == "deposit" ? x.sender != ctx.caller : x.sender == ctx.caller)) {
                    p[l] = k.amount
                    if ((r = c()) != b[0]) break
                }
            } else {
                if (b = /^Need to know the total (earned|spent) on transactions (with|without) memos between (.+) and (.+)$/.exec(r))
                    tx = tx.filter(x => b[2] == "with" ? "memo" in x : !("memo" in x))
                else b = /^What was the (net) GC (between) (.+) and (.+)$/.exec(r) // the first two capture groups just exist so b[3] and b[4] are the timestamps in both cases
                s = []
                for (
                    i  = tx.findIndex(x => b[3] >= lib.to_game_timestr(lib.add_time(x.time, -lib.one_day_ms)));
                    i <= tx.findIndex(x => b[3] >  lib.to_game_timestr(lib.add_time(x.time,  lib.one_day_ms)));
                    i++)
                    for (
                        j  = tx.findIndex(x => b[4] >= lib.to_game_timestr(lib.add_time(x.time, -lib.one_day_ms)));
                        j <= tx.findIndex(x => b[4] >  lib.to_game_timestr(lib.add_time(x.time,  lib.one_day_ms)));
                        j++)
                        s.push(tx.slice(j, i).reduce((a, x) => x.amount * (x.sender == ctx.caller ? -1 : 1) + a, 0))
                if (b[1] != "net") s = s.map(x => Math.abs(x)) // The earned/spent case doesn't want a signed value
                s = s.filter((v, i, a) => a.indexOf(v) == i)
                for (k of s) {
                    p[l] = k
                    if ((r = c()) != b[0]) break
                }
            }
            if (r == b[0])
                return {ok: !1, msg: [...log("`DCan't solve acct_nt`"), #hs.accts.transactions({count: 35}).map(x=>lib.to_game_timestr(x.time) + `: \`${x.recipient == ctx.caller ? "L" : "D"}${x.amount}\` "${x.memo || ""}"`), r, p]}
            f(l, p[l])
            break
        case "CON_SPEC":
            p[l] = ""
            k = (r = c()).split`\n`
            if (k[1] != "Provide the next three letters in the sequence")
                return {ok: !1, msg: [...log("`DCan't solve this CON_SPEC`"), r, p]}
            k = k[0].split``.map(x=>x.charCodeAt())
            p[l] = String.fromCharCode(...[3,4,5].map(x=>k[k.length-1] + k[x] - k[2]))
            r = c()
            f(l, p[l])
            break
        case "sn_w_glock":
            if (#hs.accts.balance() > 0) {
                b = #ms.shia.labank({d:1})
                if (!b.ok)
                    return {ok: !1, msg: [...log('`DBanking error`'), b.msg, r, p]}
                if ("acct_nt" in p) {
                    log("Resetting acct_nt")
                    delete p.acct_nt
                    r = c()
                    break
                }
            }
            p[l] = ""
            b = #ms.shia.labank({l: (r = c())})
            if (!b.ok)
                return {ok: !1, msg: [...log('`DBanking error`'), b.msg, r, p]}
            if ("acct_nt" in p) {
                log("Resetting acct_nt")
                delete p.acct_nt
            }
            r = c()
            log(`Solved \`N${l}\` (hopefully, I'm not checking)`)
            break
        case "magnara":
            p[l] = ""
            for (k of #fs.bash.aaagmnr({w: (r = c()).split` `.pop()})) {
                p[l] = k
                b = (r = c()).split` `
                if (b[b.length - 3].split``.sort().join`` != "ilnoostu") {
                    f(l, k)
                    break
                }
            }
            break
        case "DATA_CHECK":
            p[l] = ''
            p[l] = c().split`\n`.map(x => d[l][x]).join``
            r = c()
            f(l, p[l])
            break
        default:
            if (!(l in d))
                return {ok: !1, msg: [...log("\`DUnkown lock/parameter`"), r, p]}
            for (k of d[l]) {
                p[l] = k
                if (!/is not the cor/.exec(r = c())) {
                    f(l, k)
                    break
                }
            }
            break
        }
    }
    return {ok: !0, msg: [...log("`LCracking finished!`"), r, p]}
}