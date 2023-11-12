'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const [authorized, setAuthorized] = useState<Boolean>(false);
  const router = useRouter();
  useEffect(() => {
    try {
      // Assuming 'data' is the JSON object you want to send
      fetch('/api/auth').then(response => {
        if (response.status == 200) {
          console.log(response.status);
          setAuthorized(true);
        } else {
          router.push('/login');
        }
      });
    } catch (error) {
      console.error('Error:', error);
      // Handle errors
    }
  }, [router]);

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
}
