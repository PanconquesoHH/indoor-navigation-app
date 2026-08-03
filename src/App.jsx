import React, { useState } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import IndoorNavigator from './components/IndoorNavigator';

export default function App() {
  const [hasStarted, setHasStarted] = useState(false);

  if (!hasStarted) {
    return <WelcomeScreen onStart={() => setHasStarted(true)} />;
  }

  return <IndoorNavigator />;
}
