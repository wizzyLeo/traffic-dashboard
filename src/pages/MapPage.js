import MapSection from "@/components/MapSection"
import SearchSection from "@/components/SearchSection"


const MapPage = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 p-12 gap-5">
        <SearchSection/>
        <MapSection className="overflow-hidden rounded-md">
            
        </MapSection>
    </div>
  )
}

export default MapPage