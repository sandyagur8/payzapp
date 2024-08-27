import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignUpForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isMerchant, setIsMerchant] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return re.test(email.toLowerCase());
  };

  const validatePhone = (phone: string) => {
    const re = /^\d{10}$/;
    return re.test(phone);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Name is required');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid Gmail address');
      return;
    }

    if (!validatePhone(phone)) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    // If all validations pass, you would typically send the data to your backend here
    console.log('Form data:', { name, email, phone, isMerchant });

    // Redirect to OTP verification page
    router.push('/verify-otp');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-4">
        <label htmlFor="name" className="block mb-2">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block mb-2">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="phone" className="block mb-2">Phone Number</label>
        <input
          type="tel"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-6">
        <label className="flex items-center cursor-pointer">
          <div className="relative">
            <input
              type="checkbox"
              className="sr-only"
              checked={isMerchant}
              onChange={() => setIsMerchant(!isMerchant)}
            />
            <div className={`block w-14 h-8 rounded-full ${isMerchant ? 'bg-green-400' : 'bg-gray-300'}`}></div>
            <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${isMerchant ? 'transform translate-x-6' : ''}`}></div>
          </div>
          <div className="ml-3 text-gray-700 font-medium">
            {isMerchant ? 'Yes, I am a merchant' : 'No, I am a normal user'}
          </div>
        </label>
      </div>
      <button type="submit" className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
        Sign Up
      </button>
    </form>
  )
}
