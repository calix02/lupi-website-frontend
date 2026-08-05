import { Outlet } from "react-router";
import Footer from "@/components/Footer/Footer";

export default function AuthLayout() {
    return (
        <>
            <main>
                <Outlet />
            </main>

            <Footer />
        </>
    );
}