"use client";

import { ReactNode, useState } from "react";
import UserContext, { UserContextInterface } from "@/context/UserContext";

interface UserContextProviderProps {
  children: ReactNode;
}

export default function UserContextProvider({
  children,
}: UserContextProviderProps) {
  const [user, setUser] = useState<UserContextInterface>({
    firstName: "Abdul Ghafoor",
    lastName: "Awan",
    age: 39,
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
