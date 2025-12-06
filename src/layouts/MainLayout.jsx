import { Outlet } from "react-router";
import Footer from "../components/shared/Footer/Footer";
import Navbar from "../components/shared/Navbar/Navbar";

function MainLayout() {
  return (
    <>
      <Navbar />
      <main className="min-h-[70vh]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;
