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
        console.log(11)
        })
}); 

$('#view_samples').hover(function () {
    ajax_get(generate_samples["view_samples_url"], null,
        function (data) {
            console.log(111)
        })
})
