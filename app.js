const searchButton = document.getElementById("search-Button");
searchButton.addEventListener("click", function(){
    const SearchInpuT = document.getElementById("search-input").value;
    
    fetch(`https://api.lyrics.ovh/suggest/${SearchInpuT}`)
    .then(res => res.json())
    .then(info => displaySong(info.data))
})
const displaySong = (songs) =>{
    const songContainer = document.getElementById("song-container");
    songContainer.innerHTML = ""
   songs.forEach(song => {
       const songDiv = document.createElement('div');
       songDiv.className = "single-result row align-items-center my-3 p-3"
       songDiv.innerHTML= `
       <div class="col-md-9">
       <h3 class="lyrics-name">${song.title}</h3>
       <p class="author lead">Album by <span>${song.artist.name}</span></p>
       <audio controls>
           <source src="${song.preview}" type="audio/mpeg">
       </audio>
   </div>
   <div class="col-md-3 text-md-right text-center">
        
       <button onclick="getLyric('${song.artist.name}', '${song.title}')" class="btn btn-danger">Get Lyrics</button>
   </div>
      `
     songContainer.appendChild(songDiv)                     

   })
}
const getLyric = (artist, title  ) =>{
    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
    .then(res => res.json())
    .then(data =>displayLyrics(data.lyrics))

 }

const displayLyrics = (lyric) => {
    const lyricDiv = document.getElementById('lyrics-div');
    lyricDiv.innerText = lyric;
}