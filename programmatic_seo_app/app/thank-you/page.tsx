import Link from 'next/link';
import { CheckCircle, Home, Phone } from 'lucide-react';

export const metadata = {
  title: 'Thank You | Stoic Home Care',
  description: 'Your enquiry has been successfully submitted.',
};

export default function ThankYouPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-xl text-center">
        <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-100">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>
        
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
          Thank You!
        </h2>
        
        <p className="mt-2 text-lg text-gray-600">
          We have received your request. Our care coordinator will call you back within <strong>1 hour</strong>.
        </p>
        
        <div className="mt-8 bg-blue-50 rounded-xl p-4 border border-blue-100 text-left">
          <h3 className="text-blue-800 font-semibold mb-2 flex items-center gap-2">
            <Phone size={18} /> Urgent Medical Need?
          </h3>
          <p className="text-blue-700 text-sm">
            If this is an emergency or you need immediate assistance, please call us directly:
          </p>
          <a href="tel:+917668232867" className="block mt-2 font-bold text-lg text-blue-900">
            +91 76682 32867
          </a>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-100">
          <Link href="/" className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-[#0CB8C9] to-[#1D9E75] shadow-md hover:shadow-lg transition-all">
            <Home size={18} /> Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
