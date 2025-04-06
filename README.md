
# 🤖 WhatsApp Userbot Secure

Userbot WhatsApp multifungsi dengan sistem konfigurasi aman menggunakan `.env` dan `config.json`.

---

## ✨ Fitur Utama

| Perintah          | Fungsi                                                                 |
|-------------------|------------------------------------------------------------------------|
| `.gstiker`        | Membuat stiker dari **gambar atau teks** pada pesan yang di-reply.     |
| `.gping`          | Menampilkan **ping**, lokasi server, dan waktu aktif bot.              |
| `.setwelcome`     | Mengatur pesan sambutan untuk anggota grup baru (hanya admin/owner).   |
| `.setprefix`      | Mengubah prefix command (hanya admin/owner).                           |

---

## ⚙️ Instalasi

1. **Clone repo atau unduh ZIP**:
   ```bash
   git clone https://github.com/onioktairawan/wabot.git
   cd wabot
Install dependency:

bash
Salin
Edit
npm install
Buat file .env dan isi dengan nomor pemilik bot:

env
Salin
Edit
OWNER=6281234567890@c.us
Jalankan bot:

bash
Salin
Edit
npm start
📌 Format Pesan Welcome
Gunakan placeholder:

@user → akan diganti dengan mention anggota baru

#group → akan diganti dengan nama grup

Contoh:

graphql
Salin
Edit
.setwelcome Selamat datang @user di grup #group 🎉
🔐 Keamanan
Hanya nomor yang terdaftar di .env (OWNER) yang bisa mengakses perintah admin seperti .setprefix dan .setwelcome.

File .env dan log.txt diabaikan dari Git (.gitignore).

🧾 Log Aktivitas
Semua perintah dan aksi penting akan dicatat ke dalam file log.txt secara otomatis.

