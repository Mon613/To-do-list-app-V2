import axios from "axios";

const LOCATION_API_URL = "https://nominatim.openstreetmap.org/reverse";

export const fetchLocationName = async (latitude: number | null, longitude: number | null): Promise<string> => {
    try {

        const { data } = await axios.get(
            LOCATION_API_URL,
            { params: { lat: latitude, lon: longitude, format: "json" } }
        );
        return data.address.city || "Không xác định";
    } catch (e) {
        console.log("Error: ", e);
        return "Error";
    }
}