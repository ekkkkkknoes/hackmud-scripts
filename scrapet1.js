function (ctx,a) { // t:#s.cyberdine.public
    if (!a || !a.t)
        return "need t"
    let [b, p] = #fs.ekkie.decor({t: a.t}).split`\n`.pop().split`|`.map(x=>x.trim()).filter(x=>x),
    [_, k, l] = / (\w*):"(\w*)"/.exec(#fs.ekkie.decor({t: a.t, p:{}}).split`\n`.pop())
    p = /strategy (\w*) and/.exec(#fs.ekkie.decor({t: a.t, p:{[k]: p}}))[1]
    b = #fs.ekkie.decor({t: a.t, p:{[k]: b}})
    let r = ("101010,Ap_calypse,BL4Z1NGW0RLD,Free_BFG,H0meEntert4inment,Vy_for_russ,W3rlD3NDER,dev_nul,dsktp_mngr,e)(ecution0r,empl_pages,ende.exe," +
    "forgetme_nt,giant_spidr,judgeme_nt,libbot,ls_rites,omegabyte_03.23_final_final,p33ps,qw_stop,ragnaroxx.sh,semordnilap.sh,thefloood,upanel,user_backend")
    .split`,`.filter(x=>b.includes(x)).map(x=>#fs.ekkie.decor({t: a.t, p:{[k]: l, p, pass: p, password: p, project: x}})).filter(x=>x && !x.includes("|"))
    return r
}