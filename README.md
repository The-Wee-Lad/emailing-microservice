# Emailing Service (NestJS)

A lightweight and scalable **Emailing Microservice** built using **NestJS**, providing APIs to send emails, view logs, and manage SMTP-based transactions efficiently.

This service includes:

- SMTP mailing (Zoho, Gmail, AWS SES, Mailgun, etc.)
- Centralized logging of outgoing emails
- Paginated log retrieval
- Swagger API documentation
- DTO validation + error handling
- Production-ready configuration structure

---

## 📘 API Documentation

Swagger documentation is available at:

👉 **`/api-docs`**

Example:

[http://localhost:8000/api-docs](http://localhost:8000/api-docs)


---

## 🚀 Features

- ✉️ Send emails via SMTP  
- 🧾 Fetch paginated logs  
- 📦 Uses MongoDB for log storage  
- 🔐 Environment-based configuration  
- 📄 Validation using `class-validator`  
- 🧰 Swagger for API documentation  
- 🏗️ Modular, scalable NestJS architecture  

---

## 📁 Folder Structure

```

src/
├── email/
│    ├── dto/
│    │    └── sendMail.dto.ts
│    ├── email.controller.ts
│    ├── email.service.ts
│    └── email.module.ts
├── email-logs/
│    ├── dto/
│    │    └── getLogs.dto.ts
│    ├── email-logs.controller.ts
│    ├── email-logs.service.ts
│    └── email-logs.module.ts
├── common/
│    └── ApiResponse.ts
├── app.module.ts
└── main.ts

```

---

## ⚙️ Environment Variables

Create a `.env` file in the root:

```

PORT=8000

# Database

MONGO_URI="mongodb+srv://<username>:<password>@cluster0.mongodb.net"
DB_NAME="emailing-service"

# SMTP

SMTP_HOST="smtp.zoho.in"
SMTP_PORT=465
SMTP_USER="[your_email@zohomail.in](mailto:your_email@zohomail.in)"
SMTP_PASS="your_smtp_password"

# Default Sender

FROM="[your_email@zohomail.in](mailto:your_email@zohomail.in)"

```

For reference, also keep:

```

.env.example

````

---

## 🛠 Installation

```bash
npm install
````

---

## ▶️ Running the Project

### Development

```bash
npm run start:dev
```

### Production Build

```bash
npm run build
npm run start:prod
```

### Standard Start

```bash
npm run start
```

---

## 🧪 Running Tests

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Coverage
npm run test:cov
```

---

## 📨 Example — Send Email Request

```json
POST /email
{
  "to": "user@example.com",
  "from": "your_email@zohomail.in",
  "subject": "Welcome!",
  "content": "Your account was successfully created."
}
```

---

## 📄 Example — Fetch Logs

```
GET /email-logs?page=1&limit=10
```

---

## 🚀 Deployment Notes

* Ensure `.env` is configured for production.
* Verify SMTP sender domain supports:

  * SPF
  * DKIM
  * DMARC
* Use Docker or PM2 for stable deployment

NestJS deployment guide: [https://docs.nestjs.com/deployment](https://docs.nestjs.com/deployment)

---

## 👤 Author

**Aditya Narayan**
Emailing Service — Built with NestJS

