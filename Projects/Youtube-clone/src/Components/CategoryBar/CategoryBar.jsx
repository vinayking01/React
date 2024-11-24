import React, { useEffect } from 'react'
import './CategoryBar.css'
import { useRef } from 'react'
import { Link } from 'react-router-dom';

function CategoryBar() {
    const cardRef = useRef();
    function MouseScroll(event) {
        event.preventDefault();
        cardRef.current.scrollLeft += event.deltaY;

    }
    useEffect(() => {
        cardRef.current.addEventListener('wheel', MouseScroll)
    }, [])

    const categories = [
        "Bhojpuri song",
        "Action movies Best",
        "Social Media Trends",
        "Books and Literature",
        "Exam Preparation",
        "Fitness and Yoga",
        "Relationships",
        "Festivals",
        "Fashion",
        "Home Decor",
        "Automobiles",
        "Spirituality",
        "Stock Market",
        "Celebrity Gossip",
        "How-to Guides",
    ];

    return (
        <div className='flex flex-row gap-4 cat-container overflow-hidden py-3' ref={cardRef}>
            {categories.map((category, index) => (
                <Link to={`/search/${category}`} key={index} className="custom-element card p-2 shadow-xl rounded"
                >
                    {category}
                </Link>
            ))}
        </div>
    )
}

export default CategoryBar