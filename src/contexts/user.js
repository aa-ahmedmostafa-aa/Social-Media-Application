import { createContext, useState } from "react";
export const UserConetext = createContext();
export const UserContextProvider = (props) => {
  const [user, setUser] = useState(null);
  return (
    <UserConetext.Provider value={{ user: [user, setUser] }}>
      {props.children}
    </UserConetext.Provider>
  );
};
