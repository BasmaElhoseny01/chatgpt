var str = 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt';
var splited = str.match(/\b[\w']+(?:[^\w\n]+[\w']+){0,2}\b/g);
console.log(splited);