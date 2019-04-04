const svg = d3.select('.skills__svg'),
  data = [],
  forces = [],
  orbs = [{
    label: 'Sass', // SASS
    colors: ['#cb00cb', '#6711a5'],
    file: '../assets/img/balls/sass.svg',
    width: 353,
    radius: 176,
    position: [1200 + 1000, 80 + 620]
  },
  {
    label: '',
    colors: ['#fff', '#e6f0fa'],
    file: '../assets/img/balls/ball-5.svg',
    width: 321,
    radius: 144,
    position: [1200 + 750, 200 + 620]
  },
  {
    label: 'Gulp', //Gulp
    colors: ['#ff0051', '#940000'],
    file: '../assets/img/balls/gulp.svg',
    width: 353,
    radius: 176,
    position: [1200 + 420, 650 + 620]
  },
  {
    label: '',
    colors: ['#fff', '#e6f0fa'],
    file: '../assets/img/balls/ball-4.svg',
    width: 433,
    radius: 256,
    position: [1200 + 1100, 800 + 620]
  },
  {
    label: 'GIT', // GIT
    colors: ['#f3008c', '#8a003e'],
    file: '../assets/img/balls/git.svg',
    width: 353,
    radius: 176,
    position: [1200 + 1500, 1100 + 620]
  },
  {
    label: 'HTML5', // HTML5
    colors: ['#ffa700', '#ff4200'],
    file: '../assets/img/balls/html.svg',
    width: 322,
    radius: 144,
    position: [1200 + 1300, 900 + 620]
  },
  {
    label: '',
    colors: ['#fff', '#e6f0fa'],
    file: '../assets/img/balls/ball-1.svg',
    width: 337,
    radius: 160,
    position: [1200 + 900, 950 + 620]
  },
  {
    label: 'JS', // JAVASCRIPT
    colors: ['#ffdf00', '#ff9100'],
    file: '../assets/img/balls/javascript.svg',
    width: 466,
    radius: 288,
    position: [1200 + 830, 560 + 620]
  },
  {
    label: '',
    colors: ['#fff', '#e6f0fa'],
    file: '../assets/img/balls/ball-3.svg',
    width: 370,
    radius: 192,
    position: [1200 + 250, 1100 + 620]
  },
  {
    label: 'Vue', // VUE
    colors: ['#bdff16', '#59a52b'],
    file: '../assets/img/balls/vue.svg',
    width: 433,
    radius: 256,
    position: [1200 + 500, 1400 + 620]
  },
  {
    label: 'Webpack', // WEBPACK
    colors: ['#3174fa', '#1246c9'],
    file: '../assets/img/balls/webpack.svg',
    width: 321,
    radius: 144,
    position: [1200 + -200, 1300 + 620]
  },
  {
    label: '',
    colors: ['#fff', '#e6f0fa'],
    file: '../assets/img/balls/ball-2.svg',
    width: 354,
    radius: 176,
    position: [1200 + 1600, 400 + 620]
  },
  {
    label: '',
    colors: ['#fff', '#e6f0fa'],
    file: '../assets/img/balls/ball-6.svg',
    width: 401,
    radius: 224,
    position: [1200 + 1550, -30 + 620]
  },
  {
    label: 'CSS3', // CSS3
    colors: ['#00e1ff', '#008cff'],
    file: '../assets/img/balls/css.svg',
    width: 321,
    radius: 144,
    position: [1200 + 1400, 200 + 620]
  }
  ];

function generateNodes(radius) {
  return d3.range(2).map(() => {
    return {
      radius: radius
    };
  });
}

function generateOrbs(data, force, index, orbs) {
  force.size(orbs[index].position);
  force.start();

  const circle = svg.selectAll('#circle-' + index);

  circle
    .data(data.nodes.slice(1))
    .enter()
    .append('image')
    .attr('xlink:href', orbs[index].file)
    .attr('width', orbs[index].width)
    .attr('height', orbs[index].width);

  force.on('tick', () => {
    svg.selectAll('image')
      .attr('x', (d) => {
        return d.x - orbs[index].width / 2;
      })
      .attr('y', (d) => d.y - orbs[index].width / 2);
  });
}

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

svg.on('mousemove', function () {
  let p1 = d3.mouse(this);

  data.forEach((data, i) => {
    data.root.px = p1[0];
    data.root.py = p1[1];
    forces[i].resume();
  });
});
