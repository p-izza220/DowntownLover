var tracks;
var currentSong = 0; //increase currentSong by 0
var elMessage, elMessageCharCount, elConsole;

$(document).ready(function(){
  startTime();
  elMessage = document.querySelector("textarea[name=message]");
  elMessageCharCount = document.getElementById("message-remaining");
  elConsole = document.getElementById("console");
  // Character Count update
  updateRemaining(elMessage,elMessageCharCount);

  elMessage.addEventListener("keydown",function(event){
    // if there's still room to write, update the remaining character count and let them go through

    // console.log( elMessage, elMessageCharCount );
    updateRemaining( elMessage, elMessageCharCount );
    // else, if there's no room, block the letters
  });

  SC.initialize({
   client_id: 'f77a15a6adfbb5035c8a8cf38e399f1e'
  }); // client_id
  $("#search_form").submit(function(event){
    event.preventDefault();
    // Clear the Search results
    $("#songs").html("");
    // Search for the submitted term
    scSearch( $("#search").val() );
    // $(...).val() gets us
    // element.value
  });
}); // $(document).ready
function scSearch(term) {
  SC.get('/tracks', {
  q: term
}).then(function(response) {
  tracks = response;
  playNext();
});
};
function playNext() {
SC.stream( '/tracks/' + tracks[currentSong].id ).then(function(player){    
    console.log(player); 
    console.log(tracks);   
    player.play();
    $("#artwork").attr("src", tracks[currentSong].artwork_url);
    $("#title").html("Now playing: " + tracks[currentSong].title);
    player.on("finish",function(){
      currentSong += 1; //increase currentSong by 1
      playNext();       //calls itself
    });
  });
};
// Takes a number of characters and updates element
function updateRemaining( elInput, elMsg ) {
  var remaining = elInput.getAttribute('maxlength') - elInput.value.length;
  if( remaining >= 0 ) {
    elMsg.innerText = remaining;
    return true;
  } 
  return false;
}

function startTime() {
  var today=new Date();
  var h=today.getHours();
  var m=today.getMinutes();
  var s=today.getSeconds();
  // add a zero in front of numbers<10
  m=checkTime(m);
  s=checkTime(s);
  var hd=h;
  document.getElementById('txt').innerHTML=(hd=0?"12":hd>12?hd-12:hd)+":"+m+":"+s+" "+(h<12?"AM":"PM");
  t=setTimeout(function(){startTime()},500);
  }

  function checkTime(i)
  {
  if (i<10)
    {
    i="0" + i;
    }
  return i;
  }

  function checkTime(i) {
      if (i < 10) {
          i = "0" + i;
      }
      return i;
  }