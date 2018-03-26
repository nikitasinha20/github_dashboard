# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

# alert = require 'alert-node'
# alert 'Hello'

# <script src="http://code.jquery.com/jquery-1.11.1.min.js"></script>
# script src: "js/jquery-1.9.1.min.js", type: "text/javascript"
todo = {}

isEmpty = (obj) ->
  for prop of obj
    if Object::hasOwnProperty.call(obj, prop)
      return false
  true

discoverLinks = (json) ->
  i = 0
  while i < json.parents.length
    links.push
      source: json.sha
      target: json.parents[i].sha
    todo[json.parents[i].sha] = true
    i++
  todo[json.sha] = false
  return

doLayer = ->
  done = true
  for prop of todo
    `prop = prop`
    if todo[prop]
      done = false
      $.getJSON base + '/' + prop, discoverLinks
  if done
    clearInterval handle
    finished()
  return

finished = ->
  nodes = {}
  # Compute the distinct nodes from the links.
  links.forEach (link) ->
    link.source = nodes[link.source] or (nodes[link.source] = name: link.source)
    link.target = nodes[link.target] or (nodes[link.target] = name: link.target)
    return
  nodes = d3.values(nodes)
  w = 400
  h = 400
  fill = d3.scale.category20()
  vis = d3.select('#chart').append('svg:svg').attr('width', w).attr('height', h)
  force = d3.layout.force().charge(-120).linkDistance(30).nodes(nodes).links(links).size([
    w
    h
  ]).start()
  link = vis.selectAll('line.link').data(links).enter().append('svg:line').attr('class', 'link').style('stroke-width', (d) ->
    Math.sqrt d.value
  ).attr('x1', (d) ->
    d.source.x
  ).attr('y1', (d) ->
    d.source.y
  ).attr('x2', (d) ->
    d.target.x
  ).attr('y2', (d) ->
    d.target.y
  )
  node = vis.selectAll('circle.node').data(nodes).enter().append('svg:circle').attr('class', 'node').attr('cx', (d) ->
    d.x
  ).attr('cy', (d) ->
    d.y
  ).attr('r', 5).style('fill', (d) ->
    fill d.group
  ).call(force.drag)
  node.append('svg:title').text (d) ->
    d.name
  vis.style('opacity', 1e-6).transition().duration(1000).style 'opacity', 1
  force.on 'tick', ->
    link.attr('x1', (d) ->
      d.source.x
    ).attr('y1', (d) ->
      d.source.y
    ).attr('x2', (d) ->
      d.target.x
    ).attr 'y2', (d) ->
      d.target.y
    node.attr('cx', (d) ->
      d.x
    ).attr 'cy', (d) ->
      d.y
    return
  return
# alert("Hi")
username = 'nikita-sinha'
repo = 'rent_my_music'
base = 'https://api.github.com/repos/' + username + '/' + repo + '/commits'
links = []
done = false
handle = undefined
# console.log("Hi")
# $(document).ready ->
$.ajax
  url: @details
  dataType: 'json'
  async: false
  success: (json) ->
    todo[json[0].sha] = true
    doLayer 
# handle = setInterval(doLayer, 200)
