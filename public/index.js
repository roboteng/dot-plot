function find(id) {
    return () => {
        return document.getElementById(id);
    }
}

const input_button = find("input-button");

const source_text = () => find("source-text")().value;

const output_image = find("output-image");

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


function make_index_map(source, ignore_symbols = []) {
    let indexes = make_indexes(source);
    return indexes.filter(({ char }) => {
        return !ignore_symbols.includes(char)
    })
}

function make_indexes(source) {
    let indexes = [];
    let index = 0;
    for (let char of source) {
        indexes.push({ char, index });
        index++;
    }
    return indexes;
}

(() => {
    let source;
    let chars;
    let index_map;
    const chars_to_skip = [" ", "\n", ","];

    input_button().addEventListener("click", (event) => {
        event.preventDefault();

        source = source_text();

        for (let node of document.getElementsByClassName("output")) {
            node.textContent = source;
        }

        index_map = make_index_map(source, chars_to_skip);
        chars = Array.from(source).filter((a) => !chars_to_skip.includes(a)).join("");

        generate_dot_plot(chars);
    })

    output_image().addEventListener("mousemove", (event) => {
        const { width, height } = output_image();
        const x = Math.floor(event.offsetX / width * chars.length);
        const y = Math.floor(event.offsetY / height * chars.length);
        let [left, right] = document.getElementsByClassName("output");

        left.innerHTML = highlight_selection(source, index_map[x].index);
        right.innerHTML = highlight_selection(source, index_map[y].index);
    });
})()

if (window.location.origin.includes("localhost")) {
    function assert(expected, actual, message = "") {
        if (expected != actual) {
            console.error(`Expected\n${expected}\nbut got\n${actual}\n${message}`);
            console.trace();
        }
    }
}
