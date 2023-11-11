'use client';
import { useState, useEffect } from 'react';
import { redirect } from 'next/navigation';

export default function Page() {
  useEffect(() => {
    try {
      fetch('/api/logout');
    } catch (error) {
      console.error('Error:', error);
      // Handle errors
    }
    redirect('/admin');
  }, []);

  return <p>a</p>;
}
