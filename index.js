// Your Assignment2 JavaScript code goes here

//Makes a request to the server to obtain tweets


let request = [];
let allIds = new Set();

let searchString = "";
var interval;
var checked = 1;

function displayTweets(dataTweets) {
    // create an unordered list to hold the tweets
    const tweetContainer = document.getElementById('tweet-container'); 
    //remove the existing tweets from the page
    while (tweetContainer.firstChild) {
        tweetContainer.removeChild(tweetContainer.firstChild);
    }
    const tweetList = document.createElement("ul");
    tweetContainer.appendChild(tweetList);
    // all tweet objects (no duplicates) stored in tweets variable
    // filter on search text
    const filteredResult = dataTweets.filter(obj => obj.text.includes(searchString));

    // sort by date
    const sortedResult = filteredResult.sort((a, b) => moment(a.createdAt).isBefore(moment(b.createdAt)) ? 1 : -1);

    sortedResult.forEach(tweetObject => {
        // create a container for individual tweet
        const tweetContent = document.createElement("post");
        tweetContent.className = 'post'; 
        tweetContent.style.border = "1px solid #E6ECF0";
        // tweetContent.style.backgroundClip = whit
        const img = document.createElement("img");
        img.src = tweetObject.imageUrl;
        img.alt = tweetObject.screenName + "_Profile_Pic";
        tweetContent.appendChild(img);
        //-- append authorNameto div
        const imgDiv = document.createElement("div");
        imgDiv.className = 'tweet';
        const nameDiv = document.createElement("div");
        nameDiv.className= 'name';
        const tweetName = document.createElement("span");
        tweetName.style.fontWeight = 'bold';
        tweetName.innerHTML = tweetObject.authorName;
        nameDiv.appendChild(tweetName);
        //-- append screenName to div
        const tweetScreenName = document.createElement("span");
        
        tweetScreenName.innerHTML = tweetObject.screenName;
        nameDiv.appendChild(tweetScreenName);
        //append div contain img node to main div
        const tweetCreatedAt = document.createElement("span");
        tweetCreatedAt.innerHTML = tweetObject.createdAt;
        tweetCreatedAt.setAttribute('type','date');
        nameDiv.appendChild(tweetCreatedAt);
        imgDiv.appendChild(nameDiv);
        const textDiv = document.createElement("div");
        textDiv.setAttribute('id','post-info');
        const tweetText = document.createTextNode(tweetObject.text);
        textDiv.appendChild(tweetText);
        imgDiv.appendChild(textDiv);
        tweetContent.appendChild(imgDiv);
        //div post-info, append name, user, date, and the div for text
        const postDiv = document.createElement("div");
        //-- append createdAt to div
        
        // finally append your tweet into the tweet list
        tweetList.appendChild(tweetContent);
    });
}

function play() {
    interval = window.setInterval(getTweets, 5000);
  }

  

function getTweets(){
    // specify a url, in this case our web server
    const url = "http://twitterfeedserverrails-env.eba-xmqy8ybh.us-east-1.elasticbeanstalk.com/feed/random?q=weather"

    fetch(url)
    .then(res => res.json())
    .then(data => {
        // do something with data
        console.log(data);
        for (var i = 0; i < data.statuses.length; i++){
            if(!allIds.has(data.statuses[i].id)){
                allIds.add(data.statuses[i].id);
                tweet = {
                    id : data.statuses[i].id,
                    authorName: data.statuses[i].user.name,
                    screenName :  "@"+data.statuses[i].user.screen_name,
                    createdAt : moment(data.statuses[i].created_at).format('MMMM Do YYYY, h:mm:ss a'),
                    imageUrl: data.statuses[i].user.profile_image_url,
                    text : data.statuses[i].text
                }
                request.push(tweet);
            }
            
        }
        displayTweets(request);
        search();
    })

    .catch(err => {
        // error catching
        console.log(err)
    })
}

function search(){
    const handleSearch = event => {
        searchString = event.target.value.trim().toLowerCase();
      }
      document.getElementById("searchBar").addEventListener("input", handleSearch);
      
       
 }

function pause() {
    if (checked === 0){ //if paused, change to play
    document.getElementById('btn').value = "click to pause feed";
    document.getElementById('btn').checked=1;
    play();
    getTweets();
    checked = 1;
  } else { //if on play, change to paused
    checked = 0;
    document.getElementById('btn').value = "click to play feed";
    document.getElementById('btn').checked=0;
    window.clearInterval(interval);
  }
  }
  
 
  
  play();
  getTweets();
 