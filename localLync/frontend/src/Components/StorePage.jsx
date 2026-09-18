// import React, { useState } from "react";

// function getStars(rating) {
//     const rounded = Math.round(rating);
//     return "★".repeat(rounded) + "☆".repeat(5 - rounded);
// }

// const StorePage = ({
//     filters,
//     setFilters,
//     searchText,
//     setSearchText,
//     stores,
//     toggleView,
// }) => {
//     const [showFilter, setShowFilter] = useState(true);
//     const [showProducts, setShowProducts] = useState({});

//     const handleFilterChange = (e) => {
//         const { name, value } = e.target;
//         setFilters((prev) => ({
//             ...prev,
//             [name]: value,
//         }));
//     };

//     const toggleShowProducts = (storeId) => {
//         setShowProducts((prev) => ({
//             ...prev,
//             [storeId]: !prev[storeId],
//         }));
//     };

//     return (
//         <div className="page-container">
//             <aside className={`filter-bar ${showFilter ? "" : "hidden"}`}>
//                 <div className="filter-header">
//                     <h2>Filters</h2>
//                     <button
//                         className="close-filter-btn"
//                         aria-label="Hide Filters"
//                         onClick={() => setShowFilter(false)}
//                     >
//                         ←
//                     </button>
//                 </div>
//                 <nav className="filter-inputs">
//                     <label htmlFor="distanceInput" className="filter-label">
//                         Max Distance (km)
//                     </label>
//                     <input
//                         type="number"
//                         min="0"
//                         step="0.1"
//                         className="filter-input"
//                         id="distanceInput"
//                         name="distance"
//                         value={filters.distance}
//                         onChange={handleFilterChange}
//                         placeholder="e.g., 5"
//                     />
//                     <label htmlFor="starRatingInput" className="filter-label">
//                         Min Star Rating
//                     </label>
//                     <input
//                         type="number"
//                         min="1"
//                         max="5"
//                         step="1"
//                         className="filter-input"
//                         id="starRatingInput"
//                         name="starRating"
//                         value={filters.starRating}
//                         onChange={handleFilterChange}
//                         placeholder="1 to 5"
//                     />
//                     <label htmlFor="discountInput" className="filter-label">
//                         Min Discount (%)
//                     </label>
//                     <input
//                         type="number"
//                         min="0"
//                         step="1"
//                         className="filter-input"
//                         id="discountInput"
//                         name="discount"
//                         value={filters.discount}
//                         onChange={handleFilterChange}
//                         placeholder="e.g., 10"
//                     />
//                 </nav>
//             </aside>

//             <main className={`main-content ${showFilter ? "with-filter" : ""}`}>
//                 {!showFilter && (
//                     <button
//                         className="show-filter-btn"
//                         aria-label="Show Filters"
//                         onClick={() => setShowFilter(true)}
//                     >
//                         → Filters
//                     </button>
//                 )}

//                 <h1 className="heading">Nearby Stores</h1>

//                 <div className="search-container">
//                     <input
//                         type="search"
//                         className="store-search"
//                         placeholder="Search stores by name or address..."
//                         value={searchText}
//                         onChange={(e) => setSearchText(e.target.value)}
//                         aria-label="Search stores by name or address"
//                     />
//                 </div>

//                 <div className="map-toggle-container">
//                     <button
//                         className="toggle-map-btn"
//                         onClick={toggleView}
//                         aria-label="Show Map"
//                     >
//                         Show Store Map
//                     </button>
//                 </div>

//                 <div className="stores-list">
//                     {stores.length > 0 ? (
//                         stores.map((store) => (
//                             <div key={store.id} className="store-card" aria-live="polite">
//                                 <div className="store-left">
//                                     <img src={store.photo} alt={store.name} className="store-photo" />
//                                     <div className="store-info">
//                                         <h2 className="store-name">{store.name}</h2>
//                                         <div className="rating-section">
//                                             <span className="stars">{getStars(store.rating)}</span>
//                                             <span className="rating-num">{store.rating.toFixed(1)}</span>
//                                         </div>
//                                         <div className="store-address">{store.address}</div>
//                                         <div className="offers">
//                                             {store.offers.map((offer, i) => (
//                                                 <span key={i} className="offer-badge">{offer}</span>
//                                             ))}
//                                         </div>
//                                         <div className="actions">
//                                             <button
//                                                 className="sec-btn"
//                                                 onClick={() => toggleShowProducts(store.id)}
//                                                 aria-expanded={!!showProducts[store.id]}
//                                                 aria-controls={`products-${store.id}`}
//                                             >
//                                                 {showProducts[store.id] ? "Hide Products" : "Show Products"}
//                                             </button>
//                                             <button
//                                                 className="sec-btn"
//                                                 onClick={() => window.open(`https://www.google.com/maps?q=${encodeURIComponent(store.address)}`, "_blank")}
//                                             >
//                                                 View Offers
//                                             </button>
//                                         </div>
//                                         {showProducts[store.id] && (
//                                             <ul id={`products-${store.id}`} className="products-list" aria-label={`${store.name} Full Products`}>
//                                                 {store.products.map(({ name, description, image }, i) => (
//                                                     <li key={i} className="product-item">
//                                                         <img src={image} alt={name} className="product-img" loading="lazy" />
//                                                         <div className="product-text">
//                                                             <h3>{name}</h3>
//                                                             {description && <p>{description}</p>}
//                                                         </div>
//                                                     </li>
//                                                 ))}
//                                             </ul>
//                                         )}
//                                     </div>
//                                 </div>
//                                 <button
//                                     className="map-logo-btn"
//                                     onClick={() => window.open(`https://www.google.com/maps?q=${encodeURIComponent(store.mapQuery)}`, "_blank")}
//                                     title="Open Location in Map"
//                                     aria-label={`Open location for ${store.name} in map`}
//                                 >
//                                     🗺️
//                                 </button>
//                             </div>
//                         ))
//                     ) : (
//                         <div className="no-results">No stores match the selected filters.</div>
//                     )}
//                 </div>
//             </main>

//             <style jsx>{`
//         /* (Same CSS as before, all styles for filter-bar, main content, buttons, store cards, etc.) */
//       `}</style>
//         </div>
//     );
// };

// export default StorePage;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function getStars(rating) {
    return "★".repeat(Math.round(rating)) + "☆".repeat(5 - Math.round(rating));
}

export default function StorePage({ stores, filters, setFilters, searchText, setSearchText }) {
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

    return (
        <div className="page-container">
            <aside className={`filter-bar ${showFilter ? "" : "hidden"}`}>
                {/* Filter inputs (distance, starRating, discount), close button */}
                <div className="filter-header">
                    <h2>Filters</h2>
                    <button className="close-filter-btn" onClick={() => setShowFilter(false)}>←</button>
                </div>
                <nav className="filter-inputs">
                    <label>Max Distance (km)</label>
                    <input type="number" name="distance" value={filters.distance} onChange={handleFilterChange} placeholder="e.g. 5" />
                    <label>Min Star Rating</label>
                    <input type="number" min="1" max="5" step="1" name="starRating" value={filters.starRating} onChange={handleFilterChange} placeholder="1 to 5" />
                    <label>Min Discount (%)</label>
                    <input type="number" min="0" name="discount" value={filters.discount} onChange={handleFilterChange} placeholder="e.g. 10" />
                </nav>
            </aside>

            <main className={`main-content ${showFilter ? "with-filter" : ""}`}>
                {!showFilter && (
                    <button className="show-filter-btn" onClick={() => setShowFilter(true)}>→ Filters</button>
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
                    <button className="toggle-map-btn" onClick={() => navigate("/map")}>
                        Show Store Map
                    </button>
                </div>

                {/* Store list rendering */}
                <div className="stores-list">
                    {stores.length > 0 ? (
                        stores.map((store) => (
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
                                                <span key={i} className="offer-badge">{offer}</span>
                                            ))}
                                        </div>
                                        {/* Additional UI for products, actions, etc. */}
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

            {/* You can add the style block here or import a CSS module */}
        </div>
    );
}
