import { Outlet } from "react-router";
import Footer from "@/components/Footer/Footer";

export default function PublicLayout() {
    return (
        <>
            <main>
                <Outlet />
            </main>

            <Footer />
        </>
    );
}