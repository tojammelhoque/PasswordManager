import React, { useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Manager() {
  const ref = useRef();
  const passRef = useRef();
  const [form, setForm] = useState({
    site: "",
    email: "",
    password: "",
  });
  const [passwordArray, setPasswordArray] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    let password = localStorage.getItem("password");
    if (password) setPasswordArray(JSON.parse(password));
  }, []);

  const AddPassword = () => {
    if (!form.site || !form.email || !form.password) {
      alert("Please fill all the fields");
      return;
    }

    if (editIndex !== null) {
      const updatedPasswordArray = passwordArray.map((data, index) =>
        index === editIndex ? form : data
      );
      localStorage.setItem("password", JSON.stringify(updatedPasswordArray));
      setPasswordArray(updatedPasswordArray);
      setEditIndex(null);
    } else {
      if (passwordArray.some((data) => data.site === form.site)) {
        alert("Website name already exists");
        return;
      } else {
        const updatedPasswordArray = [...passwordArray, form];
        localStorage.setItem("password", JSON.stringify(updatedPasswordArray));
        setPasswordArray(updatedPasswordArray);
      }
    }
    setForm({ site: "", email: "", password: "" });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const showPassword = () => {
    if (ref.current.src.includes("icon/eye.png")) {
      ref.current.src = "icon/eye-close.png";
      passRef.current.type = "text";
    } else {
      ref.current.src = "icon/eye.png";
      passRef.current.type = "password";
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to Clipboard", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const editPassword = (index) => {
    setForm(passwordArray[index]);
    setEditIndex(index);
  };

  const deletePassword = (index) => {
    const updatedPasswordArray = passwordArray.filter((_, i) => i !== index);
    localStorage.setItem("password", JSON.stringify(updatedPasswordArray));
    setPasswordArray(updatedPasswordArray);
  };

  return (
    <>
      <ToastContainer />

      <div className="background bg-[#E1EFF6] h-[83vh] w-full">
        <div className="max-w-full mycontainer px-4 md:px-40">
          <h1 className="text-4xl font-bold text-center my-4">
            <span className="text-green-500">&lt;</span>
            Password<span className="text-green-500">Manager</span>
            <span className="text-green-500">/&gt;</span>
          </h1>

          <div className="flex flex-col text-black p-4 gap-4 md:gap-8 items-center">
            <input
              value={form.site}
              onChange={handleChange}
              placeholder="Enter Website Name"
              className="rounded-full border border-green-500 w-full p-4 py-1"
              type="text"
              name="site"
              aria-label="Website Name"
            />
            <div className="flex flex-col md:flex-row w-full gap-4 md:gap-8">
              <input
                value={form.email}
                onChange={handleChange}
                placeholder="Enter Email"
                className="rounded-full border border-green-500 w-full p-4 py-1"
                type="email"
                name="email"
                aria-label="Email or Username"
              />
              <div className="relative w-full">
                <input
                  ref={passRef}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter Password"
                  className="rounded-full border border-green-500 w-full p-4 py-1"
                  type="password"
                  name="password"
                  aria-label="Password"
                />
                <span
                  className="absolute right-[5px] top-[7px] cursor-pointer"
                  onClick={showPassword}
                >
                  <img
                    ref={ref}
                    width={20}
                    src="icon/eye.png"
                    alt="Show/Hide Password"
                  />
                </span>
              </div>
            </div>
            <button
              onClick={AddPassword}
              className="flex justify-center items-center bg-green-400 gap-2 px-4 py-2 w-fit rounded-full hover:bg-green-700"
            >
              {editIndex !== null ? "Update Password" : "Add Password"}
            </button>
          </div>
          <div className="password mt-8">
            <h1 className="text-4xl font-bold text-center mb-4">
              <span className="text-green-500">&lt;</span>
              Your<span className="text-green-500">Password</span>
              <span className="text-green-500">/&gt;</span>
            </h1>
            {passwordArray.length === 0 ? (
              <p className="text-center">No Password Added</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="table-auto w-full">
                  <thead className="bg-green-900 text-white">
                    <tr>
                      <th className="px-4 py-2 border border-white">
                        Website Name
                      </th>
                      <th className="px-4 py-2 border border-white">
                        Email or Username
                      </th>
                      <th className="px-4 py-2 border border-white">
                        Password
                      </th>
                      <th className="px-4 py-2 border border-white">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-green-100">
                    {passwordArray.map((data, index) => (
                      <tr key={index}>
                        <td className="border px-4 py-2">
                          {data.site}
                          <i
                            className="fa fa-copy"
                            style={{
                              fontSize: "16px",
                              color: "black",
                              marginLeft: "8px",
                              cursor: "pointer",
                              opacity: "0.5",
                            }}
                            onClick={() => copyToClipboard(data.site)}
                          ></i>
                        </td>
                        <td className="border px-4 py-2">
                          {data.email}
                          <i
                            className="fa fa-copy"
                            style={{
                              fontSize: "16px",
                              color: "black",
                              marginLeft: "8px",
                              cursor: "pointer",
                              opacity: "0.5",
                            }}
                            onClick={() => copyToClipboard(data.email)}
                          ></i>
                        </td>
                        <td className="border px-4 py-2">
                          {data.password}
                          <i
                            className="fa fa-copy"
                            style={{
                              fontSize: "16px",
                              color: "black",
                              marginLeft: "8px",
                              cursor: "pointer",
                              opacity: "0.5",
                            }}
                            onClick={() => copyToClipboard(data.password)}
                          ></i>
                        </td>
                        <td className="border px-4 py-2">
                          <span>
                            <i
                              className=" fa fa-edit"
                              style={{
                                fontSize: "16px",
                                color: "black",
                                marginLeft: "8px",
                                cursor: "pointer",
                                opacity: "0.5",
                              }}
                              onClick={() => editPassword(index)}
                            ></i>
                          </span>
                          <span>
                            {" "}
                            <i
                              className="fa fa-trash"
                              style={{
                                fontSize: "16px",
                                color: "black",
                                marginLeft: "8px",
                                cursor: "pointer",
                                opacity: "0.5",
                              }}
                              onClick={() => deletePassword(index)}
                            ></i>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Manager;
