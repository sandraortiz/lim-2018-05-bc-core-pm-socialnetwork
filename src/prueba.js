
const buttonLogout = document.querySelector(".buttonLogout");
const buttonLogout = document.querySelector(".buttonLogout");
const bd = document.getElementById('bd');
const bd = document.getElementById('bd');
const btnSave = document.getElementById('btnSave');
const btnSave = document.getElementById('btnSave');
const post = document.getElementById('post');
// const users = document.getElementById('postsuser');
const userspost = document.getElementById('myuserpost');
const userspost = document.getElementById('myuserpost');
const posts = document.getElementById('posts');
const posts = document.getElementById('posts');
const buttonperfil = document.getElementById('myperfil');
const buttonperfil = document.getElementById('myperfil');
const myperfil = document.getElementById('myperfilinformation');
const myperfil = document.getElementById('myperfilinformation');
const buttonwall = document.getElementById('wall');
const buttonwall = document.getElementById('wall');
const post = document.getElementById('post');
const optionEstado = document.getElementById('myselect');
buttonperfil.addEventListener('click', () => {
window.onload = () => {
    posts.style.display = 'none';
    firebase.auth().onAuthStateChanged((user) => {
    userspost.style.display = 'block';
        if (user) {
    myperfil.style.display = 'block';
})
            userName.innerHTML = `${user.displayName}`;
buttonwall.addEventListener('click', () => {
            userImage.innerHTML = ` <img src="${user.photoURL}" alt="user" class="profile-photo" />`;
    posts.style.display = 'block';
            if (userName.innerHTML == 'null') {
    userspost.style.display = 'none';
                userName.innerHTML = `${user.email}`
    myperfil.style.display = 'none';
            }
})
            writeUserData(user.uid, user.displayName, user.email, user.photoURL);
            //  writeNewPost(user.uid ,user.displayName , user.photoURL , post.value);
            callFirebasePosts(user.uid)
        }
        else {
            console.log('no esta logueado');
        }
        console.log("User > " + JSON.stringify(user));
    });
}
const writeUserData = (userId, name, email, imageUrl) => {
    firebase.database().ref('users/' + userId).set({
        username: name,
        email: email,
        profile_picture: imageUrl
    });
}
function escriborpostear() {
const writeNewPost = () => {
    const currentUser = firebase.auth().currentUser;
    const currentUser = firebase.auth().currentUser;
    const messageAreaText = post.value;
    const messageAreaText = post.value;
    var newPostKey = firebase.database().ref().child('posts').push().key;
    var newPostKey = firebase.database().ref().child('posts').push().key;
@@ -30,7 +48,7 @@ function escriborpostear() {
        uid: currentUser.uid,
        uid: currentUser.uid,
        body: messageAreaText,
        body: messageAreaText,
        key: newPostKey,
        key: newPostKey,
        likeCount: 0
        likeCount: 0,
    };
    };
    var updates = {};
    var updates = {};
    updates['/posts/' + newPostKey] = postData;
    updates['/posts/' + newPostKey] = postData;
@@ -39,200 +57,129 @@ function escriborpostear() {
}
}
window.onload = () => {
const privatePost = () => {
    firebase.auth().onAuthStateChanged((user) => {
    const currentUser = firebase.auth().currentUser;
        if (user) {
    const messageAreaText = post.value;
            console.log('esta logueado')
    var newPostKey = firebase.database().ref().child('posts').push().key;
            userName.innerHTML = `${user.displayName}`;
    var postData = {
            userImage.innerHTML = ` <img src="${user.photoURL}" alt="user" class="profile-photo" />`;
        image: currentUser.photoURL,
            writeUserData(user.uid, user.displayName, user.email, user.photoURL);
        author: currentUser.displayName,
            if (userName.innerHTML == 'null') {
        uid: currentUser.uid,
                userName.innerHTML = `${user.email}`
        body: messageAreaText,
            }
        key: newPostKey,
        likeCount: 0,
    };
    var updates = {};
    updates['/user-posts/' + currentUser.uid + '/' + newPostKey] = postData;
    return firebase.database().ref().update(updates);
}
            firebase.database().ref('/posts/')
const callFirebasePosts = (uid) => {
                .on('child_added', (newPosts) => {
    const userPost = firebase.database().ref('user-posts').child(uid);
    userPost.on("child_added", newPostsUser => {
        escribirmyuser(newPostsUser);
    });
    const everybodyPost = firebase.database().ref('posts');
    everybodyPost.on("child_added", newPosts => {
        escribirDatatTodosLosposts(newPosts);
    });
                    if (user.uid == `${newPosts.val().uid}`) {
}
                        
                        posts.innerHTML +=
const escribirDatatTodosLosposts = (newPosts) => {
                            `<div class="w3-container w3-card w3-white w3-round w3-margin"><br>
    posts.innerHTML +=
        `<div class="w3-container w3-card w3-white w3-round w3-margin"><br>
                        <img id='image' src="${newPosts.val().image}" alt="Avatar" class="w3-left w3-circle w3-margin-right" style="width:60px">
                        <img id='image' src="${newPosts.val().image}" alt="Avatar" class="w3-left w3-circle w3-margin-right" style="width:60px">
                       
                       <h4 id=${newPosts.val().key}>${newPosts.val().author}</h4><br>
                        <h4 id='hola'>${newPosts.val().author}</h4><br>
                        <hr class="w3-clear">
                        <hr class="w3-clear">
                        <p id="mypots">${newPosts.val().body}</p>
                        <p id="mypots">${newPosts.val().body}</p>
                          
                        <button type="button" class="w3-button w3-theme-d1 w3-margin-bottom"><i class="fa fa-thumbs-up"></i> EcoLike</button> 
                        <button type="button" class="w3-button w3-theme-d1 w3-margin-bottom"><i class="fa fa-thumbs-up"></i> EcoLike</button> 
                      
                      
                      </div>
                      </div>
                      `;
                      `;
                        userspost.innerHTML +=
                            `<div class="w3-container w3-card w3-white w3-round w3-margin" id='mypostss'><br>
                     <img id='image' src="${newPosts.val().image}" alt="Avatar" class="w3-left w3-circle w3-margin-right" style="width:60px">
                    
                     <h4 id='myuserpots'>${newPosts.val().author}</h4><br>
                     <hr class="w3-clear">
                     <p id="${newPosts.val().key}">${newPosts.val().body}</p>
                       
                     <button id="${newPosts.val().key}" type="button" class="w3-button w3-theme-d1 w3-margin-bottom"><i class="fa fa-thumbs-up"></i> EcoLike</button> 
                     <button id="${newPosts.val().key}" type="button" class="w3-button w3-theme-d1 w3-margin-bottom"><i class="fa fa-thumbs-up"></i> Editar</button>
                     <button id="${newPosts.val().key}" type="button" class="w3-button w3-theme-d1 w3-margin-bottom"><i class="fa fa-thumbs-up"></i> Eliminar</button> 
                   </div>`;
                        const buttondelete = document.getElementById("deletePots");
                        buttondelete.addEventListener('click', () => {
                            firebase.database().ref().child('/user-posts/' + user.uid + '/' + newPosts.key).remove();
                            firebase.database().ref().child('/posts/' + newPosts.key).remove();
                            mypostss.remove();
                        })
                        const post = document.getElementById('mypostss');
                        const buttonedit = document.getElementById("${newPosts.val().key}");
                        buttonedit.addEventListener('click', () => {
                                  
                            buttonedit.style.display = 'none'
                            document.getElementById("myposts").contentEditable = "true";
                            var btnpublicar = document.createElement('button');
                            btnpublicar.setAttribute('value', 'publicar');
                            // btnpublicar.setAttribute('type', 'button');
                            btnpublicar.setAttribute('class', "w3-button w3-theme-d1 w3-margin-bottom")
                            btnpublicar.setAttribute('id', `${newPosts.val().key}`  )
                            btnpublicar.addEventListener('click', () => {
                                 
                            
                                console.log('hola');
                     
                                
                                const newUpdate = document.getElementById('myposts');
                                const messageAreaText = newUpdate.innerText
                                const postData = {
                                      
                                        body: messageAreaText,
                                        
                                };
                                var updateUser = {};
                                var updatePost = {};        
                                updateUser['/user-posts/' + user.uid + '/' + newPosts.key] = postData;
                                updatePost['/posts/' + newPosts.key] = postData;
                                firebase.database().ref().update(updateUser);
                                firebase.database().ref().update(updatePost);
                                btnpublicar.style.display='none'
                                buttonedit.style.display = 'block'
                                //updatePostUser(user.uid , newUpdate.value, newPosts.key);
                            })
                        post.appendChild(btnpublicar);
                        })
                        //         editPots.addEventListener('click', () => {
                        //             editPots.remove()
                        //             document.getElementById("myposts").contentEditable = "true";
                        //             userspost.innerHTML += 
                        //      `<div class="w3-container w3-card w3-white w3-round w3-margin" id='myposts'><br>
                        //      <button id="deletePots" type="button" class="w3-button w3-theme-d1 w3-margin-bottom"><i class="fa fa-thumbs-up"></i>Publicar</button> 
                        //    </div>
                        //    `;
                        //             var btnpublicar = document.createElement('input');
                        //             btnpublicar.setAttribute('value', 'publicar');
                        //             btnpublicar.setAttribute('type', 'button');
                        //             btnpublicar.addEventListener('click', () => {
                        //                 const newUpdate = document.getElementById("mypots");
                        //                 const messageAreaText = newUpdate.value
                        //                 const nuevoPost = {
                        //                     body: messageAreaText,
                        //                 };
                        //                 var updateUser = {};
                        //                 // var updatePost = {};        
                        //                 updateUser['/user-posts/' + user.uid + '/' + newPosts.key] = nuevoPost;
                        //                 // updatePost['/posts/' + newPosts.key] = nuevoPost;
                        //                 firebase.database().ref().update(updateUser);
                        //                 // firebase.database().ref().update(updatePost);
                        //                 // updatePostUser(user.uid , newUpdate.value, newPosts.key);
                        //             })
                        //             mypots.appendChild(btnpublicar);
                        //         })
                        // const deletePots = document.getElementById('deletePots')
                    }
                    else {
                        posts.innerHTML +=
                            `<div class="w3-container w3-card w3-white w3-round w3-margin"><br>
                 <img src="${newPosts.val().image}" alt="Avatar" class="w3-left w3-circle w3-margin-right" style="width:60px">
                
                 <h4 id='hola'>${newPosts.val().author}</h4><br>
                 <hr class="w3-clear">
                 <p id="mypots">${newPosts.val().body}</p>
                   
                 <button type="button" class="w3-button w3-theme-d1 w3-margin-bottom"><i class="fa fa-thumbs-up"></i> EcoLike</button> 
  
               </div>
               `;
                    }
                });
            // firebase.database().ref('/user-posts/' + user.uid)
            //     .on('child_added', (newPosts) => {
            //         userspost.innerHTML += `<p class="post-area" id="mypots">${newPosts.val().body}</p>
            //         <br>
            //         <button id="deletePots"> Eliminar </button> 
            //          <button id="editPots">editar </button>
            //          <button id="likePots">EcoLove</button>
            //          `;
            // deletePots.addEventListener('click', () => {
            //     firebase.database().ref().child('/user-posts/' + user.uid + '/' + newPosts.key).remove();
            //     firebase.database().ref().child('/posts/' + newPosts.key).remove();
            //     deletePots.remove()
            //     editPots.remove()
            //     mypots.remove()
            //     likePots.remove()
            // })
            // editPots.addEventListener('click', () => {
            //     editPots.remove()
            //     document.getElementById("mypots").contentEditable = "true";
            //     var btnpublicar = document.createElement('input');
            //     btnpublicar.setAttribute('value', 'publicar');
            //     btnpublicar.setAttribute('type', 'button');
            //     btnpublicar.addEventListener('click', () => {
            //         const newUpdate = document.getElementById("mypots");
            //         const messageAreaText = newUpdate.value
            //         const nuevoPost = {
            //             body: messageAreaText,
            //         };
            //         var updateUser = {};
            //         // var updatePost = {};        
            //         updateUser['/user-posts/' + user.uid + '/' + newPosts.key] = nuevoPost;
            //         // updatePost['/posts/' + newPosts.key] = nuevoPost;
            //         firebase.database().ref().update(updateUser);
            //         // firebase.database().ref().update(updatePost);
            //         // updatePostUser(user.uid , newUpdate.value, newPosts.key);
            //     })
            //     mypots.appendChild(btnpublicar);
            // })
            //     });
            // // const deletePots = document.getElementById('deletePots')
        }
        else {
            console.log('no esta logueado');
        }
        console.log("User > " + JSON.stringify(user));
    });
}
}
const escribirmyuser = (newPostsUser) => {
    userspost.innerHTML += `<div class="w3-container w3-card w3-white w3-round w3-margin" id="${newPostsUser.val().key}"><br>
<img id="${newPostsUser.val().key}" src="${newPostsUser.val().image}" alt="Avatar" class="w3-left w3-circle w3-margin-right" style="width:60px">
<h4 id="${newPostsUser.val().key}">${newPostsUser.val().author}</h4><br>
<hr class="w3-clear">
<p id="${newPostsUser.val().key}">${newPostsUser.val().body}</p>
<button id="${newPostsUser.val().key}" type="button" class="w3-button w3-theme-d1 w3-margin-bottom buttondelets"><i class="fa fa-thumbs-up"></i> EcoLike</button> 
<button id="${newPostsUser.val().key}" type="button" class="w3-button w3-theme-d1 w3-margin-bottom"><i class="fa fa-thumbs-up"></i> Editar</button>
<button id="${newPostsUser.val().key}" type="button" class="w3button"><i class="fa fa-thumbs-up"></i> Eliminar</button> 
</div>`;
    const buttonvdelete = document.querySelector(".w3button");
    buttonvdelete.addEventListener('click', (evt) => {
        if  (newPostsUser.val().key = evt.target.id) {
             firebase.database().ref().child( `/user-posts/${newPostsUser.val().uid}/${newPostsUser.val().key }`).remove();
        firebase.database().ref().child( `/posts/${newPostsUser.val().key }`).remove();  
        }
        //       firebase.database().ref().child('/user-posts/' + user.uid + '/' + newPosts.key).remove();
        // firebase.database().ref().child('/posts/' + newPosts.key).remove();
     
        // mypostss.remove();
    })
function writeUserData(userId, name, email, imageUrl) {
//     const buttondelete = document.getElementById("deletePots");
    firebase.database().ref('users/' + userId).set({
//     buttondelete.addEventListener('click', () => {
        username: name,
//         firebase.database().ref().child('/user-posts/' + user.uid + '/' + newPosts.key).remove();
        email: email,
//         firebase.database().ref().child('/posts/' + newPosts.key).remove();
        profile_picture: imageUrl
//         mypostss.remove();
    });
// })
    // const post = document.getElementById('mypostss');
    // const buttonedit = document.getElementById("${newPosts.val().key}");
    // buttonedit.addEventListener('click', () => {
    //     buttonedit.style.display = 'none'
    //     document.getElementById("myposts").contentEditable = "true";
    //     var btnpublicar = document.createElement('button');
    //     btnpublicar.setAttribute('value', 'publicar');
    //     // btnpublicar.setAttribute('type', 'button');
    //     btnpublicar.setAttribute('class', "w3-button w3-theme-d1 w3-margin-bottom")
    //     btnpublicar.setAttribute('id', `${newPostsUser.val().key}`)
    //     btnpublicar.addEventListener('click', () => {
    //         console.log('hola');
    //         const newUpdate = document.getElementById('myposts');
    //         const messageAreaText = newUpdate.innerText
    //         const postData = {
    //             body: messageAreaText,
    //         };
    //         var updateUser = {};
    //         var updatePost = {};
    //         updateUser['/user-posts/' + user.uid + '/' + newPosts.key] = postData;
    //         updatePost['/posts/' + newPosts.key] = postData;
    //         firebase.database().ref().update(updateUser);
    //         firebase.database().ref().update(updatePost);
    //         btnpublicar.style.display = 'none'
    //         buttonedit.style.display = 'block'
    //         //updatePostUser(user.uid , newUpdate.value, newPosts.key);
    //     })
    //     post.appendChild(btnpublicar);
    // })
}
