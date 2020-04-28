
var randomIntFromInterval = require('../utils/helpers')
db_storage = ["$0 har alltid avgudat $1","$0 har alltid varit lite avundsjuk på $1s hår",
"$0 kör bil bättre än $1","$1 kan jonglera","$0 skulle vinna över $1 i en boxningsmatch","$0 har en crush på $1",
"$1 önskar att hen växte upp under skejt-eran i 90-talets Kalifornien",
"$0 har aldrig krockat med föräldrarnas bil",
"$1 gillar att bli pony-tail grabbad",
"$0 lagar troligen bättre fyllekäk än $1",
"$0 är helt med på känslan av att ha det motsatta könsorganet",
"'En redig buske är aldrig fel' anser $0",
"$1 uppskattar anime-porr men har aldrig vågat säga det till någon (gärna med bläckfiskar)"]


function generateString(names){
  templateString = db_storage[randomIntFromInterval(0,db_storage.length-1)]
  idx1 = randomIntFromInterval(0,names.length-1)
  name1 = names[idx1]
  name1 = name1.charAt(0).toUpperCase() + name1.slice(1)

  names.splice(idx1,1) //Remove from array to not repeat name
  idx2 = randomIntFromInterval(0,names.length-1)
  name2 = names[idx2]
  name2 = name2.charAt(0).toUpperCase() + name2.slice(1)
  return templateString.replace("$0",name1).replace("$1",name2)
}
module.exports = {db_storage,generateString}