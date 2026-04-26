# Blog System - Assignment A

ระบบ Blog ที่สร้างด้วย Next.js, Prisma, PostgreSQL และ Cloudinary

## 🚀 Live Demo

https://test-assignment-i1tzs28q7-thanapons-projects.vercel.app/

**Admin Panel:** https://test-assignment-i1tzs28q7-thanapons-projects.vercel.app/admin

**Admin Credentials:**

- Email: admin01@gmail.com
- Password: Admin12345

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

### 3.1 ตั้งค่า Cloudinary

1. ไปที่ [https://cloudinary.com/](https://cloudinary.com/) แล้ว Login หรือ Register
2. ไปที่ **Dashboard** → copy ค่าดังนี้:
   - `Cloud Name`
   - `API Key`
   - `API Secret`
3. ไปที่ **Media Library** → กด **New Folder** → ตั้งชื่อว่า `blogImages`
4. ใส่ค่าใน `.env`:

```env
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
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

## 🗄️ Database Schema Design

### การออกแบบ

**User** — เก็บข้อมูล admin

- ไม่มีความสัมพันธ์กับ Blog โดยตรง
- ใช้ `type` field แยก USER/ADMIN แทนการแยก table

**Blog** — ข้อมูลหลักของ blog post

- มี `slug` unique สำหรับ SEO-friendly URL
- มี `status` สำหรับ Publish/Unpublish
- มี `view_count` นับผู้เข้าชม

**BlogImage** — รูปภาพของแต่ละ blog (1 Blog : Many Images)

- มี `order` สำหรับจัดลำดับรูป
- FK → Blog (onDelete: Cascade)

**Comment** — comment ของแต่ละ blog (1 Blog : Many Comments)

- มี `status` = pending/approved/rejected
- FK → Blog (onDelete: Cascade)

### เหตุผลในการออกแบบ

- ใช้ UUID แทน auto-increment เพื่อความปลอดภัย และป้องกันการ enumerate ข้อมูล
- onDelete Cascade เพื่อลบ images และ comments อัตโนมัติเมื่อลบ blog ไม่ให้มีข้อมูลขยะค้างอยู่
- แยก BlogImage ออกมาเป็น table แยก เพื่อรองรับหลายรูปต่อ blog และจัดลำดับด้วย `order`
- Comment มี `status` (PENDING/APPROVED/REJECTED) เพื่อให้ admin approve ก่อนแสดงผล
- User ใช้ `type` field แยก USER/ADMIN แทนการแยก table เพราะ permission มีแค่ 2 ระดับ ไม่ซับซ้อนพอที่จะแยก table
- Blog มี `excerpt` แยกจาก `content` เพื่อใช้แสดงในหน้ารวม Blog โดยไม่ต้อง load content ทั้งหมด

## 📝 Assumptions & ข้อจำกัด

### Assumptions ที่กำหนดเอง

- **Admin Account**: ระบบไม่มีหน้า ปลี่ยน type จาก user เป็น admin หลัง Register สำหรับ Admin ต้อง insert ข้อมูลเข้า database โดยตรง
- **Blog Status**: Blog ที่สร้างใหม่จะมี status เป็น `unpublished` เสมอ ต้อง Admin เปลี่ยนเป็น `published` เอง
- **Image Upload**: รูปภาพถูก upload ไปเก็บที่ Cloudinary ไม่ได้เก็บใน server โดยตรง
- **Comment Validation**: ข้อความ comment รองรับเฉพาะภาษาไทยและตัวเลข โดยใช้ regex `/^[ก-๙0-9\s]+$/`
- **View Count**: นับ view ทุกครั้งที่เข้าหน้ารายละเอียด Blog ไม่ได้ป้องกัน duplicate views

### ข้อจำกัด

- ไม่มีระบบ Register สำหรับ user ทั่วไป (เฉพาะ Admin เท่านั้น)
- รูปภาพต่อ Blog สูงสุด 6 รูป
- ไม่มีระบบ notification เมื่อมี comment ใหม่ Admin ต้องเข้ามาเช็คเอง
- Polling comment ทุก 10 วินาที แทนที่จะใช้ WebSocket

### สิ่งที่จะพัฒนาเพิ่มถ้ามีเวลา

- ระบบ notification เมื่อมี comment ใหม่
- ป้องกัน duplicate view count
- Rich text editor สำหรับเขียน Blog
- ระบบ tag หรือ category ของ Blog
