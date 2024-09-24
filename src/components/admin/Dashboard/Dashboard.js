import React, { useEffect, useState } from "react";
import "./Dashboard.css";

const Dashboard = () => {
  const [user, setUser] = useState([]);
  console.log(user);

  const userdata = async () => {
    const res = await fetch("/getData", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data.data);
    setUser(data.data);
  };

  useEffect(() => {
    userdata();
  }, []);
  return (
    <>
      <div className="heading">Users Details</div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingBottom: "50px",
        }}
      >
        <table border="1" className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email Id</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Order</th>
              <th>Feedback</th>
            </tr>
          </thead>
          <tbody>
            {user.map((ele) => {
              return (
                <>
                  <tr>
                    <td>{ele.name + " " + ele.lastName}</td>
                    <td>{ele.email}</td>
                    <td>{ele.phone}</td>
                    {ele.Addresses.length ? (
                      <td>
                        {ele.Addresses[0].house + ", "}
                        <br />
                        {ele.Addresses[0].city + ", " + ele.Addresses[0].pin}
                      </td>
                    ) : (
                      <td>N/A</td>
                    )}
                    {ele.buyitems.length ? (
                      <td>
                        {ele.buyitems[0].cart.map((e, i) => {
                          return (
                            <>
                              <div>{e.shortTitle}</div>
                            </>
                          );
                        })}
                      </td>
                    ) : (
                      <td>N/A</td>
                    )}
                    {ele.feedbacks.length ? (
                      <td>{ele.feedbacks[0].feedback}</td>
                    ) : (
                      <td>N/A</td>
                    )}
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Dashboard;
