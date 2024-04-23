const menus = document.querySelectorAll('.menu-list .link');
const sections = document.querySelectorAll('.section');
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

const aboutSection = document.querySelector('.section.about');
window.addEventListener('scroll', function(){
  let scroll = window.pageYOffset;
  console.log(scroll)
  let winH = scroll + window.innerHeight;
  sections.forEach((section, index) => { 
    let sectionTop = section.offsetTop;
    let sectionBottom = sectionTop + section.offsetHeight;
    if(scroll >= sectionTop && scroll < sectionBottom) {
      menus[index].classList.add('selected');
    } else {
      menus[index].classList.remove('selected');
    }
  })

  const words = document.querySelectorAll('.words-item');
  const wordsChangeStart = document.querySelector('.words-item.start');
  const wordsChangeEnd = document.querySelector('.words-item.end');
  // 시작위치, 끝위치의 절대좌표를 구한다.
  let wordsChangeStartY = wordsChangeStart.getBoundingClientRect().top + scroll;
  let wordsChangeEndY = wordsChangeEnd.getBoundingClientRect().top + scroll;
  // 단어가 변경되는 구간을 단어 수로 나누어 스크롤 위치에 따라 스타일 적용할 단어를 결정하는 변수
  const division = (wordsChangeEndY - wordsChangeStartY) / words.length;

  if(document.querySelector('.on')) document.querySelector('.on').classList.remove('on')
  if(scroll >= (wordsChangeStartY / 2) && scroll <= wordsChangeEndY) {
    // 스크롤 위치에서 가장 가까운 단어의 인덱스를 구함
    const targetIndex = Math.round((scroll - wordsChangeStartY) / division)
    if(words[targetIndex]) words[targetIndex].classList.add('on');
  }

  const fixedElement = document.querySelector('.about .description');
  if(scroll >= aboutSection.offsetTop - 100 && scroll < aboutSection.offsetTop + (aboutSection.offsetHeight / 2)) {
    fixedElement.style.opacity = 1;
    fixedElement.style.visibility = 'visible';
  } else {
    fixedElement.style.opacity = 0;
    fixedElement.style.visibility = 'hidden';
  }
})