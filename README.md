# Books App Back-End

Ini adalah bagian backend dari aplikasi Books yang memiliki fitur CRUD (Create, Read, Update, Delete). Aplikasi ini memungkinkan pengguna untuk mengelola daftar buku.

## Teknologi yang Digunakan
- Node.js: Runtime JavaScript untuk server
- Hapi: Kerangka kerja backend untuk Node.js

## Instalasi
1. Pastikan Node.js dan npm terinstal di sistem Anda.
2. Clone repositori ini: `git clone [URL_REPO]`
3. Masuk ke direktori proyek: `cd books-app-back-end`
4. Install dependensi: `npm install`

## API Endpoints

### Get All Books
- **Endpoint:** `GET /books`
- **Description:** Mendapatkan daftar semua buku.

### Get Book by ID
- **Endpoint:** `GET /books/:id`
- **Description:** Mendapatkan detail buku berdasarkan.

### Add New Book
- **Endpoint:** `POST /books`
- **Description:** Menambahkan buku baru.

### Update Book by ID
- **Endpoint:** `PUT /books/:id`
- **Description:** Memperbarui detail buku berdasarkan ID.

### Delete Book by ID
- **Endpoint:** `DELETE /books/:id`
- **Description:** Menghapus buku berdasarkan ID.