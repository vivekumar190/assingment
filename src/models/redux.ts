// src/models/Redux.ts

import { Contact } from './Contact';

export interface ContactsState {
  contacts: Contact[];
}

// Global state type
export interface RootState {
  contacts: ContactsState;
}
