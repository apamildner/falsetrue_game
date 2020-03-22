var audio = new Audio('./sounds/flip.mp3');

function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
/* Open */
function openNav() {
  //document.getElementById("myNav").style.display = "block";
  $("#myNav").addClass("overlay-active")
  //document.getElementById("myNav").style.opacity = 0.9
}

/* Close */
function closeNav() {
  $("#myNav").removeClass("overlay-active")
  //document.getElementById("myNav").style.display = "none";
  //document.getElementById("myNav").style.opacity = 0.0
}
function getArrayFromUrl(tag){
  tag_arr = []
  console.log(new URLSearchParams(window.location.href))
  for (const [key, value] of new URLSearchParams(window.location.href).entries()) {
    if (key === tag){
      tag_arr.push(value)
    }
  }
  return tag_arr
}
function addNameElementToNameList(name){
  $('.js-name-list').append('<a href="#" data-name='+name+'>'+name+'</a>')
}
function addDeleteOnClickHandlerToNameElements(){
  $('.js-name-list a').on('click',function(e){
    e.preventDefault()
    name = $(this).attr("data-name")
    current_url = window.location.href
    url_tag = '&names[]='+name
    //Lös detta, tar bort alla names ur regex..
    current_url = current_url.replace(url_tag,'')
    window.history.pushState(null,null, current_url)
    $(this).remove()
  })
}
function initNamesFromUrl(js_tag){

names = getArrayFromUrl("names[]")
names.forEach(name => {
  addNameElementToNameList(name)
});
addDeleteOnClickHandlerToNameElements()
}

function addUrl(newURL) {
  url = window.location.href
  console.log(url)
  if(url === "http://localhost:5000/"){
    newURL = url+'?id='+makeid(10)+newURL
  }
  else{
    newURL = url+newURL
  }

  window.history.pushState(null,null, newURL);
}

console.log(makeid(5));
front = true
$(document).ready(function(){
initNamesFromUrl()

$('.flip-box').bind("click", (e) => {
  //e.preventDefault()
  front = !front
  _ = front ? $('.flip-box').removeClass('js-front') : $('.flip-box').addClass('js-front')
  audio.play();
  names = getArrayFromUrl("names[]")

  if(names.length > 2){
    $.ajax({
      url: 'http://localhost:5000/api?'+window.location.href.split('/?')[1],
      context: document.body
    }).done( (data) =>{
      if (front) {
        $('.flip-box-front').text(data)
      } else {
        $('.flip-box-back').text(data)
      } 
    });
  }
  });




});
addNameFun = (e) => {
  var name = $("#name-input").val();
  $("#name-input").val("")
  names = getArrayFromUrl("names[]")
  if(names.includes(name)){
    alert("Namnet "+name+" är redan tillagt.")
    
  }else if(name.length > 0 ){
    addUrl('&names[]='+name)
    addNameElementToNameList(name)
    addDeleteOnClickHandlerToNameElements()

    names = getArrayFromUrl("names[]").length
    if (names >= 3){
      $('.flip-box-front').text("Bra jobbat! Tryck här för att börja eller lägg till fler namn.")
      $('.flip-box-back').text("Bra jobbat! Tryck här för att börja eller lägg till fler namn.")
    }
  }
}
$('.js-add-name').bind('click',addNameFun)
$('#name-input').keypress(function(event){
  var keycode = (event.keyCode ? event.keyCode : event.which);
  if(keycode == '13'){
      addNameFun() 
  }
})