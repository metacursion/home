if(!document.cookie){
  document.cookie = 'gac='+(Math.random()*1e32).toString(36)
}
const gac = new RegExp("gac=([^;]+)").exec(document.cookie)[1]
fetch('https://www.google-analytics.com/collect?v=1&tid=UA-101243923-1&t=pageview&cid='+gac+'&dp='+target)
