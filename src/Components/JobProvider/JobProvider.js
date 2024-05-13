import React, { createContext, useState, useEffect } from "react";
import ViewJobs from "../ViewJobs/ViewJobs";
import EditJob from "../EditJob/EditJob";


export const JobsContext = createContext();

function JobProvider() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/jobs")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data)
        console.log(data)
      });
    
  }, []);

  return (
    <JobsContext.Provider value={{jobs,setJobs}}>
      <ViewJobs />
      <EditJob />
    </JobsContext.Provider>
  );
}

export default JobProvider;
