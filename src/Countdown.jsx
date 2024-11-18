import { useEffect, useRef, useState } from "react";
import "../src/Countdown.css";
import CakeIcon from '@mui/icons-material/Cake';
import ReactConfetti from "react-confetti";
import { FaWhatsapp } from "react-icons/fa";
import image3 from "../src/assets/Images/IMG-20230127-WA0018.jpg";
import image4 from "../src/assets/Images/IMG-20230127-WA0023.jpg";
import image5 from "../src/assets/Images/IMG-20230607-WA0022.jpg";
import image7 from "../src/assets/Images/IMG-20230915-WA0067.jpg";
import image8 from "../src/assets/Images/IMG-20230915-WA0068.jpg";
import image9 from "../src/assets/Images/IMG-20240214-WA0044.jpg";


const Countdown = () => {

    const [timerDays, setTimerDays] = useState('00');
    const [timerhours, setTimerHours] = useState('00');
    const [timerMinutes, setTimerMinutes] = useState('00');
    const [timerSeconds, setTimerSeconds] = useState('00');
    const [isButtonActive, setIsButtonActive] = useState(false);
    const [showPopup, setShowPopup] = useState(false)
    

    let interval = useRef();

    const startTimer = () => {
        const countDownDate = new Date('November 22, 2024 00:00:00').getTime();

        interval - setInterval(() => {
            const now = new Date().getTime();
            const distance = countDownDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)));
            const minutes = Math.floor((distance % (1000 * 60 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            if (distance < 0) {
                clearInterval(interval.current);
                setIsButtonActive(true);
            } else {
                setTimerDays(days);
                setTimerHours(hours);
                setTimerMinutes(minutes);
                setTimerSeconds(seconds);
            }
        }, 1000)
    }

    useEffect(() => {
        startTimer();

        const currentInterval = interval.current;
        return () => {
            clearInterval(currentInterval);
        }
    })

    const [windowDimension, setWindowDimension] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    
      const [btn, setBtn] = useState(false);
    
      const detectSize = () => {
        setWindowDimension({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };
    
      useEffect(() => {
        window.addEventListener("resize", detectSize);
        return () => {
          window.removeEventListener("resize", detectSize);
        };
      }, [windowDimension]);

      const handleButtonClick = () => {
        setShowPopup(true);
        setBtn(true)
    };

    const closePopup = () => {
        setShowPopup(false); 
    };

  return (
  <>
  <section className="timer-container">
    <section className="timer">
        <div>
            <span><CakeIcon className="timer-icon" /></span>
            <h2>Countdown Timer</h2>
            <p>Countdown to a really special day.</p>
        </div>
        <div>
            <section>
                <p>{timerDays}</p>
                <p><small>day(s)</small></p>
            </section>
            <span>:</span>

            <section>
                <p>{timerhours}</p>
                <p><small>hours(s)</small></p>
            </section>
            <span>:</span>

            <section>
                <p>{timerMinutes}</p>
                <p><small>minute(s)</small></p>
            </section>
            <span>:</span>

            <section>
                <p>{timerSeconds}</p>
                <p><small>second(s)</small></p>
            </section>
        </div>
    </section>
  </section>


  <div className="button">
        <button disabled={!isButtonActive} onClick={handleButtonClick} className="btn">
          {isButtonActive ? "Click Me!!" : "Counting Down..."}
        </button>
        {btn && (
          <ReactConfetti
            width={windowDimension.width}
            height={windowDimension.height}
            tweenDuration={1000}
          />
        )}
      </div>

      

      {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>Happy Birthday Erica!!</h2>
                        <h5>The Special day has arrived!!</h5>
                        <p>Not only are you an amazing person, but you`ve also been my loyal streak partner on TikTok – over 100 days and counting! 💯👏 I`m so grateful to have someone who`s as dedicated to the streaks as to our friendship. And on top of that, you`re well on your way to becoming a badass programmer, breaking boundaries and building something incredible! 🚀👩‍💻</p>
                        <p>May this year be filled with even more fun moments, laughter, and memories worth recording! Here`s to you and all the exciting things this year will bring! ❤️✨</p>
                        
                        <p className="account">Send your account details here😏👇</p>
                        <div className="whatsapp-link"><a href="https://wa.me/8135854955?text=Send%20me%20your%20account%20details%20😏" target="_blank"><FaWhatsapp /></a></div>
                        <button onClick={closePopup} className="btns">Close</button>
                    </div>
                </div>
            )}

<div className="image">
  <div className="images">
  <img src={image3} alt="image3" loading="lazy" />
  <img src={image4} alt="image4" loading="lazy" />
  <img src={image5} alt="image4" loading="lazy" />
  <img src={image9} alt="image4" loading="lazy" />
  <img src={image7} alt="image4" loading="lazy" />
  <img src={image8} alt="image4" loading="lazy" />
  </div>
</div>
  </>
  );
};

export default Countdown;