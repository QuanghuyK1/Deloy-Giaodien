$(function() {

   $(".input input").focus(function() {

      $(this).parent(".input").each(function() {
         $("label", this).css({
            "line-height": "18px",
            "font-size": "18px",
            "font-weight": "100",
            "top": "0px"
         })
         $(".spin", this).css({
            "width": "100%"
         })
      });
   }).blur(function() {
      $(".spin").css({
         "width": "0px"
      })
      if ($(this).val() == "") {
         $(this).parent(".input").each(function() {
            $("label", this).css({
               "line-height": "60px",
               "font-size": "24px",
               "font-weight": "300",
               "top": "10px"
            })
         });

      }
   });

   $(".button").click(function(e) {
      var pX = e.pageX,
         pY = e.pageY,
         oX = parseInt($(this).offset().left),
         oY = parseInt($(this).offset().top);

      $(this).append('<span class="click-efect x-' + oX + ' y-' + oY + '" style="margin-left:' + (pX - oX) + 'px;margin-top:' + (pY - oY) + 'px;"></span>')
      $('.x-' + oX + '.y-' + oY + '').animate({
         "width": "500px",
         "height": "500px",
         "top": "-250px",
         "left": "-250px",

      }, 600);
      $("button", this).addClass('active');
   })

   $(".alt-2").click(function() {
      if (!$(this).hasClass('material-button')) {
         $(".shape").css({
            "width": "100%",
            "height": "100%",
            "transform": "rotate(0deg)"
         })

         setTimeout(function() {
            $(".overbox").css({
               "overflow": "initial"
            })
         }, 600)

         $(this).animate({
            "width": "140px",
            "height": "140px"
         }, 500, function() {
            $(".box").removeClass("back");

            $(this).removeClass('active')
         });

         $(".overbox .title").fadeOut(300);
         $(".overbox .input").fadeOut(300);
         $(".overbox .button").fadeOut(300);

         $(".alt-2").addClass('material-buton');
      }

   })

   $(".material-button").click(function() {

      if ($(this).hasClass('material-button')) {
         setTimeout(function() {
            $(".overbox").css({
               "overflow": "hidden"
            })
            $(".box").addClass("back");
         }, 200)
         $(this).addClass('active').animate({
            "width": "700px",
            "height": "800px"
         });

         setTimeout(function() {
            $(".shape").css({
               "width": "50%",
               "height": "50%",
               "transform": "rotate(45deg)"
            })

            $(".overbox .title").fadeIn(300);
            $(".overbox .input").fadeIn(300);
            $(".overbox .button").fadeIn(300);
         }, 700)

         $(this).removeClass('material-button');

      }

      if ($(".alt-2").hasClass('material-buton')) {
         $(".alt-2").removeClass('material-buton');
         $(".alt-2").addClass('material-button');
      }

   });

});
$(document).ready(function() {
   const form = document.querySelector('.signin__form');
   form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const username = document.querySelector('#name').value;
        const password = document.querySelector('#pass').value;
        const obj = {username: username, password: password};
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        const response = await fetch('https://localhost:7061/api/Auth/login', {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(obj)
        });
        if(response.status != 200){
         document.getElementById("error").innerHTML="Your username or password incorrect";
         danger();
         
        }else{
         success();
         const data = await response.json();
           console.log(data);
           console.log(data.token);
           localStorage.setItem('token', data.token);
           localStorage.setItem('username', data.username);
           localStorage.setItem('rolename', data.roleName);
           var token = localStorage.getItem('token');
           var loginname = localStorage.getItem('username');

           console.log(data.token);
           if(data.roleName == 'Admin'){
               
               /*window.location.href = 'http://localhost/admin/dashboard.html';*/
              }else if(data.roleName == 'User'){}
              window.location.href = '../Deloy-Giaodien/person.html';

        }
      })
});
$(document).ready(function() {
   const form = document.querySelector('.signup__form');
   form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const username = document.querySelector('#regname').value;
        const password = document.querySelector('#regpass').value;
        const email = document.querySelector('#email').value;
        const repassword = document.querySelector('#reregpass').value;
        const obj = {username: username, password: password,email: email, conPassword: repassword, roleId: 2};
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        const response = await fetch('https://localhost:7061/api/Auth/signup', {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(obj)
        });
        if(response.status != 200){
            const errorText = await response.text();
         document.getElementById("error").innerHTML="Your username or your password is exists";
         danger();
         Noti({
                status: 'danger',
                content: errorText,
                timer: 5000,
                animation: true,
                progress: true
            });
         console.log(response)
        }else{
         success();
         Noti({
                status: 'warning',
                content: 'please active your email',
                timer: 5000,
                animation: true,
                progress: true
            });
         
        }
      })
});
$(document).ready(function() {
   const form = document.querySelector('.forgotpass');
   form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const email = document.querySelector('.emailpassword').value;
        const obj = {email: email};
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        const response = await fetch('https://localhost:7061/api/Auth/forgotpassword', {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(obj)
        });
        if(response.status != 200){
         const errorText = await response.text();
         danger();
         Noti({
                status: 'danger',
                content: errorText,
                timer: 5000,
                animation: true,
                progress: true
            });
         console.log(response)
        }else{
         success();
         

        }
      })
});

        function Noti({ content, status, animation = true, timer = 4000, progress = true, bgcolor, icon = 'show' }) {
            if (timer > 10000) {
                timer = 4000;
            }
            var status = status;
            var Noti_container = document.createElement('div');
            var Noti_alert = document.createElement('div');
            var timer_progress = document.createElement('div');
            Noti_container.setAttribute('id', 'Noti_container');
            document.body.appendChild(Noti_container);
            document.getElementById('Noti_container').appendChild(Noti_alert);
            timer_progress.setAttribute('class', 'timer_progress');
            if (progress != false) {
                document.querySelector('#Noti_container').appendChild(timer_progress);
            }
            if (animation == true) {
                Noti_alert.style = `
                -webkit-animation: 1s Noti_animation;
            animation: 1s Noti_animation;
            display: flex;
            flex-direction: row-reverse;
            align-items: center;
            justify-content: space-between;
            cursor: pointer;
            background: ${bgcolor}
            `;
            } else {
                Noti_alert.style = `
            display: flex;
            flex-direction: row-reverse;
            align-items: center;
            justify-content: space-between;
            cursor: pointer;
            background: ${bgcolor}
            `;
            }
            Noti_alert.addEventListener('click', function () {
                this.remove();
                timer_progress.remove();
            });
            const noti_destroy = function () {
                document.getElementById('Noti_container').removeChild(Noti_alert);
                timer_progress.remove();
            }
            var timeout = setTimeout(() => {
                noti_destroy();
            }, timer);
            Noti_alert.onmouseover = function () {
                clearTimeout(timeout);
                timer_progress.style.animationPlayState = 'paused';
                this.onmouseleave = function () {
                    setTimeout(noti_destroy, timer);
                    timer_progress.style.animationPlayState = 'running';
                }
            };
            switch (status) {
                case 'success':
                    Noti_alert.setAttribute('class', 'Noti_success');
                    icon == 'show' || icon == '' ?
                        Noti_alert.innerHTML = "<ion-icon name='checkmark-circle'></ion-icon>" + "<span>" + content + "</span>"
                        :
                        Noti_alert.innerHTML = content;
                    break;
                case 'warning':
                    Noti_alert.setAttribute('class', 'Noti_warning');
                    icon == 'show' || icon == '' ?
                        Noti_alert.innerHTML = "<ion-icon name='warning'></ion-icon>" + "<span>" + content + "</span>"
                        :
                        Noti_alert.innerHTML = content;
                    break;
                case 'danger':
                    Noti_alert.setAttribute('class', 'Noti_danger');
                    icon == 'show' || icon == '' ?
                        Noti_alert.innerHTML = "<ion-icon name='close-circle'></ion-icon>" + "<span>" + content + "</span>"
                        :
                        Noti_alert.innerHTML = content;
                    break;
                default:
                    Noti_alert.setAttribute('class', 'Noti_success');
                    Noti_alert.innerHTML = "<ion-icon name='checkmark-circle'></ion-icon>" + "<span>" + content + "</span>";
                    break;
            }
            var new_timer_mode = '';
            switch (timer) {
                case 1000:
                    new_timer_mode = '1s';
                    break;
                case 2000:
                    new_timer_mode = '2s';
                    break;
                case 3000:
                    new_timer_mode = '3s';
                    break;
                case 4000:
                    new_timer_mode = '4s';
                    break;
                case 5000:
                    new_timer_mode = '5s';
                    break;
                case 6000:
                    new_timer_mode = '6s';
                    break;
                case 7000:
                    new_timer_mode = '7s';
                    break;
                case 8000:
                    new_timer_mode = '8s';
                    break;
                case 9000:
                    new_timer_mode = '9s';
                    break;
                case 10000:
                    new_timer_mode = '10s';
                    break;
                default:
                    new_timer_mode = '4s';
            }
            timer_progress.style.animation = `${new_timer_mode} timer_progress_animation`;
            timer_progress.style.webkitAnimation = `${new_timer_mode} timer_progress_animation`;
        }
        function success() {
            Noti({
                status: 'success',
                content: 'Success message',
                timer: 5000,
                animation: true,
                progress: true,
            });
        }
        function warning() {
            Noti({
                status: 'warning',
                content: 'Warning message',
                timer: 5000,
                animation: true,
                progress: true
            });
        }
        function warning(s) {
            Noti({
                status: 'warning',
                content: s,
                timer: 5000,
                animation: true,
                progress: true
            });
        }
        function danger() {
            Noti({
                status: 'danger',
                content: 'Error message',
                timer: 5000,
                animation: true,
                progress: true
            });
        }
const novaAlert = function ({ icon = '', title = '', text = '', darkMode = false, showCancelButton = false, CancelButtonText = 'NO', ConfirmButtonText = 'Okay', dismissButton = true, input = false, inputPlaceholder = '' }) {


            let modal = document.createElement('div');
            modal.setAttribute('class', 'nova-modal');
            document.body.append(modal);
            let alert = document.createElement('div');
            alert.setAttribute('class', 'nova-alert')

            modal.appendChild(alert);
            var svg;

            if (darkMode == true) {
                alert.classList.add('nova-dark-mode');
            }




            if (icon == 'success') {
                svg = `<svg class="circular green-stroke">
                    <circle class="path" cx="75" cy="75" r="50" fill="none" stroke-width="5" stroke-miterlimit="10"/>
                </svg>
                <svg class="checkmark green-stroke">
                    <g transform="matrix(0.79961,8.65821e-32,8.39584e-32,0.79961,-489.57,-205.679)">
                        <path class="checkmark__check" fill="none" d="M616.306,283.025L634.087,300.805L673.361,261.53"/>
                    </g>
                </svg>`;
            } else if (icon == 'danger') {
                svg = `<svg class="circular red-stroke">
                    <circle class="path" cx="75" cy="75" r="50" fill="none" stroke-width="5" stroke-miterlimit="10"/>
                </svg>
                <svg class="cross red-stroke">
                    <g transform="matrix(0.79961,8.65821e-32,8.39584e-32,0.79961,-502.652,-204.518)">
                        <path class="first-line" d="M634.087,300.805L673.361,261.53" fill="none"/>
                    </g>
                    <g transform="matrix(-1.28587e-16,-0.79961,0.79961,-1.28587e-16,-204.752,543.031)">
                        <path class="second-line" d="M634.087,300.805L673.361,261.53"/>
                    </g>
                </svg>`;
            } else if (icon == 'warning') {
                svg = `<svg class="circular yellow-stroke">
                    <circle class="path" cx="75" cy="75" r="50" fill="none" stroke-width="5" stroke-miterlimit="10"/>
                </svg>
                <svg class="alert-sign yellow-stroke">
                    <g transform="matrix(1,0,0,1,-615.516,-257.346)">
                        <g transform="matrix(0.56541,-0.56541,0.56541,0.56541,93.7153,495.69)">
                            <path class="line" d="M634.087,300.805L673.361,261.53" fill="none"/>
                        </g>
                        <g transform="matrix(2.27612,-2.46519e-32,0,2.27612,-792.339,-404.147)">
                            <circle class="dot" cx="621.52" cy="316.126" r="1.318" />
                        </g>
                    </g>
                </svg>`;
            } else {
                svg = '';
            }
            var icon_template = ` <div class="nova-icon">
               <div class="svg-box">
                 ${svg}
               </div>
           </div>`;
            var title_and_text = `
           <h3 class="nova-title">
              ${title}
           </h3>
           <p class="nova-text">
            ${text}
           </p>
           `;

            if (showCancelButton == true) {
                var buttons =
                    `
           <div class="nova-btns">
           <a class="accept">
              ${ConfirmButtonText}
           </a>
           <a class="reject">
            ${CancelButtonText}
           </a>
           </div>
           `;
            } else {
                var buttons =
                    `
           <div class="nova-btns">
           <a class="accept">
            ${ConfirmButtonText}
           </a>
           </div>
           `;
            }
            if (dismissButton == true) {

                var dismissButton = `<a class="dismissButton">
           X
           </a>`;
            } else {
                var dismissButton = `<a class="dismissButton hidden">
           X
           </a>`;
            }


            if (input == true) {
                var __input = `<input class="nova-input-alert" placeholder='${inputPlaceholder}'>`;
            } else {
                var __input = '';
            }


            var $content = icon_template + title_and_text + __input + buttons + dismissButton;






            alert.innerHTML = $content;




            document.querySelector('.nova-alert .reject  , .nova-alert .accept').onclick = closeNova;
            document.querySelector('.dismissButton').onclick = closeNova;



            function closeNova() {

                alert.remove();
                modal.remove();

            }


            this.then = function (callback) {


                document.querySelector('.nova-alert .accept').onclick = accept;

                function accept() {





                    if (input == true) {


                        var inputValue = document.querySelector('.nova-input-alert');
                        var val = inputValue.value;
                        closeNova();
                        callback(e = true, val);

                    } else {
                        closeNova();
                        callback(e = true);
                    }



                }

                document.querySelector('.nova-alert .reject').onclick = reject;
                function reject() {
                    closeNova();
                    callback(e = false);
                }




            }



        }




        /* ********************** end nova alert ********************** */

        




        function input_alert() {
            new novaAlert({
                title: 'INPUT ALERT',
                text: 'this is input alert',
                dismissButton: true,
                input: true,
                inputPlaceholder: 'what is your name ?',
                showCancelButton: true,
                ConfirmButtonText: 'send',
                CancelButtonText: 'close'
            }).then((r, v) => {
                if (r) {
                    new novaAlert({
                        title: 'Hello ' + v
                    })
                }
            });
        }




        function show_warning() {

            new novaAlert({
                title: 'DELETE ACCOUNT',
                text: 'do you want to delete your account ?',
                icon: 'warning',
                showCancelButton: true,
            }).then(function (e) {

                if (e == true) {
                    new novaAlert({
                        icon: 'success',
                        title: 'very nice',
                        text: 'you selected Okay',
                    })
                } else {
                    new novaAlert({
                        icon: 'danger',
                        title: 'very nice',
                        text: 'you selected No',
                    })
                }




            })
        }


        function show_danger() {
            new novaAlert({
                icon: 'danger',
                title: 'danger alert',
                text: 'this is danger alert do you like this ?',
                showCancelButton: true,
                CancelButtonText: 'no i hate this :(',
                ConfirmButtonText: 'yes i love this :)',


            }).then((result) => {
                if (result) {
                    new novaAlert({
                        title: 'you selected : yes i love this :)'
                    })
                } else {
                    new novaAlert({
                        title: 'you selected : no i hate this :('
                    })
                }
            })
        }


        function show_success() {
            new novaAlert({
                icon: 'success',
                title: 'success alert',
                text: 'this is success alert do you like this ?',
                showCancelButton: true,
                CancelButtonText: 'no i hate this :(',
                ConfirmButtonText: 'yes i love this :)',
            }).then((result) => {
                if (result) {
                    new novaAlert({
                        title: 'you selected : yes i love this :)',
                        icon: 'success',
                        text: 'i know you liked this'
                    })
                } else {
                    new novaAlert({
                        title: 'you selected : no i hate this :(',
                        icon: 'danger',
                        text: 'why you hate me ? :('
                    })
                }
            })
        }


        

        
            
        
