function test () {
  setTimeout(function(){ console.log("Hello1"); }, 100);
  setTimeout(function(){ console.log("Hello2"); }, 100);
  setTimeout(function(){ console.log("Hello3"); }, 100);
}

test();