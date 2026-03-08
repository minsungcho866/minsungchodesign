gsap.registerPlugin(ScrollTrigger);

let mm = gsap.matchMedia();

mm.add("(min-width: 769px)", () => {

const panels = gsap.utils.toArray(".panel");

const scrollTween = gsap.to(panels,{
xPercent:-100*(panels.length-1),
ease:"none",
scrollTrigger:{
trigger:".horizontal-scroll",
pin:true,
scrub:2,
snap:1/(panels.length-1),
end:() => "+=" + window.innerWidth * panels.length
}
});

panels.forEach((panel)=>{

const text = panel.querySelector(".panel-text");
const image = panel.querySelector("img");

gsap.to(text,{
opacity:1,
y:0,
scrollTrigger:{
trigger:panel,
start:"left center",
end:"right center",
containerAnimation:scrollTween,
scrub:true
}
});

gsap.to(image,{
scale:1.15,
scrollTrigger:{
trigger:panel,
start:"left center",
end:"right center",
containerAnimation:scrollTween,
scrub:true
}
});

});

});