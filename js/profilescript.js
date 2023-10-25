$(document).ready(function () {
  $.ajax({
    url: 'https://localhost:7061/api/Profile/GetProfile',
    type: 'GET',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
      'Content-Type': 'application/json'
    },
    success: function (data) {
      $('.patient-name').val(data.name);
      $('.acc-email').val(data.email);
      $('.acc-name').val(data.username);
      $('.acc-phone').val(data.phoneNumber);
      $('.acc-address').val(data.address);
      $('.acc-insurance').val(data.insuranceId);
      if(data.insuranceId != null){
        $('.registerInsurance').hide();
      }else $('.registerInsurance').show();
      $('.title_name').text(data.name);
      console.log(data.img)
      if(data.img != null){
          var baseUrl = "https://localhost:7061"; // Replace this with your server's base URL

      var imageUrl = baseUrl + "/images/" + data.img.split('\\').pop();
      
      $('.shadow').attr('src', imageUrl);
      }
      if(data.status == 0){
        window.location.href = '../Deloy-Giaodien/login.html';
        warning("please active your email");
      }
    },
    error: function (error) {
      console.error('Error:', error);
    }
  });
});
function loadUserData() {
  $.ajax({
    url: 'https://localhost:7061/api/Profile/GetProfile',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
      'Content-Type': 'application/json'
    },
    method: 'GET',
    dataType: 'json',
    success: function(data) {
      $('.patient-name').val(data.name);
      $('.acc-email').val(data.email);
      $('.acc-name').val(data.username);
      $('.acc-phone').val(data.phoneNumber);
      $('.acc-address').val(data.address);
      $('.acc-insurance').val(data.insuranceId);
      $('.title_name').text(data.name);

      // Tạo URL mới để tránh cache
      $('.shadow').attr('src', data.img);
    },
    error: function(error) {
      console.error('Error:', error);
    }
  });
}
function isTokenExpired(token) {
  // Get the token payload
  const payload = JSON.parse(atob(token.split('.')[1]));

  // Extract the expiration date from the payload (assuming the token contains an 'exp' claim)
  const expirationDate = new Date(payload.exp * 1000); // Convert to milliseconds

  // Get the current date
  const currentDate = new Date();

  // Compare the expiration date with the current date
  return currentDate > expirationDate;
}
$(document).ready(function(){
	if(localStorage.getItem('token') == null || isTokenExpired(localStorage.getItem('token')) == true){
		 window.location.href = '../Deloy-Giaodien/login.html';
	}
});
console.log(localStorage.getItem('token'))
$(document).ready(function() {
    // Biến để lưu trạng thái chỉnh sửa
    var isEditMode = false;

    // Xử lý sự kiện khi nút "Update" được bấm
    $('.btn_update_person').click(function() {
        // Khi bấm "Update", các trường input mở khóa cho phép chỉnh sửa
        if (!isEditMode) {
            $('.patient-name').prop('readonly', false);
            $('.acc-email').prop('readonly', false);
            $('.acc-phone').prop('readonly', false);
            $('.acc-address').prop('readonly', false);
            $('.btn_update_person').hide();
            $('.btn_apply_person').show();
            isEditMode = true;
        }
    });

    // Xử lý sự kiện khi nút "Cancel" được bấm
    $('.btn_cancel_person').click(function() {
        // Khi bấm "Cancel", hủy bỏ việc chỉnh sửa và khóa các trường input
        if (isEditMode) {
            $('.patient-name').prop('readonly', true);
            $('.acc-email').prop('readonly', true);
            $('.acc-phone').prop('readonly', true);
            $('.acc-address').prop('readonly', true);
            $('.btn_update_person').show();
            $('.btn_apply_person').hide();
            isEditMode = false;
        }
    });

    // Khi form được nộp (submit)
    $('.btn_apply_person').click(function() {
       
        // Chỉ gửi dữ liệu lên server khi đang ở chế độ chỉnh sửa (isEditMode = true)
        if (isEditMode) {
            // Lấy thông tin từ các trường input
            var name = $('.patient-name').val();
            var email = $('.acc-email').val();
            var phoneNumber = $('.acc-phone').val();
            var address = $('.acc-address').val();

            const obj = { name: name, phoneNumber: phoneNumber, email: email, address: address };
            // Lấy token từ nơi bạn lưu trữ nó (ví dụ: localStorage)
            var token = localStorage.getItem('token');
            console.log(token)
            // Gửi dữ liệu lên server qua AJAX
            $.ajax({
                url: 'https://localhost:7061/api/Profile/GetProfile/Update',
                type: 'POST',
                data: JSON.stringify(obj),
                processData: false,
                contentType: 'application/json',
                beforeSend: function (xhr) {
                    // Thêm Bearer token vào header của request
                    xhr.setRequestHeader('Authorization', 'Bearer ' + token);
                },
                success: function(data) {
                    // Xử lý kết quả thành công tại đây
                    console.log(data);
                    // Sau khi cập nhật thành công, khóa các trường input
                    $('.patient-name').prop('readonly', true);
                    $('.acc-email').prop('readonly', true);
                    $('.acc-phone').prop('readonly', true);
                    $('.acc-address').prop('readonly', true);
                    isEditMode = false;
                    success();

                },
                error: function(error) {
                    // Xử lý lỗi tại đây
                    console.error(error);
                    danger();
                }
            });
        }
    });
});
$(document).ready(function () {
  $('.form_image').submit(function (event) {
    event.preventDefault();
    var imageFile = $('#imageInput')[0].files[0];
    var userType = localStorage.getItem('rolename');

    // Tạo đối tượng FormData
    var formData = new FormData();
    formData.append('image', imageFile);
    formData.append('userType', userType);

    var token = localStorage.getItem('token');

    // Gửi dữ liệu lên server qua AJAX sử dụng FormData
    $.ajax({
      url: 'https://localhost:7061/api/Profile/UploadImg',
      type: 'POST',
      data: formData, // Sử dụng formData thay vì JSON.stringify(obj)
      processData: false,
      contentType: false, // Không cần đặt contentType khi sử dụng FormData
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + token);
      },
      success: function (data) {
        console.log(data);
        success();
        loadUserData();
      },
      error: function (error) {
        console.error(error);
        danger();
      }
    });
  });
});
$(document).ready(function(){
	$('.btn_changepass_cancel').click(function() {
        // Khi bấm "Update", các trường input mở khóa cho phép chỉnh sửa
            $('.oldpass').val('');
            $('.newpass').val('');
            $('.conewpass').val('');
    });
});
$(document).ready(function () {
  $('#form_changepass').submit(function (event) {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của form

    var oldpass = $('.oldpass').val();
    var newpass = $('.newpass').val();
    var conewpass = $('.conewpass').val();
    var userType = localStorage.getItem('rolename');

    // Tạo đối tượng FormData
    const obj = { oldPass: oldpass, newPass: newpass, confirmPassword: conewpass };

    var token = localStorage.getItem('token');

    // Gửi dữ liệu lên server qua AJAX sử dụng FormData
    $.ajax({
      url: 'https://localhost:7061/api/Profile/ChangePassword',
      type: 'POST',
      data: JSON.stringify(obj),
      processData: false,
      contentType: 'application/json',
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + token);
      },
      success: function (data) {
        console.log(data);
        success();
        setTimeout(function () {
          window.location.href = '../Deloy-Giaodien/login.html';
          sessionStorage.clear();
        }, 10000);
      },
      error: function (error) {
        console.error(error.responseText);
        danger();
        warning(error.responseText);
      }
    });
  });
});
$(document).ready(function () {
  $('#hospitalNameupdate').change(function () {
    if ($(this).val() === 'Other') {
      $('#otherHospitalGroup').show();
      $('.feeupdate').val('Giảm viện phí -10%')
    } else {
      $('#otherHospitalGroup').hide();
      $('.feeupdate').val('Giảm viện phí -80%')
    }
  });
});
function loadImgInsurance() {
  $.ajax({
    url: 'https://localhost:7061/api/HHS/GetHHS',
    type: 'GET',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
      'Content-Type': 'application/json'
    },
    success: function(data) {
      if (data.startus != 0) {
        var baseUrl = "https://localhost:7061"; // Replace this with your server's base URL

      var imageUrl = baseUrl + "/images/" + data.img.split('\\').pop();
       $('.image_hhs').attr('src', imageUrl);

      }
    },
    error: function(error) {
      console.error('Error:', error);
    }
});
}
$(document).ready(function() {

  	$.ajax({
    url: 'https://localhost:7061/api/HHS/GetHHS',
    type: 'GET',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
      'Content-Type': 'application/json'
    },
    success: function(data) {
      if(data !=null){
        if (data.startus != 0) {
          $('.insuranceId').val(data.insuranceId);
          $('.hospitalName').val(data.hospitalName);
          $('.fee').val(data.fee);
          var createday = data.usedate;
      var dateObject = new Date(createday);
      var formattedDate = dateObject.toISOString().split('T')[0];
          $('.usedate').val(formattedDate);
          var baseUrl = "https://localhost:7061"; // Replace this with your server's base URL

        var imageUrl = baseUrl + "/images/" + data.img.split('\\').pop();
         $('.image_hhs').attr('src', imageUrl);
          $('.firstnameshow').val(data.firstName);
          $('.lastnameshow').val(data.lastName);
          createday = data.birthday;
      dateObject = new Date(createday);
      formattedDate = dateObject.toISOString().split('T')[0];
          $('.birthdateshow').val(formattedDate);
          createday = data.createday;
      dateObject = new Date(createday);
      formattedDate = dateObject.toISOString().split('T')[0];
      $('.createdateshow').val(formattedDate);

        }
      }
    },
    error: function(error) {
      console.error('Error:', error);
    }
  });
});
$(document).ready(function () {
  $('#insuranceForm').submit(function (event) {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của form
    var fee = -80;
    var insuranceId = $('#insuranceIdupdate').val();
    var hospitalName = $('#hospitalNameupdate').val();
    if(hospitalName != "Hospital ABC"){
    	hospitalName = $('#otherHospital').val();
    	fee = -10;
    }
    console.log(insuranceId);
    var inputDateValue = $('.useDate').val(); // Update inputDateValue when the date input changes
      console.log(inputDateValue);
    /*var usedate
    $('.useDate').change(function () {
      var inputDateValue = $(this).val(); // Update inputDateValue when the date input changes
      console.log(inputDateValue);

      // Convert the input date value to usedate format (ISO string format without time).
      var dateObject = new Date(inputDateValue);
      dateObject.setHours(0, 0, 0, 0);
      console.log(dateObject);

      var currentDate = new Date();
      if (dateObject < currentDate) {
        warning("Please choose a date that is not earlier than today.")
        return;
      }

       usedate = dateObject.toISOString().split('T')[0]; // Take only the date part before 'T'.
      console.log(usedate);
      
     });
    // Tạo đối tượng FormData
    console.log(usedate);*/
    var firstname = $('.firstname').val();
    var lastname = $('.lastname').val();
    var createdate = $('.createdate').val();
    var birthdate = $('.birthday').val();

    const obj = { insuranceId: insuranceId, hospitalName: hospitalName, fee: fee, usedate: inputDateValue, startus: 1, img: '', firstName: firstname,
  		lastName: lastname,
 		birthday: birthdate,
  		createday: createdate };
    var token = localStorage.getItem('token');

    // Gửi dữ liệu lên server qua AJAX sử dụng FormData
    $.ajax({
      url: 'https://localhost:7061/api/HHS/InsertHHS',
      type: 'POST',
      data: JSON.stringify(obj),
      processData: false,
      contentType: 'application/json',
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + token);
      },
      success: function (data) {
        console.log(data);
        success();
        
      },
      error: function (error) {
        console.error(error.responseText);
        danger();
        warning(error.responseText);
      }
    });
  });
});
$(document).ready(function () {
  $('#exampleModal_upimage').submit(function (event) {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của form
    var imageFile = $('#imageInsuranceInput')[0].files[0];
    var userType = localStorage.getItem('rolename');

    // Tạo đối tượng FormData
    var formData = new FormData();
    formData.append('image', imageFile);
   
    var token = localStorage.getItem('token');

    // Gửi dữ liệu lên server qua AJAX sử dụng FormData
    $.ajax({
      url: 'https://localhost:7061/api/HHS/UploadImg',
      type: 'POST',
      data: formData, // Sử dụng formData thay vì JSON.stringify(obj)
      processData: false,
      contentType: false, // Không cần đặt contentType khi sử dụng FormData
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + token);
      },
      success: function (data) {
        console.log(data);
        success();
        loadImgInsurance();
      },
      error: function (error) {
        console.error(error);
        danger();
        warning(error.responseText);
      }
    });
  });
});
$(document).ready(function(){
	$('.logout').click(function() {
        localStorage.clear();
        window.location.href = '../Deloy-Giaodien/login.html';
    });
})
$(document).ready(function () {
    // Call the API and get the data
    $.ajax({
        url: 'https://localhost:7061/api/Profile/AllSchedule', // Replace with your API endpoint
        method: 'GET',
        dataType: 'json',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
          'Content-Type': 'application/json'
        },
        success: function (data) {
            // If the API call is successful, process the data
            if (data && data.length > 0) {
                // Loop through the data and create table rows
                data.forEach(function (user) {
                  var dateTime = new Date(user.starttime);
                  var datePart = dateTime.toLocaleDateString();
                  var timePart = dateTime.toLocaleTimeString();
                  var s;
                  console.log(user.status)
                  if(user.status == 0){
                    s = "Chưa tới lịch hẹn";
                  }else if(user.status == 1){
                    s = "Đã hoàn thành"
                  }else{
                    s = "Đã bỏ lỡ";
                  }
                    var row = '<tr>' +
                        '<td>' + user.id + '</td>' +
                        '<td>' + user.eventname + '</td>' +
                        '<td>' + datePart + '</td>' +
                        '<td>' + timePart + '</td>' +
                        '<td>' + s + '</td>' +
                        '<td><div class="d-flex justify-content-between"><button class="btn btn-info schedule_info" data-bs-toggle="modal" data-bs-target="#exampleModal_infoschedules" type = "button" value="' + user.id + '">Info</button><button class="btn btn-primary" value="' + user.id + '">Medicine bill</button></div></td>' +
                        '</tr>';
                    $('#schedule-table tbody').append(row);
                });
            } else {
                // Handle the case where there is no data or an error occurred
                var errorMessage = '<tr><td colspan="3">No data available</td></tr>';
                $('#data-table tbody').append(errorMessage);
            }
        },
        error: function (error) {
            // Handle the error if the API call fails
            var errorMessage = '<tr><td colspan="3">Error occurred while fetching data</td></tr>';
            $('#data-table tbody').append(errorMessage);
        }
    });
});
$(document).ready(function(){
  $('#exampleModal_hhs').submit(function (event) {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của form
       var firstname = $('.firstname_askInsurance').val();
    var lastname = $('.lastname_askInsurance').val();
    var date = $('.birthday_askInsurance').val();
    var formattedDate = new Date(date).toISOString().split('T')[0];
    console.log(formattedDate)
    const obj = {firstName: firstname,lastname:lastname,birthday:formattedDate}
        // Chỉ gửi dữ liệu lên server khi đang ở chế độ chỉnh sửa (isEditMode = true)
        $.ajax({
                url: 'https://localhost:7061/api/HHS/PatientAskHHS',
                type: 'POST',
                data: JSON.stringify(obj),
                processData: false,
                contentType: 'application/json',
                beforeSend: function (xhr) {
                    // Thêm Bearer token vào header của request
                    xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
                },
                success: function(data) {
                    // Xử lý kết quả thành công tại đây
                    console.log(data);
                    success();

                },
                error: function(error) {
                    // Xử lý lỗi tại đây
                    console.error(error);
                    danger();
                    warning(error.responseText);
                }
            });
    });
});
$(document).ready(function(){
  $('#exampleModal_infoschedules').on('shown.bs.modal', function () {
       var id = $('.schedule_info').val(); // Get the value of the clicked button
       console.log()
        $.ajax({
                url: 'https://localhost:7061/api/Schedule/GetSchedule/' + id, // Concatenate the id to the URL
                type: 'GET',
                dataType: 'json',
                headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('token'),
                  'Content-Type': 'application/json'
                },
                
                success: function(data) {
                  console.log(data);
                    // Xử lý kết quả thành công tại đây
                    var dateTime = new Date(data.starttime);
                    var datePart = dateTime.toISOString().split('T')[0];
// Convert timePart to "HH:mm" format
var timePart = dateTime.toLocaleTimeString('en-US', { hour12: false });

                    console.log(data);
                    $('#date_info').val(datePart);
                    $('#time_info').val(timePart);
                    $('#name_info').val(data.name);
                    $('#email_info').val(data.email);
                    $('#phone_info').val(data.phoneNumber);
                    $('#eventname_info').val(data.eventname); // Corrected field name
                    $('#description_info').val(data.description);
                    
                    success();

                },
                error: function(error) {
                    // Xử lý lỗi tại đây
                    console.error(error);
                    danger();
                }
            });
    });
});
$(document).ready(function () {
    // Call the API and get the data
    $.ajax({
        url: 'https://localhost:7061/api/Blog/GetAllBlogByUsername', // Replace with your API endpoint
        method: 'GET',
        dataType: 'json',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
          'Content-Type': 'application/json'
        },
        success: function (data) {
            // If the API call is successful, process the data
            if (data && data.length > 0) {
                // Loop through the data and create table rows
                var i = 1;
                data.forEach(function (user) {
                  var dateTime = new Date(user.date);
                  var datePart = dateTime.toLocaleDateString();
                  var timePart = dateTime.toLocaleTimeString();
                  var s;
                  
                  if(user.status == 1){
                    
                    var row = '<tr>' +
                        '<td>' + i + '</td>' +
                        '<td>' + user.name + '</td>' +
                        '<td>' + user.description + '</td>' +
                        '<td>' + datePart + '</td>' +
                        '<td><div class="d-flex justify-content-between"><button class="btn btn-primary del_blogbutton" data-bs-toggle="modal" data-bs-target="#del_blog" value="' + user.id + '">Delete</button></div></td>' +
                        '</tr>';
                        i = i +1;
                    $('#blog-table tbody').append(row);
                  }
                });
            } else {
                // Handle the case where there is no data or an error occurred
                var errorMessage = '<tr><td colspan="3">No data available</td></tr>';
                $('#data-table tbody').append(errorMessage);
            }
        },
        error: function (error) {
            // Handle the error if the API call fails
            var errorMessage = '<tr><td colspan="3">Error occurred while fetching data</td></tr>';
            $('#data-table tbody').append(errorMessage);
        }
    });
});
$(document).ready(function(){
  $('#InsBlog').submit(function (event) {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của form
       var name = $('#Blog_name_ins').val();
    var description = $('#Blog_des_ins').val();
    var date =  new Date();
    var username = localStorage.getItem('username');
    const obj = {name: name,description:description,date:date,username:username,status:1}
        // Chỉ gửi dữ liệu lên server khi đang ở chế độ chỉnh sửa (isEditMode = true)
        $.ajax({
                url: 'https://localhost:7061/api/Blog/InsBlog',
                type: 'POST',
                data: JSON.stringify(obj),
                processData: false,
                contentType: 'application/json',
                beforeSend: function (xhr) {
                    // Thêm Bearer token vào header của request
                    xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
                },
                success: function(data) {
                    // Xử lý kết quả thành công tại đây
                    console.log(data);
                    success();

                },
                error: function(error) {
                    // Xử lý lỗi tại đây
                    console.error(error);
                    danger();
                }
            });
    });
});
$(document).ready(function(){
  $('#Update_blog').on('shown.bs.modal', function () {
       var id = $('.blog_info').val(); // Get the value of the clicked button
       console.log()
        $.ajax({
                url: 'https://localhost:7061/api/Blog/GetBlog/' + id, // Concatenate the id to the URL
                type: 'POST',
                dataType: 'json',
                headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('token'),
                  'Content-Type': 'application/json'
                },
                
                success: function(data) {
                  console.log(data);
                    $('#Blog_name_ins').val(data.name);
                    $('#Blog_des_ins').val(data.description)
                    success();

                },
                error: function(error) {
                    // Xử lý lỗi tại đây
                    console.error(error);
                    danger();
                }
            });
    });
});
$(document).ready(function(){
  $('#UpsBlog').submit(function (event) {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của form
       var name = $('#Blog_name_ins').val();
    var description = $('#Blog_des_ins').val();
    var date =  new Date();
    var username = localStorage.getItem('username');
    const obj = {name: name,description:description,date:date,username:username,status:1}
        // Chỉ gửi dữ liệu lên server khi đang ở chế độ chỉnh sửa (isEditMode = true)
        $.ajax({
                url: 'https://localhost:7061/api/Blog/UpsBlog/' + id,
                type: 'POST',
                data: JSON.stringify(obj),
                processData: false,
                contentType: 'application/json',
                beforeSend: function (xhr) {
                    // Thêm Bearer token vào header của request
                    xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
                },
                success: function(data) {
                    // Xử lý kết quả thành công tại đây
                    console.log(data);
                    success();

                },
                error: function(error) {
                    // Xử lý lỗi tại đây
                    console.error(error);
                    danger();
                }
            });
    });
});
$(document).ready(function(){
  $('#DelBlog').submit(function (event) {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của form
      var id = $('.del_blogbutton').val();
        $.ajax({
                url: 'https://localhost:7061/api/Blog/DelBlog/' + id,
                type: 'POST',
                processData: false,
                contentType: 'application/json',
                beforeSend: function (xhr) {
                    // Thêm Bearer token vào header của request
                    xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
                },
                success: function(data) {
                    // Xử lý kết quả thành công tại đây
                    console.log(data);
                    success();

                },
                error: function(error) {
                    // Xử lý lỗi tại đây
                    console.error(error);
                    danger();
                }
            });
    });
});