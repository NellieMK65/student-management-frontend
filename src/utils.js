export const SERVER_URL =
	process.env.NODE_ENV === 'development'
		? 'http://localhost:5000'
		: 'https://backend-okj0.onrender.com/students';
