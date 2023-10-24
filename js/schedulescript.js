$(document).ready(function () {
  $('#appointment-form').submit(function (event) {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của form
    var name = $("#name").val();
            var email = $("#email").val();
            var phone = $("#phone").val();
            var eventname = $("#eventname").val();
            var description = $("#description").val();
            // Get date and time values and combine into a single string
            var date = $("#date").val();
var time = $("#time").val();
var dateTimeString = date + " " + time;
  

            var username = localStorage.getItem('username')
            const obj = { eventname: eventname, starttime: dateTimeString, email: email, description: description,name: name,phoneNumber:phone, username: username};
            // Send the data to the API using AJAX
            console.log(obj)
            $.ajax({
                type: "POST",
                url: "https://localhost:7061/api/Schedule/RegisSchedule", // Replace with your API endpoint
                headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('token'),
                  'Content-Type': 'application/json'
                },
                data: JSON.stringify(obj),
                processData: false,
                contentType: 'application/json',
                success: function(response) {
                    success();
                },
                error: function(xhr, status, error) {
                    // Handle error response here
                    console.error(error.responseText);
                    danger();
                }
            });
  });
});