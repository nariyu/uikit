import { createContext } from 'react';
import { NavigationControllerHandler } from 'shared/components/navigationcontroller';

export const GlobalNavigationControlerContext = createContext<NavigationControllerHandler>(
  undefined,
);

export const ModalNavigationControllerContext = createContext<NavigationControllerHandler>(
  undefined,
);
