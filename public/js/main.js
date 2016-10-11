var tracks;
var currentSong = 0; //increase currentSong by 0

$(document).ready(function(){
  SC.initialize({
   client_id: 'f77a15a6adfbb5035c8a8cf38e399f1e'
  }); // client_id
  $("#search_form").submit(function(event){
    $(".box").fadeIn(1000)
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
