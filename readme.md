# SkillSwap

SkillSwap is a collaborative web application where students can **teach** and **learn** skills from one another. Whether you're an expert in Python looking to learn design, or a designer eager to learn coding, SkillSwap provides a seamless way to connect with peers and exchange knowledge.

---

## Features

* 🧑‍🏫 Peer-to-peer skill exchange platform
* 🧾 User registration, login, and profile management
* 🛠️ Skill listing (skills you can teach)
* 📝 Skill wishlist (skills you want to learn)
* 🔍 Find users based on skills
* 💬 Real-time chat using Socket.io
* 🔐 JWT-based secure authentication

---

## Tech Stack

### Frontend

* **React** – Core UI framework
* **Tailwind CSS** – Styling
* **React Router** – Routing and navigation
* **TypeScript** – Type-safe frontend development

### Backend

* **Node.js** – JavaScript runtime
* **Express.js** – Web server framework
* **MongoDB** – NoSQL database
* **JWT** – Authentication
* **Socket.io** – Real-time communication for chat

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/skillswap.git
cd skillswap
```

### 2. Install dependencies

**Backend**

```bash
cd skillswap_backend
npm install
```

**Frontend**

```bash
cd skillswap_frontend
npm install
```

### 3. Environment Variables

Create a `.env` file in the `skillswap_backend/` directory:

```env
PORT = 64000
DB_CONNECT_STRING = your_mongo_connection_string
JWT_SECRET = your_jwt_secret_key
```

### 4. Run the project

**Backend**

```bash
cd skillswap_backend
npm run dev
```

**Frontend**

```bash
cd skillswap_frontend
npm start
```

---

## API Endpoints

### Auth

| Endpoint            | Method | Description                               |
| ------------------- | ------ | ----------------------------------------- |
| `/api/auth/sign_up` | POST   | Register new user                         |
| `/api/auth/sign_in` | POST   | Log in existing user                      |
| `/api/auth/current` | GET    | Get current logged in user (requires JWT) |

### Skills

| Endpoint                           | Method | Description                          |
| ---------------------------------- | ------ | ------------------------------------ |
| `/api/skills/get_users?skillName=` | GET    | Get users with a particular skill    |
| `/api/skills/add_skill`            | POST   | Add a skill to user profile          |
| `/api/skills/want_skill`           | POST   | Add a skill to user's wishlist       |
| `/api/skills/remove_skill`         | DELETE | Remove skill from profile            |
| `/api/skills/remove_skill_wanted`  | DELETE | Remove skill from wishlist           |
| `/api/skills/make_request`         | POST   | Make a skill request to another user |
| `/api/skills/answer_request`       | POST   | Respond to a skill request           |

### Chat

| Endpoint              | Method | Description                                   |
| --------------------- | ------ | --------------------------------------------- |
| `/api/chat/get_chats` | POST   | Get chat history between users (requires JWT) |

---

## Folder Structure

```
skillswap/
├── client/                # Frontend code
│   ├── src/
│   ├── public/
│   └── ...
├── server/                # Backend code
│   ├── src/
│   │   ├── Middlewares/
│   │   ├── Routes/
│   │   ├── Models/
│   │   ├── app.js
│   │   └── ...
└── README.md
```

---

## License

MIT License

---

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## Contact

Made with ❤️ by Shivendra
