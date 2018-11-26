queue()
    .defer(d3.csv, "data/datafile.csv")
    .await(makeGraphs);
    
function makeGraphs(error, proteinData) {
    var ndx = crossfilter(proteinData);
    
    proteinData.forEach(function(d) {
        d.Spend = parseInt(d.Spend);
        d.Age = parseInt(d.Age);
    })
    
    show_which_year(ndx);
    show_which_brand(ndx);
    show_years_trained(ndx);
    show_average_spend(ndx);
    
    show_spend_by_age(ndx);

    dc.renderAll();
    
}

function show_which_year(ndx){
    var dim = ndx.dimension(dc.pluck('Year'));
    var group = dim.group();
    
    dc.selectMenu("#select-year")
        .dimension(dim)
        .group(group);
}

function show_which_brand(ndx) {
    var dim = ndx.dimension(dc.pluck('Brand'));
    var group = dim.group();
    
    dc.pieChart("#which-brand")
        .height(350)
        .radius(140)
        .innerRadius(40)
        .transitionDuration(1500)
        .dimension(dim)
        .group(group)
        .drawPaths(true);
}

function show_years_trained(ndx) {
    var dim = ndx.dimension(dc.pluck('Sex'));
    var group = dim.group();
    
    dc.barChart("#male-female")
        .width(350)
        .height(350)
        .margins({top: 10, right: 50, bottom: 40, left: 50})
        .dimension(dim)
        .group(group)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("Sex")
        .yAxis().ticks(10);
}

function show_average_spend(ndx) {
    var dim = ndx.dimension(dc.pluck('Brand'));
    
    function add_item(p, v) {
        p.count++;
        p.total += v.Spend;
        p.average = p.total / p.count;
        return p;
    }
    
    function remove_item(p,v){
        p.count--;
        if(p.count == 0) {
            p.total = 0;
            p.average = 0;
        } else {
            p.total -= v.Spend;
            p.average = p.total / p.count;
        }
        return p;
    }
    
    function initialise() {
        return {count: 0, total: 0, average: 0};
    }
    
    var averageSpendByBrand = dim.group().reduce(add_item, remove_item, initialise);
    
    dc.barChart("#average-spend")
        .width(350)
        .height(350)
        .margins({top: 10, right: 50, bottom: 40, left: 50})
        .dimension(dim)
        .group(averageSpendByBrand)
        .valueAccessor(function(d){
            return d.value.average.toFixed(2);
        })
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .elasticY(true)
        .xUnits(dc.units.ordinal)
        .xAxisLabel("Brand")
        .yAxis().ticks(18);
}

function show_spend_by_age(ndx) {
    
    var brandColours = d3.scale.ordinal()
        .domain(["Myprotein", "Bulkpowders", "Protein Works"])
        .range(["#387eed", "#6a9ded", "#9fc2f9"]);
    
    var ageDim = ndx.dimension(dc.pluck('Age'));
    var spendDim = ndx.dimension(function(d) {
        return[d.Age, d.Spend, d.Brand];
    });
    var ageSpendGroup = spendDim.group();
    
    var minAge = ageDim.bottom(1)[0].Age;
    var maxAge = ageDim.top(1)[0].Age;
    
    dc.scatterPlot("#spend-by-age")
        .width(800)
        .height(400)
        .x(d3.scale.linear().domain([minAge, maxAge]))
        .brushOn(false)
        .symbolSize(5)
        .clipPadding(10)
        .xAxisLabel("Age")
        .yAxisLabel("Spend")
        .title(function(d) {
            return "This person spent £" + d.key[1] + " and is " + d.key[0] + " years old.";
        })
        .colorAccessor(function(d){
            return d.key[2];
        })
        .colors(brandColours)
        .dimension(spendDim)
        .group(ageSpendGroup)
        .margins({top: 15, right: 50, bottom: 50, left: 50});
    
}