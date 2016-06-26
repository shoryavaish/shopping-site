images = new Array;
images[0] = "images/a1.jpg";
images[1] = "images/a2.jpg";
images[2] = "images/a3.jpg";
images[3] = "images/v.jpg";
images[4] = "images/b.jpg";
images[5] = "images/sc.jpg";
images[6] = "images/h.jpg";
images[7] = "images/t.jpg";
images[8] = "images/wc.jpg";
images[9] = "images/health.jpg";
images[10] = "images/y.jpg";
setInterval(function()  {
changeImage()
}, 4000);
x=0;
function changeImage()
{
document.getElementById('ad').src = images[x];
if(x<10){
x=x+1;}
else if(x=11){
x=0;}
}