// ViewJobs.js
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Typography, Button } from "@mui/material";
import { AuthContext } from "../Auth/AuthProvider";


const ViewJobs = () => {
  const { user, logOut } = useContext(AuthContext);
  const [jobs, setJob] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8000/jobs", {
      headers: {
        authorization: `Bearer ${localStorage.getItem("job-token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setJob(data);
        console.log(data);
        console.log(user.email)
      });
  }, [user?.email, logOut]);

  const handleDeleteJob = (id) => {
    // const updatedJobs = jobs.filter((job) => job.id !== id);
    // localStorage.setItem("jobs", JSON.stringify(updatedJobs));
    // // Refresh the page or update the state to reflect the changes
    const proceed = window.confirm(
      "Are you sure, you want to cancel this order"
    );
    console.log(id);
    if (proceed) {
      fetch(`http://localhost:8000/jobs/${id}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${localStorage.getItem("job-token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.deletedCount > 0) {
            alert("deleted successfully");
            const remaining = jobs.filter((job) => job._id !== id);
            setJob(remaining);
            // eslint-disable-next-line no-restricted-globals
            location.reload()
          }
        });
    }
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
            key={job._id}
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
                to={{
                  pathname: `/jobs/${job._id}/edit`,
                  state: { jobs: jobs }, // Pass the job data using the state prop
                }}
                variant="contained"
                color="secondary"
                style={{ marginRight: "10px" }}
              >
                Edit
              </Button>
              <Button
                onClick={() => handleDeleteJob(job._id)}
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
