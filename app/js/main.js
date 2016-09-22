(function(){

    var $main = $('.main');
    var size = 14;

    var pieOptions = {
        size: { pieOuterRadius: '100%', canvasHeight: '14', canvasWidth: '14' },
        effects: {
            load: { effect: "none" },
            pullOutSegmentOnClick: { effect: 'none', speed: 0, size: 0 },
            highlightSegmentOnMouseover: false
        },
        labels: {
            inner: { format: '' },
            lines: { enabled: false}
        },
        data: {
            content: [
                { label: 'full', value: 0, color: '#65BA20' },
                { label: 'empty', value: 0, color: '#fafafa' },
            ]
        },
        misc: {
            colors: { segmentStroke: '#65a620' },
            canvasPadding: { top: 1, right: 1, bottom: 1, left: 1 },
            gradient: { enabled: true, percentage: 100, color: "#888" },
        }
    };
    
    
    var pieChartOptions = {
        "header": {
            "title": {
                "fontSize": 24,
                "font": "open sans"
            },
            "subtitle": {
                "color": "#999999",
                "fontSize": 12,
                "font": "open sans"
            },
            "titleSubtitlePadding": 9
        },
        "size": {
            "canvasHeight": size,
            "canvasWidth": size,
            "pieOuterRadius": "90%"
        },
        "data": {
            "sortOrder": "value-asc",
            "content": [
                {
                    "label": "full",
                    "value": 0,
                    "color": "#65BA20"
                },
                {
                    "label": "empty",
                    "value": 0,
                    "color": "#fafafa"
                }
            ]
        },
        "labels": {
            "outer": { "format": "none" },
            "inner": { "format": "none" }
        },
        "effects": { 
            "load": { "effect": "none" },
            "pullOutSegmentOnClick": { "effect": "none" },
            "highlightSegmentOnMouseover": false
        },
        "misc": {
            "colors": { "segmentStroke": '#65a620' },
            "canvasPadding": { "top": 0, "right": 0, "bottom": 0, "left": 0 }
        }
    };

    var color = ["#d9d9d9","#969696","#737373","#525252","#000000"];

//    var pies = [
//        { full: 50, color: color[0] },
//        { full: 66, color: color[1] },
//        { full: 75, color: color[2] },
//        { full: 83, color: color[3] },
//        { full: 100, color: color[4] }
//    ];

    
    var pies = [0,5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100];    

    pies.forEach(function(p, i){

        var $pie = $('<div></div>', { id: 'pie-' + i }).appendTo($main).addClass('pie-container');
//        pieChartOptions.data.content[0].value = p.full;
//        pieChartOptions.data.content[0].color = p.color;
//        pieChartOptions.data.content[1].value = (100 - p.full) || 0.1;
//        var pieChart = new d3pie('pie-' + i, pieChartOptions);
        
        pieOptions.data.content[0].value = p || 0.1;
        pieOptions.data.content[1].value = (100-p) || 0.1;
        var pieChart = new d3pie('pie-' + i, pieOptions);
    });

    d3.select('canvas')
        .attr('width', size+2)
        .attr('height', size+2);


    $("#save").on("click", function(){

        pies.forEach(function(p, i){
            var html = d3.select('#pie-' + i).select("svg")
                .attr("version", 1.1)
                .attr("xmlns", "http://www.w3.org/2000/svg")
                .node().parentNode.innerHTML;

            var imgsrc = 'data:image/svg+xml;base64,'+ btoa(html);
            var img = '<img src="'+imgsrc+'">';
            d3.select("#svgdataurl").html(img);

            var canvas = document.querySelector("canvas"),
                context = canvas.getContext("2d");

            var image = new Image;
            image.src = imgsrc;
            image.onload = function() {
                context.drawImage(image, 0, 0);

                var canvasdata = canvas.toDataURL("image/png");

                var pngimg = '<img src="'+canvasdata+'">';
                d3.select("#pngdataurl").html(pngimg);

                var a = document.createElement("a");
//                a.download = 'pie-chart-' + p.full + '.png';
                a.download = 'pie-chart-' + p + '.png';
                a.href = canvasdata;
                a.click();
            }

        });


    });



})()

