# ₹ Smartकर – AI-Powered Tax Filing Assistant

##  Overview
**Smartकर** is an AI-driven tax computation tool that helps users choose the best tax regime, optimize deductions, and automate tax filing. It simplifies tax calculations for salaried individuals, professionals, and business owners by analyzing various income sources and applicable deductions.

---

##  Key Features
- **Tax Filing for All Categories:** Supports Salaried individuals, Businessmen, Freelancers and Professionals. Allows user to securely upload financial documents.
- **Multiple Income Sources:** Handles Salary, Capital Gains, Dividends, Rental income, Business Profits etc.
- **Tax Slab Classification:** Determines applicable tax slabs based on user category.
- **Regime Selection:** AI suggests the best tax regime (Old vs. New) based on financial data.
- **Income-Based Rebates:** Determines applicable rebates based on tax slabs.
- **AI-Driven Tax Optimization:** Maximizes deductions, provides personalized tax-saving strategies, and suggests tax-saving recommendations.
- **Anomaly Detection & Validation:** Identifies incorrect entries and missing documents.
- **Dynamic Questionnaire:** Simplifies data collection with user-friendly, AI-driven questions.
- **Tax Report Generation & Review:** Previews tax summaries before submission.
- **Future Automation:** Planned API integration with government portals for direct tax filing.

---

##  Tech Stack
- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js, MongoDB
- **OCR & AI:** Python, Flask, NumPy, Pandas, Tesseract OCR, TensorFlow, Scikit-learn, NLTK, spaCy
- **Security:** AES-256 Encryption, JWT Authentication
- **Automation & PDF Generation:** Puppeteer, Selenium (Planned Future Feature)

---

##  Workflow
1️⃣ **User Login & Authentication** → Secure access using JWT & role-based control.  
2️⃣ **User Uploads Documents** → AI extracts details from Form 16, 26AS, salary slips, and investment proofs.  
3️⃣ **AI-Powered Processing** → Extracts income, deductions, investments, and rebates.  
4️⃣ **Dynamic Questionnaire for remaining income and employment details** → User answers simple questions and selects a category: Salaried, Self-Employed, Freelancer, Business Owner, Other.  
5️⃣ **Tax Computation Engine** → Calculates taxable income, deductions, and total tax.  
6️⃣ **Best Regime Suggestion (Old vs. New)** → AI recommends the most tax-efficient option.  
7️⃣ **Anomaly Detection & Validation** → Flags incorrect entries, missing documents, and inconsistencies.  
8️⃣ **Tax Report Generation & Review** → Generates a tax preview for users to verify.  
9️⃣ **Future: Auto-Filing Integration** → Plans API integration for direct filing with government tax portals.  

---

## Setup & Installation
###  Prerequisites
- **Node.js (v16+), MongoDB, Python 3+**
- **Pip Packages:** `Flask, Tesseract-OCR, PyMuPDF, TensorFlow, Scikit-learn, NLTK, spaCy`

###  Installation
#### 1️⃣ Clone the Repository
```bash
git clone https://github.com/ananyagr02/SmartKar.git
cd SmartKar
```
#### 2️⃣ Backend Setup
```bash
cd backend
npm install
```
Create `.env`:
```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```
Start backend:
```bash
npm run dev
```
#### 3️⃣ OCR & AI Service Setup
```bash
cd ml
pip install -r requirements.txt
python app.py
```
#### 4️⃣ Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

---

## 🔗 API Routes
### **Backend API** (Express.js)
| Method | Endpoint | Description |
|--------|----------|--------------|
| `POST` | `/api/auth/login` | User authentication |
| `POST` | `/api/upload` | Upload & encrypt documents |
| `POST` | `/api/process-ocr` | Decrypt & send to OCR |
| `GET` | `/api/tax-summary/:userId` | Get tax computation summary |

### **OCR & AI API** (Python Flask)
| Method | Endpoint | Description |
|--------|----------|--------------|
| `POST` | `/ocr-process` | Extract text & analyze tax details |
| `POST` | `/ai/tax-optimization` | AI-driven tax recommendations |
| `POST` | `/ai/anomaly-detection` | Detects inconsistencies & errors |

---

##  Security & Compliance
- **End-to-End Encryption:** AES-256 for documents, JWT for authentication.
- **AI-Driven Fraud Detection:** Detects anomalies, inconsistencies, and incorrect filings.
- **Data Privacy:** Users control data, ensuring compliance with data protection laws.

---

##  Contributor
- **Ananya Gaur**

