const who = document.querySelector('.avatar-name');
const rollingTexts = document.querySelectorAll('.rolling-text');

const originalTexts = [
    "on the renewables power market",
    "currently based in Denmark"
];
const hoverTexts = [
    "with dev experience at EPFL",
    "originally from Switzerland"
];

function animateTextChange(index, newText) {
    const element = rollingTexts[index];

    element.style.transform = "translateY(100%)";
    element.style.opacity = "0";

    setTimeout(() => {
        element.textContent = newText;

        element.style.transform = "translateY(0)";
        element.style.opacity = "1";

    }, 300);
}

who.addEventListener('mouseenter', () => {
    animateTextChange(0, hoverTexts[0]);
    animateTextChange(1, hoverTexts[1]);

    rollingTexts.forEach(el => el.style.color = "var(--blue)");
});

who.addEventListener('mouseleave', () => {
    animateTextChange(0, originalTexts[0]);
    animateTextChange(1, originalTexts[1]);

    rollingTexts.forEach(el => el.style.color = "");
});
