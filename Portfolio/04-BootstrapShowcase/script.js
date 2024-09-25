const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    const popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });

document.addEventListener("scroll", function() {
    // Calculate the scroll percentage
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;

    // Update the progress bar width
    const progressBar = document.getElementById('progressBar');
    progressBar.style.width = scrollPercent + '%';
    progressBar.setAttribute('aria-valuenow', scrollPercent);
});