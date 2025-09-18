import { Link } from 'react-router-dom';
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header />

      <div className="pt-[5rem] px-[3rem] flex flex-col gap-[5rem] max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col items-center gap-8">
          <h1 className="text-4xl font-bold text-gray-700 dark:text-gray-100">
            Privacy{" "}
            <span className="text-red-400 dark:text-red-500">Policy</span>
          </h1>
          <p className="text-lg text-center text-gray-600 dark:text-gray-300 max-w-3xl">
            Last updated: December 18, 2024
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg shadow-gray-200/60 dark:shadow-gray-900/60 border border-gray-200/80 dark:border-gray-700 p-8 backdrop-blur-[150px] space-y-8 transition-colors duration-300">
          <div>
            <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-100 mb-4">
              Information We Collect
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We collect information you provide when making purchases, including
              contact information (name, email, shipping address), payment details,
              order history, and communication with our customer support team.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-100 mb-4">
              How We Use Information
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              We use your information to process orders, handle shipping and delivery,
              provide customer support, send order updates, and improve our products
              and services. We never sell your personal information to third parties.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-100 mb-4">
              Data Security
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              We implement appropriate security measures including secure payment processing,
              encryption, and access controls to protect your personal and payment information
              against unauthorized access or misuse.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-100 mb-4">
              Your Rights
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              You have the right to access, update, or delete your personal information,
              opt out of marketing communications, and request your order history.
              We use cookies to enhance your shopping experience, which can be controlled
              through your browser settings.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-100 mb-4">
              Third-Party Services
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              We work with trusted payment processors and shipping partners to fulfill
              your orders. These services have their own privacy policies and security measures.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-100 mb-4">
              Changes & Contact
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              We may update this policy periodically. For questions about your privacy
              or to exercise your rights, contact us at{" "}
              <a
                href="mailto:contact@flagforge.store"
                className="text-red-400 dark:text-red-500 font-medium hover:text-red-600 dark:hover:text-red-400 transition-colors duration-300"
              >
                contact@flagforge.store
              </a>
            </p>
          </div>
        </div>

        {/* Back to Products Link */}
        <div className="text-center pb-5">
          <Link
            to="/products"
            className="inline-block bg-red-500 dark:bg-red-500 hover:bg-red-700 dark:hover:bg-red-600 rounded-lg px-8 py-4 text-white text-center font-bold text-lg transition-colors duration-300"
          >
            Back to Products
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}