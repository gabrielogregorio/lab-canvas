!function(){function a(a){return Math.PI/180*a}var t=document.getElementById("canvas").getContext("2d"),n=function(n){t.beginPath(),t.fillStyle="rgb(".concat(255*Math.random(),", ").concat(255*Math.random(),", ").concat(255*Math.random(),")");var e=a(0),o=a(360);t.arc(Math.random()*n,Math.random()*n,100*Math.random(),e,o,!0),t.fill(),t.closePath()},e=function(n){var e=a(180),o=a(n);t.beginPath(),t.fillStyle="#0aa",t.arc(200,200,50,e,o,!1),t.fill(),t.closePath(),t.beginPath(),t.fillStyle="#faa",t.arc(200,200,50,e,o,!0),t.fill(),t.closePath()},o=0;!function a(){setTimeout(function(){t.clearRect(0,0,500,500);for(var c=0;c<50;c+=1)n(500);e(o),(o+=1)>360&&(o=0),requestAnimationFrame(a)},800)}()}();//# sourceMappingURL=circle.fbca4612.js.map

//# sourceMappingURL=circle.fbca4612.js.map
