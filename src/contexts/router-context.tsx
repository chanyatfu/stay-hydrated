import { createContext, useContext, useState } from "react";

type Path = "welcome" | "water" | "settings";

type Router = {
  currentPath: Path;
  setCurrentPath: (path: Path) => void;
}

const RouterContext = createContext<Router>({
  currentPath: "welcome",
  setCurrentPath: () => {},
});

export const useRouter = () => useContext(RouterContext);

export function RouterProvider({ children }: { children: React.ReactNode }) {

  const [currentPath, setCurrentPath] = useState<Path>("welcome");
  

  return (
    <RouterContext.Provider value={{
      currentPath,
      setCurrentPath
    }}>
      {children}
    </RouterContext.Provider>
  );
}
