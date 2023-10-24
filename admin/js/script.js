function nameUser(){
	var spanElement = document.getElementById('span-name'); // Replace 'spanId' with the actual ID of the <span> element
	spanElement.textContent = sessionStorage.getItem('username');
}
function signOut(){
	fetch('http://localhost:8081/logout', {
		        headers: new Headers({
		          'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
		          'Content-Type': 'application/json'
		        })
		      })
		      .then(response => {
		        if (!response.ok) {
		          throw new Error('Network response was not ok');
		        }
		        return response.json();
		      })
		      .then(data => {
		        sessionStorage.clear();
		        window.location.href = 'http://localhost/home/';
		        console.log('1');
		      })
		      .catch(error => {
		        
		      });
		    /*sessionStorage.clear();
		    window.location.href = 'http://localhost/home/';*/
};

nameUser();