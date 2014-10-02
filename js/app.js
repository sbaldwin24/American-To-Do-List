$(document).ready(function() {
  var widget = new Auth0Widget({
    domain: 'american-todo.auth0.com',
    clientID: '2QHlEgU3ywCtUPu6rPrtVkZOqZkedbNB',
    callbackURL: location.href,
    callbackOnLocationHash: true
  });
});

var userProfile;

$('.btn-login').click(function(e) {
  e.preventDefault();
  widget.signin({ popup: true, null, function(err, profile, token) {
    if (err) {
      // Error callback
      alert('There was an error');
    } else {
      // Success calback

      // Save the JWT token.
      localStorage.setItem('userToken', token);

      // Save the profile
      userProfile = profile;
    }
  }});
});


POST "http://bingo.auth0.com/oauth/token";
Content-Type: 'application/json'
{
  client_id":        "ljJfPvw3ESuL9QCQYHjnCmsEjBxIfkVL",
  "client_secret":    "RW5wv9JozlKkwAF_P7W6KP-Vjr8ie92vulpZrgQQeLXVWSSoqAvbIEMWP1idntCa",
  "grant_type":       "client_credentials"
"access_token": "rCjLixz7A1GXWjG59Sq4PGXQWxNobilGP34U4Gtk2OUcrRFc5CamTSkqpRojlm3R",
  "token_type": "bearer"
}


  PATCH https://bingo.auth0.com/api/users//metadata
  Authorization: Bearer pLJBtl4fgK0pBmJhyY2MKEx0EED4AGO2rTML6qSscyWNmVzQVwwvcrZtliEhCdap,
  Content-Type: 'application/json'
{
    "Policy": "1238907654",
  "Customer Id": "1234"
}
