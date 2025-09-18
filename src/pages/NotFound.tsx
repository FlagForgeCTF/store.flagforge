import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col justify-center items-center px-4 transition-colors duration-300 ease-in-out">
      <div className="absolute w-screen sm:w-[590px] h-[400px] bg-gradient-to-r from-red-500 to-red-400 rounded-full top-[50%] left-[50%] blur-[90px] translate-x-[-50%] translate-y-[-50%] z-[-1] opacity-20 transition-opacity duration-500 ease-in-out" />
      
      <div className="text-center space-y-1 max-w-md mx-auto">
        <h1 className="text-6xl font-bold text-red-500 dark:text-red-500 transition-all duration-500 ease-in-out hover:scale-110 hover:text-red-400">404</h1>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-300 ease-in-out">
          Page Not Found
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 transition-colors duration-300 ease-in-out">
          Sorry, we couldn't find the page you're looking for.
        </p>
        
        <div className="py-8">
          <img
            src="/404.png"
            alt="404 illustration"
            className="h-64 w-auto mx-auto object-contain transition-transform duration-500 ease-in-out hover:scale-105"
          />
        </div>
        
        <Link
          to="/"
          className="inline-block bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg active:scale-95"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
