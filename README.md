# 🔗 URL Shortener

A minimal yet functional URL shortener built with Node.js and plain HTML/CSS/JS. No frameworks, no nonsense — just core web fundamentals.

## 🚀 Features

- Shortens any valid URL into a 6-character code.
- Stores and retrieves links using a basic JSON-based file system (no database).
- Clean redirect when visiting the short link.
- Frontend form to generate and copy short URLs instantly.

## 🧠 Core Concepts

- **RESTful routes**  
  - `GET /links` → fetch all existing short links  
  - `POST /shorten` → create a new short link  
  - `GET /:shortCode` → redirect to the original URL

- **File-based persistence**  
  URLs are stored in a JSON file instead of a DB to keep things simple and easy to inspect.

- **Crypto-safe short codes**  
  Uses `crypto.randomBytes()` for generating unique, secure short codes.

## 🛠️ Setup & Run

1. Clone the repo:
   ```bash
   git clone https://github.com/yourusername/url-shortener.git
   cd url-shortener

**Running Script**
  npm run dev
