import Navbar from '../components/Navbar';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex flex-col items-center justify-center px-4 text-center pt-20">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">Welcome to Rothis Consult</h1>
        <p className="text-lg text-gray-600 mb-6">
          We provide professional consulting services tailored to your needs.
        </p>
        <Link href="/contact">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
            Contact Us
          </button>
        </Link>
      </div>
    </div>
  );
}
