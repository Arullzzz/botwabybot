let handler = async (m, { conn, args, participants }) => {
  let member = participants.map(u => u.jid)
  let kontol = {}
  for (i=0;i<member.length;i++){
    // conn.reply(m.chat,member[i])
    var b = {}
    // for (b in global.DATABASE.data.users){
      if (typeof global.DATABASE.data.users[member[i]] != "undefined"){
        kontol[member[i]] = {
          exp: global.DATABASE.data.users[member[i]].exp
        }
        // Object.assign(kontol, global.DATABASE.data.users[member[i]])
        // Object.assign(kontol, global.DATABASE.data.users[member[i]].exp)
        // kontol[member[i]].limit = b.limit;
        // kontol[member[i]].exp = b.exp;
      }
    // }
  }
  // kontol = Object.entries(kontol)
  // return conn.reply(m.chat,kontol)
  
  let sortedExp = Object.entries(kontol).sort((a, b) => b[1].exp - a[1].exp)
  let sortedLim = Object.entries(global.DATABASE.data.users).sort((a, b) => b[1].limit - a[1].limit)
  let name = conn.getName(m.sender)
  let usersExp = sortedExp.map(v => v[0])
  let usersLim = sortedLim.map(v => v[0])
  let len = args[0] && args[0].length > 0 ? Math.min(1000, Math.max(parseInt(args[0]), 5)) : Math.min(10, sortedExp.length)

  if (args[0] > 100) {
    conn.reply(m.chat, `*Masukkan maksimal 100*`, m)
  }else {
    let text = `
*❏  T O P  ${len}  T E R K A Y A*\n
_Kamu punya *Rp. ${global.DATABASE.data.users[m.sender].exp.toLocaleString()}* dan *${global.DATABASE.data.users[m.sender].limit.toLocaleString()} Limit*_
_Kamu peringkat *${usersExp.indexOf(m.sender) + 1}* dari *${usersExp.length}* member grup ${conn.getName(m.chat)}_
  
${sortedExp.slice(0, len).map(([user, data], i) => (i + 1) + '. '  + conn.getName(user) + '\n    wa.me/' + user.split('@')[0] + '\n    *Rp. ' + data.exp.toLocaleString() + '*').join`\n`}
    `.trim()
  
    conn.reply(m.chat, text, m)
  }

}
handler.help = ['rank','rank _total_']
handler.tags = ['xp']
handler.command = /^(rank)$/i
handler.fail = null
handler.exp = 100
module.exports = handler

