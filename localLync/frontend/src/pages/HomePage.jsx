import React, { useState } from "react";
import { MdAddCircleOutline, MdHome, MdSearch, MdStorefront, MdLocalShipping, MdAnalytics, MdNotificationsNone, MdArrowUpward, MdDownload, MdCameraAlt, MdMic } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "./../App.css";

// Custom SVG logo for sidebar top
const LogoIcon = () => (
  <svg height="38" width="38" viewBox="0 0 32 32" fill="none">
    <text x="2" y="27" fontFamily="Arial" fontSize="26" fill="#23c9e2">L</text>
    <text x="15" y="27" fontFamily="Arial" fontSize="26" fill="#fff">L</text>
  </svg>
);

function HomePage() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  function handleKeyDown(e) {
    if (e.key === "Enter" && search.trim() !== "") {
      navigate("/products", { state: { query: search } });
    }
  }

  return (
    <div className="app-root">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <LogoIcon />
        </div>
        <ul className="sidebar-menu">
          <li><button className="sidebar-btn"><MdAddCircleOutline size={22} /></button></li>
          <li><button className="sidebar-btn active"><MdHome size={22} /><span>Home</span></button></li>
          <li><button className="sidebar-btn"><MdSearch size={22} /><span>Search</span></button></li>
          <li>
            <button className="sidebar-btn" onClick={() => navigate("/stores")}>
              <MdStorefront size={22} /><span>Stores</span>
            </button>
          </li>
          <li><button className="sidebar-btn"><MdLocalShipping size={22} /><span>Delivery</span></button></li>
          <li><button className="sidebar-btn"><MdAnalytics size={22} /><span>Analytics</span></button></li>
          <li><button className="sidebar-btn"><MdNotificationsNone size={22} /></button></li>
        </ul>
        <div className="sidebar-account">
          <button className="sidebar-account-btn">LL</button>
          <span className="sidebar-label">Account</span>
        </div>
        <ul className="sidebar-menu">
          <li><button className="sidebar-btn"><MdArrowUpward size={22} /><span>Upgrade</span></button></li>
          <li><button className="sidebar-btn"><MdDownload size={22} /><span>Install</span></button></li>
        </ul>
      </aside>
      <main className="main-content">
        <div className="center-container">
          <h1 className="logo">
            LocalLync
          </h1>
          <div className="extra-large-search-box">
            <textarea
              className="search-input stacked-search-input"
              placeholder="Search local products, describe or upload image..."
              aria-label="Search input"
              value={search}
              onChange={e => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <div className="search-options-row">
              <button className="search-toolbar-btn" title="Search">
                <MdSearch size={22} />
              </button>
              <button className="search-toolbar-btn" title="Upload Image">
                <MdCameraAlt size={22} />
              </button>
              <button className="search-toolbar-btn" title="Use Microphone">
                <MdMic size={22} />
              </button>
            </div>
          </div>
          <p className="search-info">
            Find products available within 5km from you, with optimized routes and delivery options.
          </p>
        </div>
      </main>
    </div>
  );
}

export default HomePage;
