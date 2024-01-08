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

function generate_dot_plot(text) {
    const len = text.length;
    const white = "rgb(255,255,255)";
    const black = "rgb(0,0,0)";
    create_image(output_image(), len, len, (x, y) => {
        if (text[x] == text[y]) {
            return black;
        } else {
            return white;
        }
    });
}

input_button().addEventListener("click", (event) => {
    event.preventDefault();

    const source = source_text();
    for (let node of document.getElementsByClassName("output")) {
        node.textContent = source;
    }

    generate_dot_plot(source);
})