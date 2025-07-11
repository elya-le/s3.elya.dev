export const navLinks = [
  { id: 1, name: "Code Projects", href: "#projects" },
  { id: 2, name: "Additional Work (Non-Code Projects)", href: "/non-code-projects" }, // Ensure this points to your route
  { id: 3, name: "Contact Me", href: "#contact" },
];

export const myProjects = [
  {
    title: 'Communication App',
    desc: 'Online community space with real-time messaging, custom servers and channels.',
    subdesc: 
    `Focus: <span class="font-thin">Learning and implementing real-time communication with web sockets. (2-week build deadline)</span><br><br>
Result: <span class="font-thin"> Delivered a precise, high-quality web app while expanding my proficiency with real-time communication systems. (3 feature CRUD)</span>`,
    liveLink: 'https://elya-le-banter.onrender.com',
    repoLink: 'https://github.com/elya-le/Banter/',
    previewImg1: '/assets/banter1.png',
    previewImg2: '/assets/banter2.png',
    previewImg3: '/assets/banter3.png',
    previewImg4: '/assets/banter4.png',
    tags: [
      { id: 101, name: 'React.js', color: '#393D00', }, // React.js
      { id: 102, name: 'Flask', color: '#393D00' }, // Flask
      { id: 103, name: 'PostgreSQL', color: '#393D00' }, // PostgreSQL
      { id: 104, name: 'Socket.io', color: '#393D00' }, // Socket.io
      { id: 105, name: 'SQLAlchemy', color: '#393D00' }, // SQLAlchemy
      { id: 106, name: 'Gunicorn', color: '#393D00' }, // Gunicorn
    ],
  },
  {
    title: 'E-commerce Platform',
    desc: 'Online marketplace for unique, handmade and vintage items.',
    subdesc: `Focus: <span class="font-thin"> Team collaboration, asynchronous development, version control, and feature integration. (2-week build deadline)</span><br><br>
Result: <span class="font-thin"> Delivered a React web app using agile workflows and pull requests to ensure cohesion and conflict resolution. (4 feature CRUD)</span>
`,
    liveLink: 'https://etsyclone-4ah1.onrender.com/',
    repoLink: 'https://github.com/TomArbaugh/Ets-E-Commerce/',
    previewImg1: '/assets/getsy1.png',
    previewImg2: '/assets/getsy2.png',
    previewImg3: '/assets/getsy3.png',
    previewImg3: '/assets/getsy4.png',
    tags: [
      { id: 201, name: 'React.js', color: '#393D00', }, // React - highly impressive, widely used frontend framework
      { id: 202, name: 'Python', color: '#393D00', }, // Python - versatile, backend and data-oriented
      { id: 203, name: 'Redux', color: '#393D00', }, // Redux - advanced state management, pairs well with React
      { id: 204, name: 'JavaScript', color: '#393D00', }, // JavaScript - core web technology
      { id: 205, name: 'Flask', color: '#393D00', }, // Flask - lightweight backend framework
      { id: 206, name: 'HTML5', color: '#393D00', }, // HTML5 - foundational but less "impressive"
      { id: 207, name: 'CSS3', color: '#393D00', }, // CSS3 - essential, but less technically complex
    ],
  },
  {
    title: 'Event Platform',
    desc: 'Connecting dog owners through event discovery, planning and community organization.',
    subdesc: 
    `Focus:<span class="font-thin"> First independent full-stack social platform. (4-week build deadline)</span><br><br>
Result:<span class="font-thin"> A fully functional app that equips users in organizing and joining local meetups, showcasing my proficiency in backend and frontend integration. (2 feature CRUD)</span>`,
    liveLink: 'https://meetpup-elya.onrender.com/',
    repoLink: 'https://github.com/elya-le/authme-elya',
    previewImg1: '/assets/meetpup1.png',
    previewImg2: '/assets/meetpup2.png',
    previewImg3: '/assets/meetpup3.png',
    previewImg3: '/assets/meetpup4.png',
    previewImg3: '/assets/meetpup5.png',
    tags: [
      { id: 301, name: 'Node.js', color: '#393D00' }, // Node.js green
      { id: 302, name: 'Express', color: '#393D00' }, // Express gray
      { id: 303, name: 'PostgreSQL', color: '#393D00' }, // PostgreSQL blue
      { id: 304, name: 'Sequelize', color: '#393D00', }, // Sequelize blue
      { id: 305, name: 'React.js', color: '#393D00', }, // React.js
      { id: 306, name: 'JavaScript', color: '#393D00', }, // JavaScript yellow
    ],
  },
  {
    title: 'Current Portfolio Site',
    desc: 'Combining my love for 3D modeling, motion design, and web development.',
    subdesc:
    `Focus:<span class="font-thin"> Challenge myself to learn Three.js, Tailwind and Blender to design and build Elya.dev.</span><br><br>
Result:<span class="font-thin"> A clean, interactive site that highlights 3D elements and innovative design techniques.`,
    liveLink: '',
    repoLink: 'https://github.com/elya-le/Elya.dev',
    previewImg1: '/assets/portfolio1.png',
    previewImg2: '/assets/portfolio2.png',
    tags: [
      { id: 401, name: 'Three.js', color: '#393D00' }, // Three.js for 3D modeling and animations
      { id: 402, name: 'Blender', color: '#393D00', }, // Blender for creating 3D assets
      { id: 403, name: 'Vite', color: '#393D00', }, // Vite for the build tool
      { id: 404, name: 'React.js', color: '#393D00', }, // React.js (main framework for the UI)
      { id: 405, name: 'JavaScript', color: '#393D00', }, // JavaScript as the core language
      { id: 406, name: 'Tailwind CSS', color: '#393D00', }, // Tailwind for styling
    ],
  },
];

export const otherProjects = [
  {
    title: 'Wood Art Sculpture',
    desc: ' ',
    subdesc: 
    `
    <p>
      Role: <span class="font-thin">Artist, Project Manager, Creative Director
    </span><br><br>
    <span class="font-thin">
      Designed an art installation for Burning Man, combining woodworking, CAD design, and collaborative fabrication.<br><br>
      Lighting Engineer & Sponsor: <span class="font-thin">Richerd Chan 
      `,
      videos: [
        {
          url: 'https://s3.us-east-2.amazonaws.com/elya.dev/Odonata_Paralax.mp4',
          title: 'Main Video',
          placeholder: 'https://s3.us-east-2.amazonaws.com/elya.dev/Odonata_LoadingPhoto.png',
        },
        {
          url: 'https://s3.us-east-2.amazonaws.com/elya.dev/Odonata_BS_2018.mp4', 
          title: 'BTS Video',
          placeholder: 'https://s3.us-east-2.amazonaws.com/elya.dev/OdanataBS_LoadingPhoto.JPG',
        }
      ],

    // previewImg2: '/assets/odonata11.jpg',
    // previewImg3: '/assets/odonata12.jpg',
    // previewImg3: '/assets/odonata2.png',
    // previewImg4: '/assets/odonata10.jpg',
    // previewImg5: '/assets/odonata3.jpg',
    // previewImg6: '/assets/odonata14.jpg',
    tags: [
      { id: 501, name: 'SketchUp', color: '#393D00'}, 
      { id: 502, name: 'Fabrication', color: '#393D00'}, 
      { id: 503, name: 'Woodworking', color: '#393D00'}, 
      { id: 504, name: 'Project Management', color: '#393D00'}, 
      { id: 505, name: 'CAD', color: '#393D00'}, 
    ]
  },
  {
    title: 'Brand Activations',
    desc: '',
    subdesc: 
    `
    <p>Client: <span class="font-thin">Verizon | iHeart Radio</span><br><br>
    Role: <span class="font-thin">Fabrication Lead</span>
    <span class="font-thin">— In partnership with <a href="https://www.hellothereyou.com/" style="text-decoration: underline;">HelloThereYou</a> & <a href="https://www.instagram.com/bymadelinejo/" style="text-decoration: underline;">Madeline Jo</a></span><br><br>
    <span class="font-thin">
    Fabrication of custom activations, providing an engaging photo/video experience for event attendees.
    </span>
    <span class="font-thin">
    Extra special thanks to Patrick for entrusting me with taking on a bigger role with these activations.
    </span>
    `,
    
    videos: [
      {
        url: 'https://s3.us-east-2.amazonaws.com/elya.dev/Activations_2019.mp4',
        title: 'Activations Demo',
        placeholder: 'https://s3.us-east-2.amazonaws.com/elya.dev/Activations_Placeholder.png', // add placeholder image
      }
    ],
    tags: [
      { id: 601, name: 'CAD', color: '#393D00'}, 
      { id: 602, name: 'Project Management', color: '#393D00' },
      { id: 603, name: 'Installation', color: '#393D00' },
      { id: 604, name: 'Woodworking', color: '#393D00'},
      { id: 605, name: 'Upholstery', color: '#393D00' },
  
    ],
  },
  {
    title: 'Motion Activations',
    desc: '',
    subdesc: 
    `
    Client: <span class="font-thin">Washington Federal Credit Union</span><br><br>
    Role: <span class="font-thin">Motion Designer</span><br><br>
    <span class="font-thin">
    This project defined WaFd Bank's visual identity in their Seattle headquarters with 12-foot video walls in the Main Entry and an 8-foot video wall in the Interior Lobby, featuring 50+ custom animations.
    </span><br><br>
    `,
    videos: [
      {
        url: 'https://s3.us-east-2.amazonaws.com/elya.dev/WAFD_Motion_Activations.mp4',
        title: 'Motion Design Demo',
        placeholder: 'https://s3.us-east-2.amazonaws.com/elya.dev/WAFD_Placeholder.jpg', // add placeholder image URL 
      }
    ],
    tags: [
      { id: 701, name: 'After Effects', color: '#393D00'}, 
      { id: 702, name: 'Illustrator', color: '#393D00' },
      { id: 703, name: 'Cinema4D', color: '#393D00' },
      { id: 704, name: 'Media Encoder', color: '#393D00'}, 
      { id: 705, name: 'Procreate', color: '#393D00' },
    ],
  },
  {
    title: 'Visual Design System',
    desc: '',
    subdesc: 
    `
    Client: <span class="font-thin">Amazon | </span><span class="font-thin"><a href="https://www.instagram.com/amazonhome/" style="text-decoration: underline;">Amazon Home</a></span><br><br> 
    Role: <span class="font-thin">Visual Design, Motion Lead</span><br><br> 
    <span class="font-thin"> Designed daily 2D/3D assets for Amazon Home's social platforms, as well as internal asset systems, driving follower growth while maintaining brand consistency and optimizing content engagement across channels. </span><br><br> 
    
    `,
    videos: [
      {
        url: 'https://s3.us-east-2.amazonaws.com/elya.dev/Amazon_Home.png',
        title: 'Content Systems',
        placeholder: 'https://s3.us-east-2.amazonaws.com/elya.dev/Amazon_Home.png', 
      }
    ],
    tags: [
      { id: 801, name: 'Cinema4D', color: '#393D00'}, 
      { id: 802, name: 'After Effects', color: '#393D00'}, 
      { id: 803, name: 'Octane', color: '#393D00' },
      { id: 804, name: 'Redshift', color: '#393D00' },
      { id: 805, name: 'Blender', color: '#393D00'}, 
    ],
  },
  {
    title: '2D/3D Motion Deck',
    desc: '',
    subdesc: 
    `
    Client: <span class="font-thin">AWS Summit</span><br><br>
    Role: <span class="font-thin">Motion Designer</span><br><br>
    <span class="font-thin">
      Design of 2D/3D motion assets for the annual AWS Summit, enhancing presentations and driving engagement with aligned animations.
    </span>
    `,
    videos: [
      {
        url: 'https://s3.us-east-2.amazonaws.com/elya.dev/AWS_Summit_01.mp4', 
        title: 'AWS Motion Demo',
        placeholder: '/assets/aws1.gif', 
      }
    ],
    tags: [
      { id: 901, name: 'Cinema4D', color: '#393D00'}, 
      { id: 902, name: 'After Effects', color: '#393D00'}, 
      { id: 903, name: 'Media Encoder', color: '#393D00'},
      { id: 904, name: 'Octane', color: '#393D00' },
      { id: 905, name: 'Redshift', color: '#393D00' },
    ],
  },
  // {
  //   title: 'Furniture Design | Couch Build',
  //   desc: '',
  //   subdesc: 
  //   `
  //     Role: <span class="font-thin">Designer, Builder</span><br><br>
  //   <span class="font-thin">
  //     Designed and built a custom couch for a new apartment, incorporating woodworking, CAD design, and upholstery techniques to craft a functional and aesthetic piece of furniture.
  //   </span><br><br>
  //   <span class="font-thin">
  //     Extra special thanks to Stefano for cheering me on and being a big brain to problem solve with.
  //   </span>
  //   `,
  //   videos: [
  //     {
  //       url: '/assets/aws1.gif',
  //       title: 'Furniture Build Demo',
  //       placeholder: '/assets/aws2.gif',
  //     }
  //   ],
  //   tags: [
  //     { id: 111, name: 'Rhino', color: '#393D00'}, 
  //     { id: 112, name: 'Woodworking', color: '#393D00' },
  //     { id: 113, name: 'Carpentry', color: '#393D00' },
  //     { id: 114, name: 'Sewing', color: '#393D00'}, 
  //     { id: 115, name: 'Upholstery', color: '#393D00'}, 
  //   ],
  // },
];