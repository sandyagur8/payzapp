"use client";

import SignUpForm from "../../components/SignUpForm";

export default function SignUp() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <SignUpForm />
        </div>
      </main>
    </div>
  );
}
