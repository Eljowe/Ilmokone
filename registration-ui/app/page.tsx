'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [authorized, setAuthorized] = useState<Boolean>(false);

  useEffect(() => {
    try {
      // Assuming 'data' is the JSON object you want to send
      fetch('/api/auth').then(response => {
        if (response.status == 200) {
          setAuthorized(true);
        }
      });
    } catch (error) {
      console.error('Error:', error);
      // Handle errors
    }
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between text-sm lg:flex">
        <h1>Hello testi</h1>
        {authorized && <p>authorized</p>}
        {!authorized && <p>not authorized</p>}
      </div>
    </main>
  );
}
