// Define the ContactStatus type
export type ContactStatus = 'active' | 'inactive';

// Define the Contact interface with the updated status and optional address
export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string; // Optional field
  status: ContactStatus; // Add the status field
}
