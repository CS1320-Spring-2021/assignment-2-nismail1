// Your Assignment2 JavaScript code goes here

//Makes a request to the server to obtain tweets


let request = [];
let allIds = new Set();

let searchString = "";
var interval;
var checked = 1;


function displayTweets(dataTweets) {

    const tweetContainer = document.getElementById('tweet-container'); 
    //remove the existing tweets from the page
    while (tweetContainer.firstChild) {
        tweetContainer.removeChild(tweetContainer.firstChild);
    }
    tweetContainer.appendChild(document.createElement("ul"));
    // first filter results by search criteria then sort by the date
    const filteredResult = dataTweets.filter(res => res.text.includes(searchString));
    const sortedResult = filteredResult.sort((a, b) => moment(a.createdAt).isBefore(moment(b.createdAt)) ? 1 : -1);

    sortedList.forEach(tweetObject => {
        // create a container for individual tweet
        const tweet = document.createElement("li");
        const tweetContent = document.createElement("div");
        tweetContent.className = 'post'; 

        const img = document.createElement("img");
        img.src = tweetObject.imageUrl;
        img.alt = tweetObject.screenName;
        

        const imgDiv = document.createElement("div");
        imgDiv.setAttribute('class','tweet');
        const nameDiv = document.createElement("div");
        nameDiv.setAttribute('class','name');
        const tweetName = document.createElement("span");
        tweetName.innerHTML = tweetObject.authorName;
       
        const tweetScreenName = document.createElement("span");
        tweetScreenName.innerHTML = tweetObject.screenName;

        const tweetCreatedAt = document.createElement("span");
        tweetCreatedAt.innerHTML = tweetObject.createdAt;
        tweetCreatedAt.setAttribute('type','date');

        const textDiv = document.createElement("div");
        textDiv.setAttribute('id','post-info');
        const tweetText = document.createTextNode(tweetObject.text);

        tweetContent.appendChild(img);
        nameDiv.appendChild(tweetName);
        nameDiv.appendChild(tweetScreenName);
        nameDiv.appendChild(tweetCreatedAt);
        imgDiv.appendChild(nameDiv);
        textDiv.appendChild(tweetText);
        imgDiv.appendChild(textDiv);
        tweetContent.appendChild(imgDiv);

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
                    text : data.statuses[i].text,
                    createdAt : moment(data.statuses[i].created_at).format('MMMM Do YYYY, h:mm:ss a'),
                    imageUrl: data.statuses[i].user.profile_image_url
                    
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
        searchString = event.target.value.trim().toLowerCase()
    }
      document.getElementById("searchBar").addEventListener("input", handleSearch);
      
       
 }

function pause() {
    if (checked === 0){ // play feed if currently paused
    document.getElementById('btn').value = "click here to pause feed";
    document.getElementById('btn').checked=1;
    play();
    getTweets();
    checked = 1;
  } else { 
    checked = 0;
    document.getElementById('btn').value = "click here to play feed";
    document.getElementById('btn').checked=0;
    window.clearInterval(interval);
  }
  }
  
 
  
  play();
  getTweets();
 