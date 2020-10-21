import { firebaseConfig } from '/configurations/firebase.config.js'

firebaseConfig();

const url = new URL(document.URL);
const search_params = new URLSearchParams(url.search);
const profile_id = search_params.get('id');

if (profile_id) {
    var added_views = false;
    var Student = firebase.database().ref('Students').child(profile_id);
    var Projects = firebase.database().ref('Projects').child(profile_id);

    Student.on('value', function (r) {
        var entry = r.val();
        console.log(entry, r.key);
        if (entry) {
            document.getElementById('name').textContent = entry.fullname;
            document.getElementById('rollnum').textContent = `${entry.rollno} | ${entry.email}`;
            document.getElementById('education').textContent = entry.education;
            document.getElementById('course').textContent = entry.course;
            getProjects();
        } else { // content not found
            window.location.href = 'index.html';
        }
    });

    // // update button
    // $('#update').attr('href','update.html?id='+profile_id);

} else {
    alert('This student profile id does not exist');
    window.location.href = 'index.html';
}

const getProjects = () => {
    Projects.on('value', function (r) {
        var entry = r.val();
        console.log(entry, r.key);
        if (entry) {
            const list = document.getElementById('projects');
            entry.forEach(x => {
                const li = document.createElement('li');
                li.textContent = x;
                list.appendChild(li);
            })
        }
    })
}