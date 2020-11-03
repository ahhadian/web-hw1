var origin = "http://127.0.0.1/";
function displayRes(result) {
    document.getElementById("sha256_result").innerHTML = result;
}
function sendSha256Go(go_or_node) {
    var n1 = document.getElementById("number1").value
    var n2 = document.getElementById("number2").value
    var http = new XMLHttpRequest();
    var params = 'number1=' + n1 + "&number2=" + n2;
    http.open('POST', origin + go_or_node + "/sha256/", true);
    if (go_or_node === "go") {
        http.onreadystatechange = function () {//Call a function when the state changes.
            if (http.readyState == 4 && http.status == 200) {
                displayRes(http.responseText);
            }
        }
        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        http.send(params);
    }
}
function sendSha256Nodejs() {
    var n1 = document.getElementById("number1").value
    var n2 = document.getElementById("number2").value
    const data = { "number1": n1, "number2": n2 }
    fetch(origin + "nodejs/sha256", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(data => {
            displayRes(response)
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}
function onFetchNode() {
    fetch(origin + 'nodejs/write?input=' + document.getElementById("lineNumber").value)
        .then(res => {
            if (res.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' + response.status);
                return;
            }
            return res.text();
        })
        .then(body => {
            let ans = document.getElementById("result");
            ans.innerText = body;
        });
}
function onFetchGo() {
    fetch(origin + 'go/write?input=' + document.getElementById("lineNumber").value)
        .then(res => {
            console.log("here")
            if (res.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' + response.status);
                return;
            }
            return res.text();
        })
        .then(body => {
            let ans = document.getElementById("result");
            ans.innerText = body;
        });
}