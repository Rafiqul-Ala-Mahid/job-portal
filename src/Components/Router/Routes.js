import Main from "../Main/Main"
import Login from "../Login/Login";
import SignUp from "../Signup/Signup";
import PrivateRoute from "./PrivateRoute";
import CreateJob from "../CreateJob/CreateJob";
import ViewJobs from "../ViewJobs/ViewJobs";
import EditJob from "../EditJob/EditJob";
import Home from "../Home/Home";

const { createBrowserRouter } = require("react-router-dom");

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/register",
        element: <SignUp></SignUp>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/create-job",
        element: (
          <PrivateRoute>
            <CreateJob></CreateJob>
          </PrivateRoute>
        ),
      },
      {
        path: "/jobs",
        element: (
          <PrivateRoute>
            <ViewJobs></ViewJobs>
          </PrivateRoute>
        ),
      },
      {
        path: "/jobs/:id/edit",
        element: (
          <PrivateRoute>
            <EditJob></EditJob>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
