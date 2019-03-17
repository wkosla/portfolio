const width = 2000,
  height = 1500,
  canvas = d3.select('.skills__canvas').attr('width', width).attr('height', height),
  context = canvas.node().getContext('2d'),
  data = [],
  forces = [],
  orbs = [{
    label: 'Sass', // SASS
    colors: ['#cb00cb', '#6711a5'],
    radius: {
      xs: 132,
      sm: 132,
      md: 176
    },
    position: {
      xs: [500, 150],
      sm: [1000, 150],
      md: [1200 + 1000, 80 + 620]
    }
  },
  {
    label: '',
    colors: ['#fff', '#e6f0fa'],
    radius: {
      xs: 108,
      sm: 108,
      md: 144
    },
    position: {
      xs: [300, 220],
      sm: [800, 220],
      md: [1200 + 750, 200 + 620]
    }
  },
  {
    label: 'Gulp', //Gulp
    colors: ['#ff0051', '#940000'],
    radius: {
      xs: 132,
      sm: 132,
      md: 176
    },
    position: {
      xs: [80, 560],
      sm: [550, 550],
      md: [1200 + 420, 650 + 620]
    }
  },
  {
    label: '',
    colors: ['#fff', '#e6f0fa'],
    radius: {
      xs: 192,
      sm: 192,
      md: 256
    },
    position: {
      xs: [580, 670],
      sm: [1060, 670],
      md: [1200 + 1100, 800 + 620]
    }
  },
  {
    label: 'GIT', // GIT
    colors: ['#f3008c', '#8a003e'],
    radius: {
      xs: 132,
      sm: 132,
      md: 176
    },
    position: {
      xs: [350, 1640],
      sm: [1350, 900],
      md: [1200 + 1500, 1100 + 620]
    }
  },
  {
    label: 'HTML5', // HTML5
    colors: ['#ffa700', '#ff4200'],
    radius: {
      xs: 108,
      sm: 108,
      md: 144
    },
    position: {
      xs: [510, 950],
      sm: [1220, 750],
      md: [1200 + 1300, 900 + 620]
    }
  },
  {
    label: '',
    colors: ['#fff', '#e6f0fa'],
    radius: {
      xs: 120,
      sm: 120,
      md: 160
    },
    position: {
      xs: [430, 790],
      sm: [920, 800],
      md: [1200 + 900, 950 + 620]
    }
  },
  {
    label: 'JS', // JAVASCRIPT
    colors: ['#ffdf00', '#ff9100'],
    radius: {
      xs: 216,
      sm: 216,
      md: 288
    },
    position: {
      xs: [370, 500],
      sm: [850, 500],
      md: [1200 + 830, 560 + 620]
    }
  },
  {
    label: '',
    colors: ['#fff', '#e6f0fa'],
    radius: {
      xs: 144,
      sm: 144,
      md: 192
    },
    position: {
      xs: [-20, 920],
      sm: [450, 900],
      md: [1200 + 250, 1100 + 620]
    }
  },
  {
    label: 'Vue', // VUE
    colors: ['#bdff16', '#59a52b'],
    radius: {
      xs: 192,
      sm: 192,
      md: 256
    },
    position: {
      xs: [170, 1150],
      sm: [650, 1120],
      md: [1200 + 500, 1400 + 620]
    }
  },
  {
    label: 'Webpack', // WHEBPACK
    colors: ['#3174fa', '#1246c9'],
    radius: {
      xs: 108,
      sm: 108,
      md: 144
    },
    position: {
      xs: [570, 1250],
      sm: [150, 1000],
      md: [1200 + -200, 1300 + 620]
    }
  },
  {
    label: '',
    colors: ['#fff', '#e6f0fa'],
    radius: {
      xs: 132,
      sm: 132,
      md: 176
    },
    position: {
      xs: [450, 1420],
      sm: [1450, 400],
      md: [1200 + 1600, 400 + 620]
    }
  },
  {
    label: '',
    colors: ['#fff', '#e6f0fa'],
    radius: {
      xs: 0,
      sm: 0,
      md: 224
    },
    position: {
      xs: [0, 0],
      sm: [0, 0],
      md: [1200 + 1550, -30 + 620]
    }
  },
  {
    label: 'CSS3', // CSS3
    colors: ['#00e1ff', '#008cff'],
    radius: {
      xs: 108,
      sm: 108,
      md: 144
    },
    position: {
      xs: [320, 1300],
      sm: [1300, 250],
      md: [1200 + 1400, 200 + 620]
    }
  }
  ]

let size;

if (window.innerWidth < 768) {
  size = 'xs';
} else if (window.innerWidth < 1024) {
  size = 'sm';
} else {
  size = 'md';
}

function generateNodes(radius) {
  return d3.range(2).map(() => {
    return {
      radius: radius
    };
  });
}

function generateOrbs(data, force, index, orbs) {
  force.size(orbs[index].position[size]);
  force.start();

  force.on('tick', () => {
    const d = data.nodes[1],
      grad = context.createRadialGradient(
        d.x + (d.radius * .30),
        d.y - (d.radius * .30),
        0,
        d.x + (d.radius * .30),
        d.y - (d.radius * .30),
        d.radius * 1.35);
  
    grad.addColorStop(0, orbs[index].colors[0]);
    grad.addColorStop(1, orbs[index].colors[1]);

    if (index === 0) {
      context.clearRect(0, 0, width, height);
    }
    context.fillStyle = grad;
    context.beginPath();
    context.moveTo(d.x, d.y);
    context.arc(d.x, d.y, d.radius, 0, 2 * Math.PI);
    context.shadowOffsetX = -10;
    context.shadowOffsetY = 10;
    context.shadowBlur = 60;
    context.shadowColor = 'rgba(0, 0, 0, 0.5)';

    context.fill();
  });
}

for (let i = 0; i < orbs.length; i++) {
  data[i] = {
    nodes: generateNodes(orbs[i].radius[size] / 2)
  };
  data[i].root = data[i].nodes[0];
  data[i].root.radius = 0;
  data[i].root.fixed = true;

  forces[i] = d3.layout.force().gravity(0.5).charge((d, i) => (i ? 0 : (-1 * orbs[i].radius[size] * 20))).nodes(data[i].nodes);
}

data.forEach((data, i) => {
  generateOrbs(data, forces[i], i, orbs);
});

canvas.on('mousemove', function () {
  let p1 = d3.mouse(this);

  data.forEach((data, i) => {
    data.root.px = p1[0];
    data.root.py = p1[1];
    forces[i].resume();
  });
});
