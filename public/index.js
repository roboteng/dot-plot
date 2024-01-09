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

function highlight_selection(source, index, len = 1) {
    return source.slice(0, index) +
        "<span>" + source.slice(index, index + len) +
        "</span>" + source.slice(index + len);
}

input_button().addEventListener("click", (event) => {
    event.preventDefault();

    const source = source_text();
    for (let node of document.getElementsByClassName("output")) {
        node.textContent = source;
    }

    generate_dot_plot(source);
})

output_image().addEventListener("mousemove", (event) => {
    let source = source_text()
    const { width, height } = output_image();
    const x = Math.floor(event.offsetX / width * source.length);
    const y = Math.floor(event.offsetY / height * source.length);
    let [left, right] = document.getElementsByClassName("output");

    left.innerHTML = highlight_selection(source, x);
    right.innerHTML = highlight_selection(source, y);
});
