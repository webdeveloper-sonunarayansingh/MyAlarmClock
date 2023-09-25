function updateClock() {
    const now = new Date();
    const hours = now.getHours() % 12 || 12; // 12-hour format
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const ampm = now.getHours() >= 12 ? 'PM' : 'AM';

    document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds} ${ampm}`;
}

function setAlarm() {
    const hr = parseInt(document.getElementById('hr').value);
    const min = parseInt(document.getElementById('min').value);
    const sec = parseInt(document.getElementById('sec').value);
    const ampm = document.getElementById('ampm').value;

    const alarmHour24 = (ampm === 'PM') ? (hr === 12 ? 12 : hr + 12) : (ampm === 'AM' ? (hr === 12 ? 0 : hr) : hr);
    const currentTime = new Date();
    const alarmDate = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), alarmHour24, min, sec);

    const listItem = document.createElement('li');
    listItem.textContent = `${hr}:${min}:${sec} ${ampm}`;
    listItem.className = 'alarm-item';

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function () {
        listItem.remove();
    };

    listItem.appendChild(deleteButton);

    document.getElementById('alarm-list').appendChild(listItem);

    // Set timeout to trigger the alarm
    const timeDifference = alarmDate - currentTime;
    if (timeDifference < 0) {
        alert('Alarm time has already passed.');
    } else {
        setTimeout(function () {
            alert(`Alarm! ${hr}:${min}:${sec} ${ampm}`);
            listItem.remove();
        }, timeDifference);
    }
}


// Update the clock every second
setInterval(updateClock, 1000);

// Initial clock update
updateClock();