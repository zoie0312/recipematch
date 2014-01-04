APP.CuisinesView = Backbone.View.extend({
    //tagName: "div",
    className: "cuisines",
    //template: _.template('<h3><%= name %></h3>'),

    initialize: function( ){

    },

    render: function(){
        var VIZ = {};
        VIZ.w = 800;
        VIZ.h = 450;
        //var path = d3.geo.path();
        var cuisine_list = [];

        for (var country_name in APP.userCuisines){
            cuisine_list.push({
                cuisine_name: country_name,
                lon: APP.userCuisines[country_name].lon,
                lat: APP.userCuisines[country_name].lat,
                num: APP.userCuisines[country_name].num,
                images_list: APP.userCuisines[country_name].images_list
            });

        }
        /*for (var i=0; i<APP.cuisineImgs.length; i++){

        }*/
        console.log("cuisine_list");
        console.dir(cuisine_list);

        var projection = d3.geo.naturalEarth()
                       .translate([VIZ.w/2, VIZ.h/2])
                       .scale([160]);

        var path = d3.geo.path()
                 .projection(projection);

        var zoom = d3.behavior.zoom()
                    .translate(projection.translate())
                    .scale(projection.scale())
                    //.scaleExtent([VIZ.h, 8 * VIZ.h])
                    .on("zoom", zoomed);

        var svg = d3.select("#mainbody #match_result #user_recipes")
                    .append("svg")
                    .attr("id", "svgMain")
                    .attr("width", VIZ.w)
                    .attr("height", VIZ.h);

        var g = svg.append("g");
                //.call(zoom);

        g.append("rect")
            .attr("class", "background")
            .attr("width", VIZ.w)
            .attr("height", VIZ.h);

        var imgs = svg.selectAll("image").data(APP.cuisineImgs);
            imgs.enter()
            .append("svg:a")
            .attr("xlink:href", function(d){return d.link;})
            .append("svg:image")
            .attr("class", function(d){return d.cuisine_name;})
            .attr("xlink:href", function(d){return d.img_src;})
            .attr("x", function(d){return d.cx;})
            .attr("y", function(d){return d.cy;})
            .attr("width", "90")
            .attr("height", "60")
            .attr("display", "none");


        d3.json("db/readme.json", function(json) {

            g.append('g')
                .selectAll("path")
                .data(json.features)
               .enter()
               .append("path")
               .attr("fill", "#ccc")
               .attr("stroke", "#fff")
               .attr("d", path);
               //.on("click", clicked);

            /*svg.selectAll("path")
               .data(json.features)
               .enter()
               .append("path")
               .attr("fill", "#ccc")
               .attr("stroke", "#fff")
               .attr("d", path);*/

            g.append('g')
            .selectAll("circle")
               .data(cuisine_list)
               .enter()
               .append("circle")
               .attr("cx", function(d) {
                       return projection([d.lon, d.lat])[0];
               })
               .attr("cy", function(d) {
                       return projection([d.lon, d.lat])[1];
               })
               .attr("r", function(d) {
                        return 2+d.num;
               })
               .style("fill", "yellow")
               .style("opacity", 0.75)
               .on("click", show_img);
               /*.append('svg:g')
               .selectAll("image")
                    //.data(function(d){return d.images_list;})
                    .data(APP.cuisineImgs)
                    .enter()
                    .append("svg:image")
                    .attr("class", function(img){return img.cuisine_name})
                    .attr("xlink:href", function(img){return img.img_src})
                    .attr("x", function(img){return img.cx})
                    .attr("y", function(img){return img.cy})
                    .attr("width", "90")
                    .attr("height", "60");*/

            /*svg.selectAll("circle")
           .data(cuisine_list)
           .enter()
           .append("circle")
           .attr("cx", function(d) {
                   return projection([d.lon, d.lat])[0];
           })
           .attr("cy", function(d) {
                   return projection([d.lon, d.lat])[1];
           })
           .attr("r", function(d) {
                    return d.num;
           })
           .style("fill", "yellow")
           .style("opacity", 0.75);*/

        });

        /*d3.select(window).on("click", function(d){
            console.log("what click" + d.cuisine_name);
            var selected_imgs = d3.selectAll("image")[0];
            for(var i=0; i<selected_imgs.length; i++){
                if (selected_imgs[i].style.display == "none")
                    selected_imgs[i].style.display="block";
                else
                    selected_imgs[i].style.display = "none";
            }
                //selected_imgs[i].style.display = "none";
            //imgs.attr("display", "none");

        });*/
        function show_img(d){
            console.log(d.cuisine_name + " clicked");
            var className = "." + d.cuisine_name;
            var selected_imgs = d3.selectAll(className)[0];
            var all_imgs = d3.selectAll("image")[0];
            for (var i=0; i<all_imgs.length; i++)
                all_imgs[i].style.display = "none";

            for (var j=0;j<selected_imgs.length;j++){

                if (selected_imgs[j].style.display == "none")
                    selected_imgs[j].style.display="block";
                else
                    selected_imgs[j].style.display = "none";
            }

            //g.selectAll("image").show();
            /*imags.attr("display", function(){

            })*/

        }

        function clicked(d) {
            var centroid = path.centroid(d),
                  translate = projection.translate();

              projection.translate([
                translate[0] - centroid[0] + VIZ.w / 2,
                translate[1] - centroid[1] + VIZ.h / 2
              ]);

              zoom.translate(projection.translate());

              g.selectAll("path").transition()
                  .duration(700)
                  .attr("d", path);
        }

        function zoomed() {
            projection.translate(d3.event.translate).scale(d3.event.scale);
            g.selectAll("path").attr("d", path);
            //g.selectAll("circle").attr
        }






        /*this.collection.forEach(function(model){
            APP.recipeView = new APP.RecipeView({
                model: model
            });
            this.$el.append(APP.recipeView.render().el);

        }, this);*/

    }
});