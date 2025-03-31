document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector('.intro');
    const avatar = document.querySelector('.avatar');

    const maxMovement = 15;

    container.addEventListener('mousemove', function (e) {
        if (!avatar) return;

        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left; // X pos
        const y = e.clientY - rect.top;  // Y pos

        const moveX = ((x / rect.width) - 0.5) * (maxMovement * 2);
        const moveY = ((y / rect.height) - 0.5) * (maxMovement * 2);

        avatar.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });

    container.addEventListener('mouseleave', function () {
        if (!avatar) return;
        avatar.style.transform = 'translate(0, 0)';

        avatar.style.transition = 'transform 0.5s ease-out';

        setTimeout(() => {
            avatar.style.transition = '';
        }, 500);
    });
});    
