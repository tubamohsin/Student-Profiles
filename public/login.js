import { firebaseConfig } from '/configurations/firebase.config.js'

firebaseConfig();

firebase.auth().onAuthStateChanged(function (user) {
    if (user) { // if already logged in
        if (confirm('Logout?')) {
            firebase.auth().signOut(); // This will trigger onAuthStateChanged again, immediately.
        } else {
            window.location.href = 'index.html';
        }
    }
});

// FirebaseUI config.
var uiConfig = {
    'signInSuccessUrl': false,
    'signInOptions': [
        // comment unused sign-in method
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        //firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        //firebase.auth.GithubAuthProvider.PROVIDER_ID,
        // firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    'tosUrl': false,
};

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);
