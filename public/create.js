import { firebaseConfig } from '/configurations/firebase.config.js'

firebaseConfig();

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        console.log(user);
        document.getElementById('add').addEventListener('click', addProjects);

        function addProjects() {
            const project = document.getElementById('project-name').value;
            if (project) {
                const list = document.getElementById('projects');
                const li = document.createElement('li');
                li.textContent = project;
                li.className = 'list-group-item';
                list.appendChild(li);
                document.getElementById('project-name').value = '';
            }
        }

        // firebase

        const form = document.getElementById('new-profile');

        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const rollno = document.forms[0].elements.rollno.value;

            //std node ref
            const Entry = firebase.database().ref('Students');

            const student = {
                'rollno': document.forms[0].elements.rollno.value,
                'education': document.forms[0].elements.education.value,
                'fullname': document.forms[0].elements.fullname.value,
                'course': document.forms[0].elements.course.value,
                'email': document.forms[0].elements.email.value,
            };

            Entry.child(rollno).set(student, err => {
                if (err) {
                    alert('data not saved');
                } else {
                    insertProjects(rollno);
                    alert('data saved!');
                }
            });

        });

        const insertProjects = (rollno) => {

            const list = document.getElementById('projects').getElementsByTagName('li');
            let projects = {};

            for (let i = 0; i < list.length; i++) {
                projects[i] = list[i].textContent
            }

            const entry = firebase.database().ref('Projects');

            entry.child(rollno).set(projects, err => {
                if (err) {
                    alert('projects not saved');
                } else {
                    alert('projects saved!');
                    window.location.href = 'index.html';
                }
            });

        }
    } else {
        alert('Please Sign-in first!');
        window.location.href = 'login.html';
    }

})




