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

output_image().addEventListener("mousemove", (event) => {
    const { width, height } = output_image();
    const x = Math.floor(event.offsetX / width * source_text().length);
    const y = Math.floor(event.offsetY / height * source_text().length);
    let [left, right] = document.getElementsByClassName("output");

    const left_content = source_text().slice(0, x) + "<span>" + source_text().slice(x, x + 1) + "</span>" + source_text().slice(x + 1)

    const right_content = source_text().slice(0, y) + "<span>" + source_text().slice(y, y + 1) + "</span>" + source_text().slice(y + 1)

    left.innerHTML = left_content;
    right.innerHTML = right_content;
});
