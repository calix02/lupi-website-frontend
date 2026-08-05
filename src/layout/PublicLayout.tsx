import { Outlet, useNavigate } from "react-router";
import Footer from "@/components/Footer/Footer";
import { useEffect } from "react";

export default function PublicLayout() {
    const navigate = useNavigate();

    useEffect(() =>{
        const handleKeyDown = (e: KeyboardEvent) =>{
            if(e.ctrlKey && e.shiftKey && e.key.toLocaleLowerCase() === "l"){
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
            <main>
                <Outlet />
            </main>

            <Footer />
        </>
    );
}