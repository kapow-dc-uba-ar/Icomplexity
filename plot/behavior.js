var datasets = [];
$(document).ready(function(){
	$("#submit").click(function(){
		var s = $("#str").val();
		if (s.length > 0){
			plotData(s);
		}
	});
	
	$("#clear").click(function(){
		$("#str").val('');
		$("#plot,#legend").html('');
	});
});

function drawPlot(){
	var data = [];

    $("#choices input:checked").each(function () {
        var key = $(this).attr("name");
        if (key && datasets[key])
            data.push(datasets[key]);
    });

	var options = {
		series: { lines: { show: true }, points: { show: true } },
		yaxis: { min: 0, tickDecimals: 0 },
        xaxis: { tickDecimals: 0 },
        legend: { position: 'nw' }
	};
	
	$.plot("#plot", data, options);
}

function plotData(s){
	var vars = allVars(s, 3);

	//Build datasets
	datasets = {
		b:  buildSeries(vars.b, "B_s"),
		o:  buildSeries(vars.o, "O_s"),
		d:  buildSeries(vars.d, "D_s"),
		eb: buildSeries(vars.eb, "EB_s"),
		eo: buildSeries(vars.eo, "EO_s")
	};
	
	//Hardcode colors
    var i = 0;
    $.each(datasets, function(key, val) {
        val.color = i;
        ++i;
    });
	
	// Insert checkboxes 
	$("#choices").html('');
    $.each(datasets, function(key, val) {
        $("#choices").append('<li><input type="checkbox" name="' + key +
                               '" checked="checked" id="id' + key + '">' +
                               '<label for="id' + key + '">'
                                + val.label + '</label></li>');
    });
	
	$("#choices input").click(drawPlot);
	drawPlot();
}

function buildSeries(data, label){
	r = [];
	for(var i=0;i<data.length;i++) r.push([i, data[i]]);

	return series = {
		data: r,
		label: label
	};
}
