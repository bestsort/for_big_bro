
let domain = "http://47.95.238.136:5000";
//domain = "localhost"

let default_val = {
    "hight" : 100,
    "weight" : 50,
    "count" : 10,
    "_format" : "jpg"
}
let generate_samples = {
    "generate_samples_url":"",
    "download_samples_url":"/download",
    "submit_identification" : "/index.html"
}


function getUrl(key) {
    return domain + generate_samples[key];
}
function getUrlWithoutDomain(key) {
    return generate_samples[key]
}

function download(url)
{
    var a = document.createElement('a');
    a.href = url;
    a.target = "_blank"
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
//下载文件的地址
}
