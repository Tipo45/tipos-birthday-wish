import { useEffect, useRef, useState } from "react";
import "../src/Countdown.css";
import CakeIcon from '@mui/icons-material/Cake';
import ReactConfetti from "react-confetti";

const Countdown = () => {

    const [timerDays, setTimerDays] = useState('00');
    const [timerhours, setTimerHours] = useState('00');
    const [timerMinutes, setTimerMinutes] = useState('00');
    const [timerSeconds, setTimerSeconds] = useState('00');
    const [isButtonActive, setIsButtonActive] = useState(false);
    const [showPopup, setShowPopup] = useState(false)
    

    let interval = useRef();

    const startTimer = () => {
        const countDownDate = new Date('October 29, 2024 00:00:00').getTime();

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
                <p><small>hours</small></p>
            </section>
            <span>:</span>

            <section>
                <p>{timerMinutes}</p>
                <p><small>minutes</small></p>
            </section>
            <span>:</span>

            <section>
                <p>{timerSeconds}</p>
                <p><small>seconds</small></p>
            </section>
        </div>
    </section>
  </section>
  <div>
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
                        <h3>Happy Birthday Dear!</h3>
                        <h5>The Special day has arrived!!</h5>
                        <p>On your special day, I just want to remind you how amazing you are. You`re not just my sister, but my best friend, confidant, and biggest supporter. I`m so lucky to have you by my side. </p>
                        <p>As you celebrate today, I hope your heart is filled with as much joy as you bring to everyone around you. May this year bring you endless happiness, success, and all the love you deserve.</p>
                        <p>Enjoy every moment – today is all about you! Love you always! ❤️🎂</p>
                        <button onClick={closePopup} className="btns">Close</button>
                    </div>
                </div>
            )}
  </>
  );
};

export default Countdown;