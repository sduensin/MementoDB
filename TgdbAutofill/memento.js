// MementoDB DataSource

function TgdbAutofill(query) {
  var tgdb = new TheGamesDb();
  var search = tgdb.search(query);
  result(search, function(id) { return tgdb.getDetails(id); });
}
