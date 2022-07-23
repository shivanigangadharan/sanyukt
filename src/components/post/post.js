import React, { useEffect, useState } from 'react';
import './post.css';
import 'styles.css';
import avatar from 'assets/defaultImg.png';
import { usersRef, db, commentsRef, postsRef } from 'firebase';
import { updateDoc, arrayUnion, collection, doc, arrayRemove, increment, getDocs, addDoc, deleteDoc } from '@firebase/firestore';
import { useNavigate } from 'react-router';
import Comment from '../comment/comment';
import { Modal, Box } from '@mui/material';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addBookmark, removeBookmark, addLike, removeLike, incrementLikes, decrementLikes, addPost } from "redux/slices/postFunctions";
import toast, { Toaster } from 'react-hot-toast';

export default function Post({ post }) {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState();
    const [showComments, setShowComments] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const { content, likes, id, email, username, fullName, imgURL, profilepic, uid } = post;
    const [postLikes, setPostLikes] = useState(likes);
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const handleBookmarkClick = () => {
        if (user) {
            if (user.bookmarks.some(postID => postID === id)) {
                dispatch(removeBookmark({ userID: user.id, id: id }))
            } else {
                dispatch(addBookmark({ userID: user.id, id: id }));
            }
        }
        else {
            alert("Please sign in to add bookmark.");
            navigate("/login");
        }
    }

    const handleLikeClick = () => {
        if (user) {
            if (user.likes.some(postID => postID === id)) {
                dispatch(removeLike({ userID: user.id, id: id }))
                dispatch(decrementLikes({ id: id }))
                setPostLikes(postLikes - 1);
            } else {
                dispatch(addLike({ userID: user.id, id: id }));
                dispatch(incrementLikes({ id: id }));
                setPostLikes(postLikes + 1);
            }
        }
        else {
            alert("Please sign in to like.");
            navigate("/login");
        }
    }

    const fetchComments = async () => {
        try {
            let commentsArr = [];
            const res = await getDocs(commentsRef);
            res.docs.forEach((e) => {
                if (e.data().postID === id) {
                    commentsArr.push({ ...e.data(), id: e.id });
                }
            });
            setComments(commentsArr)
        } catch (e) {
            console.log(e)
        }
    }

    const addComment = async () => {
        try {
            const res = await addDoc(commentsRef, {
                comment: comment,
                fullName: user.fullName,
                postID: id,
                uid: JSON.parse(localStorage.getItem("uid")),
                profilepic: user.profilepic
            });
            setComment("")
            fetchComments();
        } catch (e) { console.log(e) }
    }

    const fetchPosts = async () => {
        try {
            const res = await getDocs(postsRef);
            let posts = [];
            res.forEach((doc) => {
                if (doc.data().uid === user.uid) {
                    posts.push({ ...doc.data(), id: doc.id });
                }
            });
            console.log(posts)
            dispatch(addPost({ posts: posts }));
        } catch (e) { toast.error(e) }
    }

    const deletePost = async () => {
        const res = await deleteDoc(doc(db, "posts", id));
        fetchPosts();
        toast.success("Post deleted.")
    }

    useEffect(() => {
        fetchComments();
    }, [user]);

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

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [newImage, setNewImage] = useState(imgURL);
    const [newContent, setNewContent] = useState(content);

    const handleSave = async () => {
        if (newImage === imgURL) {
            postData(imgURL);
        } else {
            try {
                const data = new FormData();
                data.append("file", newImage);
                data.append("upload_preset", "madhunter");
                data.append("cloud_name", "dqpanoobq");
                const res = await axios.post("https://api.cloudinary.com/v1_1/dqpanoobq/image/upload", data);
                postData(res.data.url);
            } catch (e) { console.log(e) }
        }
    }

    const postData = async (url) => {
        handleClose();
        try {
            const postRef = doc(db, `posts/${id}`);
            const res = await updateDoc(postRef, {
                content: newContent,
                imgURL: url
            })
            fetchPosts();
            toast.success("Saved post.");
        } catch (e) { console.log(e) }
    }


    return (
        <div className="post-container">
            {/* <Toaster /> */}
            <img className="avatar" src={profilepic} alt="user-avatar" />
            <div className="post-content">
                <div className="post-top-section">
                    <Link to={`/post/${id}`} className="post-link">
                        <div className="post-header">
                            <div>
                                <b>{fullName}</b>
                                <span style={{ 'color': 'grey' }}> @{username}</span>
                            </div>

                        </div>

                        <div>
                            {content}
                        </div>
                        <img src={imgURL} className="img-preview" />
                    </Link>
                    {
                        user && user.uid === uid ? <span onClick={() => setShowOptions(!showOptions)}><i className="fa-solid fa-ellipsis"></i></span>
                            : <span></span>
                    }
                </div>
                <div className="post-options" hidden={showOptions ? false : true}>
                    <div onClick={() => { setShowOptions(false); handleOpen(); }}> Edit post </div>
                    <div onClick={() => { setShowOptions(false); deletePost(); }}> Delete post </div>
                </div>

                <div className="post-icons">
                    {user && user.likes.includes(id) ?
                        <div>
                            <span onClick={handleLikeClick}> <i className="fa-solid fa-heart"></i> </span>
                            <span style={{ 'fontSize': '1rem' }}> {postLikes} </span>
                        </div> :
                        <div>
                            <span onClick={handleLikeClick}> <i className="fa-regular fa-heart"></i>
                                <span style={{ 'fontSize': '1rem' }}> {postLikes} </span>
                            </span>
                        </div>
                    }
                    <span onClick={() => setShowComments(!showComments)}> <i className="fa-regular fa-comment"></i>
                        <span style={{ 'fontSize': '1rem' }}> {comments.length} </span>
                    </span>
                    {/* not functional yet, commenting for roc8
                    <span> <i className="fa-regular fa-share-from-square"></i> </span> */}
                    {user && user.bookmarks.includes(id) ?
                        <div>
                            <span onClick={handleBookmarkClick}> <i className="fa-solid fa-bookmark"></i> </span>
                        </div> :
                        <div>
                            <span onClick={handleBookmarkClick}> <i className="fa-regular fa-bookmark"></i> </span>
                        </div>
                    }
                </div>
                <div hidden={showComments ? false : true}>
                    <div className="write-comment">
                        {
                            user !== null ?
                                <img alt="profile-pic" src={user.profilepic} className="avatar" />
                                : <div></div>
                        }
                        <input value={comment} type="text" onChange={(e) => setComment(e.target.value)} placeholder="Write a comment..." />
                        <i onClick={addComment} className="fa-solid fa-play"></i>
                    </div>
                    {
                        comments.map((cmt) => {
                            return <div key={cmt.id}><Comment details={cmt} /></div>
                        })
                    }
                </div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <center><h2> Edit Post </h2></center>
                        <div className="modal-ip-div">
                            <b> Enter post content </b>
                            <input type="text" value={newContent} onChange={(e) => setNewContent(e.target.value)} />
                        </div>
                        <input type="file" onChange={(e) => { setNewImage(e.target.files[0]) }} />
                        <div className="modal-options">
                            <button className="btn post-btn" onClick={handleClose}> Cancel </button>
                            <button className="btn post-btn" onClick={handleSave}> Save </button>
                        </div>
                    </Box>
                </Modal>
            </div>
        </div>
    )
}