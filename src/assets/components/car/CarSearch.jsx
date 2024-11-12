import {useState} from "react";
import {api} from "../utils/api.js";

export default function CarSearch({ onSearchResult, allCars }) {
    const [name, setName] = useState("");
    const [brand, setBrand] = useState("");
    const [ownerEmail, setOwnerEmail] = useState("");

    // Handle search functionality
    const handleSearch = async () => {
        const queryParams = {};

        // Only include non-empty fields in the query
        if (name) queryParams.name = name;
        if (brand) queryParams.brand = brand;
        if (ownerEmail) queryParams.ownerEmail = ownerEmail;

        try {
            const response = await api.get("/car/search", { params: queryParams });
            const filteredCars = response.data.data || [];
            onSearchResult(filteredCars); // Pass filtered cars back to parent
        } catch (error) {
            console.error("Failed to fetch cars:", error);
            onSearchResult([]); // Return an empty array if error occurs
        }
    };

    // Handle clear search
    const handleClearSearch = () => {
        setName("");
        setBrand("");
        setOwnerEmail("");
        onSearchResult(allCars); // Reset to full list
    };

    return (
        <div>
            <h5>Search by Car Name, Brand, or Owner Email</h5>
            <div>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Car Name"
                />
            </div>
            <div>
                <input
                    type="text"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    placeholder="Car Brand"
                />
            </div>
            <div>
                <input
                    type="email"
                    value={ownerEmail}
                    onChange={(e) => setOwnerEmail(e.target.value)}
                    placeholder="Owner Email"
                />
            </div>
            <div>
                <button onClick={handleSearch}>Search</button>
                <button onClick={handleClearSearch}>Clear Search</button>
            </div>
        </div>
    );
}