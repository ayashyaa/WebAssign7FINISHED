document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('estimateForm');
    if (!form) return;

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        event.stopPropagation();

        let formIsValid = true;

        const inputElements = form.querySelectorAll('.form-control, .form-select');
        inputElements.forEach(el => {
            el.classList.remove('is-invalid', 'is-valid');
            const feedback = document.getElementById(el.id + 'Feedback');
            if (feedback) feedback.textContent = '';
        });

        function displayError(inputId, message) {
            const input = document.getElementById(inputId);
            const feedback = document.getElementById(inputId + 'Feedback');
            if (input) {
                input.classList.add('is-invalid');
                if (feedback) feedback.textContent = message;
                formIsValid = false;
            }
        }

        function markValid(inputId) {
            const input = document.getElementById(inputId);
            if (input) input.classList.add('is-valid');
        }

        const name = document.getElementById('name');
        if (name.value.trim() === '') {
            displayError('name', 'Full Name is required.');
        } else {
            markValid('name');
        }

        const email = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        if (email.value.trim() === '') {
            displayError('email', 'Email address is required.');
        } else if (!emailRegex.test(email.value.trim())) {
            displayError('email', 'Please enter a valid email address (e.g., user@domain.com).');
        } else {
            markValid('email');
        }

        const projectType = document.getElementById('project-type');
        if (projectType.value === '') {
            displayError('project-type', 'Please select a project type.');
        } else {
            markValid('project-type');
        }

        const area = document.getElementById('area');
        if (area.value.trim() !== '') {
            const areaValue = parseFloat(area.value);
            if (isNaN(areaValue) || areaValue < 1) {
                displayError('area', 'Area must be a number greater than or equal to 1 m^2.');
            } else {
                markValid('area');
            }
        }

        const budget = document.getElementById('budget');
        if (budget.value.trim() !== '') markValid('budget');

        const phone = document.getElementById('phone');
        if (phone && phone.value.trim() !== '') markValid('phone');

        const deadline = document.getElementById('deadline');
        if (deadline && deadline.value.trim() !== '') markValid('deadline');

        if (formIsValid) {
            const formData = {
                name: name.value,
                email: email.value,
                projectType: projectType.value,
                area: area.value,
                budget: budget.value,
                phone: phone.value,
                deadline: deadline.value
            };

            fetch('http://localhost:3000/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })
                .then(res => res.json())
                .then(data => {
                    console.log("Server response:", data);

                    const successModal = new bootstrap.Modal(document.getElementById('successModal'));
                    successModal.show();
                    
                    const successSound = document.getElementById('successSound');
                    if (successSound) {
                        successSound.currentTime = 0;
                        successSound.play();
                    }

                    form.reset();
                    inputElements.forEach(el => el.classList.remove('is-valid'));
                })
                .catch(err => {
                    console.error("Error while sending:", err);
                    alert("An error occurred while submitting the form. Please try again later.");
                });
        }
    });

    const resetBtn = document.getElementById('resetBtn');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            document.querySelectorAll('#estimateForm input, #estimateForm textarea, #estimateForm select')
                .forEach(el => {
                    el.value = '';
                    el.classList.remove('is-valid', 'is-invalid');
                });
        });
    }

});

$(document).ready(function() {
    const $progressBar = $('#scroll-progress-bar');
    function updateScrollProgress() {
        const docHeight = $(document).height(); 
        const windowHeight = $(window).height();
        const scrollPos = $(window).scrollTop();

        const scrollableHeight = docHeight - windowHeight;

        let percentage = 0;
        
        if (scrollableHeight > 0) {
            percentage = (scrollPos / scrollableHeight) * 100;
        } else {
            percentage = 100;
        }

        $progressBar.css('width', percentage + '%');
    }
    $(window).on('scroll', updateScrollProgress);
    
    updateScrollProgress(); 
});

$(document).ready(function() {

    const $form = $('#estimateForm');
    const $submitBtn = $('#submitBtn');
    const $submitBtnText = $('#submitBtnText');
    const $submitBtnSpinner = $('#submitBtnSpinner');

    $form.on('submit', function(e) {
        e.preventDefault(); 
        $submitBtn.prop('disabled', true).addClass('disabled'); 
        
        $submitBtnText.addClass('d-none');
        $submitBtnSpinner.removeClass('d-none');

        setTimeout(function() {
            
            $submitBtn.prop('disabled', false).removeClass('disabled');
            
            $submitBtnText.removeClass('d-none');
            $submitBtnSpinner.addClass('d-none');
            
            $('#successModal').modal('show');
            
            $form[0].reset(); 

        }, 2000);
    });
});

