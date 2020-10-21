import { firebaseConfig } from '/configurations/firebase.config.js'

firebaseConfig();

firebase.auth().onAuthStateChanged(function (user) {
    if (user) { // if already logged in
        document.getElementById('greeting').innerHTML = `Welcome ${user.displayName}`;
    }
});

const dbRef = firebase.database().ref(); // db root ref
const stdRef = dbRef.child('Students');  // std ref

stdRef.on("child_added", snapshot => {
    const data = snapshot.val();
    const key = snapshot.key;
    console.log(key, data);

    const html = `<div class="card border-light mb-3 mr-5 ml-3" style="max-width: 18rem;">
    <div class="card-header">${data.fullname}</div>
    <div class="card-body">
        <h5 class="card-title">${data.rollno} | ${data.email}</h5>
        <p class="card-text">${data.fullname} is currently enrolled in Tech Karo ${data.course} course. 
        ${data.fullname}'s previous education is ${data.education}</p>
        <a href="view.html?id=${data.rollno}" style="text-decoration:none !important;">
            <button type="button" class="btn btn-secondary btn-sm">Details</button>
        </a>
    </div>
</div>`

    const entries = document.getElementById('entries');
    entries.insertAdjacentHTML('afterbegin', html);

});

