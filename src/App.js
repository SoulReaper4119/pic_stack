//jshint esversion:8
import React, {useState, useEffect} from 'react';
import './App.css';
import Post from './Post';
import { db, auth } from './firebase';
import firebase from 'firebase';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button } from '@material-ui/core';
import {Input} from '@material-ui/core';
import ImageUpload from './ImageUpload';
import InstagramEmbed from 'react-instagram-embed';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));



function App() {

  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] =  useState(null);

useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // when user logged in
        console.log(authUser);
        setUser(authUser);
        }
    else{
        // user has logged out
        setUser(null);
          }
        })
  return () =>{
    unsubscribe();
  }},[user, username]);

// useEffect = used to run a code block on specific conditions

useEffect(() => {
  // code runs here
  db.collection('posts').onSnapshot(snapshot => {
      // codition that  every new post added, this code runs
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })));
  });
},[]);

const signUp = (event) => {
  event.preventDefault();

  auth
  .createUserWithEmailAndPassword(email, password)
  .then((authUser) => {
      return authUser.user.updateProfile({
        displayName: username
      })
    })
  .catch((error) => alert(error.message))

  setOpen(false);
}

const signIn = (event) => {
  event.preventDefault();

  auth
  .signInWithEmailAndPassword(email, password)
  .catch((error) => alert(error.message))

  setOpenSignIn(false);

}

  return (
    <div id = "background" className = "App" >




    <Modal
      open={open}
      onClose={() => setOpen(false)}
    >
  <div style={modalStyle} className={classes.paper}>

  <form className="app__signup">
  <center>
      <img
      className="app__headerImage"
      src="/pic-stack.png"
      alt=""
    />
  </center>

    <Input
      type="text"
      placeholder="Username"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
    />
    <Input
      type="text"
      placeholder="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
    <Input
      type="text"
      placeholder="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />

    <Button type="submit" onClick={signUp}>Sign up</Button>
  </form>

  </div>
</Modal>

<Modal
  open={openSignIn}
  onClose={() => setOpenSignIn(false)}
>
<div style={modalStyle} className={classes.paper}>

<form className="app__signup">
<center>
  <img
  className="app__headerImage"
  src="/pic-stack.png"
  alt=""
/>
</center>

<Input
  type="text"
  placeholder="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
<Input
  type="text"
  placeholder="password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>

<Button type="submit" onClick={signIn}>Sign in</Button>
</form>

</div>
</Modal>

   <div className="app__header">
<img
className="app__headerImage"
src="/pic-stack.png"
alt=""
/>

{user ? (<Button onClick={() => auth.signOut()}>Log out</Button>)
:(
  <div className="app__loginContainer">
    <Button onClick={() => setOpenSignIn(true)}>Sign in</Button>
    <Button onClick={() => setOpen(true)}>Sign up</Button>
  </div>
)}

    </div>





<div className="app__posts">

  <div className="app__postsLeft">
    {
      posts.map(({id,post}) => (<Post key={id} postId={id} user={user} username={post.username} caption={post.caption} imageURL={post.imageURL}/>))
    }
  </div>

  <div className="app_postsRight">

  <InstagramEmbed

    url='https://www.instagram.com/p/CbI336FhaTLKd6k4Gr8MYhdKEBi2QnWyzcX-uE0/'

    maxWidth={320}
    hideCaption={false}
    containerTagName='div'
    protocol=''
    injectScript
    onLoading={() => {}}
    onSuccess={() => {}}
    onAfterRender={() => {}}
    onFailure={() => {}}

  />

  </div>

</div>


<div className = "loginPrompt">
{user?.displayName ? (
  <ImageUpload username={user.displayName}/>):(
    <h3> Sorry, you need to be logged in to upload </h3>

    )}
</div>

    </div>
  );
}

export default App;
