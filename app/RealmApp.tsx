import React from "react";
import * as Realm from "realm-web";

const RealmAppContext = React.createContext(null);

export const useRealmApp = () => {
  const app = React.useContext(RealmAppContext);
  if (!app) {
    throw new Error(
      `You must call useRealmApp() inside of a <RealmAppProvider />`
    );
  }
  return app;
};

export const RealmAppProvider = ({ appId, children }) => {
  const [app, setApp] = React.useState(new Realm.App(appId));
  React.useEffect(() => {
    setApp(new Realm.App(appId));
  }, [appId]);

  // Wrap the Realm.App object's user state with React state
  const [currentUser, setCurrentUser] = React.useState(app.currentUser);

  const logIn = async (credentials) => {
    // Authenticate the user
    const user: Realm.User = await app.logIn(credentials);
    setCurrentUser(app.currentUser);

  }
  const logOut = async () => {
    // Log out the currently active user
    await app.currentUser?.logOut();
    // If another user was logged in too, they're now the current user.
    // Otherwise, app.currentUser is null.
    setCurrentUser(app.currentUser);
  }

  const wrapped = { ...app, currentUser, logIn, logOut };

  return (
    <RealmAppContext.Provider value={wrapped}>
      {children}
    </RealmAppContext.Provider>
  );
};