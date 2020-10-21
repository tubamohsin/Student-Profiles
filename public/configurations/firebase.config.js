// Firebase configuration
export const firebaseConfig = () => {
    
   const config = {
        apiKey: "AIzaSyCTwxhl0L8iuAgtSBSSN1I6D9DJWg45Q6M",
        authDomain: "techkaro-4fac2.firebaseapp.com",
        databaseURL: "https://techkaro-4fac2.firebaseio.com",
        projectId: "techkaro-4fac2",
        storageBucket: "techkaro-4fac2.appspot.com",
        messagingSenderId: "397390511645",
        appId: "1:397390511645:web:29a4dbf80c9b36ad7a10f4"
    };

    // Initialize Firebase
    firebase.initializeApp(config);
}
