export async function reverseGeocodeApi( long: number, lat: number ) {
    try {
        const res = await fetch(`
        https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${long}&format=json`
        );

        const data = await res.json();

        const fullAddress = data.display_name;
        return fullAddress;
    } catch (error) {
        console.log(`Error in reverseGeocodeApi: ${error}`);
        return "Unable to provide location right now.";
    }
}