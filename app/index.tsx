import { router } from 'expo-router';
import { useEffect } from 'react';

export default function Index() {
  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace('../SignIn');
    }, 100); 

    return () => clearTimeout(timeout);
  }, []);

  return null;
}
