export default function loadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        if (img.naturalWidth && img.naturalHeight && img.complete) {
            resolve(img);
        } else {
            img.onload = () => {
                resolve(img);
            };
            img.onerror = () => {
                reject(url);
            };
        }
    });
}
