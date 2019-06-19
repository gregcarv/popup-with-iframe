const destroyFrame = () => {
  const popup = document.querySelector('#popup-frame-wrapper')
  if (popup) {
    document.body.classList.remove('popup-frame-isactive');
    popup.remove();
  } else {
    return false;
  }
}

const popupContainer = () => {
  const popup = document.createElement('div');
  popup.id = 'popup-frame-wrapper';
  popup.class = 'popup-frame-container';

  return popup;
}

const closeLinkElement = (event) => {
  const closeLink = document.createElement('span');
  closeLink.classList.add('close-link');
  closeLink.innerHTML = '<span>close</span>';

  return closeLink;
}

const generateFrame = (event) => {
  const popup = popupContainer();
  const closeLink = closeLinkElement();
  const frameHead = document.createElement('div');
  frameHead.classList.add('frame-head');
  frameHead.innerHTML = closeLink.outerHTML;
  const template = `<div class="frame-wrap"><iframe src="${event.target.getAttribute('href')}"></iframe></div>`;
  popup.innerHTML = `${frameHead.outerHTML}${template}`;
  document.body.classList.add('popup-frame-isactive');

  return popup;
}


const initializePopupFrame = () => {
  // in fullscreen
  const linkList = document.querySelectorAll('.pop-frame a');

  linkList.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();

      const form = new Promise((resolve, reject) => {
        resolve(e);
      })

      form
        .then(destroyFrame())
        .then(e => {
          return generateFrame(e);
        })
        .then(form => {
          const closeLink = form.querySelector('.close-link');
          closeLink.addEventListener('click', (e) => {
            destroyFrame();
          })
          document.body.appendChild(form);
        })
    })
  })
}

(() => {
  initializePopupFrame();
})();