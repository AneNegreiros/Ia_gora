import { RouterProvider } from 'react-router';
import { router } from './routes';
import ChameleonMode from './components/ChameleonMode';
import Onboarding from './components/Onboarding';
import FirebaseWarning from './components/FirebaseWarning';
import { useState, useEffect } from 'react';

export default function App() {
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verifica se o setup já foi concluído
    const setupComplete = localStorage.getItem('app-setup-complete') === 'true';
    setIsSetupComplete(setupComplete);
    setIsLoading(false);
  }, []);

  const handleOnboardingComplete = () => {
    setIsSetupComplete(true);
  };

  if (isLoading) {
    return null;
  }

  if (!isSetupComplete) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <ChameleonMode>
      <RouterProvider router={router} />
      <FirebaseWarning />
    </ChameleonMode>
  );
}
