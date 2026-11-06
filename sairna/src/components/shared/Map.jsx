function Map() {
  return (
    <div className="relative w-full aspect-[4/3] rounded-[18px] overflow-hidden ltr">
      <iframe
        title="Google Maps route"
        src="https://maps.google.com/maps?q=34.85795%2C36.70540&z=7&output=embed"
        className="absolute inset-0 w-full h-full border-0"
        loading="lazy"
        allowFullScreen
      />

      <a
        href="https://www.google.com/maps/dir/?api=1&origin=Aleppo,Syria&destination=Damascus,Syria&travelmode=driving"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-3 right-3 z-10 bg-white rounded-lg text-[#0c5962] py-2 px-3 font-extrabold text-[11px] no-underline shadow-md"
      >
        فتح المسار في Google Maps ↗
      </a>
    </div>
  );
}

export default Map;
