(function() {
  "use strict";

  window.addEventListener('load', () => {
    on_page_load()
  });

  /**
   * Function gets called when page is loaded.
   */
  function on_page_load() {
    // Initialize On-scroll Animations
    AOS.init({
      anchorPlacement: 'top-left',
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
      disable: 'mobile'
    });
  }

  /**
   * Navbar effects and scrolltop buttons upon scrolling
   */
  const navbar = document.getElementById('header-nav')
  var body = document.getElementsByTagName("body")[0]
  const scrollTop = document.getElementById('scrolltop')
  window.onscroll = () => {
    if (window.scrollY > 0) {
      navbar.classList.add('fixed-top', 'shadow-sm')
      body.style.paddingTop = navbar.offsetHeight + "px"
      scrollTop.style.visibility = "visible";
      scrollTop.style.opacity = 1;
    } else {
      navbar.classList.remove('fixed-top', 'shadow-sm')
      body.style.paddingTop = "0px"
      scrollTop.style.visibility = "hidden";
      scrollTop.style.opacity = 0;
    }
  };

  /**
   * Masonry Grid
   */
  var elem = document.querySelector('.grid');
  if(elem) {
    imagesLoaded(elem, function() {
      new Masonry(elem, {
        itemSelector: '.grid-item',
        percentPosition: true,
        horizontalOrder: true
      });
    })
  }

  /**
   * Big Picture Popup for images and videos
   */
   document.querySelectorAll("[data-bigpicture]").forEach((function(e) {
     e.addEventListener("click", (function(t){
       t.preventDefault();
       const data =JSON.parse(e.dataset.bigpicture)
       BigPicture({
        el: t.target,
        ...data
      })
     })
    )
  }))

  /**
   * Big Picture Popup for Photo Gallary
   */
   document.querySelectorAll(".bp-gallery a").forEach((function(e) {
    var caption = e.querySelector('figcaption')
    var img = e.querySelector('img')
    // set the link present on the item to the caption in full view
    img.dataset.caption = '<a class="link-light" target="_blank" href="' + e.href + '">' + caption.innerHTML + '</a>';
    
     e.addEventListener("click", (function(t){
       t.preventDefault();
       BigPicture({
        el: t.target,
        gallery: '.bp-gallery',
      })
     })
    )
  }))

  function sendEmail(e) {
    e.preventDefault()
    const params = {
      name : document.querySelector('#name').value,
      email : document.querySelector('#email').value,
      tel : document.querySelector('#tel').value,
      message : document.querySelector('#message').value,
    }

    emailjs.send('service_ypi7l5l', 'template_lplb987', params).then(res => {
      console.log(res.status);
      Toastify({
        text: "Thank you. Your message has been received.", 
        duration: 5000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
        stopOnFocus: true, // Prevents dismissing of toast on hover
      }).showToast();
    }, err => console.log(err));
  }

  document.querySelector('.sendButton').addEventListener('click', sendEmail)


})();