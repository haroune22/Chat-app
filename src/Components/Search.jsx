import React, { useContext, useState } from 'react'
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import {db} from '../Firebase'
import {AuthContext} from '../Context/AuthContext'


const Search = () => {
  const currentUser = useContext(AuthContext)
  const [username,setUsername] =useState('')
  const [user,setUser] =useState(null)
  const [err,setErr] =useState(false)

  const handleSearch = async(e)=>{
    const q  = query(collection(db,"users"),where ("displayName","==" ,username))
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
    setUser(doc.data())
      });
    } catch (err) {
      setErr(true)
    }
  }
  const handleKey = (e)=>{
    e.code === "Enter" &&  handleSearch();
  }
  const handleSelect  =async()=>{
//check whether the group(chats in firestore) exists
const combinedId = currentUser.uid >user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;


try {
  const res = await getDoc(doc(db, "chats", combinedId));

  if (!res.exists()) {
    //create a chat in chats collection
    await setDoc(doc(db, "chats", combinedId), { messages: [] });

    //create user chats
    await updateDoc(doc(db, "usersChats", currentUser.uid), {
      [combinedId + ".userInfo"]: {
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
      },
      [combinedId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "usersChats", user.uid), {
      [combinedId + ".userInfo"]: {
        uid: currentUser.uid,
        displayName: currentUser.displayName,
        photoURL: currentUser.photoURL,
      },
      [combinedId + ".date"]: serverTimestamp(),
    });
  }
} catch (error) {
  
}
setUser(null)
setUsername('')
}
  return (
    <div className='search'>
      <div className="searchForm">
        <input type="text" placeholder='find a user...' onKeyDown={handleKey} onChange={(e)=>setUsername(e.target.value)} value={username}/>
        </div>
        {err && <span> User Not found</span>}
  {user &&    
      <div className="userChat" onClick={handleSelect}>
        <img src={user.photoURL}alt="" />
        <div className="userChatInfo">
          <span>{user.displayName}</span>
        </div>

        </div>}
    </div>
  )
}

export default Search