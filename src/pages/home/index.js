import React from 'react';
import './style.css';
import Navbar from '../../containers/navbar';
import CreatePost from '../../containers/create-post';
import Feed from '../../containers/feed';

export default function Home() {
    return (
        <div className="home">
            <Navbar />
            <CreatePost/>
            <Feed/>
        </div>
    )
}
