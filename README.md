# ₹ Smartकर – AI-Powered Tax Filing Assistant

## 🚀 Overview
**Smartकर** is an AI-powered tax filing system that automates tax computations, document processing (OCR), deduction optimization, and error detection. It helps employees in India efficiently file their taxes while ensuring compliance with the latest tax laws.

This project was developed as a **MERN stack application** with **Python-based OCR and AI-driven tax recommendations**. It includes **secure document uploads with AES-256 encryption**, automated tax computation, and government API integrations.

---

## 🎯 Key Features

### 🔹 **Secure Document Uploads**
- Users can upload **Form 16, Form 26AS, Salary Slips, Investment Proofs, and Loan Documents**.
- Documents are **AES-256 encrypted** before storage.
- Only decrypted when needed for OCR processing.

### 🔹 **OCR-Powered Document Processing**
- Extracts **text and relevant tax data** from uploaded documents.
- Supports multiple formats: **PDF, CSV, JSON, PNG, JPG, JPEG**.
- AI-powered data extraction for **precise tax calculations**.

### 🔹 **Automated Tax Computation**
- Calculates **income tax based on slabs, deductions, and exemptions**.
- Suggests **best tax regime** (Old vs. New) based on user data.
- Identifies **eligible deductions** (HRA, 80C, 80D, etc.).

### 🔹 **AI-Powered Tax Optimization**
- Detects **missing deductions and tax-saving opportunities**.
- Flags **inconsistencies in filings**.
- Provides **proactive tax-saving suggestions** before the financial year ends.

### 🔹 **Government API Integrations**
- Fetches **investment, shares, and loan details linked to Aadhaar**.
- Pre-fills **ITR forms** for effortless filing.
- Validates tax filings before submission.

### 🔹 **Security & Compliance**
- **End-to-end encryption** ensures user data is protected.
- **Multer-based secure file handling**, no third-party storage (AWS, Azure, etc.).
- Only **registered users** can access their tax data.

---

## 🏗️ Tech Stack
- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js, MongoDB
- **OCR & AI Processing:** Python, Flask, Tesseract OCR, OpenCV, PyMuPDF
- **Security:** AES-256 Encryption, JWT Authentication
- **APIs:** Indian Government APIs (ITR, EPF, GST)

---

## 📜 Architecture & Data Flow
```
User → React Frontend → Express Backend → Encrypted Storage → OCR Processing → Tax Computation → AI Optimization → User Dashboard
```
### 🔁 **Step-by-Step Flow** (🔐 Encryption Highlighted)
1️⃣ **User Uploads Documents** 🡪 React frontend sends files securely to backend.  
2️⃣ **Files are Encrypted (AES-256)** 🡪 Stored securely in `/uploads/`.  
3️⃣ **Decryption & OCR Processing** 🡪 Only decrypted when sent to Python OCR.  
4️⃣ **AI Analyzes Extracted Data** 🡪 Determines deductions, inconsistencies.  
5️⃣ **Automated Tax Computation** 🡪 Calculates tax & pre-fills ITR forms.  
6️⃣ **User Reviews & Submits** 🡪 Tax summary provided before final filing.  

---

## 🛠️ Setup & Installation

### 🔧 Prerequisites
- **Node.js** (v16+)
- **MongoDB** (Local or Cloud)
- **Python 3+**
- **Pip Packages**: `Flask, Tesseract-OCR, OpenCV, PyMuPDF`

### 📌 Installation Steps
#### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/tax-assistant.git
cd tax-assistant
```
#### 2️⃣ Backend Setup (Node.js & Express)
```bash
cd backend
npm install
```
Create a `.env` file and add:
```env
PORT=5000
MONGO_URI=your_mongodb_uri
ENCRYPTION_KEY=your_32_byte_hex_key
JWT_SECRET=your_jwt_secret
```
Start the backend:
```bash
npm run dev
```

#### 3️⃣ OCR Service Setup (Python Flask)
```bash
cd ml
pip install -r requirements.txt
python app.py
```

#### 4️⃣ Frontend Setup (React)
```bash
cd frontend
npm install
npm start
```
---

## 🔗 API Routes

### **Backend API Endpoints** (Express.js)
| Method | Endpoint | Description |
|--------|----------|--------------|
| `POST` | `/api/upload` | Upload & encrypt documents |
| `POST` | `/api/process-ocr` | Decrypt & send to OCR |
| `GET` | `/api/tax-summary/:userId` | Get tax computation summary |

### **OCR API (Python Flask)**
| Method | Endpoint | Description |
|--------|----------|--------------|
| `POST` | `/ocr-process` | Extract text from documents |

---

## 📜 License
This project is open-source under the **MIT License**.

---

## 👨‍💻 Contributors
- **Your Name** – Lead Developer  
- **Your Team (if any)**  

Feel free to contribute by opening issues & pull requests! 🚀

