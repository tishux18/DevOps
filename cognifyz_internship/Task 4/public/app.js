$(document).ready(function() {
    $('#userForm').on('submit', function(e) {
      var isValid = true;
  
      // Age validation
      var age = $('#age').val();
      if (age < 1 || age > 120) {
        alert('Please enter a valid age.');
        isValid = false;
      }
  
      // Password validation
      var password = $('#password').val();
      var passwordHelp = $('#passwordHelp');
      var passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      if (!passwordPattern.test(password)) {
        passwordHelp.text('Password must be at least 8 characters long and contain an uppercase letter, a lowercase letter, and a number.');
        passwordHelp.addClass('text-danger');
        isValid = false;
      } else {
        passwordHelp.text('Password looks good.');
        passwordHelp.removeClass('text-danger');
        passwordHelp.addClass('text-success');
      }
  
      if (!isValid) {
        e.preventDefault();
      }
    });
  });
  