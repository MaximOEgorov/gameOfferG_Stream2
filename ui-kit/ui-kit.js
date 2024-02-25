export function Image(src, listeners = {click: () =>{}}) {
    const image = document.createElement('img');
    image.src = src;

    Object.keys(listeners).forEach(key => {
        image.addEventListener(key, listeners[key]);
    });

    return image;
}
