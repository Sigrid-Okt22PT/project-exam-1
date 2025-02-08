document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    let isValid = true;
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const subjectError = document.getElementById('subjectError');
    const messageError = document.getElementById('messageError');
    
    // Clear previous error messages
    nameError.textContent = '';
    emailError.textContent = '';
    subjectError.textContent = '';
    messageError.textContent = '';

    // Validate name
    if (name.length <= 5) {
        nameError.textContent = 'Name must be more than 5 characters long.';
        isValid = false;
    }

    // Validate email
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!emailPattern.test(email)) {
        emailError.textContent = 'Please enter a valid email address.';
        isValid = false;
    }

    // Validate subject
    if (subject.length <= 15) {
        subjectError.textContent = 'Subject must be more than 15 characters long.';
        isValid = false;
    }

    // Validate message
    if (message.length <= 25) {
        messageError.textContent = 'Message must be more than 25 characters long.';
        isValid = false;
    }

    if (isValid) {
        alert('Form submitted successfully!');
    }
});
