$('#generate_samples').click(function () {
    let hight = $('#generator_samples_high').val();
    let weight = $('#generator_samples_wight').val();
    let count = $('#generator_samples_count').val();
    let _format = $('#generator_samples_format').val();
    let fdefault;

    if (hight === "") {
        hight = default_val["hight"];
        fdefault = true;
    }
    if (weight === "") {
        weight = default_val["weight"];
        fdefault = true;
    }
    if (count === "") {
        count = default_val["count"];
        fdefault = true;
    }
    if (_format === "") {
        _format = default_val["_format"];
    }
    let url = getUrl("download_samples_url")
        + "?high=" + hight
        + "&width=" + weight
        + "&count=" + count
        + "&fault=" + fdefault
        + "&format=" + _format;
    download(url)
});

$('#view_samples').hover(function () {
    ajax_get(getUrl("view_samples_url"), null,
        function (data) {
            console.log(111)
        })
})

$('#submitIdentification').click(function () {
    var dataObject = new FormData();
    let url=getUrl("submit_identification");
    let  file = $("#submitIdentificationFile")[0].files[0];

    dataObject.append("file", file);
    let xhr = new XMLHttpRequest();

    xhr.open("post", getUrl("submit_identification"), true);

    // xhr.onload = function () {
    //
    //     alert("上传完成!");
    //
    // };

    xhr.send(dataObject);
})
