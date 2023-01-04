async function signup(e){
e.preventDefault();
const email = document.querySelector("#username");
const passs = document.querySelector("#password");
console.log(email.value,passs.value)
try{
const result = await firebase.auth().createUserWithEmailAndPassword(email.value, passs.value);
alert(result);
}
catch(e){
console.log(e)
}

}

async function signin(e){
    e.preventDefault();
    const email = document.querySelector("#username_");
    const passs = document.querySelector("#password_");
    console.log(email.value,passs.value)
    try{
    const result = await firebase.auth().signInWithEmailAndPassword(email.value, passs.value);
    console.log(result)
    alert("Welcome"+result.user.email)
    }
    catch(e){
    console.log(e)
    }
    
}


function logout(){
    firebase.auth().signOut()
}

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log(user)
       
    } else {
      console.log("logged Out")
    }
  });


function Uploadimg(){
    const imgs = document.getElementById("imgs");
    console.log(imgs.files)
    const uid = firebase.auth().currentUser.uid
    const fileRef = firebase.storage().ref().child(`/users/${uid}/images/${imgs.value}`);
    var uploadTask = fileRef.put(imgs.files[0]);

    uploadTask.on('state_changed', 
  (snapshot) => {
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
     if(progress == "100"){
        alert("done")
     }
  }, 
  (error) => {
     console.log(error)
  }, 
  () => {
    
    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
      console.log('File available at', downloadURL);
    });
  }
);
}