import { getCurrentUser } from "@/lib/appwrite";
import { createContext, useContext, useEffect, useState } from "react";

import { type Dispatch, type SetStateAction } from "react";
// разделено, чтобы реакт быстрее обновлялся. Такие требования

export type TGlobalContext = [
  boolean | null,
  Dispatch<SetStateAction<boolean>> | null,
  any | null,
  Dispatch<SetStateAction<any>> | null,
  boolean | null
];

const GlobalContext = createContext<TGlobalContext>([
  null,
  null,
  null,
  null,
  null,
]);
// экспортируем хук кот указывает какой контекст мы хотим получить
export const useGlobalContext = () => {
  // в данном случае это глобальный контекст
  return useContext(GlobalContext);
};

const GlobalProvider = ({ children }: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  // true т.к. загружаем пользователя первый раз
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        if (res) {
          console.log(res);

          setIsLoggedIn(true);
          setUser(res);
        } else {
          // console.log("res не получен");

          setIsLoggedIn(false);
          setUser(null);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <GlobalContext.Provider
      value={[isLoggedIn, setIsLoggedIn, user, setUser, isLoading]}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;