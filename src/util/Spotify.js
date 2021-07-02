
// JavaScript source code
let userToken;
const clientID = '33b4ed8fc3504533964bf54fd698c058';
const redirectURL = 'http://localhost:3000/';
const Spotify = {
    getAccessToken() {
        if (userToken) {
            return userToken;
        }

        // checking for the access token
        // this takes whatever url you are at and returns it, then the match looks for the expression we have given it
        let accessToken = window.location.href.match(/access_token=([^&]*)/);
        const expiresInToken = window.location.href.match(/expires_in=([^&]*)/);

        // setting the value of the user token 
        if (accessToken && expiresInToken) {
            userToken = accessToken[1];
            const expiresIn = Number(expiresInToken[1]);

            /* making it so the expression doesnt try to grab an expried token and forcing it to try to grab
            a new token from the browser*/
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return userToken;
        } else {
            // This pushes you to an authentication page, and spotifies client will request acess
            let acessURL = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURL}`;
            window.location = acessURL;
        }
    },
    search(term) {
        if (!userToken) {
            userToken = Spotify.getAccessToken();
        }
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,
            {
                headers: { Authorization: `Bearer ${userToken}` }
            }).then(response => {
                return response.json();
            }).then(jsonResponse => {
                if (!jsonResponse.tracks) {
                    return [];
                }
                return jsonResponse.tracks.items.map(track => ({
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri
                }));
            });
    },
    savePlaylist(playlistName, trackArray) {
        // returns nothing because conditions for saving have not been met
        if (!playlistName || !trackArray.length) {
            return;
        }
        // ask for proof of token, otherwise it will prompt you to get one
        if (!userToken) {
            userToken = Spotify.getAccessToken();
        }
        // set token value, header for get, and declares a userID
        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}` };
        let userId;
        // Requesting the userID from Spotify
        return fetch('https://api.spotify.com/v1/me', { headers: headers }
        ).then(response => response.json()
        ).then(jsonResponse => {
            userId = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({ name: playlistName })
            }).then(response => response.json()
            ).then(jsonResponse => {
                const playlistId = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({ uris: trackArray })
                });
            });
        })
           
    }
}
export default Spotify;