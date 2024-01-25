////////////////

function locomotive() {
  gsap.registerPlugin(ScrollTrigger); //ScrollTrigger를 통해 스크롤 애니메이션을 관리하기 위한 도구

  /* SMOOTH SCROLL */
  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  //locoScroll객체를 생성, 스크롤 관련 동작을 제어하는데 사용됩니다.
  //el: document.querySelector("#main")
  // --> #main이라는 CSS선택자로 해당하는 HTML요소를 스크롤 컨테이너로 지정합니다,
  // #main영역이  LocomotiveScroll이 적용되는 범위이다.

  //smooth: true --> 부드러운 스크롤을 활성화 합니다.

  locoScroll.on("scroll", ScrollTrigger.update);
  //LocomotiveScroll의 Scroll이벤트가 발생할때 마다 ScrollTrigger의 update 함수를 호출합니다,
  //이것은 스크롤 이벤트와 ScrollTrigger간의 연동을 설정합니다.

  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    },
    //ScrollTrigger의 scrollerProxy(스크롤에 대한 인터페이스 제어,조작)를 설정한다.
    //이 부분은 ScrollTrigger가 LocomotiveScroll와 함께 작동하도록 만듦

    getBoundingClientRect() {
      return {
        left: 0,
        top: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      }; //뷰포트의 크기를 반환하는 getBoundingClientRect() 함수를 정의함
    },
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  }); //pinType은 #main 요소의 스타일 속성 transform이 설정되어 있으면 transform으로,
  //그렇지 않으면 fixed로 설정함

  //"refresh" 이벤트를 감지하면 locoScroll.update() 함수를 호출하여 LocomotiveScroll을 업데이트합니다. 스크롤 컨테이너나 내용이 동적으로 변경될 때 사용됩니다.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  ScrollTrigger.refresh(); //ScrollTrigger를 초기화하고 설정을 적용합니다.
}
locomotive();

///////////////


// pre-road
let container = document.querySelector('#progress');
let progressBar = document.querySelector('.progress-bar');
let progressText = document.querySelector('.progress-text');


var imgLoad = imagesLoaded('body');
let imgTotal = imgLoad.images.length;

let imgLoaded = 0;
let current = 0;
let progressTimer;
let topValue;


progressTimer = setInterval(updateProgress, 1000/60);
imgLoad.on('progress', function(){
    imgLoaded++;

});



function updateProgress(){
    let loadheart = document.querySelectorAll('.loadingWrap .miutext');
    let target = (imgLoaded / imgTotal) * 100;
    console.log(target)
    current += (target - current) * 0.03;

    progressBar.style.width = current + "%";
    progressText.innerHTML = `${Math.ceil(current)}%`;


    if(current > 99.9){
        clearInterval(progressTimer)
        container.classList.add('progress-complete');
        progressBar.style.width = "100%";
        gsap.to(container,{
            duration: 0.3,
            yPercent: -100,
        })
    }
    gsap.to(loadheart,{y:-20, stagger: 0.5})
}






//smallMenu
// let smMenu = document.querySelector('.smallMenu');
// let closed = document.querySelector('.close');
// let mnBtn = document.querySelector('.menuBtn');

// closed.addEventListener('click',function(){
//   smMenu.style.display = "none";
// })

// mnBtn.addEventListener('click',function(){
//   smMenu.style.display = "block";
// })




//-----------------------section1 gsap 애니메이션

let logo = document.querySelector(".logo");
let sec1IMG = document.querySelectorAll(".imgwrap>img");
let menu_logo = document.querySelector(".menu_logo");
let s1_menu = document.querySelectorAll(".s1_menu");

let tl = gsap.timeline({
  scrollTrigger: {
    trigger: "#section1",
    scroller: "#main",
    pin: true,
    start: "top top",
    end: "+=400%",
    scrub: true,
  },
});

tl.to(logo, {
  x: -350,
  scale: 0,
});

tl.to(sec1IMG, {
  y: 500,
  opacity: 0,
  stagger: 0.3,
});
tl.from(menu_logo, {
  opacity: 0,
});
tl.from(s1_menu, {
  opacity: 0,
});


//section1 p태그 애니메이션
// let s1P = document.querySelectorAll(".s1_p");

// s1P.forEach((pele) => {
//   tl.to(pele, { rotationX: -90, ease: "none" });
// });

let s1P_1 = document.querySelector('.s1_p1');
let s1P_2 = document.querySelector('.s1_p2');
let s1P_3 = document.querySelector('.s1_p3');
let s1P_4 = document.querySelector('.s1_p4');

tl.to(s1P_1,{ rotationX: -90, ease: "none" })
tl.to(s1P_2,{ rotationX: -90, ease: "none" })
tl.to(s1P_3,{ rotationX: -90, ease: "none" })
tl.to(s1P_4,{ rotationX: 0, ease: "none" })



//section1 이미지 마우스효과

let sec1 = document.querySelector("#section1");

sec1IMG.forEach((ele, index) => {
  ele.addEventListener("mouseover", function () {
    let clBtn = document.querySelector(".clBtn");
    let imgRect = ele.getBoundingClientRect();
    clBtn.style.display = "block";
    clBtn.style.position = "absolute";
    clBtn.style.top = `${imgRect.top + 50}px`;
    clBtn.style.left = `${imgRect.left + 150}px`;
  });

  ele.addEventListener("mouseout", function () {
    let clBtn = document.querySelector(".clBtn");
    clBtn.style.display = "none";
  });

  ele.addEventListener("click", function () {
    switch (index) {
      case 0:
        sec1.style.backgroundImage = "url(img/xsdsadsad5r.jpg)";
        break;
      case 1:
        sec1.style.backgroundImage = "url(img/1sss21f.jpg)";
        break;
      case 2:
        sec1.style.backgroundImage = "url(img/cq5dam.web.1440.630.jpg)";
        break;
      default:
    }
  });
});

//section2 이미지 슬라이드 애니메이션

let tag1 = document.querySelector(".marquee1");
let tag2 = document.querySelector(".marquee2");
let imageArr1 = document.querySelectorAll(".marquee1>img");
let imageArr2 = document.querySelectorAll(".marquee2>img");

let count1 = 0;
let count2 = 0;

function animate() {
  count1++;
  count2++;
  // console.log(count1)

  count1 = marqueeImage(count1, tag1, -1);
  count2 = marqueeImage(count2, tag2, 1);

  window.requestAnimationFrame(animate);
}

function marqueeImage(count, element, direction) {
  //.scrollHeight
  //.scrollWidth
  if (count > element.scrollWidth / 2) {
    count = 0;
    element.style.transform = `translate(0,0)`;
  }
  element.style.transform = `translate(${count * direction}px,0)`;

  return count;
}

animate();

//section2 ripple 효과

var ripple6 = new RippleEffect({
  parent: document.querySelector(".s2_right"),
  texture: "img/sec2_rightBG.jpg",
  intensity: 1, //1.2
  strength: 0.2, //.5
  waveSpeed: 0.005, //0.008
  hover: true, //false
});
ripple6.start();
document.querySelector('.s2_right').addEventListener('mouseenter', ripple6.stop);
document.querySelector('.s2_right').addEventListener('mouseleave', ripple6.start);



//ripple 사이즈 조절
let s2Canvas = document.querySelector(".s2_right>canvas");
s2Canvas.style.height = "100vh";

//section3 h2 스크롤 반응
let s3_top = document.querySelector(".sec3_top");
let s3_bottom = document.querySelector(".sec3_bottom");

let tl2 = gsap.timeline({
  scrollTrigger: {
    trigger: "#section3",
    scroller: "#main",
    pin: true,
    start: "top top",
    end: "+=200%",
    scrub: true,
  },
});

tl2.to(
  s3_top,
  {
    x: -800,
    ease: "power3.out",
  },
  "s3"
);
tl2.to(
  s3_bottom,
  {
    x: 800,
    ease: "power3.out",
  },
  "s3"
);

//section3 p태그
let sec3_rect = document.querySelectorAll(".rect");
let sec3_img = document.querySelectorAll(".mouse_imgWrap>img");
let sec3_img1 = document.querySelector(".s3_rect_img1");
let sec3_img2 = document.querySelector(".s3_rect_img2");
let sec3_img3 = document.querySelector(".s3_rect_img3");

sec3_rect.forEach((ele, index) => {
  ele.addEventListener("mouseover", function (e) {
    let X = e.clientX;
    let Y = e.clientY;
    // switch (index) {
    //   case 0:
    //     sec3_img1.setAttribute(
    //       "style",
    //       "top:" +
    //         (e.clientY - 220) +
    //         "px;left:" +
    //         (e.clientX - 200) +
    //         "px; display:block;"
    //     );
    //     break;
    //   case 1:
    //     sec3_img2.setAttribute(
    //       "style",
    //       "top:" +
    //         (e.clientY - 300) +
    //         "px;left:" +
    //         (e.clientX - 50) +
    //         "px; display:block;"
    //     );
    //     break;
    //   case 2:
    //     sec3_img3.setAttribute(
    //       "style",
    //       "top:" +
    //         (e.clientY - 220) +
    //         "px;left:" +
    //         (e.clientX - 200) +
    //         "px; display:block;"
    //     );
    //     break;
    //   default:
    // }

    switch (index) {
      case 0:
        gsap.to(sec3_img1, {
          top: Y - 220,
          left: X - 200,
          display: "block",
          duratiom: 0.2,
        });
        break;
      case 1:
        gsap.to(sec3_img2, {
          top: Y - 300,
          left: X - 50,
          display: "block",
          duratiom: 0.2,
        });
        break;
      case 2:
        gsap.to(sec3_img3, {
          top: Y - 220,
          left: X - 200,
          display: "block",
          duratiom: 0.2,
        });
        break;
      default:
    }
  });

  ele.addEventListener("mouseout", function () {
    gsap.to(sec3_img[index], { display: "none" });
  });
});

//sec4 left 텍스트 애니메이션
let s4_p = document.querySelector(".s4_desc1");
//보류




//section5 keyword 스크롤
let tl3 = gsap.timeline({
  scrollTrigger: {
    trigger: "#section5",
    scroller: "#main",
    pin: true,
    start: "top top",
    end: "+=900%",
    scrub: true,
  },
});

tl3.to("#section5 .key1", {
  rotate: "0deg",
});
tl3.to(
  "#section5 .key2",
  {
    rotate: "0deg",
  },
  "<"
);

tl3.to("#section5 .key1", {
  x: "30%",
});
tl3.to(
  "#section5 .key2",
  {
    x: "-30%",
  },
  "<"
);

tl3.to("#section5 .key1", {
  x: "-400%",
  scale: 5,
  ease: "power1.inOut",
});
tl3.to(
  "#section5 .key2",
  {
    x: "400%",
    scale: 5,
    ease: "power1.inOut",
  },
  "<"
);

//section5 product_wrap 가로이동

let ductWrap = document.querySelector(".product_wrap");

tl3.to(ductWrap, { x: "-20%", ease: "none" });


//section5 text 스크롤
let s1 = document.querySelector('.square .s1 p');
let s2 = document.querySelector('.square .s2 p');
let s3 = document.querySelector('.square .s3 p');
let s4 = document.querySelector('.square .s4 p');


tl3.to(s1,{x:-400},"<")
tl3.to(s2,{x:30,y:30},"<")
tl3.to(s3,{x:-80,y:80},"<")
tl3.to(s4,{y:-500},"<")




//section5 cube 스크롤
let boxArea = document.querySelector(".box-area");
let cube = document.querySelector(".cube");

tl3.from(boxArea, { scale: 0.5 });
tl3.to(boxArea, { rotationY: -360, ease: "none", scale: 3, y: -200 });

let tl5 = gsap.timeline({
  scrollTrigger: {
    trigger: "#section6",
    scroller: "#main",
    // pin: true,
    start: "top top",
    end: "+=10%",
    scrub: true,
  },
});
tl5.to(cube, { opacity: 0 });



//section6 swiper
var swiper = new Swiper(".mySwiper", {
  slidesPerView: "auto",
  spaceBetween: 30,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

//section6 텍스트 스크롤
let clutter = "";
let clutter2 = "";
let clutter3 = "";

let section6_h2 = document.querySelector(".s6_right>h2").textContent.split("");
let section6_h3 = document.querySelector(".s6_right>h3").textContent.split("");
let section6_p = document.querySelector(".s6_right>p").textContent.split("");

section6_h2.forEach((dets) => {
  clutter += `<span>${dets}</span>`;
  document.querySelector(".s6_right>h2").innerHTML = clutter;
});
section6_h3.forEach((dets) => {
  clutter2 += `<span>${dets}</span>`;
  document.querySelector(".s6_right>h3").innerHTML = clutter2;
});
section6_p.forEach((dets) => {
  clutter3 += `<span>${dets}</span>`;
  document.querySelector(".s6_right>p").innerHTML = clutter3;
});

let tl6 = gsap.timeline({
  scrollTrigger: {
    trigger: "#section6",
    scroller: "#main",
    pin: true,
    start: "top top",
    end: "+=250%",
    scrub: true,
  },
});

tl6.to(".s6_right>h2>span", {
  color: "#fff",
  stagger: 0.5,
});
tl6.to("#section6", {
  background:"#000",
  ease: "power3.out",
  duration:1.5
},"<");


tl6.to(".s6_right>h3>span", {
  color: "#fff",
  stagger: 0.5,
});


tl6.to(".s6_right>p>span", {
  color: "#fff",
  stagger: 0.2,
});


//section6 마우스 이동
let s6_mouse = document.querySelector('.mousemove');
let s6_mouse2 = document.querySelector('.mousemove2');
let sec6 = document.querySelector('#section6');


sec6.addEventListener('mousemove',function(e){
  let X = e.clientX;
  let Y = e.clientY;

  gsap.to(s6_mouse,{
    display:"block",
    x:X,
    y:Y,
    duration:1,
    ease: "power4.out",
  })

  gsap.to(s6_mouse2,{
    display:"block",
    x:`${X + 100}`,
    y:`${Y + 100}`,
    duration:1,
    ease: "power4.out",
    delay: 0.2
  })
})


//section7 타이틀 효과



//section7 이미지 스크롤 효과


let s7_img = document.querySelectorAll('.s7_imgWrap>div');
console.log(s7_img)

let tl7 = gsap.timeline({
  scrollTrigger:{
    trigger: "#section7",
    start: "top 30%",
    end: "+=230%",
    scrub: true,
    scroller: "#main",
  }
});

// tl7.set(s7_img,{scale:0.5, rotationX:"90deg" ,rotationY: "90deg"})
tl7.set(s7_img,{scale:0.5,rotationY: "90deg"})
tl7.to(s7_img,{
  scale:1.3,
  stagger:0.16,
  rotationY: "0deg",
  // rotationX:"0deg",
  ease: "power4.out",
})









//section7 이미지 hover 효과
s7_img.forEach((ele)=>{
  let rect = ele.getBoundingClientRect();
  let rectCenterPosition = (rect.left + rect.right) / 2;

  ele.addEventListener("mouseover",function(e){
  let X = e.clientX;
  console.log(X+ ":clientx")
  console.log(rectCenterPosition + ":center")

    if(X < rectCenterPosition){
      gsap.to(ele,{x:110, ease: "power3.out",})
    }else {
      gsap.to(ele,{x:-110, ease: "power3.out",})
    }

  })

  ele.addEventListener("mouseout",function(){
    gsap.to(ele,{x:0})
  })

})



//section7 h1 효과
let s7_h1 = document.querySelectorAll('.s7_textWrap>h1');

let tl8 = gsap.timeline({
  scrollTrigger:{
    trigger: "#section7",
    start: "top 30%",
    end: "+=280%",
    scrub: true,
    scroller: "#main",
    ease: "back.out(1.7)",
  }
},"<");

s7_h1.forEach((item)=>{
  tl8.from(item,{opacity:0})
  tl8.to(item,{
    color:"#fff",
    stagger:0.2,
    opacity:1,
  })
})



//section8 슬라이드 스크롤
let slider = document.querySelector('.s8_slider');
let sliderWrapper = document.querySelector('.s8_sliderWrapper');
let slides = document.querySelectorAll('.s8_slide');


function updateScaleAniPosition(){
    slides.forEach((slide)=>{
        let rect = slide.getBoundingClientRect();
        let centerPosition = (rect.left + rect.right) / 2;
        let distanceFromCenter = centerPosition;
        let scale;

        if(distanceFromCenter > 0){
            scale = Math.min(1.75, 1 + distanceFromCenter / window.innerWidth)
        }else {
            scale = Math.min(0.5, Math.abs(1 - distanceFromCenter) / window.innerWidth)
        }
        gsap.set(slide,{scale:scale})
    })
}



let horiz = gsap.to(slides,{
    xPercent: -104 * (slides.length - 1),
    scrollTrigger: {
        trigger: "#section8",
        start: "top top",
        end: "+=3000",
        scrub: 1,
        pin: true,
        scroller: "#main",
        onUpdate: ()=>{updateScaleAniPosition()}
    }
});
updateScaleAniPosition();

//section8 손 hover
let slideIMG = document.querySelectorAll('.s8_slide>img');
let hand = document.querySelector('.s8_deco2');


slideIMG.forEach((img)=>{

  img.addEventListener("mouseover",function(){
    hand.style.transform = "rotate(30deg) translate(20%,-20%)";
  })

  img.addEventListener("mouseleave",function(){
    hand.style.transform = "rotate(0deg) translate(0,0)";
  })

})

