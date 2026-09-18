import React, { useState } from "react";
import StorePage from "./StorePage";
import StoreMap from "./StoreMap";


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



export default function StoresApp() {
    const [filters, setFilters] = useState({
        distance: "",
        starRating: "",
        discount: "",
    });
    const [searchText, setSearchText] = useState("");
    const [showMap, setShowMap] = useState(false);

    // Filtering logic shared by both components
    const filteredStores = stores.filter((store) => {
        const matchesSearch =
            store.name.toLowerCase().includes(searchText.toLowerCase()) ||
            store.address.toLowerCase().includes(searchText.toLowerCase());

        if (!matchesSearch) return false;

        if (filters.distance !== "" && store.distance > Number(filters.distance))
            return false;
        if (filters.starRating !== "" && Math.round(store.rating) < Number(filters.starRating))
            return false;
        if (filters.discount !== "" && store.discount < Number(filters.discount))
            return false;

        return true;
    });

    const toggleView = () => setShowMap((prev) => !prev);

    return (
        <>
            {!showMap ? (
                <StorePage
                    filters={filters}
                    setFilters={setFilters}
                    searchText={searchText}
                    setSearchText={setSearchText}
                    stores={filteredStores}
                    toggleView={toggleView}
                />
            ) : (
                <StoreMap
                    stores={filteredStores}
                    toggleView={toggleView}
                />
            )}
            <style jsx global>{`
        body {
          margin: 0;
          font-family: "Segoe UI", Arial, sans-serif;
          background: #232323;
          color: #e4e4e7;
        }
        button {
          font-family: "Segoe UI", Arial, sans-serif;
        }
        // Include any shared styles you'd like here
      `}</style>
        </>
    );
}
