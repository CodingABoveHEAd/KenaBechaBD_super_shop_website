import React from "react";
import { assets } from "../assets/assets";

// Capitalize component name
const InputField = ({ type, placeholder, name, handleChange, address }) => (
  <input
    type={type}
    placeholder={placeholder}
    onChange={handleChange}
    name={name}
    value={address[name]}
    required
    className="w-full p-2 border border-gray-300 rounded"
  />
);

const AddAddress = () => {
  const [address, setAddress] = React.useState({
    firstName: "",
    lastName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(address);
    // TODO: Save address or navigate back
  };

  return (
    <div className="mt-16 pb-16">
      <p className="text-2xl md:text-3xl text-gray-500">
        Add Shipping <span className="font-semibold text-primary">Address</span>
      </p>
      <div className="flex flex-col-reverse md:flex-row justify-between mt-10">
        <div className="w-full max-w-xl">
          <form onSubmit={onSubmitHandler} className="space-y-4 mt-6 text-sm">
            <div className="flex flex-col md:flex-row gap-4">
              <InputField
                handleChange={handleChange}
                address={address}
                name="firstName"
                type="text"
                placeholder="First Name"
              />
              <InputField
                handleChange={handleChange}
                address={address}
                name="lastName"
                type="text"
                placeholder="Last Name"
              />
            </div>

            <InputField
              handleChange={handleChange}
              address={address}
              name="email"
              type="email"
              placeholder="Email"
            />
            <InputField
              handleChange={handleChange}
              address={address}
              name="phone"
              type="tel"
              placeholder="Phone"
            />
            <InputField
              handleChange={handleChange}
              address={address}
              name="street"
              type="text"
              placeholder="Street Address"
            />
            <div className="flex flex-col md:flex-row gap-4">
              <InputField
                handleChange={handleChange}
                address={address}
                name="city"
                type="text"
                placeholder="City"
              />
              <InputField
                handleChange={handleChange}
                address={address}
                name="state"
                type="text"
                placeholder="State"
              />
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <InputField
                handleChange={handleChange}
                address={address}
                name="country"
                type="text"
                placeholder="Country"
              />
              <InputField
                handleChange={handleChange}
                address={address}
                name="zipcode"
                type="text"
                placeholder="Zip Code"
              />
            </div>

            <button
              type="submit"
              className="cursor-pointer w-full bg-primary text-white py-2 rounded font-medium hover:bg-primary-dull"
            >
              Save Address
            </button>
          </form>
        </div>
        <img
          src={assets.add_address_iamge}
          className="md:mr-16 mb-16 md:mt-0 w-full max-w-sm object-contain"
          alt="add address"
        />
      </div>
    </div>
  );
};

export default AddAddress;
