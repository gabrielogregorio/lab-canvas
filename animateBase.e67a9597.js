var e,t,l,n,a;e=document.getElementById("canvas").getContext("2d"),t=0,l=50,n=8,a=8,function r(){e.clearRect(0,0,500,500),// desenha novamente
e.fillStyle="#0f0",e.fillRect(t,l,50,50),e.lineWidth=5,e.strokeStyle="#000",e.strokeRect(t,l,50,50),// atualiza posição
t+=n,l+=a;var c=t+50>=500,i=t<=0;(c||i)&&(n*=-1);var o=l+50>=500,d=l<=0;(o||d)&&(a*=-1),requestAnimationFrame(r)}();//# sourceMappingURL=animateBase.e67a9597.js.map

//# sourceMappingURL=animateBase.e67a9597.js.map
