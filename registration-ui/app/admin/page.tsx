import { useState, useEffect } from 'react';

export default function Page() {
  const [authorized, setAuthorized] = useState<Boolean>(true);

  if (authorized) {
    return (
      <div className="min-h-screen w-screen p-4">
        <div>
          <h1>Hello</h1>
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
