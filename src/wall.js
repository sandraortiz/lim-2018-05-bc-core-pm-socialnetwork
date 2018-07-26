const buttonLogout = document.querySelector(".buttonLogout");
buttonLogout.addEventListener('click', () => {
    firebase.auth().signOut().then(function () {
        window.location = "home.html"
    })
        .catch(function (error) { });
})
const users = document.getElementById('postsuser');
const userspost = document.getElementById('myuserpost');
window.onload = () => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) { //Si está logeado, mostraremos la opción loggedIn
            console.log('esta logueado')
            userName.innerHTML = `${user.displayName}`;
            userImage.innerHTML = ` <img src="${user.photoURL}" alt="user" class="profile-photo" />`;
            writeUserData(user.uid, user.displayName, user.email, user.photoURL);
            if (userName.innerHTML == 'null') {
                userName.innerHTML = `${user.email}`
                // userImage.innerHTML = ` <img src="${user.photoURL}" alt="user" class="profile-photo" />`;
            }
            // const newPost = writeNewPost(user.uid , post.value);

            // let userId = firebase.auth().currentUser.uid;
            database=firebase.database();
            var ref = database.ref('posts');
           ref.on('value',gotData);

            // const dbRefObject = firebase.database().ref('posts');

            // dbRefObject.on('value', snap => {
            //     users.innerText = JSON.stringify(snap.val());
            // }
            // );

            // const dbRef = firebase.database().ref().child('user-posts').child(user.uid);

            // dbRef.on('value', snap => {
            //     userspost.innerText = JSON.stringify(snap.val());
            // }
            // );
        }
        else {
            console.log('no esta logueado');
        }
        console.log("User > " + JSON.stringify(user));
    });
};
function gotData(data){
    // console.log(data.val());
    var posts = data.val();
    var keys = Object.keys(posts);
    console.log(keys);
    for (var i  = 0; i <keys.length; i++) {
      var k = keys[i];
     var body =posts[k].body;
     var uid = posts[k].uid;
// console.log(body);
// scorelist.innerHTML = body ;
var li = document.createElement('li' , body);
li.parent('scorelist');
    }
}

function writeUserData(userId, name, email, imageUrl) {
    firebase.database().ref('users/' + userId).set({
        username: name,
        email: email,
        profile_picture: imageUrl
    });
}
const bd = document.getElementById('bd');
const btnSave = document.getElementById('btnSave');
const post = document.getElementById('post');
const posts = document.getElementById('posts');
function writeNewPost(uid, body) {
    var postData = {
        uid: uid,
        body: body
    };
    var newPostKey = firebase.database().ref().child('posts').push().key;
    var updates = {};
    updates['/posts/' + newPostKey] = postData;
    updates['/user-posts/' + uid + '/' + newPostKey] = postData;
    firebase.database().ref().update(updates);

    return newPostKey;

};
btnSave.addEventListener('click', () => {
    const userId = firebase.auth().currentUser.uid;
    const postMuro = post.value;
    const space = postMuro.trim()
    console.log(space)
    // debugger
    if (postMuro.length !== 0 && space !== '') {
        const newPost = writeNewPost(userId, post.value);
        var btnUpdate = document.createElement('input');
        btnUpdate.setAttribute('value', 'Editar');
        btnUpdate.setAttribute('type', 'button');
        var btnDelete = document.createElement('input');
        btnDelete.setAttribute('value', 'delete');
        btnDelete.setAttribute('type', 'button');
        btnDelete.setAttribute('id', newPost);
        var btnLike = document.createElement('input');
        btnLike.setAttribute('value', 'Like');
        btnLike.setAttribute('type', 'button');
        btnLike.setAttribute('id', 'likes');
        var contPost = document.createElement('div');
        var textPost = document.createElement('textarea');
        textPost.setAttribute('id', newPost);
        textPost.innerHTML = post.value;
        //  const arrdbRef= Object.keys(firebase.database().ref().child('posts').child(newPost));
        // console.log(arrdbRef);
        // con 
        btnDelete.addEventListener('click', (evt) => {
            if (newPost === evt.target.id) {
                const question = confirm('Esta seguro que desea eliminar esta publicacion?')
                if (question === true) {
                    firebase.database().ref().child('/user-posts/' + userId + '/' + newPost).remove();
                    firebase.database().ref().child('/posts/' + newPost).remove();
                    textPost.remove();
                    btnUpdate.remove();
                    btnDelete.remove();
                    btnLike.remove();
                }
            }
        })
        btnUpdate.addEventListener('click', () => {
            // textPost.setAttribute('contenteditable' , true);
            btnUpdate.remove();
            var btnpublicar = document.createElement('input');
            btnpublicar.setAttribute('value', 'publicar');
            btnpublicar.setAttribute('type', 'button');
            btnpublicar.addEventListener('click', () => {
                const newUpdate = document.getElementById(newPost);
                const nuevoPost = {
                    body: newUpdate.value,
                };
                var updateUser = {};
                var updatePost = {};
                updateUser['/user-posts/' + userId + '/' + newPost] = nuevoPost;
                updatePost['/posts/' + newPost] = nuevoPost;
                firebase.database().ref().update(updateUser);
                firebase.database().ref().update(updatePost);
                // textPost.setAttribute('contenteditable' , false);
            })

            contPost.appendChild(btnpublicar);
        });
        btnLike.addEventListener('click', () => {
            let contador = 0;
            contador += contador + 1;
            // let btnLikeCount = document.getElementById("likes");
            btnLike.value = "like (" + contador + ")";

        })

        contPost.appendChild(textPost);
        contPost.appendChild(btnUpdate);
        contPost.appendChild(btnDelete);
        posts.appendChild(contPost);

    }
})




