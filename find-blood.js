function initMap() {
  const center = { lat: 17.3850, lng: 78.4867 };

  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 11,
    center: center
  });

  document.querySelectorAll(".card").forEach(card => {
    const lat = parseFloat(card.dataset.lat);
    const lng = parseFloat(card.dataset.lng);

    new google.maps.Marker({
      position: { lat, lng },
      map: map
    });
  });
}
