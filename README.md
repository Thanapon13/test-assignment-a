# Blog System - Assignment A

ระบบ Blog ที่สร้างด้วย Next.js, Prisma, PostgreSQL และ Cloudinary

## 🚀 Live Demo

[https://test-assignment-isi828ja6-thanapons-projects.vercel.app/](https://test-assignment-isi828ja6-thanapons-projects.vercel.app/)

---

## 🛠 Tech Stack

- **Frontend/Backend**: Next.js 16 (App Router)
- **Database**: PostgreSQL (Supabase)
- **ORM**: Prisma 7
- **Image Storage**: Cloudinary
- **Authentication**: JWT
- **Styling**: Tailwind CSS, shadcn/ui
- **Deployment**: Vercel

---

## 📋 Features

1. **หน้ารวม Blog** - แสดงรายการ Blog พร้อมรูปปก, ค้นหาจากชื่อ, Pagination หน้าละ 10 รายการ
2. **หน้ารายละเอียด Blog** - รูปปก, รูปเพิ่มเติมได้ไม่เกิน 6 รูป, จำนวนผู้เข้าชม
3. **ระบบ Comment** - ต้องกรอกชื่อ, ข้อความภาษาไทยและตัวเลขเท่านั้น, ต้องรอ admin approve
4. **Admin Panel** - แก้ไข Blog, Publish/Unpublish, จัดการ Comment

---

## ⚙️ วิธี Run Project

### 1. Clone Repository

```bash
git clone https://github.com/Thanapon13/test-assignment-a.git
cd test-assignment-a
```

### 2. ติดตั้ง Dependencies

```bash
pnpm install
```

### 3. ตั้งค่า Environment Variables

สร้างไฟล์ `.env` และใส่ค่าดังนี้:

```env
# Database (PostgreSQL)
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
DIRECT_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"

# Cloudinary
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# JWT
JWT_SECRET_KEY=your_secret_key
JWT_EXPIRES_IN=30d

NODE_ENV=local
```

### 3.1 ตั้งค่า cloudinary

เอาค่าจาก CLOUDINARY_NAME ,CLOUDINARY_API_KEY,CLOUDINARY_API_SECRET : https://cloudinary.com/

### 4. Setup Database

```bash
# Run migrations
npx prisma migrate deploy

# Generate Prisma Client
npx prisma generate
```

### 5. Run Development Server

```bash
pnpm dev
```

เปิด [http://localhost:3000](http://localhost:3000)

Admin Panel: [http://localhost:3000/admin](http://localhost:3000/admin)

---

## 🗄️ Database Schema

# Blog System - Assignment A

ระบบ Blog ที่สร้างด้วย Next.js, Prisma, PostgreSQL และ Cloudinary

## 🚀 Live Demo

[https://test-assignment-isi828ja6-thanapons-projects.vercel.app/](https://test-assignment-isi828ja6-thanapons-projects.vercel.app/)

---

## 🛠 Tech Stack

- **Frontend/Backend**: Next.js 16 (App Router)
- **Database**: PostgreSQL (Supabase)
- **ORM**: Prisma 7
- **Image Storage**: Cloudinary
- **Authentication**: JWT
- **Styling**: Tailwind CSS, shadcn/ui
- **Deployment**: Vercel

---

## 📋 Features

1. **หน้ารวม Blog** - แสดงรายการ Blog พร้อมรูปปก, ค้นหาจากชื่อ, Pagination หน้าละ 10 รายการ
2. **หน้ารายละเอียด Blog** - รูปปก, รูปเพิ่มเติมได้ไม่เกิน 6 รูป, จำนวนผู้เข้าชม
3. **ระบบ Comment** - ต้องกรอกชื่อ, ข้อความภาษาไทยและตัวเลขเท่านั้น, ต้องรอ admin approve
4. **Admin Panel** - แก้ไข Blog, Publish/Unpublish, จัดการ Comment

---

## ⚙️ วิธี Run Project

### 1. Clone Repository

```bash
git clone <repository-url>
cd test-assignment-a
```

### 2. ติดตั้ง Dependencies

```bash
pnpm install
```

### 3. ตั้งค่า Environment Variables

สร้างไฟล์ `.env` และใส่ค่าดังนี้:

```env
# Database (PostgreSQL)
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
DIRECT_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"

# Cloudinary
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# JWT
JWT_SECRET_KEY=your_secret_key
JWT_EXPIRES_IN=30d

NODE_ENV=local
```

### 4. Setup Database

```bash
# Run migrations
npx prisma migrate deploy

# Generate Prisma Client
npx prisma generate
```

### 5. Run Development Server

```bash
pnpm dev
```

เปิด [http://localhost:3000](http://localhost:3000)

Admin Panel: [http://localhost:3000/admin](http://localhost:3000/admin)

---
