import { BrowserRouter } from "react-router-dom";
import NavBar from "./components/home/NavBar";
import Footer from "./components/home/Footer";
import AppRoutes from "./routes";
import "./App.css";

function App() {
    return (
        <BrowserRouter>
            <div className="flex flex-col min-h-screen">
                <NavBar />
                <main className="flex-1">
                    <AppRoutes />
                </main>
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;
