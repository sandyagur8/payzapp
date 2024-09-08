"use client";

import SignUpForm from "../../components/SignUpForm";

export default function SignUp() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-500 to-purple-600">
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <SignUpForm />
        </div>
      </main>
    </div>
  );
}
