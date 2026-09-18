// NearbyStores.js
import React from "react";

const stores = [
    { id: 1, name: "LocalLync Store A", address: "123 Main St" },
    { id: 2, name: "LocalLync Store B", address: "456 Oak Ave" },
    { id: 3, name: "LocalLync Store C", address: "789 Pine Rd" },
];

const NearbyStores = () => {
    return (
        <div style={{ padding: "2rem", color: "#e4e4e7", backgroundColor: "#18181b", minHeight: "100vh" }}>
            <h1>Nearby Stores</h1>
            <ul style={{ listStyle: "none", paddingLeft: 0 }}>
                {stores.map((store) => (
                    <li
                        key={store.id}
                        style={{
                            background: "#23232a",
                            marginBottom: "1rem",
                            padding: "1rem",
                            borderRadius: "1rem",
                            boxShadow: "0 2px 12px rgba(0,0,0,0.14)",
                        }}
                    >
                        <h2>{store.name}</h2>
                        <p>{store.address}</p>
                        <a
                            href={`https://maps.google.com?q=${encodeURIComponent(store.address)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: "#94e2d5", textDecoration: "none" }}
                        >
                            View on Map
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NearbyStores;
