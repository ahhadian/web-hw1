function displayRes(result) {
    document.getElementById("sha256_result").innerHTML = result;
}
function sendSha256Go(){
    var n1 = document.getElementById("number1").value
    var n2 = document.getElementById("number2").value
    var http = new XMLHttpRequest();
    var params = 'number1=' + n1 + "&number2=" + n2;
    http.open('POST', "/go/sha256/", true);
    http.onreadystatechange = function() {//Call a function when the state changes.
        if(http.readyState == 4){
            if(http.status == 200){
                displayRes(JSON.parse(http.responseText)["sha256"]);
            }else{
                displayRes(http.responseText);
            }
        }
    }
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.send(params);
}
function sendSha256Nodejs(){
    var n1 = document.getElementById("number1").value
    var n2 = document.getElementById("number2").value
    const data = {"number1": n1, "number2": n2}
    fetch("/nodejs/sha256", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        displayRes(data["sha256"])
        console.log('Success:', data);
    })
    .catch((error) => {
        displayRes("An error occured")
        console.error('Error:', error);
    });
  }
function onFetchNode() {
    fetch('/nodejs/write?input=' + document.getElementById("lineNumber").value)
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
    var http = new XMLHttpRequest();
    http.onreadystatechange = function() {
        if(this.readyState == 4){
            if(this.status !== 200){
                console.log('Looks like there was a problem. Status Code: ' + response.status);
                return;
            }
            else{
                document.getElementById("result").innerText = http.responseText;
            }
        }
    }
    http.open("GET", '/go/write?input=' + document.getElementById("lineNumber").value, true);
    http.send();
}