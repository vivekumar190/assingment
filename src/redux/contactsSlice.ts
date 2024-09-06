// src/redux/contactsSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Contact } from '../models/Contact';
import { ContactsState } from '../models/redux';

// Helper function to get contacts from localStorage
const loadContactsFromLocalStorage = (): Contact[] => {
  const contacts = localStorage.getItem('contacts');
  return contacts ? JSON.parse(contacts) : [];
};

// Helper function to save contacts to localStorage
const saveContactsToLocalStorage = (contacts: Contact[]) => {
  localStorage.setItem('contacts', JSON.stringify(contacts));
};

const initialState: ContactsState = {
  contacts: loadContactsFromLocalStorage(),
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<Contact>) => {
      state.contacts.push(action.payload);
      saveContactsToLocalStorage(state.contacts);
    },
    editContact: (state, action: PayloadAction<Contact>) => {
      const index = state.contacts.findIndex(contact => contact.id === action.payload.id);
      if (index !== -1) {
        state.contacts[index] = action.payload;
        saveContactsToLocalStorage(state.contacts);
      }
    },
    deleteContact: (state, action: PayloadAction<string>) => {
      state.contacts = state.contacts.filter(contact => contact.id !== action.payload);
      saveContactsToLocalStorage(state.contacts);
    },
  },
});

export const { addContact, editContact, deleteContact } = contactsSlice.actions;
export default contactsSlice.reducer;
