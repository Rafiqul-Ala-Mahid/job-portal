// EditJob.js
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Typography, TextField, Button } from "@mui/material";

const EditJob = () => {
  const navigator = useNavigate();
  const { id } = useParams();
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
  });

  useEffect(() => {
    // Fetch job data by id and set it to jobData state
    const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
    const job = jobs.find((job) => job.id === Number(id));
    if (job) {
      setJobData(job);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update job data in local storage
    const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
    const updatedJobs = jobs.map((job) => {
      if (job.id === Number(id)) {
        return { ...job, ...jobData };
      }
      return job;
    });
    localStorage.setItem("jobs", JSON.stringify(updatedJobs));
    // Redirect to view jobs page after job editing
    navigator("/jobs");
  };

  return (
    <div>
      <Typography variant="h4" style={{ marginTop: "10px" }}>
        Edit Job
      </Typography>
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
          Save Changes
        </Button>
      </form>
    </div>
  );
};

export default EditJob;
