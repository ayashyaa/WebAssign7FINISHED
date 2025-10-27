document.addEventListener('DOMContentLoaded', () => {

    const toggleBtn = document.getElementById('themeToggle');
    const body = document.body;

    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        toggleBtn.textContent = '🌙';
    } else {
        toggleBtn.textContent = '☀️';
    }

    toggleBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            toggleBtn.textContent = '🌙';
        } else {
            localStorage.setItem('theme', 'light');
            toggleBtn.textContent = '☀️';
        }
    });



    // MODAL POPUP
    const openPopupBtn = document.getElementById('open-popup-btn');
    const closePopupBtn = document.getElementById('close-popup-btn');
    const contactModal = document.getElementById('contact-modal');
    const modalContent = contactModal ? contactModal.querySelector('.modal-content-js') : null;
    const contactForm = modalContent ? modalContent.querySelector('form') : null;


// MODAL SUBMIT WITH SUCCESS SOUND
if (contactForm && modalContent && contactModal) {
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();

        contactForm.style.display = 'none';

        const thankYouMessage = document.createElement('div');
        thankYouMessage.id = 'thank-you-message';
        thankYouMessage.innerHTML = `
            <h2 style="text-align: center; color: #0D1117;">Thank you, Client!</h2>
            <p style="text-align: center; color: #0D1117;">Your request has been successfully submitted.</p>
        `;
        modalContent.appendChild(thankYouMessage);

        // play success sound
        const successSound = document.getElementById('success-sound');
        if (successSound) successSound.play();

        setTimeout(() => {
            contactModal.style.display = 'none';
            contactForm.reset();
            thankYouMessage.remove();
            contactForm.style.display = 'block';
        }, 3000);
    });
}


// MODAL CLOSE ON ESC KEY
window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && contactModal.style.display === 'block') {
        contactModal.style.display = 'none';
    }
});

// NAVBAR KEYBOARD NAVIGATION
const navLinks = document.querySelectorAll('#navbarNavContent .nav-link');
let focusedIndex = -1;

window.addEventListener('keydown', (event) => {
    if (navLinks.length === 0) return;

    if (event.key === 'ArrowRight') {
        focusedIndex = (focusedIndex + 1) % navLinks.length;
        navLinks[focusedIndex].focus();
    } else if (event.key === 'ArrowLeft') {
        focusedIndex = (focusedIndex - 1 + navLinks.length) % navLinks.length;
        navLinks[focusedIndex].focus();
    }
});


    function isModalOpen() {
        return contactModal && contactModal.style.display === 'block';
    }

    function showModal() {
        if (contactModal) {
            contactModal.style.display = 'block';
            if (modalContent && contactForm) {
                const existingMessage = modalContent.querySelector('#thank-you-message');
                if (existingMessage) {
                    existingMessage.remove();
                    contactForm.style.display = 'block';
                }
            }
        }
    }

    function hideModal() {
        if (contactModal) contactModal.style.display = 'none';
    }

    hideModal();
    if (openPopupBtn) openPopupBtn.addEventListener('click', (e) => { e.preventDefault(); showModal(); });
    if (closePopupBtn) closePopupBtn.addEventListener('click', hideModal);
    window.addEventListener('click', (e) => { if (e.target === contactModal) hideModal(); });
    window.addEventListener('keydown', (e) => { if (e.key === 'Escape' && isModalOpen()) hideModal(); });



    // RATING STARS
    const stars = document.querySelectorAll('#star-rating .fa-star');
    const ratingDisplay = document.getElementById('rating-display');
    let currentRating = 0;

    function updateStars(activeValue, isHover = false) {
        stars.forEach(star => {
            const starValue = parseInt(star.dataset.value);
            if (starValue <= activeValue) star.classList.add('active');
            else star.classList.remove('active');
            star.style.transform = 'scale(1)';
        });
    }

    stars.forEach(star => {
        star.addEventListener('click', () => {
            currentRating = parseInt(star.dataset.value);
            updateStars(currentRating);
            ratingDisplay.textContent = `Thank you! You rated us on: ${currentRating}/5.`;
            const clickSound = document.getElementById('click-sound');
            if (clickSound) clickSound.play();
        });
        star.addEventListener('mouseover', () => updateStars(parseInt(star.dataset.value), true));
        star.addEventListener('mouseout', () => updateStars(currentRating));
    });



    // SHOW TIME
    const showTimeButton = document.getElementById('show-time-btn');
    const dateTimeElement = document.getElementById('current-datetime');
    let isTimeVisible = false;
    const defaultTimeText = 'Press "Show time"';

    function displayCurrentTime() {
        const now = new Date();
        const time = now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
        const date = now.toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' });
        return `Current Time: ${date}, ${time}`;
    }

    function toggleTimeDisplay() {
        if (!dateTimeElement || !showTimeButton) return;
        if (isTimeVisible) {
            dateTimeElement.textContent = defaultTimeText;
            showTimeButton.textContent = 'Show time';
            isTimeVisible = false;
        } else {
            dateTimeElement.textContent = displayCurrentTime();
            showTimeButton.textContent = 'Mute time';
            isTimeVisible = true;
        }
    }

    if (showTimeButton) {
        showTimeButton.addEventListener('click', toggleTimeDisplay);
        dateTimeElement.textContent = defaultTimeText;
    }

 
    var projectData = [
        { id: 1, name: "Luxury Apartment", category: "Interiors", imgSrc: "filter1.jpeg" },
        { id: 2, name: "Modern Villa", category: "Architecture", imgSrc: "filter2.jpeg" },
        { id: 3, name: "Minimalist Kitchen", category: "Interiors", imgSrc: "filter3.jpeg" },
        { id: 4, name: "Future Skyscraper", category: "Concept", imgSrc: "filter4.jpeg" },
        { id: 5, name: "Loft Design", category: "Interiors", imgSrc: "filter5.jpeg" }
    ];


    const projectListContainer = document.getElementById('project-list-container');
    const filterStatus = document.getElementById('filter-status');

    function renderProjects(projects) {
        if (!projectListContainer) return;
        projectListContainer.innerHTML = '';
        if (projects.length === 0) {
            projectListContainer.innerHTML = '<div class="col-12 text-center text-muted">Проекты отсутствуют.</div>';
            return;
        }
        projects.forEach(project => {
            const card = document.createElement('div');
            card.classList.add('col', 'project-card');
            card.innerHTML = `
                <div class="card h-100 shadow-sm portfolio-item">
                    <img src="${project.imgSrc}" class="card-img-top" alt="${project.name}" style="height:200px;object-fit:cover;">
                    <div class="card-body">
                        <h5 class="card-title">${project.name}</h5>
                        <p class="card-text text-muted">${project.category}</p>
                    </div>
                </div>
            `;
            projectListContainer.appendChild(card);
        });
        if (filterStatus) filterStatus.textContent = `Shown ${projects.length} projects.`;
    }

    renderProjects(projectData);


    
    // FILTER BUTTONS
    const filterButtons = document.querySelectorAll('#project-filters .btn-outline-dark');
    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const type = e.target.dataset.filter;
            let filtered = [];
            if (type === 'All') filtered = projectData;
            else filtered = projectData.filter(p => p.category === type);

            renderProjects(filtered);

            if (filterStatus) filterStatus.textContent = type === 'All' ? `Shown ${filtered.length} all projects.` :
                `Shown ${filtered.length} projects in "${type}".`;

            const searchBar = document.getElementById('project-search');
            if (searchBar) searchBar.value = '';
        });
    });



    // JQUERY FOR SEARCH 
    if (typeof jQuery !== 'undefined') {
        $(document).ready(function () {
            const $searchBar = $('#project-search');
            const $suggestions = $('#autocomplete-suggestions');

            function highlightText(text, query) {
                if (!query) return text;
                const escaped = query.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
                const regex = new RegExp(`(${escaped})`, 'gi');
                return text.replace(regex, '<mark>$1</mark>');
            }

            function filterProjectsLive(query) {
                const lower = query.toLowerCase();
                $('#project-list-container .project-card').each(function () {
                    const $card = $(this);
                    if (!$card.data('original')) $card.data('original', $card.find('.card-body').html());
                    const body = $card.find('.card-body');
                    if (!lower || $card.text().toLowerCase().includes(lower)) {
                        $card.show();
                        body.find('.card-title').html(highlightText(body.find('.card-title').text(), query));
                        body.find('.card-text').html(highlightText(body.find('.card-text').text(), query));
                    } else {
                        $card.hide();
                        body.html($card.data('original'));
                    }
                });
            }

            function showSuggestions(query) {
                $suggestions.empty().hide();
                if (!query.trim()) return;
                const matches = projectData.map(p => p.name).filter(name => name.toLowerCase().includes(query.toLowerCase())).slice(0, 5);
                matches.forEach(name => {
                    const $item = $('<a>')
                        .attr('href', '#')
                        .addClass('list-group-item list-group-item-action bg-white')
                        .html(highlightText(name, query))
                        .on('click', function (e) {
                            e.preventDefault();
                            $searchBar.val(name);
                            $suggestions.empty().hide();
                            filterProjectsLive(name);
                        });
                    $suggestions.append($item);
                });
                if (matches.length) $suggestions.show();
            }

            $searchBar.on('keyup', function () {
                const query = $(this).val();
                filterProjectsLive(query);
                showSuggestions(query);
            });

            $(document).on('click', function (e) {
                if (!$(e.target).closest('#project-search, #autocomplete-suggestions').length) $suggestions.empty().hide();
            });
        });
    }


    $(document).ready(function() {


    // SCROLL PROGRESS BAR 
    const $progressBar = $('<div id="scroll-progress"></div>').css({
        position: 'fixed',
        top: 0,
        left: 0,
        width: '0%',
        height: '6px',
        background: 'linear-gradient(90deg, #D1495B, #080a0aff)',
        zIndex: 9999,
        transition: 'width 0.25s ease-out'
    }).appendTo('body');

    $(window).on('scroll', function() {
        const scrollTop = $(this).scrollTop();
        const docHeight = $(document).height() - $(window).height();
        const scrolled = (scrollTop / docHeight) * 100;
        $progressBar.css('width', scrolled + '%');
    });


    // ANIMATED NUMBER COUNTER 
    function animateCounter($el) {
        const target = parseInt($el.data('count'));
        $({ count: 0 }).animate({ count: target }, {
            duration: 2000,
            easing: 'swing',
            step: function(now) {
                $el.text(Math.floor(now));
            },
            complete: function() {
                $el.text(target);
            }
        });
    }

    function handleCounters() {
        $('#stats-section [data-count]').each(function() {
            const $counter = $(this);
            if (!$counter.hasClass('counted') && isInViewport($counter)) {
                $counter.addClass('counted');
                animateCounter($counter);
            }
        });
    }

    function isInViewport($el) {
        const rect = $el[0].getBoundingClientRect();
        return rect.top < $(window).height() && rect.bottom >= 0;
    }

    $(window).on('scroll', handleCounters);
    handleCounters(); // initial check

});


// NOTIFICATION SYSTEM
function showNotification(message, duration = 3000) {
    const $toast = $('<div class="custom-toast"></div>').text(message).css({
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        background: '#D1495B',
        color: '#fff',
        padding: '10px 20px',
        borderRadius: '5px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        zIndex: 10000,
        display: 'none'
    }).appendTo('body');

    $toast.fadeIn(400).delay(duration).fadeOut(400, function() {
        $(this).remove();
    });
}



// COPY TO CLIPBOARD BUTTON
$('.copy-btn').on('click', function() {
    const $btn = $(this);
    const targetSelector = $btn.data('clipboard-target');
    const $target = $(targetSelector);

    if ($target.length === 0) return;

    const textToCopy = $target.clone()     
        .children('.copy-btn').remove()       
        .end().text().trim();            

    navigator.clipboard.writeText(textToCopy).then(() => {
        const $icon = $btn.find('i');
        const originalIcon = $icon.attr('class');
        $icon.attr('class', 'fas fa-check');
        $btn.attr('title', 'Copied to clipboard!').tooltip({ trigger: 'manual' }).tooltip('show');

        setTimeout(() => {
            $icon.attr('class', originalIcon);
            $btn.tooltip('hide');
        }, 1500);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
});


});
