// CreateJob.js
import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CreateJob = () => {
  const navigator = useNavigate();
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save job data to local storage
    const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
    const newJob = { id: Date.now(), ...jobData };
    localStorage.setItem("jobs", JSON.stringify([...jobs, newJob]));
    // Redirect to view jobs page after job creation
    navigator("/jobs");
  };

  return (
    <div>
      <Typography variant="h4">Create Job</Typography>
      <form
        onSubmit={handleSubmit}
        style={{
          width: "40%",
          margin: "auto",
        }}
      >
        <TextField
          name="title"
          label="Title"
          value={jobData.title}
          onChange={handleChange}
          fullWidth
          required
          style={{ marginTop: "10px" }}
        />
        <TextField
          name="description"
          label="Description"
          value={jobData.description}
          onChange={handleChange}
          fullWidth
          required
          style={{ marginTop: "10px" }}
        />
        <TextField
          name="location"
          label="Location"
          value={jobData.location}
          onChange={handleChange}
          fullWidth
          required
          style={{ marginTop: "10px" }}
        />
        <TextField
          name="salary"
          label="Salary"
          value={jobData.salary}
          onChange={handleChange}
          fullWidth
          required
          style={{ marginTop: "10px" }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: "10px" }}
        >
          Create Job
        </Button>
      </form>
    </div>
  );
};

export default CreateJob;
