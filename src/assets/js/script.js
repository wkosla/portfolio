const svg = d3.select('.skills__svg'),
  data = [],
  forces = [],
  orbs = [{
    label: 'Sass', // SASS
    colors: ['#cb00cb', '#6711a5'],
    file: '../assets/img/balls/sass.svg',
    width: 353,
    position: [1000, 80]
  },
  {
    label: '',
    colors: ['#fff', '#e6f0fa'],
    file: '../assets/img/balls/ball-5.svg',
    width: 321,
    position: [750, 200]
  },
  {
    label: 'Gulp', //Gulp
    colors: ['#ff0051', '#940000'],
    file: '../assets/img/balls/gulp.svg',
    width: 353,
    position: [420, 650]
  },
  {
    label: '',
    colors: ['#fff', '#e6f0fa'],
    file: '../assets/img/balls/ball-4.svg',
    width: 433,
    position: [1100, 800]
  },
  {
    label: 'GIT', // GIT
    colors: ['#f3008c', '#8a003e'],
    file: '../assets/img/balls/git.svg',
    width: 353,
    position: [1500, 1100]
  },
  {
    label: 'HTML5', // HTML5
    colors: ['#ffa700', '#ff4200'],
    file: '../assets/img/balls/html.svg',
    width: 322,
    position: [1300, 900]
  },
  {
    label: '',
    colors: ['#fff', '#e6f0fa'],
    file: '../assets/img/balls/ball-1.svg',
    width: 337,
    position: [900, 950]
  },
  {
    label: 'JS', // JAVASCRIPT
    colors: ['#ffdf00', '#ff9100'],
    file: '../assets/img/balls/javascript.svg',
    width: 466,
    position: [830, 560]
  },
  {
    label: '',
    colors: ['#fff', '#e6f0fa'],
    file: '../assets/img/balls/ball-3.svg',
    width: 370,
    position: [250, 1100]
  },
  {
    label: 'Vue', // VUE
    colors: ['#bdff16', '#59a52b'],
    file: '../assets/img/balls/vue.svg',
    width: 433,
    position: [500, 1400]
  },
  {
    label: 'Webpack', // WEBPACK
    colors: ['#3174fa', '#1246c9'],
    file: '../assets/img/balls/webpack.svg',
    width: 321,
    position: [-200, 1300]
  },
  {
    label: '',
    colors: ['#fff', '#e6f0fa'],
    file: '../assets/img/balls/ball-2.svg',
    width: 354,
    position: [1600, 400]
  },
  {
    label: '',
    colors: ['#fff', '#e6f0fa'],
    file: '../assets/img/balls/ball-6.svg',
    width: 401,
    position: [1550, -30]
  },
  {
    label: 'CSS3', // CSS3
    colors: ['#00e1ff', '#008cff'],
    file: '../assets/img/balls/css.svg',
    width: 321,
    position: [1400, 200]
  }
  ];

function generateNodes(orb) {
  return d3.range(2).map(() => ({
    radius: orb.radius,
    px: orb.position[0],
    py: orb.position[1]
  }));
}

function generateOrbs(data, force, index, orbs) {
  force.size(orbs[index].position);
  force.start();

  const circle = svg.selectAll('circle');

  circle
    .data(data.nodes.slice(1))
    .enter()
    .append('image')
    .attr('xlink:href', orbs[index].file)
    .attr('width', orbs[index].width)
    .attr('height', orbs[index].width);

  force.on('tick', () => {
    svg.selectAll('image')
      .attr('x', (d) => d.x - orbs[index].width / 2)
      .attr('y', (d) => d.y - orbs[index].width / 2);
  });
}

function skillOrbsInit() {
  if (this.innerWidth < 1024) return false;

  for (let i = 0; i < orbs.length; i++) {
    data[i] = {
      nodes: generateNodes(orbs[i])
    };
    data[i].root = data[i].nodes[0];
    data[i].root.radius = 0;
    data[i].root.fixed = true;
  
    forces[i] = d3.layout.force()
      .gravity(0.7)
      .charge(i => (i ? 0 : (-1 * orbs[i].width * 20)))  
      .nodes(data[i].nodes);
  }
  
  data.forEach((data, i) => {
    generateOrbs(data, forces[i], i, orbs);
  });
  
  svg.on('mousemove', () => {
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
  navLinks = document.querySelectorAll('.nav a');

function navToggle() {
  if (window.innerWidth >= 768) return false;
  main.classList.toggle('page--hidden');
  nav.classList.toggle('nav--open');
}

navBtn.addEventListener('click', navToggle);
navLinks.forEach(link => link.addEventListener('click', () => {
  if (nav.classList.contains('nav--open')) {
    navToggle();
  }
}));
