import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useNavigate } from "react-router-dom";

export default function StoreMapPage({
    stores,
    selectedStoreIds,
    setSelectedStoreIds,
}) {
    const navigate = useNavigate();

    const handleCheckboxChange = (id) => {
        if (selectedStoreIds.includes(id)) {
            setSelectedStoreIds(selectedStoreIds.filter((sid) => sid !== id));
        } else {
            setSelectedStoreIds([...selectedStoreIds, id]);
        }
    };

    const avgLat =
        stores.reduce((acc, s) => acc + s.lat, 0) / (stores.length || 1);
    const avgLng =
        stores.reduce((acc, s) => acc + s.lng, 0) / (stores.length || 1);

    return (
        <div className="map-page-container" style={{ display: "flex", height: "100vh" }}>
            <div style={{ flex: 1, padding: "1rem" }}>
                <button onClick={() => navigate("/")} style={{ marginBottom: "1rem" }}>
                    ← Back to Stores
                </button>
                <MapContainer
                    center={[avgLat, avgLng]}
                    zoom={14}
                    style={{ height: "90%", width: "100%", borderRadius: "1.4em" }}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; OpenStreetMap contributors"
                    />
                    {stores.map(({ id, lat, lng, name, address }) => (
                        <Marker key={id} position={[lat, lng]}>
                            <Popup>
                                <strong>{name}</strong>
                                <br />
                                {address}
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>

            <aside
                style={{
                    width: "320px",
                    background: "#18181b",
                    color: "#e4e4e7",
                    boxShadow: "0 0 15px #0ca2df33",
                    overflowY: "auto",
                }}
            >
                <h2 style={{ padding: "1rem 1.5rem" }}>Select Stores</h2>
                <ul style={{ listStyle: "none", padding: "0 1rem" }}>
                    {stores.map((store) => (
                        <li
                            key={store.id}
                            style={{
                                marginBottom: "1rem",
                                borderBottom: "1px solid #0ca2df44",
                                paddingBottom: "1rem",
                                display: "flex",
                                gap: "1rem",
                                alignItems: "center",
                            }}
                        >
                            <input
                                type="checkbox"
                                id={`store-select-${store.id}`}
                                checked={selectedStoreIds.includes(store.id)}
                                onChange={() => handleCheckboxChange(store.id)}
                            />
                            <label htmlFor={`store-select-${store.id}`}>
                                <strong>{store.name}</strong>
                                <br />
                                <small>{store.address}</small>
                            </label>
                        </li>
                    ))}
                </ul>
            </aside>
        </div>
    );
}
