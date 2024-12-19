import { Icon } from "leaflet";

export function generateMapIcon(siteType: "portable" | "notPortable", iconColor: "violet" | "gold" | "green" | "red", darkMode: "dark" | "light"): Icon {
    
    // No need for additional checks, TypeScript ensures type safety
    const pngName = `${siteType}-${darkMode === "dark" ? "dark-" : ""}${iconColor}.png`;
    
    return new Icon({
        iconUrl: pngName,
        iconSize: [30, 30], // size of the icon
    });
}
