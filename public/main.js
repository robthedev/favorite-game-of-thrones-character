
var submit_btn = document.getElementById("submit_btn");
//var char_name = document.getElementById("char_name").value;



submit_btn.addEventListener('click', function (e) {
	var char_name = document.getElementById("char_name").value;
	var char_quote = document.getElementById("char_reason").value;

	checkEmpty(char_name, char_reason, e);
	checkChar(char_name, e);

	return true;
});


var del = $('.delete');

del.on("click", function(event) {
	var gotchar_id = $(this).parent().find("input").val();
	 fetch('gotchar', {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      '_id': gotchar_id
    })
  })
  .then(function(res) {
    if (res.ok) return res.json();
  }).then(function(data) {
    //console.log(data);
    //setTimeout(function () {
			window.location.reload();
    //}, 1000);
    
  });	
});




function checkEmpty(name, reason, e) {
	if (name === "" || reason === "") {
		alert('Please enter a name and reason...');
		e.preventDefault();
		return false;
	}
	return true;
}

function checkChar(name, e) {

	if (characters.indexOf(name) === -1 && name !== "")  {
	
		alert('Character not found...');
		e.preventDefault();
		location.reload();
		return false;
	}	
	return true;
}

$(window).scroll(function() {
  var scrollPosition = $(this).scrollTop();
  var $score = $('.floating-score');
  // Determine if page is scrolled beyond 500px
  if (scrollPosition > 200) {
    // Fade in logo
    $score.fadeIn();
  } else {
    // Fade our logo
    $score.fadeOut();
  }
});