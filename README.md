## How To Setup
<p>Buat file .env pada root folder project jika file tersebut belum ada.</p>
<p>Buat database postgreSQL dengan nama ( recruitment-seryu ).</p>

### Copy dan Paste value berikut pada file .env :
- **APP_PORT=3000**
- **DEV_DB_DATABASE=recruitment-seryu**
- **DEV_DB_USERNAME=your-db-username-postgres**
- **DEV_DB_PASSWORD=your-db-password-postgres**

### How to running project
- Jalankan npm install
- Lalu Jalankan npm run dev
- Tunggu sampai project running to port 3000

### Test url on Insomnia or Postman software
- Query url yang perlu ditambahkan hanya [month dan year]
- Current dan Page_size diatur secara default dengan (current = 0) dan (page_size = 10)
- Nilai dari Current dan Page_size bisa diubah-ubah nantinya sesuai kebutuhan
- http://localhost:3000/v1/salary/driver/list?month=3&year=2024&current=0&page_size=10

