import React, { useEffect, useState } from 'react';

const Home = () => {
const Animate = "Welcome to Our Website!";
const [headlineVisible, setHeadlineVisible] = useState("");
const animationSpeed = 100;

useEffect(() => {
  let currentIndex = 0;
  const animateText = () => {
    if (currentIndex <= Animate.length) {
      setHeadlineVisible(Animate.slice(0, currentIndex));
      currentIndex++;
      setTimeout(animateText, animationSpeed);
    } else {
      // Animation complete, reset currentIndex to start over
      currentIndex = 0;
      setTimeout(animateText, animationSpeed);
    }
  };

  animateText();

  // Clean up the timer when the component unmounts
  return () => clearTimeout();
}, []);

    return (
        <h1>
            {headlineVisible}
        </h1>
    );
    
};

export default Home;