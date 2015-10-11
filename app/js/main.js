(function(){

    var $main = $('.main');
    var size = 32;

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
                    "color": "#414141"
                },
                {
                    "label": "empty",
                    "value": 0,
                    "color": "#ffffff"
                }
            ]
        },
        "labels": {
            "outer": {
                "format": "none"
            },
            "inner": {
                "format": "none"
            }
        },
        "effects": {
            "load": {
                "effect": "none"
            },
            "pullOutSegmentOnClick": {
                "effect": "none"
            },
            "highlightSegmentOnMouseover": false
        },
        "misc": {
            "colors": {
                "segmentStroke": "#000000"
            },
            "canvasPadding": { "top": 0, "right": 0, "bottom": 0, "left": 0 }
        }
    };

    var color = ["#d9d9d9","#969696","#737373","#525252","#000000"];

    var pies = [
        { full: 50, color: color[0] },
        { full: 66, color: color[1] },
        { full: 75, color: color[2] },
        { full: 83, color: color[3] },
        { full: 100, color: color[4] }
    ];


    pies.forEach(function(p, i){

        var $pie = $('<div></div>', { id: 'pie-' + i }).appendTo($main).addClass('pie-container');
        pieChartOptions.data.content[0].value = p.full;
        pieChartOptions.data.content[0].color = p.color;
        pieChartOptions.data.content[1].value = (100 - p.full) || 0.1;
     //   pieChartOptions.misc.colors.segmentStroke = p.color;

        var pieChart = new d3pie('pie-' + i, pieChartOptions);
    });

    d3.select('canvas')
        .attr('width', size)
        .attr('height', size);


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
                a.download = 'pie-chart-' + p.full + '.png';
                a.href = canvasdata;
                a.click();
            }

        });


    });



})()
