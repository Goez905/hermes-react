import { createContext } from 'react';

export const SelectedUserContext = createContext({
  selectedUser: {},
  setSelectedUser: (user) => {}
});