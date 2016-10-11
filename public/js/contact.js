var tracks;
var currentSong = 0; //increase currentSong by 0
var elMessage, elMessageCharCount, elConsole;

$(document).ready(function(){
  elMessage = document.querySelector("textarea[name=message]");
  elMessageCharCount = document.getElementById("message-remaining");
  elConsole = document.getElementById("console");
  // Character Count update
  updateRemaining(elMessage,elMessageCharCount);

  elMessage.addEventListener("keydown",function(event){
    // if there's still room to write, update the remaining character count and let them go through

    // console.log( elMessage, elMessageCharCount );
    if( !updateRemaining( elMessage, elMessageCharCount ) ) {
      console.innerText = "Sorry, too many letters";
    }
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

    console.log($("#search").val() );
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
  var remaining = elMsg.innerText = elInput.getAttribute('maxlength') - elInput.value.length;
  if( remaining > 0) {
    elMsg.innerText = remaining;
    return true;
  }
  return false;
}