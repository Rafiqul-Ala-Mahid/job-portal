import { RouterProvider } from "react-router-dom";

import './App.css';
import router from "./Components/Router/Routes";

function App() {
  
  return (
    <div className="App">
      <RouterProvider router={router}>Hello</RouterProvider>
    </div>
  );
}
export default App;
