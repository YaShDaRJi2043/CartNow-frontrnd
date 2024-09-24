import React, { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoginContext } from "./Context/ContextProvider";

const Address = () => {
  const { account, setAccount } = useContext(LoginContext);
  console.log(account);

  const [names, setNames] = useState({
    email: "",
    pin: "",
    house: "",
    area: "",
    landmark: "",
    city: "",
    state: "",
    time: "",
  });

  const txt = (e) => {
    const { name, value } = e.target;
    setNames({ ...names, [name]: value });
  };

  const validdata = async () => {
    const token = localStorage.getItem("usertoken");

    const valid = await fetch("/validuser", {
      method: "GET",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });
    const data1 = await valid.json();

    if (valid.status !== 201) {
      console.log("first login");
    } else {
      console.log(data1);
      setAccount(data1);
    }
  };

  const btnn = async (e) => {
    const token = localStorage.getItem("usertoken");

    e.preventDefault();

    const { email, pin, house, area, landmark, city, state, time } = names;
    if (email === "") {
      toast.warn("Enter email");
    } else if (pin === "") {
      toast.warn("Enter pincode");
    } else if (house === "") {
      toast.warn("Enter Flat, House no., Building, Company, Apartment");
    } else if (area === "") {
      toast.warn("Enter Area, Street, Sector, Village");
    } else if (landmark === "") {
      toast.warn("Enter landmark");
    } else if (city === "") {
      toast.warn("Enter city");
    } else if (state === "") {
      toast.warn("Please select the state");
    } else if (time === "") {
      toast.warn("Please select the time");
    } else {
      const res = await fetch("/address", {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          pin,
          house,
          area,
          landmark,
          city,
          state,
          time,
        }),
      });

      const details = await res.json();
      console.log(details);

      if (details.status == 404) {
        console.log("Data not get");
      } else {
        toast.success("your address is added");
        validdata();
      }
    }
  };

  return (
    <>
      <body
        style={{
          backgroundColor: "white",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div style={{ marginTop: "130px" }}>
          <div>
            <div className="address_txt">Email</div>
            <div>
              <input
                type="text"
                className="address_input"
                onChange={txt}
                name="email"
              />
            </div>
          </div>
          <div>
            <div className="address_txt">Pincode</div>
            <div>
              <input
                type="tel"
                className="address_input"
                onChange={txt}
                name="pin"
                maxLength="6"
              />
            </div>
          </div>
          <div>
            <div className="address_txt">
              Flat, House no., Building, Company, Apartment
            </div>
            <div>
              <input
                type="text"
                className="address_input"
                onChange={txt}
                name="house"
              />
            </div>
          </div>
          <div>
            <div className="address_txt">Area, Street, Sector, Village</div>
            <div>
              <input
                type="text"
                className="address_input"
                onChange={txt}
                name="area"
              />
            </div>
          </div>
          <div>
            <div className="address_txt">Landmark</div>
            <div>
              <input
                type="text"
                placeholder="E.g. near apollo hospital"
                className="address_input"
                onChange={txt}
                name="landmark"
              />
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <div className="address_txt">Town/City</div>
              <div>
                <input
                  type="text"
                  className="address_input2"
                  onChange={txt}
                  name="city"
                />
              </div>
            </div>
            <div>
              <div className="address_txt">State</div>
              <div>
                <select className="address_drop1" onChange={txt} name="state">
                  <option selected disabled>
                    Choose a state
                  </option>
                  <option>ANDAMAN & NICOBAR ISLANDS</option>
                  <option>ANDHRA PRADHESH</option>
                  <option>ARUNACHAL PRADESH</option>
                  <option>ASSAM</option>
                  <option>BIHAR</option>
                  <option>CHANDIGARH</option>
                  <option>CHHATTISGARH</option>
                  <option>DADRA AND NAGAR HAVELI AND DAMAN AND DIU</option>
                  <option>DELHI</option>
                  <option>GOA</option>
                  <option>GUJARAT</option>
                  <option>HARYANA</option>
                  <option>HIMACHAL PRADESH</option>
                  <option>JAMMU & KASHMIR</option>
                  <option>JHARKHAND</option>
                  <option>KARNATAKA</option>
                  <option>KERALA</option>
                  <option>LADAKH</option>
                  <option>LAKSHADWEEP</option>
                  <option>MADHYA PRADESH</option>
                  <option>MAHARASHTRA</option>
                  <option>MIZORAM</option>
                  <option>NAGALAND</option>
                  <option>ODISHA</option>
                  <option>PUDUCHERRY</option>
                  <option>PUNJAM</option>
                  <option>RAJASTHAN</option>
                  <option>SIKKIM</option>
                  <option>TAMIL NADU</option>
                  <option>TELANGANA</option>
                  <option>TRIPURA</option>
                  <option>UTTAR PRADESH</option>
                  <option>UTTARAKHAND</option>
                  <option>WEST BENGAL</option>
                </select>
              </div>
            </div>
          </div>
          <div>
            <div className="address_txt">Address Type</div>
            <div>
              <select className="address_drop2" onChange={txt} name="time">
                <option selected disabled>
                  Select an Address Type
                </option>
                <option>Home (7 AM - 9 PM delivery)</option>
                <option>Office/Commercial (10 AM - 6 PM delivery)</option>
              </select>
            </div>
          </div>
          <div>
            <button className="address_btn" onClick={btnn}>
              Add Address
            </button>
          </div>
        </div>
      </body>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />
    </>
  );
};

export default Address;
