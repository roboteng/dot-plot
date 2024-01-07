function input_button() {
    return document.getElementById("input-button");
}

function source_text() {
    return document.getElementById("source-text").value;
}

input_button().addEventListener("click", (event) => {
    event.preventDefault();
    console.log(source_text());
})