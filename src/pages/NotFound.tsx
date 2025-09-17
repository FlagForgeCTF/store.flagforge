import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <div className="mt-[90px] h-[70vh] w-[50vw] mx-auto my-0 flex flex-col justify-center items-center gap-4">
      <div className="absolute circlePosition w-screen sm:w-[590px] h-[400px] bg-gradient-to-r from-red-500 rounded-[100%] top-[50%] left-[50%]  blur-[90px] translate-x-[-50%] translate-y-[-50%] z-[-1]" />
      <h2 className="text-center text-3xl sm:text-3xl font-extrabold text-gray-600">
        OOPS! <span className="text-red-500">Page Not Found!</span>😥
      </h2>
      <div className="">
        <img
          src="/404.png"
          alt="404 image"
          className="h-[250px] w-[400px] object-contain"
        />
      </div>
      <Link
        to="/"
        className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
      >
        Go Home
      </Link>
    </div>
  );
}
