$(document).ready(function(){

  var leaders  = ['David%20Cameron','Ed%20Miliband','Nick%20Clegg','Nigel%20Farage'],
      apikey   = 'YB0MY3VMHyllzPqEf5alVj5bUvGpvDVi',
      queryURL = "http://data.test.bbc.co.uk/bbcrd-juicer/articles?apikey=" + apikey + "&recent_first=true&q=";

  function prettyStr(str) {
    return str.replace('%20','-').toLowerCase();
  }

  function getResults(query,leader) {
    $.getJSON(query, function(data) {
      var items = [];
      $.each(data.hits, function(key, val){
        // Strange. Some entries don't have titles/content. We just want the ones that do!
        if (val.title) {
          // Super-long html is icky.
          // TODO - make better somehow.
          var htmlString = [
                            "<div class='panel panel-default'><div class='panel-heading'><h3 class='panel-title'><a target='_blank' href='",
                            val.url,
                            "'>",
                            val.title,
                            "</a> (source: ",
                            val.source['source-name'],
                            ")</h3></div><div class='panel-body'>",
                            val.description,
                            "</div></div>"
                          ].join('');
          items.push(htmlString);
        }
      });
      $("<div>", {
        html: items.join(""),
        class: 'leader ' + prettyStr(leader)
      }).appendTo(".container");
    });
  }

  for (var i = 0; i < leaders.length; i++){
    getResults(queryURL + leaders[i], leaders[i]);
  }

});
