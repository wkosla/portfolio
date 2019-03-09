const svg = d3.select('.skills__svg'),
  data = [],
  forces = [],
  orbs = [
    {
      label: 'Sass', // SASS
      background: 'grad-purple',
      radius: {
        xs: 132,
        sm: 132,
        md: 176
      },
      position: {
        xs: [500, 150],
        sm: [1000, 150],
        md: [1000, 80]
      }
    },
    {
      label: '',
      background: 'grad-light',
      radius: {
        xs: 108,
        sm: 108,
        md: 144
      },
      position: {
        xs: [300, 220],
        sm: [800, 220],
        md: [750, 200]
      }
    },
    {
      label: 'jQuery', //JQUERY
      background: 'grad-darkpurple',
      radius: {
        xs: 132,
        sm: 132,
        md: 176
      },
      position: {
        xs: [80, 560],
        sm: [550, 550],
        md: [420, 650]
      }
    },
    {
      label: '',
      background: 'grad-light',
      radius: {
        xs: 192,
        sm: 192,
        md: 256
      },
      position: {
        xs: [580, 670],
        sm: [1060, 670],
        md: [1100, 800]
      }
    },
    {
      label: 'GIT', // GIT
      background: 'grad-red',
      radius: {
        xs: 132,
        sm: 132,
        md: 176
      },
      position: {
        xs: [350, 1640],
        sm: [1350, 900],
        md: [1500, 1100]
      }
    },
    {
      label: 'HTML5', // HTML5
      background: 'grad-orange',
      radius: {
        xs: 108,
        sm: 108,
        md: 144
      },
      position: {
        xs: [510, 950],
        sm: [1220, 750],
        md: [1300, 900]
      }
    },
    {
      label: '',
      background: 'grad-light',
      radius: {
        xs: 120,
        sm: 120,
        md: 160
      },
      position: {
        xs: [430, 790],
        sm: [920, 800],
        md: [900, 950]
      }
    },
    {
      label: 'JS', // JAVASCRIPT
      background: 'grad-yellow',
      radius: {
        xs: 216,
        sm: 216,
        md: 288
      },
      position: {
        xs: [370, 500],
        sm: [850, 500],
        md: [830, 560]
      }
    },
    {
      label: '',
      background: 'grad-light',
      radius: {
        xs: 144,
        sm: 144,
        md: 192
      },
      position: {
        xs: [-20, 920],
        sm: [450, 900],
        md: [250, 1100]
      }
    },
    {
      label: 'Vue', // VUE
      background: 'grad-green',
      radius: {
        xs: 192,
        sm: 192,
        md: 256
      },
      position: {
        xs: [170, 1150],
        sm: [650, 1120],
        md: [500, 1400]
      }
    },
    {
      label: 'PS', // PHOTOSHOP
      background: 'grad-darkblue',
      radius: {
        xs: 108,
        sm: 108,
        md: 144
      },
      position: {
        xs: [570, 1250],
        sm: [150, 1000],
        md: [-200, 1300]
      }
    },
    {
      label: '',
      background: 'grad-light',
      radius: {
        xs: 132,
        sm: 132,
        md: 176
      },
      position: {
        xs: [450, 1420],
        sm: [1450, 400],
        md: [1600, 400]
      }
    },
    {
      label: '',
      background: 'grad-light',
      radius: {
        xs: 0,
        sm: 0,
        md: 224
      },
      position: {
        xs: [0, 0],
        sm: [0, 0],
        md: [1550, -30]
      }
    },
    {
      label: 'CSS3', // CSS3
      background: 'grad-lightblue',
      radius: {
        xs: 108,
        sm: 108,
        md: 144
      },
      position: {
        xs: [320, 1300],
        sm: [1300, 250],
        md: [1400, 200]
      }
    }
  ];

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

  const circle = svg.selectAll('#circle-' + index);

  circle
    .data(data.nodes.slice(1))
    .enter()
    .append('circle')
    .attr('r', (d) => d.radius)
    .attr('filter', () => 'url(#drop-shadow)')
    .style('fill', () => `url(#${orbs[index].background})`);

  force.on('tick', () => {
    svg.selectAll('circle').attr('cx', (d) => d.x).attr('cy', (d) => d.y);
  });
}

for (let i = 0; i < orbs.length; i++) {
  data[i] = {
    nodes: generateNodes(orbs[i].radius[size] / 2)
  };
  data[i].root = data[i].nodes[0];
  data[i].root.radius = 0;
  data[i].root.fixed = true;

  forces[i] = d3.layout.force().gravity(0.7).charge((d, i) => (i ? 0 : -2000)).nodes(data[i].nodes);
}

data.forEach((data, i) => {
  generateOrbs(data, forces[i], i, orbs);
});

svg.on('mousemove', function() {
  let p1 = d3.mouse(this);

  data.forEach((data, i) => {
    data.root.px = p1[0];
    data.root.py = p1[1];
    forces[i].resume();
  });
});
