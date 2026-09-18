import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const StoreMap = ({ stores = [], toggleView }) => {
    if (!stores || stores.length === 0) {
        return (
            <div>
                <button onClick={toggleView} aria-label="Back to Store list">
                    ← Back to Stores
                </button>
                <p>No stores match the current filters.</p>
            </div>
        );
    }

    const avgLat = stores.reduce((acc, store) => acc + store.lat, 0) / stores.length;
    const avgLng = stores.reduce((acc, store) => acc + store.lng, 0) / stores.length;

    return (
        <div className="map-page-container">
            <button className="back-btn" onClick={toggleView} aria-label="Back to Stores">
                ← Back to Stores
            </button>

            <MapContainer
                center={[avgLat, avgLng]}
                zoom={14}
                style={{ height: "90vh", width: "100%", borderRadius: "1.4em" }}
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

            <style jsx>{`
        .map-page-container {
          padding: 1rem 2rem;
          background: #232323;
          height: 100vh;
          display: flex;
          flex-direction: column;
        }
        .back-btn {
          background: #0ca2df;
          border: none;
          border-radius: 1rem;
          padding: 0.5em 1rem;
          font-weight: 700;
          font-size: 1rem;
          color: white;
          cursor: pointer;
          margin-bottom: 1rem;
          width: fit-content;
        }
        .back-btn:hover {
          background: #61d6ff;
        }
      `}</style>
        </div>
    );
};

export default StoreMap;
