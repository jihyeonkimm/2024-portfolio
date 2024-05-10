const body = document.querySelector('body');
const aboutSection = document.querySelector('.section.about');
const projects = document.querySelectorAll('.project');
const words = document.querySelectorAll('.words-item');
const wordsChangeStart = document.querySelector('.words-item.start');
const wordsChangeEnd = document.querySelector('.words-item.end');
const menus = document.querySelectorAll('.menu-list .link');
const sections = document.querySelectorAll('.section');

let windowInnerHeight = 0;
let vh = 0;
let isMobile = document.documentElement.clientWidth <= 768;

// 모바일 실제 100vh 적용
function handleResize(){
  let currentInnerHeight = window.innerHeight;
  if(currentInnerHeight !== windowInnerHeight) {
    windowInnerHeight = currentInnerHeight;
    vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
}
handleResize();

// resize 이벤트
window.addEventListener('resize', function(){
  isMobile = document.documentElement.clientWidth <= 768;

  handleResize();
  handleAboutSectionScroll();
})

// 스크롤 이벤트
window.addEventListener('scroll', function(){
  let scroll = window.pageYOffset;
  let winH = scroll + window.innerHeight;

  handleAboutSectionScroll(scroll);
  menuSelectOnScroll(scroll);
  showProjectThumbnail(scroll, winH);
})

// 메뉴 클릭했을 때 selected 표현 클래스 추가
menus.forEach((menu, index) => {
  menu.addEventListener('click', function(){
    // 새로운 배열을 복사
    let menuList = [...menus];
    // 선택되는 인덱스를 삭제해서 배열의 내용을 변경
    menuList.splice(index, 1);
    menuList.forEach((item) => {
      item.closest('.menu-list .link').classList.remove('selected');
    })
    menu.classList.add('selected');
  })
})

// about 영역에서 스크롤 시 단어 스타일 변화 + 고정 영역 노출/미노출 스타일 변화시키는 함수
function handleAboutSectionScroll(scroll){
  // 시작위치, 끝위치의 절대좌표
  // 시작위치는 첫번째 단어의 위치보다 약간 위에서 이벤트 시작하기 위해 임의로 300만큼 빼준다.
  let wordsChangeStartY = wordsChangeStart.getBoundingClientRect().top + scroll - 300;
  let wordsChangeEndY = wordsChangeEnd.getBoundingClientRect().top + scroll;
  // 단어가 변경되는 구간을 단어 수로 나누어 스크롤 위치에 따라 스타일 적용할 단어를 결정하는 변수
  const division = (wordsChangeEndY - wordsChangeStartY) / words.length;
  
  if(document.querySelector('.on')) document.querySelector('.on').classList.remove('on')
  if(scroll >= wordsChangeStartY && scroll <= wordsChangeEndY) {
    // 스크롤 위치에서 가장 가까운 단어의 인덱스를 구함
    const targetIndex = Math.round((scroll - wordsChangeStartY) / division)
    if(words[targetIndex]) words[targetIndex].classList.add('on');
  } 

  const fixedElement = document.querySelector('.about .description');
  // isMobile이 true이면 opacity가 1 + visibility가 visible
  // iisMobile이 false이면 스크롤 범위 내일때만 opacity가 1 + visibility가 visible
  fixedElement.style.opacity = isMobile ? 1 : (scroll >= wordsChangeStartY && scroll <= wordsChangeEndY - 300) ? 1 : 0;
  fixedElement.style.visibility = isMobile ? 'visible' : (scroll >= wordsChangeStartY && scroll <= wordsChangeEndY - 300) ? 'visible' : 'hidden';
}

// 스크롤 시 각 영역에 해당하는 메뉴에 selected 표현 클래스 추가
function menuSelectOnScroll(scroll){
  sections.forEach((section, index) => { 
    let sectionTop = section.offsetTop;
    let sectionBottom = sectionTop + section.offsetHeight;
    if(scroll >= sectionTop && scroll < sectionBottom - 100) {
      menus[index].classList.add('selected');
    } else {
      menus[index].classList.remove('selected');
    }
  })
}

// 스크롤 시 프로젝트 영역 내 각 프로젝트 썸네일 노출
function showProjectThumbnail(scroll, winH){
  projects.forEach((item) => {
    let itemTop = item.getBoundingClientRect().top + scroll;
    if(winH > itemTop + (item.offsetHeight / 2)) {
      item.classList.add('active')
    }
  })
}

// 프로젝트 썸네일 클릭 시 프로젝트 상세페이지 노출 함수
projects.forEach((project) => {
  let thumbnail = project.querySelector('.project-thumbnail');
  let detail = project.querySelector('.project-detail');
  let btnClose = project.querySelector('.btn-close');
  thumbnail.addEventListener('click', function(){
    detail.classList.add('show');
    body.classList.add('scroll-lock');
  })
  btnClose.addEventListener('click', function(){
    detail.classList.add('hide');
    body.classList.remove('scroll-lock');
    setTimeout(() => {
      detail.classList.remove('show')
      detail.classList.remove('hide')
    }, 2000)
  })
})