function TheGamesDb() {
}

TheGamesDb.prototype.search = function(gameTitle) {
  var resultArray = [];
  var result = http().get("http://thegamesdb.net/api/GetGamesList.php?name=" + encodeURIComponent(gameTitle));
  var rawxml = result.body;
  if (rawxml) {
    var xml = new XmlDocument(rawxml);
    xml.eachChild(function(game) {
      var object = {};
      object["id"]    = game.valueWithPath("id");
      object["title"] = game.valueWithPath("GameTitle");
      object["desc"]  = game.valueWithPath("Platform");
      resultArray.push(object);
    });
  }
  return resultArray;
}

TheGamesDb.prototype.getDetails = function(id) {
  var object = {};
  var result = http().get("http://thegamesdb.net/api/GetGame.php?id=" + encodeURIComponent(id));
  var rawxml = result.body;
  if (rawxml) {
    var xml = new XmlDocument(rawxml);
    var imageBase = xml.valueWithPath("baseImgUrl");
    var game = xml.childNamed("Game");
    var v;
    v = game.valueWithPath("id");          if (v !== undefined) object["ID"]          = Number(v);
    v = game.valueWithPath("GameTitle");   if (v !== undefined) object["Title"]       = v;
    v = game.valueWithPath("Platform");    if (v !== undefined) object["Platform"]    = v;
    v = game.valueWithPath("ReleaseDate"); if (v !== undefined) object["ReleaseDate"] = moment(new Date(v)).toDate().getTime();
    v = game.valueWithPath("Overview");    if (v !== undefined) object["Description"] = v;
    v = game.valueWithPath("Co-op");       if (v !== undefined) object["CoOp"]        = v;
    v = game.valueWithPath("Youtube");     if (v !== undefined) object["YouTube"]     = v;
    v = game.valueWithPath("Rating");      if (v !== undefined) object["Rating"]      = Number(v);
    v = game.valueWithPath("Players");     if (v !== undefined) object["Players"]     = v;
    v = game.valueWithPath("Developer");   if (v !== undefined) object["Developer"]   = v;
    v = game.valueWithPath("Publisher");   if (v !== undefined) object["Publisher"]   = v;
    v = game.valueWithPath("ESRB");        if (v !== undefined) object["ESRB"]        = v;
    var genres = game.childNamed("Genres");
    var genreList = [];
    if (genres) {
      genres.eachChild(function(genre) {
        genreList.push(genre.val);
      });
      object["Genres"] = genreList.join();
    }
  }
  return object;
}
