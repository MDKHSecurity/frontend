# Backend

Welcome to the **MDKHSecurity** frontend repository. This readme will guide you through the setup and usage of the frontend.

---

### 1. Clone the Repository

Clone this repository and navigate to the project folder:

```bash
# Clone the repository
git clone https://github.com/MDKHSecurity/frontend.git

# Navigate to the repository folder
cd folder-where-repo-located

# Install dependencies
npm install
```

### 3. Update `.env`

Create a `.env` file in the root directory of the project and insert the following settings:
```bash
PUBLIC_BASE_URL = https://localhost:8080/
```

### 4. Run the Frontend

Run the following commands to start the application:

```bash
$env:NODE_TLS_REJECT_UNAUTHORIZED=0

npm run dev
```

### 4. Login
If the backend is up and running you should now be able to access the application on https://localhost:5173/login

You can login using the following users:
```bash
user@mail.com : testpassword
admin@mail.com : testpassword
owner@mail.com : testpassword
```
---
