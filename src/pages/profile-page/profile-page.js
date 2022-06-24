import React, { useState, useEffect } from 'react';
import Sidebar from 'components/sidebar/sidebar';
import Post from 'components/post/post';
import FollowThem from 'components/follow-them/follow-them';
import 'styles.css';
import './profile-page.css';
import profilePic from 'assets/defaultImg.png';
import { getDocs, doc, updateDoc } from '@firebase/firestore';
import { usersRef, postsRef, db } from 'firebase';
import { Modal, Box, Typography } from '@mui/material';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { postProfileData } from 'redux/slices/userFunctions';

export default function ProfilePage() {
    const user = useSelector((state) => state.user);
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [display, setDisplay] = useState("following");
    const [open, setOpen] = useState(false);
    const [imageFile, setImageFile] = useState();

    const [fullName, setFullName] = useState(user.fullName);
    const [username, setUsername] = useState(user.username);
    const [bio, setBio] = useState(user.bio);
    const [portfolioURL, setPortfolioURL] = useState(user.portfolioURL);
    const [profilepic, setProfilepic] = useState(user.profilepic);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const dispatch = useDispatch();
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        p: 4,
        padding: '2rem'
    };

    const fetchUsers = async () => {
        const res = await getDocs(usersRef);
        let allUsers = [];
        res.forEach((doc) => {
            allUsers.push({ ...doc.data(), id: doc.id });
        })
        setUsers(allUsers);
    }

    const fetchPosts = async () => {
        const res = await getDocs(postsRef);
        let allPosts = [];
        res.forEach((doc) => {
            if (doc.data().uid === user.uid) {
                allPosts.push({ ...doc.data(), id: doc.id });
            }
        })
        setPosts(allPosts);
    }

    const handleSave = async () => {
        const data = new FormData();
        data.append("file", imageFile);
        data.append("upload_preset", "madhunter");
        data.append("cloud_name", "dqpanoobq");
        const res = await axios.post("https://api.cloudinary.com/v1_1/dqpanoobq/image/upload", data);
        dispatch(postProfileData({
            userID: user.id, fullName, username, bio, portfolioURL, profilepic: res.data.url
        }));
        handleClose();
    }

    useEffect(async () => {
        fetchUsers();
        fetchPosts();
    }, [user]);

    return (
        <div className="homepage-container">
            <Sidebar />
            <div className="homepage-content">
                <center>
                    <div className="profile-content">
                        <div><img alt="profile-pic" src={user.profilepic} className="profile-pic" /></div>
                        <span className="name"> {user.fullName} </span>
                        <span className="username"> @{user.username} </span>
                        <button className="edit-profile-btn" onClick={handleOpen}> Edit profile </button>
                        <span className="bio"> {user.bio} </span>
                        <a target="_blank" href={user.portfolioURL} className="bio red-text"> {user.portfolioURL} </a>
                    </div>

                    <div className="profile-numbers">
                        <div onClick={() => setDisplay("following")}>
                            <span><b> {user.following.length} </b></span>
                            <span> Following </span>
                        </div>
                        <div onClick={() => setDisplay("posts")}>
                            <span><b> {posts.length} </b></span>
                            <span> Posts </span>
                        </div>
                        <div onClick={() => setDisplay("followers")}>
                            <span><b> {user.followers.length} </b></span>
                            <span> Followers </span>
                        </div>
                    </div>
                </center>

                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <center><h2> Edit Profile </h2></center>
                        <input type="file" onChange={(e) => { setImageFile(e.target.files[0]) }} />
                        <div className="modal-ip-div">
                            <b> Name </b>
                            <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                        </div>
                        <div className="modal-ip-div">
                            <b> Username </b>
                            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className="modal-ip-div">
                            <b> Bio </b>
                            <input type="text" value={bio} onChange={(e) => setBio(e.target.value)} />
                        </div>
                        <div className="modal-ip-div">
                            <b> Portfolio Link </b>
                            <input type="text" value={portfolioURL} onChange={(e) => setPortfolioURL(e.target.value)} />
                        </div>
                        <div className="modal-options">
                            <button className="btn post-btn" onClick={handleClose}> Cancel </button>
                            <button className="btn post-btn" onClick={handleSave}> Save </button>
                        </div>
                    </Box>

                </Modal>

                <div hidden={display === "following" ? false : true}>
                    <h2> Following </h2>
                    {
                        users.map((usr) => {
                            if (user.following.includes(usr.uid)) {
                                return <div className="follow-container" key={usr.id}>
                                    <img className="avatar" src={usr.profilepic} alt="profilePic" />
                                    <div>
                                        <div className="follow-title">
                                            <h4> {usr.fullName} </h4>
                                            <span className="grey-text"> @{usr.username} </span>
                                        </div>
                                        <div>{usr.bio}</div>
                                        <a target="_blank" href={usr.portfolioURL} className="bio red-text"> {usr.portfolioURL} </a>
                                        <div className="followDetails">
                                            <div><b> Followers :  </b>{usr.followers.length}</div>
                                            <div><b> Following : </b> {usr.following.length} </div>
                                        </div>
                                    </div>
                                </div>
                            }
                        })
                    }
                </div>

                <div hidden={display === "followers" ? false : true}>
                    <h2> Followers </h2>
                    {
                        users.map((usr) => {
                            if (user.followers.includes(usr.uid)) {
                                return <div className="follow-container" key={usr.id}>
                                    <img className="avatar" src={usr.profilepic} alt="profilePic" />
                                    <div>
                                        <div className="follow-title">
                                            <h4> {usr.fullName} </h4>
                                            <span className="grey-text"> @{usr.username} </span>
                                        </div>
                                        <div>{usr.bio}</div>
                                        <a target="_blank" href={usr.portfolioURL} className="bio red-text"> {usr.portfolioURL} </a>
                                        <div className="followDetails">
                                            <div><b> Followers :  </b>{usr.followers.length}</div>
                                            <div><b> Following :</b> {usr.following.length} </div>
                                        </div>
                                    </div>
                                </div>
                            }
                        })
                    }
                </div>

                <div hidden={display === "posts" ? false : true}>
                    <h2> Your posts </h2>
                    {
                        posts.map((post) => {
                            if (post.uid === user.uid) {
                                return <Post post={post} key={post.id} />
                            }
                        })
                    }
                </div>

            </div>

            <div className="follow-them-grid">
            <div className="follow-them-title">
                    <span><b> Who to follow</b> </span>
                    {/* <span className="red-text"> Show more </span> */}
                </div>
                {
                    users.map((usr) => {
                        if (user.uid !== usr.uid) {
                            return <FollowThem userObj={usr} key={usr.id} />
                        }
                    })
                }
            </div>

        </div>
    )
}