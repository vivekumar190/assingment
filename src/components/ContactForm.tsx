import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { addContact, editContact } from "../redux/contactsSlice";
import { Contact } from "../models/Contact";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type ContactFormData = Omit<Contact, "id"> & { status: "active" | "inactive" };
//form validation
const schema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters long")
    .max(50, "Name cannot exceed 50 characters"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required")
    .max(100, "Email cannot exceed 100 characters"),
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^[0-9]{8,10}$/, "Phone number must be 8-10 digits long"),
  address: yup.string().max(255, "Address cannot exceed 255 characters"),
  status: yup
    .mixed<"active" | "inactive">()
    .oneOf(
      ["active", "inactive"],
      'Status must be either "active" or "inactive"'
    )
    .required("Status is required"),
});

const ContactForm: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const contacts = useAppSelector((state) => state.contacts.contacts);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      status: "active", // Set default value for status
    },
  });

  useEffect(() => {
    if (id) {
      const contact = contacts.find((contact) => contact.id === id);
      if (contact) {
        setValue("name", contact.name);
        setValue("email", contact.email);
        setValue("phone", contact.phone);
        setValue("address", contact.address);
        setValue("status", contact.status); // Set status value
      }
    }
  }, [id, contacts, setValue]);

  const onSubmit = (data: ContactFormData) => {
    if (id) {
      dispatch(editContact({ ...data, id })); // Include id when editing
    } else {
      dispatch(addContact({ ...data, id: new Date().toISOString() })); // Generate a unique ID for new contacts
    }
    navigate("/");
  };

  return (
    <div className="max-w-lg mx-auto p-6 border bg-white shadow-lg rounded-md my-6">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {id ? "Edit Contact" : "Add New Contact"}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-800"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            {...register("name")}
            className={`mt-1 p-2 block w-full rounded-sm border border-gray-300 shadow-sm focus:outline-none ${
              errors.name ? "border-red-500" : "border-black-300"
            }`}
          />
          {errors.name && (
            <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-800"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email")}
            className={`mt-1 p-2 block w-full rounded-sm border border-gray-300 shadow-sm ${
              errors.email ? "border-red-500" : "border-gray-300"
            } focus:outline-none`}
          />
          {errors.email && (
            <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-800"
          >
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            {...register("phone")}
            className={`mt-1 block p-2 w-full rounded-sm border border-gray-300 shadow-sm ${
              errors.phone ? "border-red-500" : "border-gray-300"
            } focus:outline-none`}
          />
          {errors.phone && (
            <p className="mt-2 text-sm text-red-600">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-800"
          >
            Address
          </label>
          <textarea
            id="address"
            {...register("address")}
            className={`mt-1 p-2 block w-full rounded-sm border border-gray-300 shadow-sm ${
              errors.address ? "border-red-500" : "border-gray-300"
            } focus:outline-none`}
          />
          {errors.address && (
            <p className="mt-2 text-sm text-red-600">
              {errors.address.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-800">
            Status
          </label>
          <div className="flex space-x-4">
            <label>
              <input
                type="radio"
                value="active"
                {...register("status")}
                className="mr-2"
                defaultChecked
              />
              Active
            </label>
            <label>
              <input
                type="radio"
                value="inactive"
                {...register("status")}
                className="mr-2"
              />
              Inactive
            </label>
          </div>
          {errors.status && (
            <p className="mt-2 text-sm text-red-600">{errors.status.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none"
        >
          {id ? "Update Contact" : "Add Contact"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
