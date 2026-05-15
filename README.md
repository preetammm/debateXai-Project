# ⚔️ DebateX AI

> An AI-powered real-time debate platform where users compete in structured debates with **live AI analysis**, scoring, and leaderboards — powered by **Google Gemini**.

---

## 🚀 Features

- **🤖 AI-Powered Debates** — Real-time debate analysis and argument scoring using Google Gemini 1.5 Flash
- **🔐 Secure Authentication** — JWT-based login/signup with Spring Security
- **💬 Live Debate Arena** — Real-time messaging via WebSockets (STOMP over SockJS)
- **📊 Analytics Dashboard** — Track your debate performance with interactive charts (Recharts)
- **🏆 Leaderboard** — Compete and climb the global rankings
- **🎨 Modern UI** — Glassmorphism design with smooth animations (Framer Motion)
- **📱 Responsive** — Fully responsive across all devices

---

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| **Java 17** | Core language |
| **Spring Boot 3.2** | Backend framework |
| **Spring Security** | Authentication & authorization |
| **Spring WebSocket** | Real-time communication |
| **Spring WebFlux** | Reactive HTTP client for Gemini API |
| **H2 Database** | In-memory database |
| **JWT (jjwt)** | Token-based authentication |
| **Lombok** | Boilerplate reduction |
| **Maven** | Build tool |

### Frontend
| Technology | Purpose |
|---|---|
| **React 19** | UI library |
| **Vite** | Build tool & dev server |
| **Tailwind CSS 3** | Utility-first styling |
| **Framer Motion** | Animations & transitions |
| **Zustand** | State management |
| **React Router v7** | Client-side routing |
| **Recharts** | Data visualization |
| **Axios** | HTTP client |
| **STOMP.js + SockJS** | WebSocket client |

---

## 📁 Project Structure

```
debateXai-Project/
├── backend/
│   ├── src/main/java/com/debatex/backend/
│   │   ├── config/          # WebSocket configuration
│   │   ├── controllers/     # REST & WebSocket controllers
│   │   ├── dto/             # Request/Response DTOs
│   │   ├── entities/        # JPA entities (User, DebateRoom, etc.)
│   │   ├── repositories/    # Spring Data JPA repositories
│   │   ├── security/        # JWT, filters, Spring Security config
│   │   └── services/        # Gemini AI service, analysis logic
│   └── src/main/resources/
│       └── application.yml  # App configuration
├── frontend/
│   ├── public/              # Static assets
│   └── src/
│       ├── components/      # Reusable UI components
│       ├── pages/           # Route pages
│       ├── services/        # API client
│       └── store/           # Zustand state management
└── README.md
```

---

## ⚡ Getting Started

### Prerequisites

- **Java 17+** installed
- **Node.js 18+** and **npm** installed
- **Google Gemini API Key** — [Get one here](https://aistudio.google.com/app/apikey)

### 1. Clone the Repository

```bash
git clone https://github.com/preetammm/debateXai-Project.git
cd debateXai-Project
```

### 2. Backend Setup

```bash
cd backend
```

Set your environment variables before running:

**Windows (PowerShell):**
```powershell
$env:GEMINI_API_KEY = "your-gemini-api-key-here"
$env:JWT_SECRET = "your-jwt-secret-here-min-32-characters-long"
```

**Linux / macOS:**
```bash
export GEMINI_API_KEY="your-gemini-api-key-here"
export JWT_SECRET="your-jwt-secret-here-min-32-characters-long"
```

Then start the backend:
```bash
./mvnw spring-boot:run
```

The backend will start at `http://localhost:8080`

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will start at `http://localhost:5173`

---

## 🔑 Environment Variables

| Variable | Description | Required |
|---|---|---|
| `GEMINI_API_KEY` | Google Gemini API key for AI features | ✅ Yes |
| `JWT_SECRET` | Secret key for JWT token signing (min 32 chars) | ✅ Yes |

> ⚠️ **Never hardcode API keys in source code.** Always use environment variables.

---

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/signup` | Register a new user |
| `POST` | `/api/auth/login` | Login and get JWT token |

### Debates
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/debate/send` | Send a debate message with AI analysis |

### WebSocket
| Endpoint | Description |
|---|---|
| `/ws` | WebSocket connection endpoint |
| `/topic/debate/{roomId}` | Subscribe to debate room messages |

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author

**Preetam** — [@preetammm](https://github.com/preetammm)
