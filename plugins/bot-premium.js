let handler  = async (m, { conn }) => {
  let pp = './src/avatar_contact.png'
	pp = await conn.getProfilePicture(global.conn.user.jid)
  conn.sendFile(m.chat, pp, 'profile.jpg',`*❏ I N F O  P R E M I U M*\n\nDengan mendaftar menjadi user premium anda akan mendapatkan keuntungan sebagai berikut :\n\n1. Bisa menggunakan fitur premium ( *.menupremium* )\n2. Pengurangan rata 1 limit\n3. Claim limit 100 per hari\n4. Mendapatkan uang bot acak 10x lipat dari user biasa di claim harian\n5. Bisa menggunakan bot melalui personal chat\n\nSilahkan hubungi owner ( *.owner* ) untuk melakukan upgrade premium hanya dengan Rp. 5.000 per bulan\n\nInvite bot ke GC kalian ? ketik *.sewabot*`, m)
}
handler.help = ['infopremium']
handler.tags = ['info']
handler.command = /^(infopremium|infoprem)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false
handler.exp = 250
handler.admin = false
handler.botAdmin = false
handler.fail = null
module.exports = handler