import React, { useRef, forwardRef, useImperativeHandle } from "react";
import { createPortal } from "react-dom";

const ResultModal = forwardRef(({ targetTime, timeLeft, onReset }, ref) => {
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      }
    };
  });

  const formattedTimeLeft = (timeLeft/1000).toFixed(2);
  const userLost = timeLeft <= 0;
  const score = ((1 - timeLeft/(targetTime * 1000)) * 100).toFixed(2);

  return createPortal(
    <dialog ref={dialog} className="result-modal" onClose={onReset}>
      {userLost ? <h2>You lost!</h2> : <h2>Score: {score}</h2>}
      <p>The target time was <strong>{targetTime} second{targetTime > 1 && "s"}.</strong></p>
      <p>You stopped the timer with <strong>{formattedTimeLeft} second{formattedTimeLeft > 1 && "s"} left.</strong></p>
      <form method="dialog">
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
});

export default ResultModal;