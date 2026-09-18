import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Storepagecss.css"

function getStars(rating) {
    return "★".repeat(Math.round(rating)) + "☆".repeat(5 - Math.round(rating));
}

export default function StorePageOld() {
    // Hardcoded stores data inside component
    const [stores] = useState([
        {
            id: 1,
            name: "LocalLync Fresh Mart",
            address: "23 Alpha St, City Center",
            rating: 4.7,
            distance: 3.5,
            discount: 10,
            photo: "https://images.unsplash.com/photo-1515168833906-d2a5e043f3aa?auto=format&fit=crop&w=600&q=80",
            offers: ["10% off fruits", "Buy 1 Get 1 on snacks"],
            products: [
                {
                    name: "Fresh Apples",
                    image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=150&q=80",
                },
                {
                    name: "Organic Bananas",
                    image: "https://images.unsplash.com/photo-1574226516831-e1dff420e3f5?auto=format&fit=crop&w=150&q=80",
                },
                {
                    name: "Fresh Grapes",
                    image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=150&q=80",
                },
            ],
            mapQuery: "23 Alpha St, City Center",
        },
        {
            id: 2,
            name: "EcoMart Green Grocer",
            address: "42 Beta Rd, Uptown",
            rating: 4.6,
            distance: 2.2,
            discount: 5,
            photo: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
            offers: ["5% off vegetables", "Free eco bags"],
            products: [
                {
                    name: "Organic Spinach",
                    image: "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?auto=format&fit=crop&w=150&q=80",
                },
                {
                    name: "Green Peas",
                    image: "https://images.unsplash.com/photo-1465101178521-c195aed0818f?auto=format&fit=crop&w=150&q=80",
                },
            ],
            mapQuery: "42 Beta Rd, Uptown",
        },
    ]);

    // State for filters and search input, local to component
    const [filters, setFilters] = useState({ distance: "", starRating: "", discount: "" });
    const [searchText, setSearchText] = useState("");
    const [showFilter, setShowFilter] = useState(true);
    const [showProducts, setShowProducts] = useState({});
    const navigate = useNavigate();

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    const toggleShowProducts = (storeId) => {
        setShowProducts((prev) => ({ ...prev, [storeId]: !prev[storeId] }));
    };

    const filteredStores = stores.filter((store) => {
        const matchesSearch =
            store.name.toLowerCase().includes(searchText.toLowerCase()) ||
            store.address.toLowerCase().includes(searchText.toLowerCase());
        if (!matchesSearch) return false;
        if (filters.distance !== "" && store.distance > Number(filters.distance)) return false;
        if (filters.starRating !== "" && Math.round(store.rating) < Number(filters.starRating)) return false;
        if (filters.discount !== "" && store.discount < Number(filters.discount)) return false;
        return true;
    });

    return (
        <div className="page-container">
            <aside className={`filter-bar ${showFilter ? "" : "hidden"}`}>
                <div className="filter-header">
                    <h2>Filters</h2>
                    <button className="close-filter-btn" aria-label="Hide Filters" onClick={() => setShowFilter(false)}>
                        ←
                    </button>
                </div>
                <nav className="filter-inputs">
                    <label htmlFor="distanceInput" className="filter-label">
                        Max Distance (km)
                    </label>
                    <input
                        type="number"
                        min="0"
                        step="0.1"
                        className="filter-input"
                        id="distanceInput"
                        name="distance"
                        value={filters.distance}
                        onChange={handleFilterChange}
                        placeholder="e.g., 5"
                    />
                    <label htmlFor="starRatingInput" className="filter-label">
                        Min Star Rating
                    </label>
                    <input
                        type="number"
                        min="1"
                        max="5"
                        step="1"
                        className="filter-input"
                        id="starRatingInput"
                        name="starRating"
                        value={filters.starRating}
                        onChange={handleFilterChange}
                        placeholder="1 to 5"
                    />
                    <label htmlFor="discountInput" className="filter-label">
                        Min Discount (%)
                    </label>
                    <input
                        type="number"
                        min="0"
                        step="1"
                        className="filter-input"
                        id="discountInput"
                        name="discount"
                        value={filters.discount}
                        onChange={handleFilterChange}
                        placeholder="e.g., 10"
                    />
                </nav>
            </aside>

            <main className={`main-content ${showFilter ? "with-filter" : ""}`}>
                {!showFilter && (
                    <button className="show-filter-btn" aria-label="Show Filters" onClick={() => setShowFilter(true)}>
                        → Filters
                    </button>
                )}

                <h1 className="heading">Nearby Stores</h1>

                <div className="search-container">
                    <input
                        type="search"
                        placeholder="Search stores by name or address..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        aria-label="Search stores by name or address"
                        className="store-search"
                    />
                </div>

                <div className="map-toggle-container" style={{ textAlign: "right", marginBottom: "1rem" }}>
                    <button className="toggle-map-btn" onClick={() => navigate("/map")} aria-label="Show stores on map">
                        Show Stores on Map
                    </button>
                </div>

                <div className="stores-list">
                    {filteredStores.length > 0 ? (
                        filteredStores.map((store) => (
                            <div key={store.id} className="store-card" aria-live="polite">
                                <div className="store-left">
                                    <img src={store.photo} alt={store.name} className="store-photo" />
                                    <div className="store-info">
                                        <h2 className="store-name">{store.name}</h2>
                                        <div className="rating-section">
                                            <span className="stars">{getStars(store.rating)}</span>
                                            <span className="rating-num">{store.rating.toFixed(1)}</span>
                                        </div>
                                        <div className="store-address">{store.address}</div>
                                        <div className="offers">
                                            {store.offers.map((offer, i) => (
                                                <span key={i} className="offer-badge">
                                                    {offer}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="actions">
                                            <button
                                                className="sec-btn"
                                                onClick={() => toggleShowProducts(store.id)}
                                                aria-expanded={!!showProducts[store.id]}
                                                aria-controls={`products-${store.id}`}
                                            >
                                                {showProducts[store.id] ? "Hide Products" : "Show Products"}
                                            </button>
                                            <button
                                                className="sec-btn"
                                                onClick={() =>
                                                    window.open(`https://www.google.com/maps?q=${encodeURIComponent(store.address)}`, "_blank")
                                                }
                                            >
                                                View Offers
                                            </button>
                                        </div>
                                        {showProducts[store.id] && (
                                            <ul id={`products-${store.id}`} className="products-list" aria-label={`${store.name} Full Products`}>
                                                {store.products.map(({ name, description, image }, i) => (
                                                    <li key={i} className="product-item">
                                                        <img src={image} alt={name} className="product-img" loading="lazy" />
                                                        <div className="product-text">
                                                            <h3>{name}</h3>
                                                            {description && <p>{description}</p>}
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </div>
                                <button
                                    className="map-logo-btn"
                                    onClick={() => window.open(`https://www.google.com/maps?q=${encodeURIComponent(store.mapQuery)}`, "_blank")}
                                    title="Open Location in Map"
                                    aria-label={`Open location for ${store.name} in map`}
                                >
                                    🗺️
                                </button>
                            </div>
                        ))
                    ) : (
                        <div>No stores match the criteria.</div>
                    )}
                </div>
            </main>
        </div>
    );
}
