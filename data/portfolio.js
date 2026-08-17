/*
 * PORTFOLIO CONTENT DATABASE
 * -------------------------------------------------------------
 * Normal portfolio updates happen in this file only.
 * Add projects to `projects`, 3D work to `art3d`, UI/UX work to
 * `uiux`, and experience/education to `timeline`.
 */
window.PORTFOLIO = {
  email: 'kushlu7244@gmail.com',
  location: 'Berlin, Germany',
  projects: [
    {id:'chiefpulse',title:'ChiefPulse',section:'Digital Design',type:'Product / Brand / Web',year:'2026',role:'Product Designer & Brand Lead',accent:'blue',summary:'Product, brand and digital experience work connecting product thinking, visual identity, responsive web design and content.',details:'Worked across product design and brand direction, shaping the visual language, website experience, content direction and supporting digital assets.',tools:['Figma','Adobe Creative Cloud','Web Design','Product Design'],image:'',links:[['Website','https://chiefpulse.com/']]},
    {id:'game-analytics-dashboard',title:'Game Analytics Dashboard',section:'Digital Design',type:'Data Product',year:'2025',role:'Analytics / Product Design',accent:'dark',summary:'RAWG API, Python and Power BI brought together as a decision-ready game analytics product.',details:'Designed an analytical workflow around game-market data, translating raw API data into KPI views, genre lifecycle patterns, popularity trends and segmentation.',tools:['Python','RAWG API','Power BI','Pandas'],image:'assets/images/pexels-francesco-ungaro-998641.jpg',links:[['Analytics Portfolio','https://drive.google.com/drive/folders/17z9MkZUVE_VmeN16661hetlkOrfLN581?usp=sharing']]},
    {id:'souls-like-combat',title:'Souls-Like Combat Prototype',section:'Game Design',type:'Game Design',year:'2025–Present',role:'Solo Developer / Game Designer',accent:'dark',summary:'Dark-fantasy action prototype focused on deliberate melee, stamina, enemy AI and progression.',details:'Designed the combat loop, enemy decision logic, progression and risk/reward balance in Unreal Engine 5.',tools:['Unreal Engine 5','Blueprints','AI Behavior Trees','Combat Design'],image:'assets/images/SoulsGame.png',links:[['ArtStation','https://www.artstation.com/starkrey']]},
    {id:'undead-and-unknown',title:'Undead and Unknown',section:'Game Design',type:'First-Person Game',year:'2025',role:'Solo Developer',accent:'dark',summary:'Dual-faction first-person experience built around contrasting motivations inside the same outbreak scenario.',details:'Designed narrative framework, faction motivations, environmental storytelling, AI behaviour and gameplay interactions.',tools:['Unreal Engine','Blueprints','AI Behavior Trees','Blender'],image:'https://cdna.artstation.com/p/assets/images/images/096/765/168/large/stark-rey-screenshot-2026-02-28-051712.jpg?1772236436',links:[['ArtStation','https://www.artstation.com/starkrey']]},
    {id:'quantum-void',title:'Quantum Void',section:'Game Design',type:'Game / UI / Systems',year:'2025',role:'Solo Developer',accent:'blue',summary:'Space-and-time exploration game combining traversal, atmospheric world design, gameplay systems and interface design.',details:'Designed jet-based movement, responsive world systems and a complete game-ready experience including UI, main menu, save system and graphics settings.',tools:['Unreal Engine','UI Design','Blueprints','Blender'],image:'https://cdnb.artstation.com/p/assets/images/images/096/764/949/large/stark-rey-screenshot-2026-02-28-050916.jpg?1772235633',links:[['ArtStation','https://www.artstation.com/artwork/BkrEPz']]},
    {id:'portfolio-system',title:'Personal Portfolio System',section:'Digital Design',type:'Web Experience',year:'2026',role:'Designer / Developer',accent:'blue',summary:'A modular editorial portfolio system designed for project storytelling and reusable content structures.',details:'Designed and developed a responsive portfolio architecture that separates content from presentation so new projects can be added without duplicating page markup.',tools:['HTML','CSS','JavaScript','Responsive Design'],image:'',links:[]},
    {id:'motion-brand-content',title:'Motion, Brand & Campaign Design',section:'Digital Design',type:'Digital Content',year:'2020–2026',role:'Motion Graphic Artist / Designer',accent:'dark',summary:'Motion graphics, campaign visuals, social content and brand-led digital assets across client and product contexts.',details:'Earlier professional work included campaign visuals, layout-driven digital content and motion graphics for clients including Byju’s QBS Learning and Bayer Crops.',tools:['After Effects','Premiere Pro','Photoshop','Illustrator'],image:'',links:[]}
  ],
  art3d: [
    ['Dure Helicopter','Hard Surface','https://cdna.artstation.com/p/assets/images/images/056/192/808/large/stark-rey-copter-ev-r-3-1.jpg?1668661171'],
    ['Ethereal Guardian','Character','https://cdnb.artstation.com/p/assets/images/images/095/529/195/large/stark-rey-bossr1.jpg?1768829766'],
    ['Ancient Weapon','Weapon Design','https://cdnb.artstation.com/p/assets/images/images/056/280/499/large/stark-rey-hanuman-weapon-2.jpg?1668869844'],
    ['Toxic Flame Thrower','Game Asset','https://cdna.artstation.com/p/assets/images/images/055/972/194/large/stark-rey-toxic-flame-thrower-04-img.jpg?1668157302']
  ],
  uiux: [
    ['ChiefPulse Product Experience','Product Design','2026','Product, interface and responsive web experience shaped around a consistent brand system.','blue','https://chiefpulse.com/'],
    ['Quantum Void Interface','Game UI','2025','Menus, settings and interface flows designed as part of the game experience.','dark','https://www.artstation.com/artwork/BkrEPz'],
    ['UI / Product Design Samples','UI/UX','Selected','Additional Figma-based interface and product design samples.','dark','https://www.figma.com/']
  ],
  resources: [
    ['Analytics Portfolio','Game analytics, dashboards & data-driven case work','Explore analytics work, KPI dashboards and data projects.','https://drive.google.com/drive/folders/17z9MkZUVE_VmeN16661hetlkOrfLN581?usp=sharing'],
    ['UI / Product Design','UI design sample works','Selected Figma-based interface and product design work.','https://www.figma.com/'],
    ['3D / Design','Extended 3D art & design portfolio','More modeling, characters, hard-surface assets and design work.','https://drive.google.com/drive/folders/1xaPlnCbQDpPaTWh1PtDqGExU6MDtXs43']
  ],
  timeline: [
    ['Experience','2026','Product Designer & Brand Lead','ChiefPulse','Product design, brand direction, web experience and digital content.'],
    ['Experience','May 2020 – Jan 2021','Motion Graphic Artist','Limped Frog (Palette69.design)','Campaign visuals, digital content and motion graphics for clients including Byju’s QBS Learning and Bayer Crops.'],
    ['Education','Aug 2023 – Apr 2025','PGDM · Business Analytics','Siva Sivani Institute of Management','Business analytics and data-informed decision making.'],
    ['Education','Jul 2019 – May 2023','Bachelor of Arts · Game Art & Design','Digiquest Academy / JNAFAU','Game art, 3D production, design fundamentals and interactive media.']
  ]
};
