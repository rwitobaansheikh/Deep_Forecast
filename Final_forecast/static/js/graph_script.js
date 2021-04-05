function graphelement(ctx,d,l,lab){
    ctx.linecap='round';
    Chart.defaults.global.defaultFontColor='Black'
    Chart.defaults.global.defaultFontFamily='Arial'
    if (d.length==3){
        var dataFirst = {
            label: lab[0],
            data: d[0],
            lineTension: 0,
            fill: false,
            borderColor: 'rgba(255,102,102,1)',
            backgroundColor: 'rgba(255,102,102,1)',
            pointRadius: 5
        };

        var dataSecond = {
            label: lab[1],
            data: d[1],
            lineTension: 0,
            fill: false,
            borderColor: 'rgba(178,102,255,1)',
            backgroundColor: 'rgba(178,102,255,1)',
            pointRadius: 5
        };

        var dataThird = {
            label: lab[2],
            data: d[2],
            lineTension: 0,
            fill: false,
            borderColor: 'rgba(255,255,102,1)',
            backgroundColor: 'rgba(255,255,102,1)',
            pointRadius: 5
        };

        var Data = {
        labels: l,
        datasets: [dataFirst, dataSecond, dataThird]
        };

        var chartOptions = {
            legend: {
                display: true,
                position: 'top',
                labels: {
                boxWidth: 40,
                fontColor: 'Black',
                fontSize: 18
            },
            scales: {
                y: {
                    beginAtZero: true,
                   }
            },
            responsive: false,
        }
        };

        var lineChart = new Chart(ctx, {
        type: 'line',
        data: Data,
        options: chartOptions
        });   
    }
    else {
        var dataFirst = {
            label: lab,
            data: d[0],
            lineTension: 0,
            fill: false,
            borderColor: 'rgba(178,102,255,1)',
            backgroundColor: 'rgba(178,102,255,1)',
            pointRadius: 5
        };

        var Data = {
        labels: l,
        datasets: [dataFirst]
        };

        var chartOptions = {
            legend: {
                display: true,
                position: 'top',
                labels: {
                boxWidth: 40,
                fontColor: 'Black',
                fontSize: 18
            },
            scales: {
                y: {
                    beginAtZero: true,
                   }
            },
            responsive: false,
        }
        };

        var lineChart = new Chart(ctx, {
        type: 'line',
        data: Data,
        options: chartOptions
        });
    }
};

function bargraph(ctx,d,l,lab){
    ctx.linecap='round';
    Chart.defaults.global.defaultFontColor='Black'
    Chart.defaults.global.defaultFontFamily='Arial'
    if (d.length==3){
        var dataFirst = {
            label: lab[0],
            data: d[0],
            lineTension: 0,
            fill: false,
            borderColor: 'rgba(255,102,102,1)',
            backgroundColor: 'rgba(255,102,102,1)',
            pointRadius: 5
        };

        var dataSecond = {
            label: lab[1],
            data: d[1],
            lineTension: 0,
            fill: false,
            borderColor: 'rgba(178,102,255,1)',
            backgroundColor: 'rgba(178,102,255,1)',
            pointRadius: 5
        };

        var dataThird = {
            label: lab[2],
            data: d[2],
            lineTension: 0,
            fill: false,
            borderColor: 'rgba(255,255,102,1)',
            backgroundColor: 'rgba(255,255,102,1)',
            pointRadius: 5
        };

        var Data = {
        labels: l,
        datasets: [dataFirst, dataSecond, dataThird]
        };

        var chartOptions = {
            legend: {
                display: true,
                position: 'top',
                labels: {
                boxWidth: 40,
                fontColor: 'Black',
                fontSize: 18
            },
            scales: {
                y: {
                    beginAtZero: true,
                   }
            },
            responsive: false,
        }
        };

        var barChart = new Chart(ctx, {
        type: 'bar',
        data: Data,
        options: chartOptions
        });   
    }
    else {
        var dataFirst = {
            label: lab,
            data: d[0],
            lineTension: 0,
            fill: false,
            borderColor: 'rgba(178,102,255,1)',
            backgroundColor: 'rgba(178,102,255,1)',
            pointRadius: 5
        };

        var Data = {
        labels: l,
        datasets: [dataFirst]
        };

        var chartOptions = {
            legend: {
                display: true,
                position: 'top',
                labels: {
                boxWidth: 40,
                fontColor: 'Black',
                fontSize: 18
            },
            scales: {
               y: {
                beginAtZero: true,
               }
            },
            responsive: false,
        }
        };

        var barChart = new Chart(ctx, {
        type: 'bar',
        data: Data,
        options: chartOptions
        });
    }
};

function graph(d,l){
    var ct1=document.getElementById("chart1").getContext('2d');
    graphelement(ct1,[d[0],d[1],d[2]],l,['Maximum predicted temperature in \xB0C','Average predicted temperature in \xB0C','Minimum predicted temperature in \xB0C'])
    var cr1=document.getElementById("bar1").getContext('2d');
    bargraph(cr1,[d[0],d[1],d[2]],l,['Maximum predicted temperature in \xB0C','Average predicted temperature in \xB0C','Minimum predicted temperature in \xB0C'])
    var ct2=document.getElementById("chart2").getContext('2d');
    graphelement(ct2,[d[3],d[4],d[5]],l,['Maximum predicted dewpoint in \xB0C','Average predicted dewpoint in \xB0C','Minimum predicted dewpoint in \xB0C'])
    var cr2=document.getElementById("bar2").getContext('2d');
    bargraph(cr2,[d[3],d[4],d[5]],l,['Maximum predicted dewpoint in \xB0C','Average predicted dewpoint in \xB0C','Minimum predicted dewpoint in \xB0C'])
    var ct3=document.getElementById("chart3").getContext('2d');
    graphelement(ct3,[d[6],d[7],d[8]],l,['Maximum predicted humidity %','Average predicted humidity %','Minimum predicted humidity %'])
    var cr3=document.getElementById("bar3").getContext('2d');
    bargraph(cr3,[d[6],d[7],d[8]],l,['Maximum predicted humidity %','Average predicted humidity %','Minimum predicted humidity %'])
    var ct4=document.getElementById("chart4").getContext('2d');
    graphelement(ct4,[d[9],d[10],d[11]],l,['Maximum predicted windspeed in mph','Average predicted windspeed in mph','Minimum predicted windspeed in mph'])
    var cr4=document.getElementById("bar4").getContext('2d');
    bargraph(cr4,[d[9],d[10],d[11]],l,['Maximum predicted windspeed in mph','Average predicted windspeed in mph','Minimum predicted windspeed in mph'])
    var ct5=document.getElementById("chart5").getContext('2d');
    graphelement(ct5,[d[12],d[13],d[14]],l,['Maximum predicted pressure in mmHg','Average predicted pressure in mmHg','Minimum predicted pressure in mmHg'])
    var cr5=document.getElementById("bar5").getContext('2d');
    bargraph(cr5,[d[12],d[13],d[14]],l,['Maximum predicted pressure in mmHg','Average predicted pressure in mmHg','Minimum predicted pressure in mmHg'])
    var ct6=document.getElementById("chart6").getContext('2d');
    graphelement(ct6,[d[15]],l,'Predicted Precipitation in inches');
    var cr6=document.getElementById("bar6").getContext('2d');
    bargraph(cr6,[d[15]],l,'Predicted Precipitation in inches');
};

function lineGraph(id1,id2){
    var x = document.getElementById(id1);
    var y = document.getElementById(id2);
    if (x.style.display === "none" && y.style.display === "block") {
      x.style.display = "block";
      y.style.display = "none";
    } /*else {
      x.style.display = "none";
      y.style.display = "block";
    }*/
  }

function barGraph(id1,id2){
    var x = document.getElementById(id1);
    var y = document.getElementById(id2);
    /*if (x.style.display === "none" && y.style.display === "block") {
    x.style.display = "block";
    y.style.display = "none";
    } */
    if (y.style.display === "none" && x.style.display === "block") {
    x.style.display = "none";
    y.style.display = "block";
    }
}



