---
layout: post
title: "Data Visualisation in the Browser - 1"
comments: true
description: "My Attempts at trying different data visualisation methods and frameworks"
keywords: "dummy content"
---
As a part of my ZS internship, I'm supposed to visualise and render high-dimensional data on the browser, which poses several challenges. If built using the 
right tools, data visualisations are one of best ways to tell your data science story. But most often, bulky web plugins, large computation requirements, 
bandwidth limitations turn the best stories into a laggy abstraction.
Over the course of the next several posts, I'll be trying out various visualisation frameworks to get a sense of what works best in a production context.
<div class="divider"></div>
I'll start with one of the popular ones, `D3.js`. According to the [website](https://d3js.org/) : 

> D3.js is a JavaScript library for manipulating documents based on data. D3 helps you bring data to life using HTML, SVG, and CSS. D3’s emphasis on web standards gives you the full capabilities of modern browsers without tying yourself to a proprietary framework, combining powerful visualization components and a data-driven approach to DOM manipulation.

I'll jump directly to an example, and we can figure out stuff on the way. You can refer to the documentation in case you have any doubts. 
I've always been fascinated by graphs, and what better way to test a visulisation library than to try rendering a high dimensional graph on the fly? To start,
we need a data set first. Thankfully, there's no shortage of graph based datasets on the web. But before we move on to the big league, let's check our syntax with a smaller graph.

##### Our Data -> Graph.csv

Here A1,A2,A3,A5 are the nodes, and links are to be formed between Source and the corresponding Target.

| Source        | Target           |
| ------------- |:----------------:|
| A1	        | A2               |
| A1	        | A3               |
| A1	        | A4               |
| A2	        | A3               |
| A2	        | A5               |

##### CSS
The CSS to define a node and a link:
```css
<style>
.link {
  stroke: #000;
}
.node {
  stroke: #fff;
}
</style>
```
###### JS
Describing a workspace: 
```javascript
<script>
        var width = 960,
        height = 500;

        var svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height);
```
We'll try experimenting with the [force](https://github.com/d3/d3-force) layout. The force layour provides a physics engine API which you can 
integrate into your visualisations.

```javascript

        var force = d3.layout.force()
        .size([width, height]);
```
Now, we'll import our graph.csv data and link it to the web page's DOM Model.

```javascript
        d3.csv("graph.csv", function(error, links) {
        if (error) throw error;

        var nodesByName = {};

        // Create nodes for each unique source and target.
        links.forEach(function(link) {
        link.source = nodeByName(link.source);
        link.target = nodeByName(link.target);
        });

        // Extract the array of nodes from the map by name.
        var nodes = d3.values(nodesByName);
```
Finally we'll create the links and nodes for our graph, and start the force layout to give a more natural feel to our interactive graph.
```javascript
        // Create the link lines.
        var link = svg.selectAll(".link")
        .data(links)
        .enter().append("line")
        .attr("class", "link");

        // Create the node circles.
        var node = svg.selectAll(".node")
        .data(nodes)
        .enter().append("circle")
        .attr("class", "node")
        .attr("r", 4.5)
        .call(force.drag);

        // Start the force layout.
        force
        .nodes(nodes)
        .links(links)
        .on("tick", tick)
        .start();
```
D3 requires a `Tick` Event handler to be put in place which is invoked at every iteration to update the node position array.

```javascript

        function tick() {
        link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

        node.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
        }
        function nodeByName(name) {
        return nodesByName[name] || (nodesByName[name] = {name: name});
        }
        });
    </script>
```
And we're done! I'll link to a visualisation of this code as soon as I put this on a sharable space, probably cloudfront with a AWS lambda 
instace, bur that's a decision for another post.
This post was inspired by this [post](https://medium.com/ninjaconcept/interactive-dynamic-force-directed-graphs-with-d3-da720c6d7811).



