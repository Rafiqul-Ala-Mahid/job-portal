// CreateJob.js
import React, { useContext, useEffect, useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Auth/AuthProvider";

const CreateJob = () => {
  const navigator = useNavigate();
  const { user, logOut } = useContext(AuthContext);
  const [jobData, setJobData] = useState({});

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(jobData)
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // Assuming jobData is correctly populated with data for a single job
    const job = {
      title: jobData.title,
      description: jobData.description,
      location: jobData.location,
      salary: jobData.salary
    };
    // Save job data to local storage
    const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
    const newJob = { jobData };
    localStorage.setItem("jobs", JSON.stringify([...jobs, newJob]));

    fetch("http://localhost:8000/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //Add authorization header if needed
        "Authorization": `Bearer ${localStorage.getItem("jobs")}`
      },
      body: JSON.stringify(job),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to create job");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Job created successfully:", data);
        // Redirect to view jobs page after job creation
        navigator("/jobs");
      })
      .catch((error) => {
        console.error("Error creating job:", error);
        // Handle error appropriately (e.g., display error message to user)
      });
    // Redirect to view jobs page after job creation
    // navigator("/jobs");
  };

  useEffect(() => {
    fetch(`http://localhost:8000/jobs`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("job-token")}`,
      },
    })
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          return logOut();
        }
        return res.json();
      })
      .then((data) => {
        setJobData(data);
      });
  }, [user?.email, logOut]);

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
