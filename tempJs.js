function getInput() {
    const arr = [];
    var text = $('.arrayInput').val();
    console.log(text);
    text = text.replace(/,/g, ' ');
    text = text.replace(/  /g, " ");
    let value = "";
    let k = 0;
    for (var i = 0; i < text.length; i++) {
        if (text[i] == ' ') {
            arr[k++] = parseInt(value);
            value = "";
        } else {
            value += text[i];
        }
    }
    arr[k++] = parseInt(value);
    console.log(arr);
    return arr;
}

function SortArray() {
    var arr = getInput();
    arr.sort(function(a, b) {
        return a - b;
    });
    var text = "";
    for (var i = 0; i < arr.length; i++) {
        text += arr[i] + ', ';
    }
    
    document.getElementById('demo').innerHTML += "<br>" + text;
}