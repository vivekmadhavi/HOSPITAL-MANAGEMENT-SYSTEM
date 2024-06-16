import React, { useContext, useState } from "react";
import { Context } from "../main";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const AddNewDoctor = () => {
  const { isAuthenticated } = useContext(Context);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    nic: "",
    dob: "",
    gender: "",
    password: "",
    doctorDepartment: "",
    docAvatar: ""
  });
  
  const [docAvatarPreview, setDocAvatarPreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigateTo = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAvatar = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setDocAvatarPreview(reader.result);
      setFormData({ ...formData, docAvatar: file });
    };
  };

  const handleAddNewDoctor = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => data.append(key, formData[key]));

      const response = await axios.post(
        "http://localhost:4000/api/v1/user/doctors/addnew",
        data,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast.success(response.data.message);
      navigateTo("/");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const departmentArray = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
    "Physical Therapy",
    "Dermatology",
    "ENT"
  ];

  return (
    <section className="page">
      <section className="container form-component add-doctor-form">
        <img src="/logo.png" alt="logo" className="logo" />
        <h1 className="form-title">ADD NEW DOCTOR</h1>
        <form onSubmit={handleAddNewDoctor}>
          <div className="first-wrapper">
            <div>
              <img src={docAvatarPreview || "/docHolder.jpg"} alt="Doctor Avatar" />
            </div>
            <div>
              <input type="file" onChange={handleAvatar} />
              <input
                type="text"
                placeholder="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <input
                type="tel"
                placeholder="Mobile Number"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                placeholder="NIC"
                name="nic"
                value={formData.nic}
                onChange={handleInputChange}
                required
              />
              <input
                type="date"
                placeholder="Date of Birth"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
                required
              />
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <select
                name="doctorDepartment"
                value={formData.doctorDepartment}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Department</option>
                {departmentArray.map((department, index) => (
                  <option value={department} key={index}>{department}</option>
                ))}
              </select>
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Adding..." : "ADD NEW DOCTOR"}
              </button>
            </div>
          </div>
        </form>
      </section>
    </section>
  );
};

export default AddNewDoctor;
