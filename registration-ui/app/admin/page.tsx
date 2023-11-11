'use client';
import { useState, useEffect } from 'react';

export default function Page() {
  const [authorized, setAuthorized] = useState<Boolean>(false);

  useEffect(() => {
    try {
      // Assuming 'data' is the JSON object you want to send
      fetch('/api/auth').then(response => {
        console.log(response);
        if (response.status == 200) {
          setAuthorized(true);
        }
      });
    } catch (error) {
      console.error('Error:', error);
      // Handle errors
    }
  }, []);

  if (authorized) {
    return (
      <div className="min-h-screen w-screen p-4">
        <div>
          <h1>Hello</h1>
          <p>You are authorized</p>
        </div>
      </div>
    );
  }
  return (
    <div>
      <h1>Not authorized</h1>
    </div>
  );
}
