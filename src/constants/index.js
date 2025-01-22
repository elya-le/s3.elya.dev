export const navLinks = [
  {
    id: 1,
    name: 'Projects',
    href: '#projects',
  },
  {
    id: 2,
    name: 'Contact',
    href: '#contact',
  },
  {
    id: 3,
    name: 'Non-Code Projects',
    href: '#non-code-projects',
  },
];

export const myProjects = [
  {
    title: 'Communication App',
    desc: 'Online community space with real-time messaging, custom servers and channels',
    subdesc: 
    `Focus: <span class="font-thin">Learning and implementing real-time communication with web sockets. (2-week build deadline)</span><br><br>
Result: <span class="font-thin"> Delivered a precise, high-quality web app while expanding my technical skills, and proficiency in real-time communication systems. (3 feature CRUD)</span>`,
    liveLink: 'https://elya-le-banter.onrender.com',
    repoLink: 'https://github.com/elya-le/Banter/',
    texture: '/textures/project/project1.mp4',
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
    desc: 'Buy and sell online marketplace for unique, handmade and vintage items',
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
    desc: 'Connecting dog owners through event discovery, planning and community organization',
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
    desc: 'Combining my love for 3D modeling, motion design and web development',
    subdesc:
    `Focus:<span class="font-thin"> Challenge myself to learn Three.js, Tailwind and Blender to design and build Elya.dev.<br><br>
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
    title: '20ft Wood Art Sculpture',
    desc: ' ',
    subdesc: 
    `
    <p>Client: <span class="font-thin">Personal Project</span><br><br>
      My Role: <span class="font-thin">Artist, Lead Fabricator, Project Manager
    </span><br><br>
    <span class="font-thin">
      Designed an art installation for Burning Man, combining woodworking, CAD design, and collaborative fabrication.
    </span><br><br>
      Key Responsibilities: 
    <span class="font-thin"><br> 
      - Utilized CAD tools for design and construction.<br> 
      - Led the woodworking and assembly.<br> 
      - Ensured structural integrity and artistic cohesion.
    </span><br><br>
    <span class="font-thin text-xs leading-tight">
      Lighting Engineer & Sponsor: <span class="font-thin">Richerd Chan 
      — Extra special thanks to my family Kari, Jessie, Santana, Jason, Olivia, Kevin, Belinda, Ray, Ryan, and AFC for the support in this build.
    </span>
    `,
    liveLink: '',
    repoLink: '',
    previewImg: '/assets/aws1.gif',
    previewImg1: '/assets/odonata11.jpg',
    previewImg2: '/assets/odonata12.jpg',
    previewImg3: '/assets/odonata2.png',
    previewImg4: '/assets/odonata10.jpg',
    previewImg5: '/assets/odonata3.jpg',
    previewImg6: '/assets/odonata14.jpg',
    tags: [
      { id: 501, name: 'SketchUp/CAD', color: '#393D00'}, 
      { id: 502, name: 'Fabrication', color: '#393D00'}, 
      { id: 503, name: 'Woodworking', color: '#393D00'}, 
      { id: 504, name: 'Project Management', color: '#393D00'}, 
    ]
  },
  {
    title: 'Photo & Video Booth Activations',
    desc: '',
    subdesc: 
    `
    <p>Client: <span class="font-thin">Verizon | iHeart Radio</span><br><br>
    My Role: <span class="font-thin">Fabrication Lead</span><br>
    <span class="font-thin">In partnership with <a href="https://www.hellothereyou.com/" style="text-decoration: underline;">HelloThereYou</a> & <a href="https://www.instagram.com/bymadelinejo/" style="text-decoration: underline;">Madeline Jo</a></span><br><br>
    <span class="font-thin">
    Built custom activations for top brands, providing an engaging photo/video experience for event attendees.
    </span><br><br>
    Key Responsibilities: <span class="font-thin"><br>
      - Fabrication, design, curation of props and materials<br>
      - Align branding and visuals for share-worthy photos
    </span><br><br>
    <span class="font-thin">
      Extra special thanks to Patrick for entrusting me with taking on a bigger role with these activations ❤︎
    </span>
    `,
    liveLink: '',
    repoLink: '',
    previewImg1: '/assets/aws1.gif',
    previewImg2: '/assets/aws2.gif',
    tags: [
      { id: 601, name: 'SketchUp/CAD', color: '#393D00'}, 
      { id: 602, name: 'Fabrication', color: '#393D00' },
      { id: 603, name: 'Installation', color: '#393D00' },
      { id: 604, name: 'Woodworking', color: '#393D00'},
    ],
  },
  {
    title: 'Motion Design Activations',
    desc: '',
    subdesc: 
    `
    Client: <span class="font-thin">Washington Federal Credit Union</span><br><br>
    My Role: <span class="font-thin">Motion Designer</span><br><br>
    <span class="font-thin">
    This project defined WaFd Bank’s visual identity in their Seattle headquarters with 12-foot video walls in the Main Entry and an 8-foot video wall in the Interior Lobby, featuring 50+ custom animations.
    </span><br><br>
    Key Responsibilities: <span class="font-thin"><br>
    - Delivered 50+ animations under tight deadlines<br>
    - Collaborated with team to align with the bank's visual identity<br>
    - Ensured seamless integration for a high-impact installation<br>
    </span></p>
    `,
    liveLink: '',
    repoLink: '',
    previewImg1: '/assets/aws1.gif',
    previewImg2: '/assets/aws2.gif',
    tags: [
      { id: 701, name: 'After Effects', color: '#393D00'}, 
      { id: 702, name: 'Illustrator', color: '#393D00' },
      { id: 703, name: 'Procreate', color: '#393D00' },
      { id: 704, name: 'Media Encoder', color: '#393D00'}, 
    ],
  },
  {
    title: 'Graphic Design | Content Creation',
    desc: '',
    subdesc: 
    `
    Client: <span class="font-thin">Amazon | </span><span class="font-thin"><a href="https://www.instagram.com/amazonhome/" style="text-decoration: underline;">Amazon Home</a></span><br><br> 
    My Role: <span class="font-thin">Visual Design, Motion Lead</span><br><br> 
    <span class="font-thin"> Created 2D motion assets for Amazon Home, driving significant follower growth and boosting brand visibility across platforms. </span><br><br> 
    Key Responsibilities: <span class="font-thin"><br>
    - Designed daily motion assets under tight deadlines<br>
    - Collaborated with the team to maintain brand consistency<br>
    - Optimized content for engagement across multiple platforms<br> </span>
    `,
    liveLink: '',
    repoLink: '',
    previewImg1: '/assets/aws1.gif',
    previewImg2: '/assets/aws2.gif',
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
    My Role: <span class="font-thin">Motion Designer</span><br><br>
    <span class="font-thin">
      Created 2D/3D motion assets for the annual AWS Summit, enhancing presentations and driving engagement with aligned animations.
    </span><br><br>
    Key Responsibilities: <span class="font-thin"><br>
      - Designed motion assets for event presentations<br>
      - Worked with teams to ensure visual consistency with brand themes<br>
      - Delivered optimized assets for event displays<br>
    </span>
    `,
    liveLink: '',
    repoLink: '',
    previewImg1: '/assets/aws1.gif',
    previewImg2: '/assets/aws2.gif',
    tags: [
      { id: 901, name: 'Cinema4D', color: '#393D00'}, 
      { id: 902, name: 'Octane/Redshift', color: '#393D00' },
      { id: 903, name: 'After Effects', color: '#393D00'}, 
      { id: 904, name: 'Media Encoder', color: '#393D00'},
    ],
  },
  {
    title: 'Furniture Design | Couch Build',
    desc: '',
    subdesc: 
    `
    <p>Client: <span class="font-thin">Personal Project</span><br><br>
      My Role: <span class="font-thin">Designer, Builder</span><br>
    <span class="font-thin">
      Designed and built a custom couch for a new apartment, incorporating woodworking, CAD design, and upholstery techniques to craft a functional and aesthetic piece of furniture.
    </span><br><br>
      Key Responsibilities: 
    <span class="font-thin"><br>
      - Learned Rhino basics to develop CAD plans<br>
      - Built a durable wooden frame as a carpenter<br>
      - Sewed and upholstered custom cover & cushions<br>
    </span><br>
    <span class="font-thin">
      Extra special thanks to Stefano for cheering me on and being a big brain to problem solve with.
    </span>
    `,
    liveLink: '',
    repoLink: '',
    previewImg1: '/assets/aws1.gif',
    previewImg2: '/assets/aws2.gif',
    tags: [
      { id: 111, name: 'Rhino', color: '#393D00'}, 
      { id: 112, name: 'Woodworking', color: '#393D00' },
      { id: 113, name: 'Carpentry', color: '#393D00' },
      { id: 114, name: 'Sewing', color: '#393D00'}, 
      { id: 115, name: 'Upholstery', color: '#393D00'}, 
    ],
  },
];

// export const workExperiences = [
//   {
//     id: 1,
//     name: 'Company 1',
//     pos: 'Position Placeholder',
//     duration: 'Year - Year',
//     title: 'Placeholder description for the work experience at Company 1.',
//     icon: '/assets/placeholder-icon1.svg',
//     animation: 'animation1',
//   },
//   {
//     id: 2,
//     name: 'Company 2',
//     pos: 'Position Placeholder',
//     duration: 'Year - Year',
//     title: 'Placeholder description for the work experience at Company 2.',
//     icon: '/assets/placeholder-icon2.svg',
//     animation: 'animation2',
//   },
// ];
