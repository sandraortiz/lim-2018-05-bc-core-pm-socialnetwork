const buttonLogout = document.querySelector(".buttonLogout");
const bd = document.getElementById('bd');
const btnSave = document.getElementById('btnSave');
const post = document.getElementById('post');
// const users = document.getElementById('postsuser');
const userspost = document.getElementById('myuserpost');
const posts = document.getElementById('posts');
const buttonperfil = document.getElementById('myperfil');
const myperfil = document.getElementById('myperfilinformation');
const buttonwall = document.getElementById('wall');

buttonperfil.addEventListener('click', () => {
    posts.style.display = 'none';
    userspost.style.display = 'block';
    myperfil.style.display = 'block';
})
buttonwall.addEventListener('click', () => {
    posts.style.display = 'block';
    userspost.style.display = 'none';
    myperfil.style.display = 'none';
})

function escriborpostear() {
    const currentUser = firebase.auth().currentUser;
    const messageAreaText = post.value;
    var newPostKey = firebase.database().ref().child('posts').push().key;
    var postData = {
        image: currentUser.photoURL,
        author: currentUser.displayName,
        uid: currentUser.uid,
        body: messageAreaText,
        key: newPostKey,
        likeCount: 0
    };
    var updates = {};
    updates['/posts/' + newPostKey] = postData;
    updates['/user-posts/' + currentUser.uid + '/' + newPostKey] = postData;
    return firebase.database().ref().update(updates);

}

window.onload = () => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            console.log('esta logueado')
            userName.innerHTML = `${user.displayName}`;
            userImage.innerHTML = ` <img src="${user.photoURL}" alt="user" class="profile-photo" />`;
            writeUserData(user.uid, user.displayName, user.email, user.photoURL);
            if (userName.innerHTML == 'null') {
                userName.innerHTML = `${user.email}`
            }

            firebase.database().ref('/posts/')
                .on('child_added', (newPosts) => {

                    if (user.uid == `${newPosts.val().uid}`) {
                        
                        posts.innerHTML +=
                            `<div class="w3-container w3-card w3-white w3-round w3-margin"><br>
                        <img id='image' src="${newPosts.val().image}" alt="Avatar" class="w3-left w3-circle w3-margin-right" style="width:60px">
                       
                        <h4 id='hola'>${newPosts.val().author}</h4><br>
                        <hr class="w3-clear">
                        <p id="mypots">${newPosts.val().body}</p>
                          
                        <button type="button" class="w3-button w3-theme-d1 w3-margin-bottom"><i class="fa fa-thumbs-up"></i> EcoLike</button> 
                      
                      </div>
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

function writeUserData(userId, name, email, imageUrl) {
    firebase.database().ref('users/' + userId).set({
        username: name,
        email: email,
        profile_picture: imageUrl
    });
}

buttonLogout.addEventListener('click', () => {
    firebase.auth().signOut().then(function () {
        window.location = "home.html"
    })
        .catch(function (error) { });
})

btnSave.addEventListener('click', () => {
    const postMuro = post.value;
    const space = postMuro.trim()
    if (postMuro.length !== 0 && space !== '') {
        escriborpostear();
    }
})



