# Type AI - Open Source AI-powered API

![Type AI](https://res.cloudinary.com/dqfvbunr2/image/upload/v1721139578/wcmalawmnmsopcjt5okf.webp)

Welcome to **Type AI**, an open-source application that allows you to create an AI-powered API capable of returning intelligent responses based on provided parameters. This application leverages **Next.js**, **React**, **LangChain**, **Hugging Face**, and **Firebase** to give users powerful AI capabilities.

## How it Works

Type AI takes a parameter (an object) through an API call and returns a response based on AI logic. For example:
- **Question:** What is the color of a **banana**?
- **Response:** Yellow
- **Question:** What is the color of an **apple**?
- **Response:** Red

You can use this API to generate AI-powered responses for different objects dynamically.

## Features

- AI-based response generation.
- Easy-to-use API interface.
- Fully open-source for customization and improvement.
  
## Getting Started

### 1. Clone the Repository
First, clone the repository from GitHub:
```bash
git clone https://github.com/kiraaziz/type-ai-open.git
cd type-ai-open
```

### 2. Configure Environment Variables
Set up your environment variables by editing the `.env` file. You'll need to provide your **Firebase configuration**.

The Firebase configuration can be found and set in:
```
C:\...\type-ai-open\lib\firebase\connection.js
```

### 3. Install Dependencies
Install the necessary dependencies:
```bash
npm install
```

### 4. Prisma Setup
Generate Prisma client:
```bash
npx prisma generate
```

Push the database schema to your development database:
```bash
npx prisma db push
```

### 5. Start the Development Server
Run the development server:
```bash
npm run dev
```

Your application should now be running locally on `http://localhost:3000`.

## Technologies Used

- **Next.js**: Framework for server-side rendered React applications.
- **React**: Frontend library for building user interfaces.
- **LangChain**: Powerful framework for building AI-based applications.
- **Hugging Face**: AI models for natural language processing and generation.
- **Firebase**: Backend-as-a-Service platform for authentication, database, and more.

## Contributing
Contributions are welcome! Feel free to open issues or submit pull requests in the GitHub repository:
[Type AI Open Source Repository](https://github.com/kiraaziz/type-ai-open)

## License
This project is open source and available under the [MIT License](LICENSE).

---

Happy coding! If you encounter any issues, feel free to open an issue on GitHub or contribute to improve this app."# type-ai-open" 
