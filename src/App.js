import AppManager from "./components/AppManager";
import { createContext, useState } from 'react';

export const AppContext = createContext();

function App() {
    const [showGame, setShowGame] = useState(false);
    const [showSignUp, setShowSignUp] = useState(true);
    const [currentUser, setCurrentUser] = useState(undefined);

  return (
      <AppContext.Provider
          value={{
              showGame, setShowGame,
              currentUser, setCurrentUser,
              showSignUp, setShowSignUp,
          }}
          >
          <AppManager/>
      </AppContext.Provider>
  );
}

export default App;
/*

 */