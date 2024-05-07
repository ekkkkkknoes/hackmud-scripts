function (ctx,a) {
    if (!a || !(a.to || a.channel || a.c)) return {ok: false, msg: "provide `Nto` or `Nchannel`"}
    let msg = "`W" + a.msg + "`"
    if (a.channel || a.c) return #fs.chats.send({channel: a.channel || a.c, msg})
    return #fs.chats.tell({to: a.to, msg})
}