import {Header} from './../components/Header'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* <Header /> */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4">Welcome to Web3 Wallet</h1>
        <p className="text-xl mb-8">A modern Web3 payment wallet application</p>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Get Started</h2>
          <p className="mb-4">Sign in to your account or create a new one to start using our Web3 wallet services.</p>
          <div className="flex space-x-4">
            <a href="/signin" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Sign In</a>
            <a href="/signup" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">Sign Up</a>
          </div>
        </div>
      </main>
    </div>
  )
}
