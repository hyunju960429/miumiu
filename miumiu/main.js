////////////////

function locomotive() {
    gsap.registerPlugin(ScrollTrigger);  //ScrollTrigger를 통해 스크롤 애니메이션을 관리하기 위한 도구


    /* SMOOTH SCROLL */
    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true
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
            return arguments.length ?
            locoScroll.scrollTo(value, 0, 0) :
            locoScroll.scroll.instance.scroll.y;
        },
        //ScrollTrigger의 scrollerProxy(스크롤에 대한 인터페이스 제어,조작)를 설정한다.
        //이 부분은 ScrollTrigger가 LocomotiveScroll와 함께 작동하도록 만듦


        getBoundingClientRect() {
            return {
                left: 0,
                top: 0,
                width: window.innerWidth,
                height: window.innerHeight
            }; //뷰포트의 크기를 반환하는 getBoundingClientRect() 함수를 정의함
        },
        pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    }); //pinType은 #main 요소의 스타일 속성 transform이 설정되어 있으면 transform으로,
        //그렇지 않으면 fixed로 설정함

        //"refresh" 이벤트를 감지하면 locoScroll.update() 함수를 호출하여 LocomotiveScroll을 업데이트합니다. 스크롤 컨테이너나 내용이 동적으로 변경될 때 사용됩니다.
        ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
        ScrollTrigger.refresh(); //ScrollTrigger를 초기화하고 설정을 적용합니다.
}
locomotive();

///////////////

let logo = document.querySelector('.logo');

gsap.to(logo,{
    x:-350,
    scale: 0.3,
    scrollTrigger:{
        trigger: '#section1',
        scroller: '#main',
        pin:true,
        start: 'top top',
        end: '+=200%',
        scrub:true
    }
})


//nav 숨기고 꺼내기
let sec2 = document.querySelector('#section2');
let navLogo = document.querySelector('#nav .logo2');
let navGnb = document.querySelector('.gnb');


window.addEventListener('scroll',hide)

function hide(){
    let winScrollTop = scrollY;

    if(sec2.offsetTop > winScrollTop){
        navLogo.style.display = "none";
        navGnb.style.display = "none";
    }
    if(sec2.offsetTop <= winScrollTop){
        navLogo.style.display = "block";
        navGnb.style.display = "flex";
    }
    
}

hide();

////

let tag1 = document.querySelector('.marquee1');
let tag2 = document.querySelector('.marquee2');
let imageArr1 = document.querySelectorAll('.marquee1>img');
let imageArr2 = document.querySelectorAll('.marquee2>img');


let count1 = 0;
let count2 = 0;

function animate(){
    count1++;
    count2++;
    // console.log(count1)

    count1 = marqueeImage(count1,tag1,-1);
    count2 = marqueeImage(count2,tag2,1);

    window.requestAnimationFrame(animate)
}

function marqueeImage(count,element,direction){
    //.scrollHeight
    //.scrollWidth
    if(count>element.scrollWidth){
        count = 0;
        element.style.transform = `translate(0,0)`;
    }
    element.style.transform = `translate(${count * direction}px,0)`;

    return count
}

function scrollHandler(){
    count1 += 25;
    count2 += 25;
}

animate();