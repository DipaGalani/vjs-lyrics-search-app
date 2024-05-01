const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");
const more = document.getElementById("more");

const apiURL = "https://api.lyrics.ovh/v1";

// Display lyrics to DOM
const showData = (data) => {
  const songLyricsArr = data.lyrics.split("\n");
  songLyricsArr.forEach((songLyricLine) => {
    const lyricLine = document.createElement("p");
    lyricLine.innerText = songLyricLine;
    result.appendChild(lyricLine);
  });
};

// Search for song from API
const searchSong = async (searchTermArr) => {
  const songArtist = searchTermArr[0];
  const songTitle = searchTermArr[1];

  result.innerHTML = "Loading...";

  const res = await fetch(`${apiURL}/${songArtist}/${songTitle}`);
  const data = await res.json();

  if (data) {
    if (data.error) {
      result.innerHTML = data.error;
    } else {
      result.innerHTML = "";
      showData(data);
    }
  }
};

// Event Listeners
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTermArr = search.value
    .trim()
    .split("-")
    .map((singleTerm) => singleTerm.trim());

  searchSong(searchTermArr);
});
