
$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('p');
    console.log(name)
  $.ajax({
    url: 'https://localhost:7061/verify/' + name,
    type: 'POST',
    headers: {
      
      'Content-Type': 'application/json'
    },
    success: function (data) {
      new novaAlert({
            title: 'Register Success',
            text: 'Your account has been successfully registered. We will take you to the login page',
            icon: 'success',
            dismissButton: false,
            darkMode: false,
            ConfirmButtonText: 'Lets go',

         }).then((result) => {
                if (result) {
                    window.location.href = 'http://localhost/TTTN/person.html';
                }
            });

    },
    error: function (error) {
      console.error('Error:', error);
    }
  });
});