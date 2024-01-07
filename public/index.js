function input_button() {
    return document.getElementById("input-button");
}

function source_text() {
    return document.getElementById("source-text").value;
}

function output_image() {
    return document.getElementById("output-image");
}

function create_image(imgElement, width, height, colorFunction) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');

    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            ctx.fillStyle = colorFunction(x, y);
            ctx.fillRect(x, y, 1, 1);
        }
    }

    imgElement.src = canvas.toDataURL();
}

input_button().addEventListener("click", (event) => {
    event.preventDefault();
    console.log(source_text());
    create_image(output_image(), 255, 255, (x, y) => {
        return `rgb(${x}, ${y}, 127)`;
    });
})