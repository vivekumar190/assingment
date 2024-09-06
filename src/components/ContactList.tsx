import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/store';
import { deleteContact } from '../redux/contactsSlice';
import { Contact } from '../models/Contact';
import { Link, useNavigate } from 'react-router-dom';

const ContactList: React.FC = () => {
  const contacts = useAppSelector((state) => state.contacts.contacts); 
  const dispatch = useAppDispatch();
  const [selectedContact, setSelectedContact] = useState<string | null>(null); 
  const [showConfirm, setShowConfirm] = useState(false); 
  const navigate = useNavigate();

  const handleDelete = () => {
    if (selectedContact) {
      dispatch(deleteContact(selectedContact));
      setSelectedContact(null); 
      setShowConfirm(false); 
    }
  };

  const handleConfirmDelete = (id: string) => {
    setSelectedContact(id); 
    setShowConfirm(true); 
  };

  return (
    <div>
      {contacts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          {contacts.map((contact: Contact) => (
            <div
              key={contact.id}
              className="flex flex-col bg-white border shadow-md rounded-lg p-4 mb-4 h-full"
            >
              <div className="flex-grow">
                <h3 className="text-2xl font-bold text-gray-800">{contact.name}</h3>
                <p className="text-gray-600"><span className='font-bold'>Email:</span> {contact.email}</p>
                <p className="text-gray-600"><span className='font-bold'>Contact:</span> {contact.phone}</p>
                <p className="text-gray-600"><span className='font-bold'>Status:</span> {contact.status}</p>
                {contact.address && <p className="text-gray-600"><span className='font-bold'>Address:</span> {contact.address}</p>}
              </div>
              <div className="mt-4 flex justify-between space-x-4">
                <Link to={`/edit/${contact.id}`}>
                  <button
                    className="edit-btn bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600"
                    aria-label={`Edit ${contact.name}`}
                  >
                    Edit
                  </button>
                </Link>
                <button
                  onClick={() => handleConfirmDelete(contact.id)}
                  className="delete-btn bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600"
                  aria-label={`Delete ${contact.name}`}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center p-6">
          <p className="text-gray-600">No contacts found. Please add a new contact.</p>
          <button
            onClick={() => navigate('/add')}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mt-4"
            aria-label="Create contact"
          >
            Create contact
          </button>
        </div>
      )}

      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h4 className="text-lg font-bold mb-4">Confirm Deletion</h4>
            <p className="mb-4">Are you sure you want to delete this contact?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600"
                aria-label="Confirm deletion"
              >
                Delete
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-gray-500 text-white py-1 px-3 rounded-md hover:bg-gray-600"
                aria-label="Cancel deletion"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactList;
