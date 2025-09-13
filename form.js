document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const fields = ['username', 'email', 'password', 'confirmPassword'];
    const inputs = Object.fromEntries(fields.map(id => [id, document.getElementById(id)]));

    form.addEventListener('submit', e => {
        e.preventDefault();
        const validators = {
            username: v => v.length >= 3 || 'Username must be at least 3 characters.',
            email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Please enter a valid email.',
            password: v => v.length >= 8 || 'Password must be at least 8 characters.',
            confirmPassword: v => v === inputs.password.value || 'Passwords do not match.'
        };

        let isValid = true;
        fields.forEach(id => {
            const value = inputs[id].value.trim();
            const error = !value ? `${id.charAt(0).toUpperCase() + id.slice(1)} is required.` : validators[id](value);
            const errorDiv = document.getElementById(id + 'Error');

            if (error !== true) {
                errorDiv.textContent = error;
                inputs[id].classList.add('input-error');
                isValid = false;
            } else {
                errorDiv.textContent = '';
                inputs[id].classList.remove('input-error');
            }
        });

        if (isValid) {
            alert('Registration Successful!');
            form.reset();
        }
    });
});
