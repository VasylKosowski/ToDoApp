/**
 * Created by test on 4/22/16.
 */
function renderButton() {
    gapi.signin2.render('signin2', {
        'scope': 'profile email',
        'width': 'auto',
        'height': 25,
        'theme': 'dark',
        'onsuccess' : onGoogleLogin
    });
};

function fbAsyncInit() {
    FB.init({
        appId      : '1715419558706580',
        xfbml      : true,
        version    : 'v2.6'
    });
};

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));