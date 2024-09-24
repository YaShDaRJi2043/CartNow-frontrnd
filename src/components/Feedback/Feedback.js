import React, { useState, useContext } from "react";
import "./Feedback.css";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { LoginContext } from "../Context/ContextProvider";

const Feedback = () => {
  // const { account, setAccount } = useContext(LoginContext);
  // console.log(account);

  // const [data, setData] = useState({
  //   email: "",
  //   feedback: "",
  // });
  // console.log(data);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setData({ ...data, [name]: value });
  // };

  // const validdata = async () => {
  //   const token = localStorage.getItem("usertoken");

  //   const valid = await fetch("/validuser", {
  //     method: "GET",
  //     headers: {
  //       Authorization: token,
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   const data1 = await valid.json();

  //   if (valid.status !== 201) {
  //     console.log("first login");
  //   } else {
  //     console.log(data1);
  //     setAccount(data1);
  //   }
  // };

  // const HandleSubmit = async (e) => {
  //   e.preventDefault();
  //   const token = localStorage.getItem("usertoken");
  //   const { email, feedback } = data;

  //   const res = await fetch("/feedbackData", {
  //     method: "POST",
  //     headers: {
  //       Authorization: token,
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       email,
  //       feedback,
  //     }),
  //   });

  //   const detail = await res.json();
  //   console.log(detail);

  //   if (detail.status == 404) {
  //     console.log("Data not get");
  //   } else {
  //     toast.success("thanks for feedback");
  //     validdata();
  //   }
  // };

  return (
    <>
      {/* <div className="fmain">
        <p className="feed"> Customer Feedback</p>

        <div>
          <input
            type="email"
            className="m1-rem"
            name="email"
            placeholder="Enter your email"
            onChange={handleChange}
          />
        </div>

        <div>
          <textarea
            type="text"
            className="m1-rem"
            name="feedback"
            placeholder="Enter your Feedback"
            onChange={handleChange}
            style={{ height: "100px" }}
          />
        </div>

        <button className="sub" onClick={HandleSubmit}>
          Submit
        </button>
      </div> */}
      {/* <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      /> */}
    </>
  );
};

export default Feedback;
