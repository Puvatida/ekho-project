function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 px-4 py-10">

      {/* intro */}
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-10 text-center">

        <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
          Welcome to <span className="text-blue-600">EKHO</span>
        </h1>

        <p className="text-lg text-gray-600 mb-8">
          The perfect place to socialize, connect, and share moments with friends.
        </p>

        {/* go to login */}
        <div className="flex justify-center gap-4">
          <a
            href="/login"
            className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition"
          >
            Sign In
          </a>
        
        {/* go to register */}
          <a
            href="/register"
            className="px-6 py-3 rounded-xl bg-gray-100 text-blue-600 font-semibold hover:bg-gray-200 transition"
          >
            Create Account
          </a>
        </div>

      </div>

      {/* WHY EKHO SECTION */}
      <div className="max-w-5xl mx-auto mt-12 text-center">

        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          Why Ekho?
        </h2>

        {/* explanation on why EKHO is the better option */}
        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="font-semibold text-lg mb-2">Anonymous by Design</h3>
            <p className="text-gray-600 text-sm">
              Your identity is protected with auto-generated usernames and structured anonymity.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="font-semibold text-lg mb-2">Curated Profiles</h3>
            <p className="text-gray-600 text-sm">
              Choose your avatar from a selection instead of uploading personal images.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="font-semibold text-lg mb-2">Community First</h3>
            <p className="text-gray-600 text-sm">
              Focus on posts and conversations, not personal identity or followers.
            </p>
          </div>

        </div>
      </div>

      {/* HOW IT WORKS */}
    <div className="max-w-5xl mx-auto mt-16 text-center">

    <h2 className="text-3xl font-bold text-gray-800 mb-10">
        How Ekho Works
    </h2>
    
    {/* steps to register */}
    <div className="grid md:grid-cols-3 gap-6">

        {/* Step 1 */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
        <div className="text-3xl mb-3">🎭</div>
        <h3 className="font-semibold text-lg mb-2">Choose Your Identity</h3>
        <p className="text-gray-600 text-sm">
            Choose a profile image from a set of options.
        </p>
        </div>

        {/* Step 2 */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
        <div className="text-3xl mb-3">🧬</div>
        <h3 className="font-semibold text-lg mb-2">Get Your Username</h3>
        <p className="text-gray-600 text-sm">
            Your username is automatically generated when you sign up.
        </p>
        </div>

        {/* Step 3 */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
        <div className="text-3xl mb-3">💬</div>
        <h3 className="font-semibold text-lg mb-2">Start Posting</h3>
        <p className="text-gray-600 text-sm">
            Go straight into posts and discussions.
        </p>
        </div>

    </div>
</div>

    </div>

  );
}

export default Home;