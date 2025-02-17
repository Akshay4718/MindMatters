# MindMatters Hackathon Project

## 🚀 Overview
This is a web application that allows users to schedule and manage online and offline psychiatry meetings. 
Which includes:
1) Psychiatrists who can manage booking, host online meeting, tracking appointments and earnings.
2) Admin who can add psychiatrists, manage availability of psychiatrists and hold track of meetings.
3) User(Patient) who can book an appointment on online or offline mode, pay online and choose psychiatrist according to their need.

## 🛠 Tech Stack
- React.js
- Node.js
- Express.js
- MongoDB Atlas
- Jitsi API
- Cloudinary

## 🔧 Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/Akshay4718/Mindmatters.git

2. In Admin folder
   
   Change directory
   ```sh
   cd admin
   ```

   Install required packages
   ```sh
   npm i
   npm install axios react-dom react-router-dom react-toastify
   ```

   Tailwind CSS setup
   ```sh
   npm install -D tailwindcss@3 postcss autoprefixer
   npx tailwindcss init -p
   ```

3. In Backend folder

   Change directory
   ```sh
   cd backend
   ```

   Install node packages
   ```sh
   npm i
   npm install bcrypt cloudinary cors dotenv express jsonwebtoken mongoose multer nodemon validator
   ```

4. In Frontend folder

   Change directory
   ```sh
   cd frontend
   ```

   Install required packages
   ```sh
   npm i
   npm install axios react-dom react-router-dom react-toastify
   ```

   Tailwind CSS setup
   ```sh
   npm install -D tailwindcss@3 postcss autoprefixer
   npx tailwindcss init -p
   ```

## .env setup

1. Backend folder
   ```sh
   MONGODB_URI='mongodb+srv://<username>:<password>@cluster0.x9syf.mongodb.net/mindmatters?retryWrites=true&w=majority&appName=Cluster0' //login to mongodb atlas -> create free deployment -> view collection -> copy and paste connection string
   // create cloudinary account and create an API key
   CLOUDINARY_NAME='xxxxxxxxx'// paste cloud name
   CLOUDINARY_API_KEY='000000000000000'// paste API key that you have generated
   CLOUDINARY_SECRET_KEY='000000000000000'// paste secret key that you have generated
   ADMIN_EMAIL = "admin@mindmatters.com"
   ADMIN_PASSWORD = 'qwerty@123'
   JWT_SECRET = "xxxxxx"// enter anything
   CURRENCY="INR"
   ```
## 🚀 Running the Project

   Open 3 terminals and run the following commands
   1. First terminal(Run admin folder)
      ```sh
      cd admin
      npm run dev
      ```
   
   2. Second terminal(Run backend folder)
      ```sh
      cd backend
      npm run start
      ```
      
   3. Third terminal(Run frontend folder)
      ```sh
      cd frontend
      npm run dev
      ```

## 📌 Contributors
   Akshay Anil Naik: [GitHub](https://github.com/Akshay4718)
   
   Bhuvan H: [GitHub](https://github.com/BhuvanH317)
   
   Prajwal Narayan Patgar: [GitHub](https://github.com/PrajwalNP160)
   
   Prajwal G R Gowda: [GitHub](https://github.com/Prajwal-GR)
