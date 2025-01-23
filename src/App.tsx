import React from 'react';

function App() {
  const [email, setEmail] = React.useState('');
  const [success, setSuccess] = React.useState(false);
  const [formType, setFormType] = React.useState<'demo' | 'waitlist'>('demo');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/submit-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess(true);
        setEmail('');
        console.log(result.message);
      } else {
        console.error(result.error);
        alert('Failed to save email.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-4xl w-full text-center space-y-8">
        {/* Header Section */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            Scale Your OnlyFans Agency
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-300 to-purple-200">
              With AI-Powered Chat
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-purple-100 max-w-2xl mx-auto">
            Boost revenue and engagement with personalized AI chatbots for each model. Keep your fans engaged 24/7 while reducing management overhead.
          </p>
        </div>

        {/* Form Section */}
        {success ? (
          <div className="bg-green-500 text-white p-4 rounded-lg shadow-lg max-w-md mx-auto">
            <p className="text-lg font-semibold">Thank you for your interest! 🎉</p>
            <p className="text-sm mt-2">
              {formType === 'demo'
                ? "Our team will contact you shortly with exclusive agency pricing."
                : "You're on the waiting list! We'll notify you when we launch."}
            </p>
          </div>
        ) : (
          <div className="max-w-md mx-auto w-full space-y-4">
            <div className="flex gap-2 bg-white/10 backdrop-blur-md rounded-lg p-1">
              <button
                onClick={() => setFormType('demo')}
                className={`flex-1 py-2 rounded-md ${
                  formType === 'demo'
                    ? 'bg-white text-purple-700 font-semibold'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                Request Demo
              </button>
              <button
                onClick={() => setFormType('waitlist')}
                className={`flex-1 py-2 rounded-md ${
                  formType === 'waitlist'
                    ? 'bg-white text-purple-700 font-semibold'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                Join Waitlist
              </button>
            </div>
            <form onSubmit={handleSubmit} className="flex gap-2 p-2 bg-white/10 backdrop-blur-md rounded-lg">
              <input
                type="email"
                placeholder={formType === 'demo' ? 'Enter your business email' : 'Enter your email'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-4 py-3 rounded-md bg-white text-gray-900 placeholder-gray-500"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-pink-500 text-white rounded-md font-semibold hover:bg-pink-600"
              >
                {formType === 'demo' ? 'Request Demo' : 'Join Waitlist'}
              </button>
            </form>
          </div>
        )}

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 text-left">
            <h3 className="text-xl font-semibold text-white mb-2">Increase Revenue</h3>
            <p className="text-purple-100">
              Boost earnings with 24/7 fan engagement and automated responses that keep subscribers coming back.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 text-left">
            <h3 className="text-xl font-semibold text-white mb-2">Save Time</h3>
            <p className="text-purple-100">
              Reduce management overhead with AI handling routine interactions while models focus on premium content.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 text-left">
            <h3 className="text-xl font-semibold text-white mb-2">Scale Easily</h3>
            <p className="text-purple-100">
              Manage more models efficiently with personalized AI chatbots trained on each model's style.
            </p>
          </div>
        </div>

        {/* Agency Benefits Section */}
        <div className="mt-16 grid md:grid-cols-2 gap-8 text-left bg-white/5 backdrop-blur-md rounded-xl p-8 max-w-5xl w-full">
          {/* Left Column */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Agency Benefits</h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 bg-pink-500/20 flex items-center justify-center rounded-full"></div>
                <span className="text-purple-100">
                  Custom AI trained on each model's personality and content style
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 bg-pink-500/20 flex items-center justify-center rounded-full"></div>
                <span className="text-purple-100">
                  Instant responses to fan messages 24/7, increasing engagement rates
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 bg-pink-500/20 flex items-center justify-center rounded-full"></div>
                <span className="text-purple-100">
                  Advanced content filtering and safety features built-in
                </span>
              </li>
            </ul>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4">
              <p className="text-xl font-semibold text-white">200%+</p>
              <p className="text-purple-200">Average increase in fan engagement</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4">
              <p className="text-xl font-semibold text-white">40hrs+</p>
              <p className="text-purple-200">Saved per model monthly</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4">
              <p className="text-xl font-semibold text-white">30%+</p>
              <p className="text-purple-200">Increase in subscriber retention</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
