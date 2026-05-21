"use client";

import { useState } from "react";

export default function ApproveButton({ pitch }: { pitch: any }) {
  const [loading, setLoading] = useState(false);

  const handleApprove = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName: pitch.client_name,
          email: pitch.email,
          projectTitle: pitch.project_title,
        }),
      });

      const data = await response.json();
      
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("Error from Stripe:", data);
        alert("Error generating invoice. Check console.");
        setLoading(false);
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleApprove}
      disabled={loading}
      className="bg-accent hover:bg-blue-600 text-white text-sm font-medium py-2 px-6 rounded transition-colors disabled:opacity-50"
    >
      {loading ? "Generating Link..." : "Approve & Generate Invoice"}
    </button>
  );
}