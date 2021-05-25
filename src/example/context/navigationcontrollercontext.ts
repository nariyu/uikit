import { NavigationControllerHandler } from 'lib/components/navigationcontroller';
import { createContext } from 'react';

export const GlobalNavigationControlerContext = createContext<NavigationControllerHandler>(
  undefined,
);

export const ModalNavigationControllerContext = createContext<NavigationControllerHandler>(
  undefined,
);
