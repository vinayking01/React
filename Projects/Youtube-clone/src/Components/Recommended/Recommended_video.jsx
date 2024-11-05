import React from 'react'
import './Recommended.css'
import thumbnail1 from '../../assets/thumbnail1.png'
import thumbnail2 from '../../assets/thumbnail2.png'
import thumbnail3 from '../../assets/thumbnail3.png'
import thumbnail4 from '../../assets/thumbnail4.png'
import thumbnail5 from '../../assets/thumbnail5.png'
import thumbnail6 from '../../assets/thumbnail6.png'
import thumbnail7 from '../../assets/thumbnail7.png'
import thumbnail8 from '../../assets/thumbnail8.png'


function Recommended_video() {
  return (
    <div className='recommended basis-[28%]'>
        <div className="side-video-list flex justify-between mt-[8px]">
            <img src={thumbnail1} alt="" />
            <div className="vid-info">
                <h4>Best channel that helps you to be a developer</h4>
                <p>Channel Name</p>
                <p>Views</p>
            </div>
        </div>
        <div className="side-video-list flex justify-between mt-[8px]">
            <img src={thumbnail2} alt="" />
            <div className="vid-info">
                <h4>Best channel that helps you to be a developer</h4>
                <p>Channel Name</p>
                <p>Views</p>
            </div>
        </div>
        <div className="side-video-list flex justify-between mt-[8px]">
            <img src={thumbnail3} alt="" />
            <div className="vid-info">
                <h4>Best channel that helps you to be a developer</h4>
                <p>Channel Name</p>
                <p>Views</p>
            </div>
        </div>
        <div className="side-video-list flex justify-between mt-[8px]">
            <img src={thumbnail4} alt="" />
            <div className="vid-info">
                <h4>Best channel that helps you to be a developer</h4>
                <p>Channel Name</p>
                <p>Views</p>
            </div>
        </div>
        <div className="side-video-list flex justify-between mt-[8px]">
            <img src={thumbnail1} alt="" />
            <div className="vid-info">
                <h4>Best channel that helps you to be a developer</h4>
                <p>Channel Name</p>
                <p>Views</p>
            </div>
        </div>
        <div className="side-video-list flex justify-between mt-[8px]">
            <img src={thumbnail2} alt="" />
            <div className="vid-info">
                <h4>Best channel that helps you to be a developer</h4>
                <p>Channel Name</p>
                <p>Views</p>
            </div>
        </div>
        <div className="side-video-list flex justify-between mt-[8px]">
            <img src={thumbnail3} alt="" />
            <div className="vid-info">
                <h4>Best channel that helps you to be a developer</h4>
                <p>Channel Name</p>
                <p>Views</p>
            </div>
        </div>
        <div className="side-video-list flex justify-between mt-[8px]">
            <img src={thumbnail4} alt="" />
            <div className="vid-info">
                <h4>Best channel that helps you to be a developer</h4>
                <p>Channel Name</p>
                <p>Views</p>
            </div>
        </div>
    </div>
  )
}

export default Recommended_video