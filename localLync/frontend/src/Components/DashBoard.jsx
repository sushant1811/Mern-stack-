import React, { useState } from "react";
import { FaMicrophone, FaSearch, FaCamera } from "react-icons/fa";

// The Dashboard component
const Dashboard = () => {
    const [searchText, setSearchText] = useState("");
    const [photo, setPhoto] = useState(null);

    const handlePhotoUpload = (e) => {
        setPhoto(e.target.files[0]);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        alert(`Searching for: ${searchText}${photo ? " with photo" : ""}`);
        // Add search logic here
    };

    return (
        <div className="dashboard-container">
            {/* Navbar with text-based logo */}
            <nav className="navbar">
                <div className="logo-text">LocalLync Mart</div>
                <ul>
                    <li><a href="/explore">Explore</a></li>
                    <li><a href="/nearby-stores">Nearby Stores</a></li>
                    <li><a href="/products">Products</a></li>
                </ul>
            </nav>

            {/* Search Bar Section */}
            <form className="searchbar-section" onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Describe your product..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
                {/* Microphone Button */}
                <button
                    type="button"
                    aria-label="Voice Search"
                    className="minimal-btn"
                >
                    <FaMicrophone />
                </button>
                {/* Camera Upload Button */}
                <label
                    htmlFor="photo-upload"
                    className="minimal-btn"
                    aria-label="Upload Photo"
                >
                    <FaCamera />
                    <input
                        id="photo-upload"
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handlePhotoUpload}
                    />
                </label>
                {/* Search Button */}
                <button type="submit" aria-label="Search" className="minimal-btn">
                    <FaSearch />
                </button>
            </form>

            {/* Show uploaded photo name */}
            {photo && (
                <div className="photo-info">
                    Photo uploaded: {photo.name}
                </div>
            )}

            {/* Placeholder for results */}
            <div className="results-section">
                {/* Results will go here */}
            </div>

            {/* Include CSS styles inline (or move to separate CSS file) */}
            <style jsx>{`
        body {
          margin: 0;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: #18181b;
          color: #e4e4e7;
        }
        .dashboard-container {
          min-height: 100vh;
        }
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 2rem;
          background-color: #212124;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          position: sticky;
          top: 0;
          z-index: 100;
        }
        .logo-text {
          font-weight: bold;
          font-size: 1.3rem;
          letter-spacing: 1px;
        }
        .navbar ul {
          list-style: none;
          display: flex;
          gap: 2rem;
          margin: 0;
        }
        .navbar ul li a {
          color: #9b9ba5;
          text-decoration: none;
          font-size: 1rem;
          transition: color 0.2s;
        }
        .navbar ul li a:hover {
          color: #94e2d5;
        }
        .searchbar-section {
          display: flex;
          align-items: center;
          justify-content: center;
          max-width: 700px;
          margin: 3rem auto;
          padding: 1.5rem;
          background-color: #23232a;
          border-radius: 1.5rem;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.10);
        }
        .searchbar-section input[type="text"] {
          flex: 1;
          padding: 0.8rem 1rem;
          border: none;
          border-radius: 1.2rem;
          background-color: #18181b;
          color: #e4e4e7;
          font-size: 1.1rem;
          outline: none;
        }
        .searchbar-section input[type="text"]:focus {
          background-color: #202023;
          border: 1px solid #94e2d5;
        }
        .minimal-btn {
          background-color: #23232a;
          border: none;
          border-radius: 50%;
          margin: 0 0.4rem;
          padding: 0.6rem;
          font-size: 1.3rem;
          cursor: pointer;
          color: #94e2d5;
          transition: background-color 0.2s, color 0.2s, box-shadow 0.2s;
        }
        .minimal-btn:hover {
          background-color: #18181b;
          box-shadow: 0 0 0 2px #94e2d580;
        }
        .photo-info {
          text-align: center;
          margin-top: 1rem;
          color: #94e2d5;
        }
      `}</style>
        </div>
    );
};

export default Dashboard;
