function addNameElementToNameList(name){
  $('.js-name-list').append('<a href="#" data-name='+name+'>'+name+'</a>')
}
function addDeleteOnClickHandlerToNameElements(){
  $('.js-name-list a').on('click',function(e){
    e.preventDefault()
    name = $(this).attr("data-name")
    names = localStorage.getObj("names")
    names = names.filter(n => n != name) //Removes name from localstorage array
    localStorage.setObj("names",names)
    $(this).remove()
  })
}
function initNamesFromLocalStorage(js_tag){

  names = localStorage.getObj("names")
  names.forEach(name => {
    addNameElementToNameList(name)
  });
  addDeleteOnClickHandlerToNameElements()
}

addNameFun = (e) => {
  var name = $("#name-input").val();
  $("#name-input").val("")
  //names = getArrayFromUrl("names[]")
  names = localStorage.getObj("names")
  if (names != null){
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

export {addNameFun}