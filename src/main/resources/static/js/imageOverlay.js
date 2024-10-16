class PolygonImageOverlay extends google.maps.OverlayView {
    constructor(polygon, imageUrl) {
        super();
        this.polygon = polygon;
        this.imageUrl = imageUrl;
        this.div = null;
        this.setMap(polygon.getMap());
    }

    onAdd() {
        this.div = document.createElement('div');
        this.div.style.position = 'absolute';

        const img = document.createElement('img');
        img.src = this.imageUrl;
        img.className = 'overlay-img';

        this.div.appendChild(img);
        const panes = this.getPanes();
        panes.overlayLayer.appendChild(this.div);
    }

    draw() {
        const overlayProjection = this.getProjection();
        const path = this.polygon.getPath();
        const bounds = new google.maps.LatLngBounds();

        path.forEach(latLng => bounds.extend(latLng));

        const sw = overlayProjection.fromLatLngToDivPixel(bounds.getSouthWest());
        const ne = overlayProjection.fromLatLngToDivPixel(bounds.getNorthEast());

        this.div.style.left = `${sw.x}px`;
        this.div.style.top = `${ne.y}px`;
        this.div.style.width = `${ne.x - sw.x}px`;
        this.div.style.height = `${sw.y - ne.y}px`;

        const img = this.div.querySelector('img');

        // 이미지 크기를 변경하려면 아래에서 조정
        const imageScale = 1.5; // 이미지 크기 비율 (1.5배 크기로 설정)

        img.style.width = `${(ne.x - sw.x) * imageScale}px`;
        img.style.height = `${(sw.y - ne.y) * imageScale}px`;

        // 클립 경로(clip-path) 설정
        const clipPath = path.getArray().map(latLng => {
            const point = overlayProjection.fromLatLngToDivPixel(latLng);
            return `${point.x - sw.x}px ${point.y - ne.y}px`;
        }).join(',');

        img.style.clipPath = `polygon(${clipPath})`;
    }

    onRemove() {
        if (this.div) {
            this.div.parentNode.removeChild(this.div);
            this.div = null;
        }
    }
}

// 다른 JavaScript 파일에서 접근할 수 있도록 export
export { PolygonImageOverlay };


