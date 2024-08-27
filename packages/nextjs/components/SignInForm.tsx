export default function SignInForm() {
    return (
      <form className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Sign In</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">Email</label>
          <input type="email" id="email" className="w-full px-3 py-2 border rounded" required />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block mb-2">Password</label>
          <input type="password" id="password" className="w-full px-3 py-2 border rounded" required />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Sign In
        </button>
      </form>
    )
  }
  