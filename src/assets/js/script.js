const scroll = new SmoothScroll('a[href*="#"]', {
    speed: 500,
    speedAsDuration: true
  }),
  orbsContainer = d3.select('.skills__interactive'),
  data = [],
  forces = [],
  orbs = [{
    label: 'sass', // SASS
    width: 176,
    position: [1000, 80],
    gradient: 'purple'
  },
  {
    label: 'light-one',
    width: 144,
    position: [750, 200],
    gradient: 'light'
  },
  {
    label: 'gulp', //Gulp
    width: 176,
    position: [420, 650],
    gradient: 'red'
  },
  {
    label: 'light-two',
    width: 256,
    position: [1100, 800],
    gradient: 'light'
  },
  {
    label: 'git', // GIT
    width: 176,
    position: [1450, 1150],
    gradient: 'magenta'
  },
  {
    label: 'html', // HTML5
    width: 145,
    position: [1350, 900],
    gradient: 'orange'
  },
  {
    label: 'light-three',
    width: 160,
    position: [900, 950],
    gradient: 'light'
  },
  {
    label: 'js', // JAVASCRIPT
    width: 288,
    position: [830, 560],
    gradient: 'yellow'
  },
  {
    label: 'light-four',
    width: 193,
    position: [250, 1100],
    gradient: 'light'
  },
  {
    label: 'vue', // VUE
    width: 256,
    position: [500, 1400],
    gradient: 'green'
  },
  {
    label: 'webpack', // WEBPACK
    width: 144,
    position: [-200, 1300],
    gradient: 'darkblue'
  },
  {
    label: 'light-five',
    width: 177,
    position: [1600, 400],
    gradient: 'light'
  },
  {
    label: 'light-six',
    width: 224,
    position: [1550, -30],
    gradient: 'light'
  },
  {
    label: 'css', // CSS3
    width: 144,
    position: [1400, 200],
    gradient: 'lightblue'
  }
  ];

function generateNodes(radius) {
  return d3.range(2).map(() => ({ radius: radius }));
}

function generateOrbs(data, force, index, orbs) {
  force.size(orbs[index].position);
  force.start();

  const orb = orbsContainer.selectAll('#circle-' + index);

  orb.data(data.nodes.slice(1))
    .enter()
    .append('div')
    .attr('style', d => {
      return `width: ${orbs[index].width}px; height: ${orbs[index].width}px; transform: translate(-${orbs[index].width / 2}px, -${orbs[index].width / 2}px);`;
    })
    .attr('class', 'row__orb row__orb--' + orbs[index].gradient + ' skills__orb skills__orb--' + orbs[index].label);

  force.on('tick', () => {
    orbsContainer.selectAll('div')    
      .style('top', d => `${Math.round(d.y)}px`)
      .style('left', d => `${Math.round(d.x)}px`);
  });
}

function skillOrbsInit() {
  if (window.innerWidth < 1024) return false;

  for (let i = 0; i < orbs.length; i++) {
    data[i] = {
      nodes: generateNodes(orbs[i].width)
    };
    data[i].root = data[i].nodes[0];
    data[i].root.radius = 0;
    data[i].root.fixed = true;
  
    forces[i] = d3.layout.force().gravity(0.7).charge((d, i) => (i ? 0 : (-1 * orbs[i].width * 20))).nodes(data[i].nodes);
  }
  
  data.forEach((data, i) => {
    generateOrbs(data, forces[i], i, orbs);
  });
  
  orbsContainer.on('mousemove', function () {
    let p1 = d3.mouse(this);
  
    data.forEach((data, i) => {
      data.root.px = p1[0];
      data.root.py = p1[1];
      forces[i].resume();
    });
  });
}

skillOrbsInit();

const main = document.getElementById('page'),
  nav = document.querySelector('.nav'),
  navBtn = document.querySelector('.nav__btn'),
  navLinks = Array.from(document.querySelectorAll('.nav a')),
  sections = document.querySelectorAll('.row');
let navOpen = false;

function navToggle() {
  if (window.innerWidth >= 768) return false;
  main.classList.toggle('page--hidden');
  nav.classList.toggle('nav--open');
  navOpen = !navOpen;
}

function inView(section) {
  return section.getBoundingClientRect().top < window.innerHeight / 2
         && section.getBoundingClientRect().bottom > window.innerHeight / 2;
}

navBtn.addEventListener('click', navToggle);
navLinks.forEach(link => link.addEventListener('click', () => {
  if (nav.classList.contains('nav--open')) {
    navToggle();
  }
}));

window.addEventListener('touchmove', evt => {
  if (navOpen) evt.preventDefault();
}, {passive: false});

window.addEventListener('scroll', evt => {
  sections.forEach(section => {
    const sectionLink = navLinks.find(link => link.getAttribute('href').includes(section.getAttribute('id')));
    if (inView(section)) {      
      sectionLink.parentElement.classList.add('nav__link--active');
    } else {
      sectionLink.parentElement.classList.remove('nav__link--active');
    }
  })
});

const form = document.querySelector('.contact__form'),
  inputs = Array.from(document.querySelectorAll('.contact__input')),
  sentMessage = document.querySelector('.contact__message');

function validate(input, pattern) {
  const reg = new RegExp(pattern);
  return reg.test(input);
}

inputs.forEach(element => {
  const label = element.previousElementSibling,
    prompt = element.nextElementSibling;

  element.addEventListener('focus', () => {
    label.classList.add('contact__label--hidden');
    prompt.classList.add('contact__prompt--hidden');
  });

  element.addEventListener('blur', () => {
    if (element.value === '') label.classList.remove('contact__label--hidden');
    if (!validate(element.value, element.dataset.pattern)) {
      prompt.classList.remove('contact__prompt--hidden');
    }
  });
});

form.addEventListener('submit', evt => {
  evt.preventDefault();

  const valid = inputs.map(input => {
    if (!validate(input.value, input.dataset.pattern)) {
      input.nextElementSibling.classList.remove('contact__prompt--hidden');
      return false;
    } else {
      return true;
    }
  });

  if (valid.some(el => !el)) return false;

  const req = new XMLHttpRequest();
  req.open('POST', form.getAttribute('action'), true);
  req.send(new FormData(form));

  fetch(form.getAttribute('action'), {
    method: 'POST',
    headers: {
      'Accept': 'application/x-www-form-urlencoded;charset=UTF-8',
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body: new URLSearchParams(new FormData(form)).toString()
  }).then(res => {
    const string = res.status === 200
      ? 'Message sent successfuly! I\'ll get back to you as soon as I can.'
      : 'Sorry, something went wrong. Please, try again later.';

    if (res.status === 200) {
      inputs.forEach(input => {
        input.value = '';
        input.previousElementSibling.classList.remove('contact__label--hidden');
      });
    }

    sentMessage.innerText = string;
    sentMessage.classList.toggle('contact__message--hidden');

    setTimeout(() => {
      sentMessage.classList.toggle('contact__message--hidden');
    }, 5000);
  });
});
