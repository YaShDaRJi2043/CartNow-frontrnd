import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import BASE_URL from "../../../services/Helper";
import "./Address.css";

const initialForm = {
  house: "",
  area: "",
  landmark: "",
  pin: "",
  state: "",
  city: "",
  addressType: "",
};

const states = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

const Address = () => {
  const { user, userToken } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState(initialForm);
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch address on mount
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        setLoading(true);
        const res = await BASE_URL.get(`/user/address/get/${user._id}`, {
          headers: { Authorization: userToken },
        });

        const address = res?.data?.displayUserAddress?.[0];
        if (res.data.status === 201 && address) {
          setFormData(address);
          setIsEditMode(true);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAddress();
  }, [user._id, userToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const url = isEditMode
        ? `/user/address/update/${user._id}`
        : `/user/address/add/${user._id}`;

      const res = await BASE_URL[isEditMode ? "put" : "post"](url, formData, {
        headers: { Authorization: userToken },
      });

      if (res.data.status === 201) {
        toast.success(
          isEditMode
            ? "Address updated successfully"
            : "Address added successfully"
        );
        setIsEditMode(true);
      }
    } catch (err) {
      console.error("Submit error:", err);
      toast.error("Failed to save address. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleNumberInput = (e) => {
    const invalidKey = e.key && isNaN(Number(e.key)) && e.key !== "Backspace";
    if (invalidKey) e.preventDefault();
  };

  const renderInput = (label, name, type = "text", props = {}) => (
    <div className="address-form-group">
      <label className="address-form-label">{label}</label>
      <input
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        className="address-form-input"
        {...props}
      />
    </div>
  );

  return (
    <div className="address-form-container">
      <h2 className="address-form-title">
        {isEditMode ? "Edit Address" : "Add New Address"}
      </h2>

      {loading ? (
        <div className="address-form-skeleton">
          {[...Array(7)].map((_, i) => (
            <div key={i} className="address-field-skeleton">
              <div className="skeleton-label"></div>
              <div className="skeleton-input"></div>
            </div>
          ))}
          <div className="skeleton-button"></div>
        </div>
      ) : (
        <form className="address-form" onSubmit={(e) => e.preventDefault()}>
          {renderInput(
            "House no., Flat, Building, Company, Apartment",
            "house",
            "text",
            { required: true }
          )}
          {renderInput("Area, Street, Sector, Village", "area", "text", {
            required: true,
          })}
          {renderInput("Landmark", "landmark", "text", {
            placeholder: "E.g. near apollo hospital",
          })}
          {renderInput("Pincode", "pin", "tel", {
            maxLength: 6,
            required: true,
            onKeyDown: handleNumberInput,
          })}
          {renderInput("City", "city", "text", { required: true })}

          <div className="address-form-group">
            <label className="address-form-label">State</label>
            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="address-form-select"
              required
            >
              <option value="" disabled>
                Select State
              </option>
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          <div className="address-form-group">
            <label className="address-form-label">Address Type</label>
            <select
              name="addressType"
              value={formData.addressType}
              onChange={handleChange}
              className="address-form-select"
              required
            >
              <option value="" disabled>
                Select an Address Type
              </option>
              <option value="Home">Home (7 AM - 9 PM delivery)</option>
              <option value="Office">Office (10 AM - 6 PM delivery)</option>
            </select>
          </div>

          <button
            type="button"
            className="address-form-submit-btn"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading
              ? "Processing..."
              : isEditMode
              ? "Update Address"
              : "Save Address"}
          </button>
        </form>
      )}

      <Toaster
        position="top-right"
        toastOptions={{ duration: 1500 }}
        reverseOrder={false}
      />
    </div>
  );
};

export default Address;
