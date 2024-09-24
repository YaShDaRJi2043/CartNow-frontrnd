import React, { useEffect, useState } from "react";
import "./Address.css";
import BASE_URL from "../../../services/Helper";

const Address = () => {
  const [formData, setFormData] = useState({
    house: "",
    area: "",
    landmark: "",
    pin: "",
    state: "",
    city: "",
    addressType: "",
  });
  console.log(formData);

  const [isEditMode, setIsEditMode] = useState(false);
  const USER_ID = localStorage.getItem("userId");

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await BASE_URL.get(
          `/displayUserAddress?id=${USER_ID}`
        );
        if (
          response.data.status === 201 &&
          response.data.displayUserAddress.length > 0
        ) {
          const address = response.data.displayUserAddress[0];
          setFormData({
            house: address.house,
            area: address.area,
            landmark: address.landmark,
            pin: address.pin,
            state: address.state,
            city: address.city,
            addressType: address.addressType,
          });
          setIsEditMode(true);
        }
      } catch (error) {
        console.log("Error fetching address:", error);
      }
    };
    fetchAddress();
  }, []);

  const numberLimit = (e) => {
    if (
      (e.keyCode >= 65 && e.keyCode <= 90) ||
      e.keyCode === 32 ||
      (e.keyCode >= 106 && e.keyCode <= 111)
    ) {
      e.preventDefault();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = isEditMode
        ? await BASE_URL.put(`/updateUserAddress?id=${USER_ID}`, formData)
        : await BASE_URL.post(`/addUserAddress?id=${USER_ID}`, formData);

      if (response.data.status === 201) {
        alert(
          isEditMode
            ? "Address updated successfully"
            : "Address submitted successfully"
        );

        if (!isEditMode) {
          setIsEditMode(true);
        }
      }
    } catch (error) {
      console.log("Error submitting/updating address:", error);
    }
  };

  return (
    <>
      <div className="addressMainDiv">
        <div>
          <div>House no., Flat, Building, Company, Apartment</div>
          <div>
            <input
              type="text"
              className="addressInput"
              name="house"
              value={formData.house}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <div>Area, Street, Sector, Village</div>
          <div>
            <input
              type="text"
              className="addressInput"
              name="area"
              value={formData.area}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <div>Landmark</div>
          <div>
            <input
              type="text"
              placeholder="E.g. near apollo hospital"
              className="addressInput"
              name="landmark"
              value={formData.landmark}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <div>Pincode</div>
          <div>
            <input
              type="tel"
              maxLength="6"
              className="addressInput"
              name="pin"
              value={formData.pin}
              onKeyDown={numberLimit}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <div>City</div>
          <div>
            <input
              type="text"
              className="addressInput"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <div>State</div>
          <div>
            <select
              className="addressDropDown"
              name="state"
              value={formData.state}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select State
              </option>
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Arunachal Pradesh">Arunachal Pradesh</option>
              <option value="Assam">Assam</option>
              <option value="Bihar">Bihar</option>
              <option value="Chhattisgarh">Chhattisgarh</option>
              <option value="Goa">Goa</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Haryana">Haryana</option>
              <option value="Himachal Pradesh">Himachal Pradesh</option>
              <option value="Jharkhand">Jharkhand</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Kerala">Kerala</option>
              <option value="Madhya Pradesh">Madhya Pradesh</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Manipur">Manipur</option>
              <option value="Meghalaya">Meghalaya</option>
              <option value="Mizoram">Mizoram</option>
              <option value="Nagaland">Nagaland</option>
              <option value="Odisha">Odisha</option>
              <option value="Punjab">Punjab</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Sikkim">Sikkim</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Telangana">Telangana</option>
              <option value="Tripura">Tripura</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Uttarakhand">Uttarakhand</option>
              <option value="West Bengal">West Bengal</option>
            </select>
          </div>
        </div>

        <div>
          <div>Address Type</div>
          <div>
            <select
              className="addressDropDown"
              name="addressType"
              value={formData.addressType}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select an Address Type
              </option>
              <option>Home (7 AM - 9 PM delivery)</option>
              <option>Office/Commercial (10 AM - 6 PM delivery)</option>
            </select>
          </div>
        </div>

        <div className="addressBtn" onClick={handleSubmit}>
          {isEditMode ? "Update Address" : "Submit"}
        </div>
      </div>
    </>
  );
};

export default Address;
