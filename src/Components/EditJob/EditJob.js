// EditJob.js
import React, {useEffect, useState} from "react";
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
  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [jobs, setJobs] = useState([]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    fetch("http://localhost:8000/jobs")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        console.log(data);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Assuming jobData is correctly populated with data for a single job
    const job = {
      title: jobData.title,
      description: jobData.description,
      location: jobData.location,
      salary: jobData.salary,
    };
    const updatedJobs = jobs.map((job) => {
      console.log(job._id);
      if (job._id === Number(id)) {
        return { ...job, ...jobData };
      }
      return job;
    });
    job._id=id
    console.log(updatedJobs);
    fetch(`http://localhost:8000/jobs/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(job),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log(job);
        if (data.modifiedCount > 0) {
          // eslint-disable-next-line no-restricted-globals
          location.reload()
        }
      });
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
