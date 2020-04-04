
var audio = new Audio('./sounds/flip.mp3');
Storage.prototype.setObj = function(key, obj) {
  return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function(key) {
  return JSON.parse(this.getItem(key))
}
function generateQueryStr(key,array){
  console.log(array.map(val => key+'='+val).join('&'))
  return array.map(val => key+'='+encodeURIComponent(val)).join('&')
}

function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function openNav() {
  $("#myNav").addClass("overlay-active")
}
function closeNav() {
  $("#myNav").removeClass("overlay-active")
}

function addNameElementToNameList(name){
  console.log(name)
  $('.js-name-list').append('<a href="#" data-name='+encodeURIComponent(name)+'>'+name+'</a>')
}
function addDeleteOnClickHandlerToNameElements(){
  $('.js-name-list a').on('click',function(e){
    e.preventDefault()
    name = decodeURIComponent($(this).attr("data-name"))
    names = localStorage.getObj("names")
    names = names.filter(n => n != name) //Removes name from localstorage array
    localStorage.setObj("names",names)
    $(this).remove()
  })
}
function initNamesFromLocalStorage(js_tag){

  names = localStorage.getObj("names")
  if(names != null){
    names.forEach(name => {
      addNameElementToNameList(name)
    });
    addDeleteOnClickHandlerToNameElements()
  }
}

addNameFun = (e) => {
  var name = DOMPurify.sanitize($("#name-input").val()); //Add sanitize to this later
  $("#name-input").val("")
  names = localStorage.getObj("names")
  if (names != null && name.length > 0){
    if(names.includes(name)){
      alert("Namnet "+name+" är redan tillagt.")
    }else{
      names = localStorage.getObj("names")
      names.push(name)
      localStorage.setObj("names",names)
      addNameElementToNameList(name)
      addDeleteOnClickHandlerToNameElements()

      if (names.length == 3){
        $('.flip-box-front').text("Bra jobbat! Tryck här för att börja eller lägg till fler namn.")
        $('.flip-box-back').text("Bra jobbat! Tryck här för att börja eller lägg till fler namn.")
      }
    }
  }else{
    localStorage.setObj("names",[name])
    addNameElementToNameList(name)
  }
}


front = true
$(document).ready(function(){
initNamesFromLocalStorage()
$('#name-input').keypress(function(event){
  var keycode = (event.keyCode ? event.keyCode : event.which);
  if(keycode == '13'){
      addNameFun() 
  }
})

$('.js-add-name').bind('click',addNameFun)
$('.flip-box').bind("click", (e) => {
  //e.preventDefault()
  front = !front
  _ = front ? $('.flip-box').removeClass('js-front') : $('.flip-box').addClass('js-front')
  audio.play();
  names = localStorage.getObj("names")

  if(names.length > 2){
    query = generateQueryStr("names[]",localStorage.getObj("names"))
    $.ajax({
      url: 'http://localhost:5000/api?'+query,
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