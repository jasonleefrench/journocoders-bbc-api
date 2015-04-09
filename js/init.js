$(document).ready(function(){

  var leaders  = ['David%20Cameron','Ed%20Miliband','Nick%20Clegg','Nigel%20Farage'],
      apikey   = 'YB0MY3VMHyllzPqEf5alVj5bUvGpvDVi',
      queryURL = "http://data.test.bbc.co.uk/bbcrd-juicer/articles?apikey=" + apikey + "&recent_first=true&q=";

  function getResults(query,leader){
    $.getJSON(query, function(data){
      var items = [];
      $.each(data.hits, function(key, val){
        // Strange. Some entries don't have titles/content. We just want the ones that do!
        if (val.title) items.push("<p><a target='_blank' href='" + val.url + "'>" + val.title + "</a> (source: " + val.source['source-name'] + ")</p>");
      });
      $("<div>", {
        html: items.join(""),
        class: 'leader ' + leader.replace('%20','-').toLowerCase()
      }).appendTo(".container");
    });
  }

  for(var i = 0; i < leaders.length; i++){
    getResults(queryURL + leaders[i], leaders[i]);
  }

});
