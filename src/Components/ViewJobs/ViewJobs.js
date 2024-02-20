// ViewJobs.js
import React from "react";
import { Link } from "react-router-dom";
import { Typography, Button } from "@mui/material";

const ViewJobs = () => {
  const jobs = JSON.parse(localStorage.getItem("jobs")) || [];

  const handleDeleteJob = (id) => {
    const updatedJobs = jobs.filter((job) => job.id !== id);
    localStorage.setItem("jobs", JSON.stringify(updatedJobs));
    // Refresh the page or update the state to reflect the changes
    window.location.reload(); // Refresh the page
  };

  return (
    <div>
      <Typography variant="h4">Jobs</Typography>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "50%",
          margin: "auto",
        }}
      >
        {jobs.map((job) => (
          <div
            key={job.id}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              border: "1px solid #ccc",
              padding: "10px",
            }}
          >
            <div>
              <Typography variant="h5">
                <span style={{ fontWeight: "bold" }}>Title:</span> {job.title}
              </Typography>
              <Typography>
                <span style={{ fontWeight: "bold" }}>Description:</span>{" "}
                {job.description}
              </Typography>
              <Typography>
                <span style={{ fontWeight: "bold" }}>Location:</span>{" "}
                {job.location}
              </Typography>
              <Typography>
                <span style={{ fontWeight: "bold" }}>Salary:</span> {job.salary}
              </Typography>
            </div>
            <div>
              <Button
                component={Link}
                to={`/jobs/${job.id}/edit`}
                variant="contained"
                color="secondary"
                style={{ marginRight: "10px" }}
              >
                Edit
              </Button>
              <Button
                onClick={() => handleDeleteJob(job.id)}
                variant="contained"
                color="error"
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
      <Button
        component={Link}
        to="/create-job"
        variant="contained"
        color="primary"
        style={{ marginTop: "10px" }}
      >
        Create Job
      </Button>
    </div>
  );
};

export default ViewJobs;
