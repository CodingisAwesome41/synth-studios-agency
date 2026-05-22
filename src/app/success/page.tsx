export default function SuccessPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white p-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Payment Received.</h1>
        <p className="text-gray-400 mb-8">Your project is officially in the queue. I'll be in touch within 24 hours.</p>
        <a href="/" className="px-8 py-3 bg-white text-black rounded-full font-bold">Back to Home</a>
      </div>
    </main>
  );
}