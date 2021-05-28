$('#generate_samples').click(function () {
    let hight = $('generator_samples_high').val();
    let weight = $('generator_samples_wight').val();
    let count = $('generator_samples_count').val();
    ajax_post(generate_samples["generate_samples_url"],
        {
            "high" : hight,
            "weight" : weight,
            "count" : count
        }
    );
    οnclick=window.location.href=generate_samples["download_samples_url"]
    ajax_get(generate_samples["download_samples_url"],
        function (data) {
        })
});

$('#view_samples').hover(function () {
    ajax_get(generate_samples["view_samples_url"], null,
        function (data) {
            console.log(111)
        })
})

$('#submitIdentification').click(function () {
    var dataObject = new FormData();
    let url=generate_samples["submit_identification"];
    let  file = $("#submitIdentificationFile")[0].files[0];

    dataObject.append("file", file);
    let xhr = new XMLHttpRequest();

    xhr.open("post", generate_samples["submit_identification"], true);

    // xhr.onload = function () {
    //
    //     alert("上传完成!");
    //
    // };

    xhr.send(dataObject);
})
