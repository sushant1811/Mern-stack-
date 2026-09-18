import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix leaflet default icon links
delete L.Icon.Default.prototype._getIconUrl;

const defaultIcon = new L.Icon({
    iconRetinaUrl:
        "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

const selectedIcon = new L.Icon({
    iconRetinaUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
    iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

const stores = [
    {
        id: 1,
        name: "LocalLync Fresh Mart",
        address: "23 Alpha St, City Center",
        rating: 4.7,
        popularity: 90,
        distance: 3.5,
        discount: 10,
        photo:
            "https://images.unsplash.com/photo-1515168833906-d2a5e043f3aa?auto=format&fit=crop&w=600&q=80",
        offers: ["10% off fruits", "Buy 1 Get 1 on snacks"],
        products: [
            {
                name: "Fresh Apples",
                image:
                    "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=150&q=80",
            },
            {
                name: "Organic Bananas",
                image:
                    "https://images.unsplash.com/photo-1574226516831-e1dff420e3f5?auto=format&fit=crop&w=150&q=80",
            },
            {
                name: "Fresh Grapes",
                image:
                    "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=150&q=80",
            },
        ],
        mapQuery: "23 Alpha St, City Center",
        lat: 40.712776,
        lng: -74.005974,
    },
    {
        id: 2,
        name: "Green Grocery Hub",
        address: "82 Market Road, North City",
        rating: 4.5,
        popularity: 80,
        distance: 6,
        discount: 20,
        photo:
            "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
        offers: ["Free delivery above ₹500", "Weekend Sale 20% Off"],
        products: [
            {
                name: "Organic Quinoa",
                image:
                    "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=150&q=80",
            },
            {
                name: "Chia Seeds",
                image:
                    "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=150&q=80",
            },
            {
                name: "Almond Nuts",
                image:
                    "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=150&q=80",
            },
        ],
        mapQuery: "82 Market Road, North City",
        lat: 40.715776,
        lng: -74.006974,
    },
    {
        id: 3,
        name: "Alpha Minimart",
        address: "5 West Avenue, Old Town",
        rating: 4.2,
        popularity: 70,
        distance: 2,
        discount: 5,
        photo:
            "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
        offers: ["Flat ₹100 cashback on orders above ₹1000"],
        products: [
            {
                name: "Whole Wheat Bread",
                image:
                    "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=150&q=80",
            },
            {
                name: "Low-fat Milk",
                image:
                    "https://images.unsplash.com/photo-1586281380349-66ee1da1a22d?auto=format&w=150&q=80",
            },
            {
                name: "Eggs",
                image:
                    "https://images.unsplash.com/photo-1521996313146-0e1aca3ee0ec?auto=format&w=150&q=80",
            },
        ],
        mapQuery: "5 West Avenue, Old Town",
        lat: 40.712776,
        lng: -74.015974,
    },
];

const StoreMapWithSelection = () => {
    const [selectedStoreIds, setSelectedStoreIds] = useState(stores.map((s) => s.id));

    const toggleSelection = (id) => {
        setSelectedStoreIds((prev) =>
            prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
        );
    };

    const avgLat = stores.reduce((acc, store) => acc + store.lat, 0) / stores.length;
    const avgLng = stores.reduce((acc, store) => acc + store.lng, 0) / stores.length;

    const getStars = (rating) => {
        const rounded = Math.round(rating);
        return "★".repeat(rounded) + "☆".repeat(5 - rounded);
    };

    return (
        <div className="container">
            <div className="map-container">
                <MapContainer
                    center={[avgLat, avgLng]}
                    zoom={14}
                    style={{ height: "95vh", width: "100%", borderRadius: "1.2em" }}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; OpenStreetMap contributors"
                    />
                    {stores
                        .filter((store) => selectedStoreIds.includes(store.id))
                        .map(({ id, lat, lng, name, address }) => (
                            <Marker key={id} position={[lat, lng]} icon={selectedIcon}>
                                <Popup>
                                    <strong>{name}</strong>
                                    <br />
                                    {address}
                                </Popup>
                            </Marker>
                        ))}
                </MapContainer>
            </div>

            <div className="store-details-container">
                {stores.map((store) => (
                    <div key={store.id} className="store-detail-card" tabIndex={0}>
                        <div className="store-name-checkbox">
                            <p className="store-detail-name">{store.name}</p>
                            <input
                                type="checkbox"
                                checked={selectedStoreIds.includes(store.id)}
                                onChange={() => toggleSelection(store.id)}
                                className="store-checkbox"
                                aria-label={`Select store ${store.name}`}
                            />
                        </div>
                        <div className="store-info-row">
                            <img
                                src={store.photo}
                                alt={store.name}
                                className="store-photo"
                                onError={(e) => (e.target.style.display = "none")}
                            />
                            <div className="store-details-text">
                                <p className="store-detail-address">{store.address}</p>
                                <p className="store-detail-rating">
                                    Rating: <span className="stars">{getStars(store.rating)}</span>
                                </p>
                                <div className="store-detail-offers">
                                    {store.offers.map((offer, idx) => (
                                        <span key={idx} className="offer-badge">
                                            {offer}
                                        </span>
                                    ))}
                                </div>
                                {/* <div className="store-detail-products">
                                    <strong>Products:</strong>
                                    <div className="product-images">
                                        {store.products.map((p, idx) => (
                                            <img
                                                key={idx}
                                                src={p.image}
                                                alt={p.name}
                                                title={p.name}
                                                className="product-image"
                                            />
                                        ))}
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <style jsx>{`
        .container {
          display: flex;
          gap: 1rem;
          padding: 1rem;
          height: 100vh;
          background: #232323;
          color: #e4e4e7;
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        }
        .store-photo-container {
          width: 180px;
          height: 180px;
          background: #161618;
          border-radius: 1.2em;
          box-shadow: 0 0 0 2px #3338;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .store-photo {
          width: 120px;
          height: 120px;
          object-fit: cover;
          border-radius: 1.2em;
          flex-shrink: 0;
        }
        .map-container {
          width: 50%;
          border-radius: 1.2em;
          box-shadow: 0 8px 20px #0009;
        }
        .store-details-container {
          width: 50%;
          overflow-y: auto;
          padding-right: 1rem;
        }
        .store-detail-card {
          background: #18181b;
          border-radius: 1em;
          padding: 1rem;
          margin-bottom: 1rem;
          box-shadow: 0 4px 16px #0007;
          outline: none;
        }
        .store-detail-card:focus {
          box-shadow: 0 0 0 3px #0ca2dfcc;
        }
        .store-name-checkbox {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.2rem;
        }
        .store-checkbox {
          width: 24px;
          height: 24px;
          cursor: pointer;
          accent-color: #0ca2df;
        }
        .store-detail-name {
          margin: 0;
          font-size: 1.3rem;
          font-weight: 700;
          color: #0ca2df;
        }
        .store-info-row {
          display: flex;
          gap: 1rem;
          align-items: flex-start;
        }
        .store-details-text {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .store-detail-address {
          font-size: 1rem;
          color: #adb5bd;
          margin-left: 0.2rem;
          margin-bottom: 0.6rem;
        }
        .store-detail-rating {
          font-size: 1.1rem;
          color: #94e2d5;
          margin-left: 0.2rem;
          margin-bottom: 0.8rem;
        }
        .stars {
          font-size: 1.15rem;
          color: #33ffe6;
          user-select: none;
        }
        .store-detail-offers {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-left: 0.2rem;
          margin-bottom: 0.7rem;
        }
        .offer-badge {
          background: #0ca2df33;
          color: #37daf6;
          border-radius: 0.5em;
          padding: 0.3em 0.7em;
          font-weight: 600;
          font-size: 0.95rem;
          white-space: nowrap;
        }
        .store-detail-products {
          font-size: 1rem;
          color: #cbd5e1;
          margin-left: 0.2rem;
        }
        .product-images {
          display: flex;
          gap: 0.6rem;
          margin-top: 0.4rem;
          flex-wrap: wrap;
        }
        .product-image {
          width: 40px;
          height: 40px;
          object-fit: cover;
          border-radius: 0.5em;
          box-shadow: 0 0 4px #0ca2dfcc;
          cursor: pointer;
          transition: transform 0.2s ease;
        }
        .product-image:hover {
          transform: scale(1.1);
        }
        @media (max-width: 900px) {
          .container {
            flex-direction: column;
          }
          .store-details-container,
          .map-container {
            width: 100%;
            height: 320px;
          }
          .map-container {
            height: 50vh;
          }
          .store-info-row {
            flex-direction: column;
            align-items: center;
          }
          .store-photo {
            width: 60%;
            height: auto;
          }
          .store-details-text {
            margin-top: 0.8rem;
            width: 100%;
          }
        }
      `}</style>
        </div>
    );
};

export default StoreMapWithSelection;
