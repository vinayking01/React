import React, { useEffect, useRef } from 'react';
import './CategoryBar.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSideCategory } from '../../Store/SideCateogrySlice';

function CategoryBar() {
    const navigate = useNavigate();
    const cardRef = useRef();
    const Dispatch = useDispatch();

    let touchStartX = 0;
    let touchScrollLeft = 0;

    // Mouse wheel scrolling
    const MouseScroll = (event) => {
        event.preventDefault();
        cardRef.current.scrollLeft += event.deltaY;
    };

    // Touch start
    const handleTouchStart = (event) => {
        touchStartX = event.touches[0].clientX; // Record the starting touch position
        touchScrollLeft = cardRef.current.scrollLeft; // Record the current scroll position
    };

    // Touch move
    const handleTouchMove = (event) => {
        const touchX = event.touches[0].clientX; // Current touch position
        const distance = touchStartX - touchX; // Distance moved
        cardRef.current.scrollLeft = touchScrollLeft + distance; // Scroll the container
    };

    useEffect(() => {
        const currentCardRef = cardRef.current;

        // Add event listeners
        currentCardRef.addEventListener('wheel', MouseScroll);
        currentCardRef.addEventListener('touchstart', handleTouchStart);
        currentCardRef.addEventListener('touchmove', handleTouchMove);

        // Cleanup event listeners
        return () => {
            currentCardRef.removeEventListener('wheel', MouseScroll);
            currentCardRef.removeEventListener('touchstart', handleTouchStart);
            currentCardRef.removeEventListener('touchmove', handleTouchMove);
        };
    }, []);

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
        <div className="flex flex-row gap-4 cat-container overflow-hidden py-3" ref={cardRef}>
            {categories.map((category, index) => (
                <div
                    onClick={() => {
                        Dispatch(setSideCategory(null));
                        navigate(`/trending/${category}`, { replace: true });
                    }}
                    key={index}
                    className="custom-element card p-2 shadow-xl rounded"
                >
                    {category}
                </div>
            ))}
        </div>
    );
}

export default CategoryBar;
