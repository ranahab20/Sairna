function Map({ origin, destination }) {
  // Default route for the main homepage: Aleppo → Damascus
  const defaultOrigin = {
    name: "حلب",
    latitude: 36.2021,
    longitude: 37.1343,
  };

  const defaultDestination = {
    name: "دمشق",
    latitude: 33.5138,
    longitude: 36.2765,
  };

  // Use provided locations or default locations
  const start = origin ?? defaultOrigin;
  const end = destination ?? defaultDestination;

  // Check coordinates
  if (
    start.latitude == null ||
    start.longitude == null ||
    end.latitude == null ||
    end.longitude == null
  ) {
    return (
      <div className="flex min-h-[500px] items-center justify-center rounded-[18px] bg-slate-100 text-muted">
        بيانات الموقع غير متاحة
      </div>
    );
  }

  const mapUrl = `https://maps.google.com/maps?saddr=${start.latitude},${start.longitude}&daddr=${end.latitude},${end.longitude}&z=7&output=embed`;

  const directionsUrl = `https://www.google.com/maps/dir/?api=1&origin=${start.latitude},${start.longitude}&destination=${end.latitude},${end.longitude}&travelmode=driving`;

  return (
    <div className="relative h-full min-h-[500px] w-full overflow-hidden rounded-[18px] ltr">
      <iframe
        title="Google Maps route"
        src={mapUrl}
        className="absolute inset-0 h-full w-full border-0"
        loading="lazy"
        allowFullScreen
      />

      {/* Map label */}
      <div className="absolute right-4 top-4 z-10 flex items-center gap-2 rounded-xl bg-white px-4 py-3 shadow-md">
        <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-primary" />

        <span className="text-xs font-bold text-text">خريطة تفاعلية</span>
      </div>

      {/* Google Maps directions */}
      <a
        href={directionsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-4 right-4 z-10 rounded-lg bg-white px-4 py-2 text-xs font-bold text-[#0c5962] shadow-md"
      >
        فتح المسار في Google Maps ↗
      </a>
    </div>
  );
}

export default Map;
