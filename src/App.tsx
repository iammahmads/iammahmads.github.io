import "./App.css";
import Footer from "./components/footer";
import Header from "./components/header";
import SocialSidebar from "./components/socialSidebar";
import HomePage from "./pages/home";

function App() {

  return (
    <>
      <Header />
      <HomePage />
      <Footer />
      <SocialSidebar />
    </>
  );
}

export default App;
