//this object uses all unique advisor names(first, common or last) as keys and the values are the outputs after running the name through the removeDemocraticService function.
var removeDiacriticsServiceMock = {
    remove: function (name) {
        if (!name) {
            return name;
        } else if (!this.removeDemocraticsServiceMap[name]) {
            //console.log('returning: ', name);
            throw "Missing removeDemocraticMap for: " + name
        }
        return this.removeDemocraticsServiceMap[name];
    },
    //includes names and search terms
    removeDemocraticsServiceMap: {
        "Michael":"Michael",
        "Peter":"Peter",
        "Daniel":"Daniel",
        "Jean Pierre":"Jean Pierre",
        "Jean":"Jean",
        "Pierre":"Pierre",
        "Claudio":"Claudio",
        "Jocelyn":"Jocelyn",
        "GaÃ«l":"Gael",
        "Ashley":"Ashley",
        "Michel":"Michel",
        "Barbara":"Barbara",
        "Thomas":"Thomas",
        "Troy":"Troy",
        "Alexander":"Alexander",
        "Robert":"Robert",
        "James Richard":"James Richard",
        "Barb":"Barb",
        "Eric":"Eric",
        "Alex":"Alex",
        "Jay":"Jay",
        "Richard":"Richard",
        "James":"James",
        "Johnson":"Johnson",
        "Rayner":"Rayner",
        "Argento":"Argento",
        "Thomson":"Thomson",
        "Eric":"Eric",
        "Stranak-St-Georges":"Stranak-St-Georges",
        "St.-Georges":"St.-Georges",
        "D'Souza":"D'Souza",
        "LalibertÃ©":"Laliberte",
        "CÃ´tÃ©":"Cote",
        "Di Sante":"Di Sante",
        "Di":"Di",
        "Sante":"Sante",
        "Beauchamp":"Beauchamp",
        "Johnstone":"Johnstone",
        "Kingston":"Kingston",
        "Andrews":"Andrews",
        "m m": "m m",
        "j ric j": "j ric j"
    }
};