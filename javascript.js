//  <script src="javascript.js"></script>
$(window).on("load", function (e){
//%%%%%%%%%%%%%%%%%%%---VARIABLES---%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
const coverVideo=document.querySelector('#cover-video');
const portfolio=document.querySelector('#portfolio');
const portfolioChildren=document.querySelectorAll('.portfolio-child');
const portfolioTitle=document.querySelector('#portfolio-title'); //this will be used to determine viewport width, since this element has 100% width
const portfolioVideos=document.querySelectorAll('iframe');
const homeBtn=document.querySelector('#home-btn');
const portfolioBtn=document.querySelector('#portfolio-btn');
const arrow=document.querySelector('.arrow');
const whiteCoverage=document.querySelector('#white-coverage');
const contactsVideo=document.querySelector('#water-video');
const contactBtn=document.querySelector('#contact-btn');
const contacts=document.querySelector('#contacts');

var i;  //helping variable
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

//%%%%%%%%%%%%%%%%%%%%---MAIN FUNCTION--%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
resizeContactsVideo();
window.addEventListener('resize',resizeContactsVideo); //resizing contacts video when the user resizes window
resizeCoverVideo();
window.addEventListener('resize',resizeCoverVideo); //resizing cover video when the user resizes window
wrapPortfolioChildren();  //wrapping portfolio videos (if needed) on page load
window.addEventListener('resize',wrapPortfolioChildren);  //wrapping portfolio videos on window resize

portfolioChildren.forEach(child=>child.addEventListener('click',function(e){  //playing a video from portfolio if the user clicks on a thumbnail
  portfolioVideos.forEach(video=>{
    if (video.classList.contains('playing')) {  //closing video that was previously chosen by the user
      video.classList.remove('playing');
      //---removing and adding the iframe element to html in order to restart it------
      var element=video;
      var elementParent=video.parentNode;
      elementParent.removeChild(element);
      elementParent.appendChild(element);
      //-----------------------------------------------------------------------------------
    }
  });
  child.querySelector('iframe').classList.add('playing');
}));

document.addEventListener('click',e=>closeVideo(e)); //closing portfolio video if user clicks anywhere on the window
arrow.addEventListener('click',function(){
  const portfolioTopPosition=(parseFloat(portfolioTitle.offsetTop+'px')-120)+'px';
  $("html, body").animate({ scrollTop: `${portfolioTopPosition}` });
})




//---------Applying JS to menu btns--------------------------
homeBtn.addEventListener('click',function(){  //scrolling to top if the user clicks on home button
  $("html, body").animate({ scrollTop: "0px" });
});
portfolioBtn.addEventListener('click',function(){  //scrolling to portfolio if the user clicks on portfolio button
  const portfolioTopPosition=(parseFloat(portfolioTitle.offsetTop+'px')-120)+'px';
  $("html, body").animate({ scrollTop: `${portfolioTopPosition}` });
});
contactBtn.addEventListener('click',function(){
  const contactsTopPosition=contacts.offsetTop+'px';
  $("html, body").animate({ scrollTop: `${contactsTopPosition}` });
})
//------------------------------------------------------------

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

//%%%%%%%%%%%%%%%%%%%---OTHER FUNCTIONS---%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
function resizeCoverVideo(){
  whiteCoverage.style.top=0+'px';
  whiteCoverage.style.height=0+'px';
  i=1;
  const viewportWidth=portfolioTitle.offsetWidth+'px';
  const viewportHeight=$(window).height()+'px';
  var coverVideoWidth=0+'px';
  var coverVideoHeight=0+'px';
  //---------Positioning cover arrow------------------------------------
  const arrowHeight=arrow.offsetHeight+'px';
  const arrowTopPosition=(parseFloat(viewportHeight)-parseFloat(arrowHeight)-11)+'px';
  arrow.style.top=arrowTopPosition;
  //--------------------------------------------------------------------
  if (parseFloat(viewportWidth)>parseFloat(viewportHeight)) {
    coverVideo.style.width='auto';
    while (parseFloat(coverVideoWidth)<parseFloat(viewportWidth) || parseFloat(coverVideoHeight)<parseFloat(viewportHeight)){
      coverVideo.style.height=(parseFloat(coverVideoHeight)+i)+'px';
      i++;
      coverVideoWidth=coverVideo.offsetWidth+'px';
      coverVideoHeight=coverVideo.offsetHeight+'px';
      centerCoverVideo(coverVideoWidth,viewportWidth);
    }
  }
  else {
    coverVideo.style.height='auto';
    while (parseFloat(coverVideoWidth)<parseFloat(viewportWidth) || parseFloat(coverVideoHeight)<parseFloat(viewportHeight)){
      coverVideo.style.width=(parseFloat(coverVideoWidth)+i)+'px';
      i++;
      coverVideoWidth=coverVideo.offsetWidth+'px';
      coverVideoHeight=coverVideo.offsetHeight+'px';
      centerCoverVideo(coverVideoWidth,viewportWidth);
    }
  }
  //------"cutting" the video vertically if size exceeds viewport height-----
  if (parseFloat(coverVideoHeight)>parseFloat(viewportHeight)){
    const coverageHeight=(parseFloat(coverVideoHeight)-parseFloat(viewportHeight))+'px';
    whiteCoverage.style.top=viewportHeight;
    whiteCoverage.style.height=coverageHeight;

    //fixing the margin:
    const newPortfolioMarginTop=(100-parseFloat(coverageHeight))+'px';
    if (parseFloat(newPortfolioMarginTop)>=0) portfolio.style.marginTop=newPortfolioMarginTop;
    else portfolio.style.marginTop=0;
  }
  //------------------------------------------------------------------------
}

function wrapPortfolioChildren(){
  const viewportWidth=portfolioTitle.offsetWidth;
  if (viewportWidth<=1200 && viewportWidth>750){
    for (i = 0; i < portfolioChildren.length; i++) {
      portfolioChildren[i].style.width = "50%";
    }
  }
  else if (viewportWidth<=750) {
    for (i = 0; i < portfolioChildren.length; i++) {
      portfolioChildren[i].style.width = "100%";
    }
  }
  else if (viewportWidth>1200) {
    for (i = 0; i < portfolioChildren.length; i++) {
      portfolioChildren[i].style.width = "25%";
    }
  }
}

function closeVideo(e){
  if (e.target.classList.contains('thumbnails') || e.target.classList.contains('video-title') || e.target.classList.contains('video-year') || e.target.classList.contains('additional-info')) return;
  else portfolioVideos.forEach(video=>{
    if (video.classList.contains('playing')) {
      video.classList.remove('playing');
      //---removing and adding the iframe element to html in order to restart it------
      var element=video;
      var elementParent=video.parentNode;
      elementParent.removeChild(element);
      elementParent.appendChild(element);
      //-----------------------------------------------------------------------------------
    }
  });
}

function centerCoverVideo(coverVideoWidth,viewportWidth){
  if (parseFloat(coverVideoWidth)>parseFloat(viewportWidth)){
    const marginLeft=-(parseFloat(coverVideoWidth)-parseFloat(viewportWidth))/2+'px';
    coverVideo.style.marginLeft=marginLeft;
  }
}

function resizeContactsVideo(){
  contactsVideo.style.width='100%';
  contactsVideo.style.height='auto';
  var contactsVideoHeight=contactsVideo.offsetHeight+'px'
  if (parseFloat(contactsVideoHeight)<588){
    contactsVideo.style.width='auto';
    while (parseFloat(contactsVideoHeight)<588){
      contactsVideo.style.height=(parseFloat(contactsVideoHeight)+1)+'px';
      contactsVideoHeight=contactsVideo.style.height;
    }
  }
}

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
});
