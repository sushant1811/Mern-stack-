import React from "react";
import "./Dash.css";
// Card Component for Dashboard Metrics
const MetricCard = ({ title, value, subtitle, highlight, icon }) => (
    <div className="metric-card">
        <div className="metric-title">{title}</div>
        <div className="metric-value" style={highlight ? { color: "#0ca2df" } : {}}>
            {value}
        </div>
        {icon && <span className="metric-icon">{icon}</span>}
        {subtitle && <div className="metric-subtitle">{subtitle}</div>}
    </div>
);

// Weekly Sales Trend Mockup Chart
const WeeklySalesTrend = () => (
    <div className="dashboard-card">
        <div className="dashboard-card-title">Weekly Sales Trend</div>
        <div className="dashboard-card-content">
            <svg width="100%" height="160" viewBox="0 0 420 160">
                {/* Y-axis labels */}
                <text x="0" y="20" fontSize="12" fill="#777">4000</text>
                <text x="0" y="60" fontSize="12" fill="#777">3000</text>
                <text x="0" y="100" fontSize="12" fill="#777">2000</text>
                <text x="0" y="140" fontSize="12" fill="#777">1000</text>
                {/* Trend line */}
                <polyline
                    fill="none"
                    stroke="#0ca2df"
                    strokeWidth="3"
                    points="40,30 110,60 180,90 250,85 320,95 390,35"
                />
                {/* Dots */}
                {[
                    [40, 30], [110, 60], [180, 90], [250, 85], [320, 95], [390, 35]
                ].map(([x, y], idx) => (
                    <circle key={idx} cx={x} cy={y} r="6" fill="#fff" stroke="#0ca2df" strokeWidth="2" />
                ))}
                {/* X-axis labels */}
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, idx) => (
                    <text x={40 + idx * 60} y={155} fontSize="13" fill="#adb5bd" textAnchor="middle" key={day}>{day}</text>
                ))}
            </svg>
        </div>
    </div>
);

// Top Selling Items Mockup Bar Chart
const TopSellingItems = () => (
    <div className="dashboard-card">
        <div className="dashboard-card-title">Top Selling Items</div>
        <div className="dashboard-card-content top-selling-chart">
            {[
                { label: "Sourdough", value: 150 },
                { label: "Headphones", value: 110 },
                { label: "Avocados", value: 95 },
                { label: "Coffee Beans", value: 78 },
                { label: "LED Bulbs", value: 67 },
            ].map((item, idx) => (
                <div className="bar-row" key={item.label}>
                    <span className="item-label">{item.label}</span>
                    <div className="item-bar-bg">
                        <div
                            className="item-bar"
                            style={{ width: `${item.value}px`, background: "#ff42a7" }}
                        />
                    </div>
                    <span className="item-value">{item.value}</span>
                </div>
            ))}
        </div>
    </div>
);

const Dashboard = () => (
    <div className="dashboard-container">
        <div className="dashboard-header">
            <h2>Merchant Dashboard</h2>
        </div>
        <div className="metrics-row">
            <MetricCard
                title="Last Week's Sales"
                value="$17,420"
                subtitle="+5.2% from previous week"
                highlight
            />
            <MetricCard
                title="Hot Item"
                value="Sourdough Bread"
                subtitle="150 units sold"
                highlight
            />
            <MetricCard
                title="Avg. Customer Rating"
                value={<span>4.8 <span role="img" aria-label="star">⭐</span></span>}
            />
            <MetricCard
                title="New Customers"
                value="82"
                subtitle="This week"
                highlight
            />
        </div>
        <div className="charts-row">
            <WeeklySalesTrend />
            <TopSellingItems />
        </div>
        <div className="other-row">
            <div className="dashboard-card" style={{ flex: "1" }}>
                <div className="dashboard-card-title">Area Demand Heatmap</div>
                <div className="dashboard-card-content">
                    <span style={{ color: "#adb5bd", fontSize: "0.99rem" }}>Demand score based on searches in local areas.</span>
                </div>
            </div>
            <div className="dashboard-card" style={{ flex: "1" }}>
                <div className="dashboard-card-title">Automated Marketing Tools</div>
                <div className="dashboard-card-content">
                    <span style={{ color: "#adb5bd", fontSize: "0.99rem" }}>Email Campaign (Mockup)</span>
                </div>
            </div>
        </div>
        {/* CSS - Dark theme and dashboard card styling */}

    </div>
);

export default Dashboard;
