document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('sliderTrack');
    const thumb = document.getElementById('sliderThumb');
    const valueDisplay = document.getElementById('sliderValue');

    let isDragging = false;

    function getTrackRect() {
        return track.getBoundingClientRect();
    }

    function setPositionFromClientX(clientX) {
        const rect = getTrackRect();
        let offsetX = clientX - rect.left;
        offsetX = Math.max(0, Math.min(offsetX, rect.width));
        const percent = offsetX / rect.width;
        const value = Math.round(percent * 100);
        thumb.style.left = `${percent * 100}%`;

        valueDisplay.textContent = value;
        valueDisplay.style.left = `${percent * 100}%`;
    }

    function handleStart(event) {
        event.preventDefault();
        
        isDragging = true;

        setPositionFromClientX(event.clientX);
        thumb.style.cursor = 'grabbing';
    }
    function handleMove(event) {
        if (!isDragging) return;
        
        event.preventDefault();
        setPositionFromClientX(event.clientX);
    }

    function handleEnd() {
        if (isDragging) {
            isDragging = false;
            thumb.style.cursor = 'grab';
        }
    }

    thumb.addEventListener('mousedown', handleStart);

    track.addEventListener('mousedown', (event) => {
        if (event.target === thumb) return;
        
        handleStart(event);
    });
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleEnd);
    (function initialize() {
        const rect = getTrackRect();
        const initialPercent = 0.5;
        const initialValue = 50;
        
        thumb.style.left = `${initialPercent * 100}%`;
        valueDisplay.textContent = initialValue;
        valueDisplay.style.left = `${initialPercent * 100}%`;
    })();
});