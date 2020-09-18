import React from 'react';
import './Message.css';

function Message(props) {
  const {sender, date, content} = props.message;
  const time = new Date(Number.parseInt(date));
  const hour = time.getHours();
  const minute = time.getMinutes();

  function pad(num, size) {
    let s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
  }

  return (
    <div className="MessageHolder">
      <div 
        className={sender.name === props.host.name ? "Message host" : "Message"}>
        <div className="Text">{content}</div>
        <div className="Time">{pad(hour, 2)}:{pad(minute, 2)}</div>
      </div>
    </div>
  );
}

export default Message;