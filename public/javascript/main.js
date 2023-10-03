
let var1 = document.getElementById("index-navbar");
if (var1 !== null) {
  
var links3 = document.querySelectorAll("nav ul ul");
// Loop through the elements and change the color
for (var i = 0; i < links3.length; i++) {
  links3[i].style.background = "#0000001f";
  links3[i].style.boxShadow = "1px 1px 6px #D0A25C";

}
window.addEventListener("scroll", function() {
    var navbar = document.querySelector(".index-nav");
    if (window.scrollY > 0) {
      var navbar1 = document.querySelector(".navbar");
        navbar1.style.backgroundColor = "white";
        // Select all matching elements
var links = document.querySelectorAll("nav ul li a");
// Loop through the elements and change the color
for (var i = 0; i < links.length; i++) {
  links[i].style.color = "black";
}
var links3 = document.querySelectorAll("nav ul ul");
// Loop through the elements and change the color
for (var i = 0; i < links3.length; i++) {
  links3[i].style.background = "#d7b467";
  links3[i].style.borderRadius = "0px";
  links3[i].style.boxShadow = "none";
  
}
var links2 = document.querySelectorAll("nav ul li ul li a");
// Loop through the elements and change the color
for (var i = 0; i < links2.length; i++) {
  links2[i].style.color = "white";
}

var tag = document.getElementById("svg1");

  tag.style.fill = "black";
  var tag1 = document.getElementById("svg2");

  tag1.style.fill = "black";

// Get a reference to the image element by its id
var logoImage = document.getElementById("logo_image");

// Set the new image source (replace with the new image path)
var newImageSrc = "/images/logo.png"; // Replace with the path to the new image

// Change the src attribute of the image element
logoImage.src = newImageSrc;



    } else {
      // Get a reference to the image element by its id
var logoImage = document.getElementById("logo_image");

// Set the new image source (replace with the new image path)
var newImageSrc = "/images/logow.png"; // Replace with the path to the new image

// Change the src attribute of the image element
logoImage.src = newImageSrc;

      var tag = document.getElementById("svg1");

      tag.style.fill = "white";
      var tag1 = document.getElementById("svg2");
    
      tag1.style.fill = "white";
    
      var links = document.querySelectorAll("nav ul li a");

// Loop through the elements and change the color
for (var i = 0; i < links.length; i++) {
    links[i].style.color = "white";
}
var links3 = document.querySelectorAll("nav ul ul");
// Loop through the elements and change the color
for (var i = 0; i < links3.length; i++) {
  links3[i].style.background = "#0000001f";
  links3[i].style.boxShadow = "1px 1px 6px #D0A25C";
}
var navbar1 = document.querySelector(".navbar");
        navbar1.style.backgroundColor = "transparent";
    }
    
  });
}
else{
  var navbar1 = document.querySelector(".navbar");
  navbar1.style.backgroundColor = "white";
  // Select all matching elements
var links = document.querySelectorAll("nav ul li a");
// Loop through the elements and change the color
for (var i = 0; i < links.length; i++) {
links[i].style.color = "black";
}

var links2 = document.querySelectorAll("nav ul li ul li a");
// Loop through the elements and change the color
for (var i = 0; i < links2.length; i++) {
  links2[i].style.color = "white";
}


var tag = document.getElementById("svg1");

tag.style.fill = "black";
var tag1 = document.getElementById("svg2");

tag1.style.fill = "black";

// Get a reference to the image element by its id
var logoImage = document.getElementById("logo_image");

// Set the new image source (replace with the new image path)
var newImageSrc = "/images/logo.png"; // Replace with the path to the new image

// Change the src attribute of the image element
logoImage.src = newImageSrc;


}


  document.getElementById('next').onclick = function(){
  let lists = document.querySelectorAll('.item');
  document.getElementById('slide').appendChild(lists[0]);
}
document.getElementById('prev').onclick = function(){
  let lists = document.querySelectorAll('.item');
  document.getElementById('slide').prepend(lists[lists.length - 1]);
}


var swiper = new Swiper(".mySwiper", {
    slidesPerView: 5,
    spaceBetween: 30,
    freeMode: true,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  var swiper = new Swiper(".mySwiper1", {
    spaceBetween: 30,
    loop: true,
    effect: "fade",
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });


  document.getElementById("linkId").addEventListener("click", function(event) {
    event.preventDefault();
  
    var toGiveScrollElement = document.querySelector(".toGiveScroll");
    toGiveScrollElement.style.height = "auto";
    toGiveScrollElement.style.transition = "all 1s";
    document.getElementById("linkId").style.display = "none";
    document.getElementById("linkIdTwo").style.display = "block";
  });
  
  document.getElementById("linkIdTwo").addEventListener("click", function(event) {
    event.preventDefault();
  
    var toGiveScrollElement = document.querySelector(".toGiveScroll");
    toGiveScrollElement.style.height = "350px";
    
    document.getElementById("linkId").style.display = "block";
    document.getElementById("linkIdTwo").style.display = "none";
  });
  document.getElementById("linkId1").addEventListener("click", function(event) {
    event.preventDefault();
  
    var toGiveScrollElement = document.querySelector(".hoiyan");
    toGiveScrollElement.style.height = "auto";
    
    document.getElementById("linkId1").style.display = "none";
    document.getElementById("linkIdTwo1").style.display = "block";
  });
  
  document.getElementById("linkIdTwo1").addEventListener("click", function(event) {
    event.preventDefault();
  
    var toGiveScrollElement = document.querySelector(".hoiyan");
    toGiveScrollElement.style.height = "350px";
    
    document.getElementById("linkId1").style.display = "block";
    document.getElementById("linkIdTwo1").style.display = "none";
  });
 
  function showburger(){
    document.getElementById("burgerbtn").style.display = "none";
    document.getElementById("closebtn").style.display = "block";
    document.getElementById("burdermenu").style.display = "block";
    const motionElement = document.querySelector(".dropDownBurger");
    
    // Add the "appear" class after a short delay
    setTimeout(function() {
      motionElement.classList.add("appear");
    }, 100);
  }
  function closeburger(){
    document.getElementById("burgerbtn").style.display = "block";
    document.getElementById("closebtn").style.display = "none";
    document.getElementById("burdermenu").style.display = "none";


    let motionElement1 = document.getElementById("burdermenu")
     // Delay the animation using setTimeout
     motionElement1.classList.remove("appear");
 
  
  }
 

  