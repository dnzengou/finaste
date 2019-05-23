// Setting elements
var es = {}; // Elements array
['output',
  'input'
].forEach(function(element, index, array) {
  es[element] = document.getElementById(element);
})

// Style stuff
input.onfocus = function() {
  input.classList.add("in");
  input.classList.remove("out");
}
input.onblur = function() {
  input.classList.remove("in");
  input.classList.add("out");
}

// Algolia login
var client = algoliasearch("N637HXAMBS", "e0f889ef9198d699ed7577646820ea12");
var index = client.initIndex('guests');
//var client = algoliasearch("");

// Search
es['input'].onkeyup = function() {
  if (es['input'].value.length) {
    index.search(es['input'].value, function searchDone(err, content) {
      if (err) {
        console.error(err);
        return;
      }

      if(content && content.hits.length) {
        var list = content.hits.map(function(e,i,a) {
           return '<li>' + e._highlightResult.author.value + ' ' + ':' + ' ' + e._highlightResult.title.value + '</li>';
        }).join('');
        es['output'].innerHTML = "<h5>Completed in " + content.processingTimeMS + "ms</h5><ul>" + list + '</ul>';
      } else {
        es['output'].innerHTML = "<h5>We didn't find any results for the search <em>\"{{query}}\"</em></h5>";
      }
    })
  } else {
    es['output'].innerHTML = "";
  }
}
