import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-secondary shadow-lg">
      <div className="bg-white rounded-lg p-6 w-full max-w-md text-center">
        <h1 className="text-heading text-3xl font-bold mb-4">
          404: Page Not Found
        </h1>
        <p className="text-description text-lg mb-6">
          Oops! The page you are looking for does not exist.
        </p>
        <Link
          to="/"
          replace={true}
          className="inline-block bg-primary text-white text-lg font-medium py-2 px-4 rounded hover:bg-opacity-90 transition"
        >
          Go Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
