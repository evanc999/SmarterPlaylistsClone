
var curTracks = [];
var curTitle = "your playlist"

function showPlaylist(name, data) {
    var tbody = $("#playlist-body");
    tbody.empty();
    $("#tab-track-count").text(data.tracks.length);
    $("#tab-track-count").addClass('tc-fresh');
    $("#playlist-title").text(name);
    $("#playlist-description").text(data.name);

    curTracks = data.tracks;
    curTitle = data.name;
    curTitle = name;

    _.each(data.tracks, function(track, i) {
        var tr = $("<tr>");
        var count = $("<td>").text(i + 1);
        var title = $("<td>").text(track.title);
        var artist = $("<td>").text(track.artist);
        var src = $("<td>").text(track.src);
        tr.append(count);
        tr.append(title);
        tr.append(artist);
        tr.append(src);
        tbody.append(tr);
    });
}

function playlistShown() {
    $("#tab-track-count").removeClass('tc-fresh');
}


function savePlaylist(program, data) {
    var tracks = data.tracks;
    if (tracks && tracks.length > 0) {
        var tids = [];
        _.each(tracks, function(track) {
            tids.push('spotify:track:' + track.id);
        });
        localStorage.setItem('playlist-tids', JSON.stringify(tids));
        localStorage.setItem('playlist-title', program.name);
        if (program.extra.uri) {
            localStorage.setItem('playlist-uri', program.extra.uri);
        } else {
            localStorage.removeItem('playlist-uri');
        }
        loginWithSpotify();
    }
}

function loginWithSpotify() {
    var client_id = 'bb61fcfe1423449ba3d8e3b016316316';
    var redirect_uri = 'http://localhost:8000/callback.html';
    var url = 'https://accounts.spotify.com/authorize?client_id=' + client_id +
        '&response_type=token' +
        '&scope=playlist-modify-private' +
        '&redirect_uri=' + encodeURIComponent(redirect_uri);
    var w = window.open(url, 'asdf', 'WIDTH=400,HEIGHT=500');
}
