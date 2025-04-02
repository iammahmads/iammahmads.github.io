import "./App.css";
import Footer from "./components/footer";
import Header from "./components/header";
import SocialSidebar from "./components/socialSidebar";

import { Outlet } from "react-router-dom";

function App() {

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <SocialSidebar />
    </>
  );
}

export default App;
