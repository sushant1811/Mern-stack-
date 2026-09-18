import React, { useState } from "react";
import "../styling/ProductPage.css";
import products from "../data/product";
import { MdSearch, MdMic, MdCameraAlt, MdLocationOn, MdStar } from "react-icons/md";
import { FaArrowRight, FaGlobe, FaExchangeAlt } from "react-icons/fa";

function ProductPage() {
  const [radius, setRadius] = useState(3);
  const [price, setPrice] = useState(50);
  const [rating, setRating] = useState(3);
  const [inStock, setInStock] = useState(true);
  const [delivery, setDelivery] = useState(false);
  const [pickup, setPickup] = useState(false);
  const [paymentOption, setPaymentOption] = useState("Any");
  const [sustainability, setSustainability] = useState("Any");
  const [searchText, setSearchText] = useState("");

  return (
    <div className="productpage-root">
      {/* Filters Sidebar */}
      <aside className="filter-panel">
        <h2 className="filter-title">Filters</h2>
        <div className="filter-group">
          <label className="filter-label">
            Radius
            <input
              type="range"
              min="1"
              max="10"
              value={radius}
              onChange={e => setRadius(Number(e.target.value))}
              className="slider"
            />
            <span className="filter-value">{radius} km</span>
          </label>
          <label className="filter-label">
            Price
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={price}
              onChange={e => setPrice(Number(e.target.value))}
              className="slider"
            />
            <span className="filter-value">${price}</span>
          </label>
          <label className="filter-label">
            Rating
            <input
              type="range"
              min="1"
              max="5"
              step="0.1"
              value={rating}
              onChange={e => setRating(Number(e.target.value))}
              className="slider"
            />
            <span className="filter-value">{rating} ★</span>
          </label>
        </div>
        <div className="filter-checkbox-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={inStock}
              onChange={() => setInStock(!inStock)}
            />
            <span className="checkbox-custom" />
            In Stock
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={delivery}
              onChange={() => setDelivery(!delivery)}
            />
            <span className="checkbox-custom" />
            Delivery
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={pickup}
              onChange={() => setPickup(!pickup)}
            />
            <span className="checkbox-custom" />
            Pickup Available
          </label>
        </div>
        <div className="filter-dropdown-group">
          <label className="dropdown-label">
            Payment Option
            <select
              value={paymentOption}
              onChange={e => setPaymentOption(e.target.value)}
              className="custom-dropdown"
            >
              <option value="Any">Any</option>
              <option value="Cash">Cash</option>
              <option value="Card">Card</option>
              <option value="UPI">UPI</option>
              <option value="Wallet">Wallet</option>
              <option value="Pay-on-Delivery">Pay-on-Delivery</option>
            </select>
          </label>
          <label className="dropdown-label">
            Sustainability / Origin
            <select
              value={sustainability}
              onChange={e => setSustainability(e.target.value)}
              className="custom-dropdown"
            >
              <option value="Any">Any</option>
              <option value="Eco-friendly">Eco-friendly</option>
              <option value="Local">Locally produced</option>
              <option value="Fairtrade">Fairtrade</option>
            </select>
          </label>
        </div>
      </aside>

      {/* Main Section */}
      <main className="product-list-main">
        {/* Header/Searchbar unchanged */}
        <div className="header-searchbar-section">
          <div className="product-header-row">
            <span className="product-logo-title">LocalLync</span>
            <div className="header-controls">
              <span className="header-icon-group">
                <FaGlobe className="header-icon" />
                <span className="header-label">English</span>
              </span>
              <span className="header-icon-group">
                <FaExchangeAlt className="header-icon" />
                <span className="header-label">USD</span>
              </span>
            </div>
          </div>
          <div className="three-line-searchbar-wrap">
            <textarea
              className="three-line-searchbar"
              placeholder="describe any changes to your product"
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              rows={2}
              maxLength={240}
            />
            <div className="searchbar-actions">
              <button className="header-searchbar-btn" title="Go">
                <FaArrowRight size={22} />
              </button>
              <button className="header-searchbar-btn bordered" title="Microphone">
                <MdMic size={22} />
              </button>
              <button className="header-searchbar-btn bordered" title="Camera">
                <MdCameraAlt size={22} />
              </button>
              <button className="header-searchbar-btn bordered" title="Search">
                <MdSearch size={22} />
              </button>
            </div>
          </div>
        </div>
        {/* Product cards in scrollable space */}
        <div className="products-section-scroll">
          <div className="products-section-list">
            {products.map(product => (
              <div className="product-card" key={product.id}>
                {/* Left: Main Product Info (85%) */}
                <div className="product-card-main">
                  <div className="product-thumbnail">
                    <img src={product.image} alt="Product" className="product-img" />
                    <div className="product-company">Company: {product.company}</div>
                  </div>
                  <div className="product-card-details">
                    <div className="product-card-title">{product.name}</div>
                    <div className="product-card-shop">{product.shop}</div>
                    <div className="product-card-meta">
                      <MdLocationOn style={{ color:"#23c9e2", verticalAlign:"middle" }}/>
                      <span>{product.distance}km</span>
                    </div>
                    <div className="product-card-rating">
                      {Array.from({length: Math.floor(product.rating)}, (_, i) => (
                        <MdStar key={i} style={{ color: "#ffc93c", verticalAlign: "middle" }} />
                      ))}
                      <span className="product-rating-value">{product.rating}</span>
                    </div>
                  </div>
                </div>
                {/* Right: Cart Control & Map (vertical, as per new layout) */}
                <div className="product-card-action-map">
                  <div className="product-card-actions">
                    <button className="buy-btn">BUY</button>
                    <button className="cart-btn">ADD TO CART</button>
                  </div>
                  <div className="maps-btn">
  <img src="https://cdn-icons-png.flaticon.com/512/2875/2875433.png" alt="Maps" />
</div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProductPage;
