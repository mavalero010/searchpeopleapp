export const calculateDistance = (
  latitude1,
  longitude1,
  latitude2,
  longitude2
) => {
  const earthRadius = 6371; // Earth's radius in kilometers

  // Convert latitudes and longitudes from degrees to radians
  const lat1Rad = (latitude1 * Math.PI) / 180;
  const lon1Rad = (longitude1 * Math.PI) / 180;
  const lat2Rad = (latitude2 * Math.PI) / 180;
  const lon2Rad = (longitude2 * Math.PI) / 180;

  // Calculate the differences between latitudes and longitudes
  const latDiff = lat2Rad - lat1Rad;
  const lonDiff = lon2Rad - lon1Rad;

  // Calculate the central angle using the haversine formula
  const a =
    Math.sin(latDiff / 2) ** 2 +
    Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(lonDiff / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Calculate the distance using the spherical law of cosines
  const distance = earthRadius * c;

  return distance;
};
