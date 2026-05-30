import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import AllNotifications from "./pages/AllNotifications";
import PriorityInbox from "./pages/PriorityInbox";
import FilterNotifications from "./pages/FilterNotifications";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-container">
        <Routes>
          <Route path="/" element={<AllNotifications />} />
          <Route path="/priority" element={<PriorityInbox />} />
          <Route path="/filter" element={<FilterNotifications />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
