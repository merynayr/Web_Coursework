btn = document.getElementById('btn');

// ✅ Change button text on click
btn.addEventListener('click', function handleClick() {
    if (btn.textContent == 'Button clicked') {
        btn.textContent = 'Cleack me';
    } else {
        btn.textContent = 'Button clicked';
    }
}); 
console.log("Start");
