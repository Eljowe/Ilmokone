'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  useEffect(() => {
    try {
      fetch('/api/logout');
    } catch (error) {
      console.error('Error:', error);
      // Handle errors
    }
    router.push('/login');
  }, [router]);

  return <p>Logging out...</p>;
}
