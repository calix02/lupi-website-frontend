import { Outlet, useNavigate } from "react-router";
import Footer from "@/components/Footer/Footer";
import { useEffect } from "react";
import Header from "@/components/Header/Header";

export default function PublicLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLocaleLowerCase() === "l") {
        e.preventDefault();
        navigate("/login");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [navigate]);
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
