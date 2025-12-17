import steamLogo from '../assets/steamlogo.png';
import youtubeLogo from '../assets/youtubeLogo.png';
import boxceptionImage from '../assets/boxception.jpg';
import tinyCompanyImage from '../assets/tinyCompany.png';
import customControllerThumbnail from '../assets/customControllerThumbnail.jpg';
import jellyjamIcon from '../assets/jellyjam.png';

const projects = [
  {
    title: 'Boxception',
    description: 'What would happen if boxes were used for more than just storage? What if they could float? Be controlled at a distance? Or even rewind through time?',
    detailedDescription: "Boxception takes place in a futuristic setting where virtual worlds have became a real thing. You are one of the few lucky people to get selected to be a participant in the ongoing trials about a new fully immersive virtual world experience. The other participants get to go on great adventures to other worlds while you get stuck with... new boxes? Complete puzzles using these diverse boxes and slowly realize that maybe you were actually one of the lucky ones.",
    image: boxceptionImage,
    imagePosition: 'center center',
    technologies: ['Godot', 'Game Development', 'Game Design'],
    features: ['Unique Box Mechanics', 'Merge with specific objects to control them', 'Puzzle Solving', 'Immersive Story'],
    status: 'In Development',
    releaseDate: '2026',
    platformText: 'Wishlist On',
    platform: {
      name: 'Steam',
      logo: steamLogo,
      link: 'https://store.steampowered.com/app/1729280/Boxception/'
    },
    youtubeUrl: '',
    steamEmbed: true,
    steamAppId: '1729280'
    ,
    type: 'Games'
  },
  {
    title: 'Tiny Company',
    description: 'A mod that adds extra challenge to Lethal Company by making the players tiny, changing how they interact with the world and enemies.',
    detailedDescription: "A mod for the game Lethal Company that shrinks the players down to a tiny size. This changes how players interact with the environment and enemies, making for a fresh and challenging experience. Players will need to adapt their strategies and use their new size to their advantage in order to survive and complete objectives.",
    image: tinyCompanyImage,
    imagePosition: 'center top',
    technologies: ['Unity', 'C#', 'BepInEx'],
    features: ['New Player Size', 'Hoarding Bugs can carry the player', 'Environmental Interaction Changes'],
    status: 'Released',
    releaseDate: '2024',
    platformText: 'Download On',
    platform: {
      name: 'Thunderstore',
      logo: 'https://thunderstore.io/favicon.ico',
      link: 'https://thunderstore.io/c/lethal-company/p/JellyJam/Tiny_Company/'
    },
    youtubeUrl: 'https://youtu.be/4rmfBOBv6Ew',
    counters: [
      {
        title: 'Downloads',
        apiUrl: 'https://api.allorigins.win/get?url=' + encodeURIComponent('https://thunderstore.io/api/experimental/package/JellyJam/Tiny_Company/'),
        defaultValue: 0
      }
    ]
    ,
    type: 'Mods'
  },
  {
    title: 'JellyJam Channel',
    description: "From showcasing the intricacies of game development to sharing entertaining mod showcases and skits, the channel offers a variety of content for gamers and developers alike.",
    detailedDescription: "The JellyJam channel has a heavy focus on game development and modding content. From showcasing the intricacies of game development to sharing entertaining mod showcases and occasionally skits, the channel is an outlet for me to share my passion for games and game development with a wider audience. Whether you're a fellow developer looking for insights or a gamer seeking fun and engaging content, there's something for everyone on the channel.",
    image: youtubeLogo,
    imagePosition: 'center center',
    technologies: ['Video Editing', 'SEO Optimization', 'Game Dev'],
    features: ['Devlogs', 'Mod Showcases', 'Game Jams', 'Skits'],
    status: 'Ongoing',
    releaseDate: 'Ongoing',
    platformText: 'Watch On',
    platform: {
      name: 'YouTube',
      logo: youtubeLogo,
      link: 'https://www.youtube.com/@JellyJamDev/'
    },
    youtubeUrl: '',
    counters: [
      {
        title: 'Subscribers',
        apiUrl: 'https://api.allorigins.win/get?url=' + encodeURIComponent('https://www.googleapis.com/youtube/v3/channels?part=statistics&id=UCGTiQy1L8rsutN-COhaQizg&key=AIzaSyAgpxy0_kNbcvaoTFBmkhhBLASgrQwuuDg'),
        defaultValue: 2630
      },
      {
        title: 'Views',
        apiUrl: 'https://api.allorigins.win/get?url=' + encodeURIComponent('https://www.googleapis.com/youtube/v3/channels?part=statistics&id=UCGTiQy1L8rsutN-COhaQizg&key=AIzaSyAgpxy0_kNbcvaoTFBmkhhBLASgrQwuuDg'),
        defaultValue: 198267
      },
      {
        title: 'Videos',
        apiUrl: 'https://api.allorigins.win/get?url=' + encodeURIComponent('https://www.googleapis.com/youtube/v3/channels?part=statistics&id=UCGTiQy1L8rsutN-COhaQizg&key=AIzaSyAgpxy0_kNbcvaoTFBmkhhBLASgrQwuuDg'),
        defaultValue: 20
      }
    ]
    ,
    type: 'YouTube'
  },
  {
    title: 'Ultrasonic Sensor Controlled Game',
    description: 'An innovative game controlled using an ultrasonic sensor, showcasing interactive hardware integration.',
    detailedDescription: 'A game that uses an ultrasonic sensor for control, demonstrating interactive hardware integration and innovative gameplay mechanics.',
    image: customControllerThumbnail,
    imagePosition: 'center center',
    technologies: ['Unity', 'Arduino', 'C#', 'C++'],
    features: ['Ultrasonic Sensor Control', 'Interactive Gameplay', 'Hardware Integration'],
    status: 'Completed',
    releaseDate: '2023',
    platformText: 'Watch On',
    platform: {
      name: 'YouTube',
      logo: youtubeLogo,
      link: 'https://www.youtube.com/watch?v=en5a8iRj_HA'
    },
    youtubeUrl: 'https://www.youtube.com/watch?v=en5a8iRj_HA',
    counters: []
    ,
    type: 'Games'
  },
  {
    title: 'Devlog Series',
    description: 'Ongoing YouTube devlog series covering game development progress, tools, and techniques.',
    detailedDescription: 'A continuous series of developer logs sharing progress on projects, insights into tools and workflows, and behind-the-scenes decisions. Aimed at both developers and curious gamers.',
    image: youtubeLogo,
    imagePosition: 'center center',
    technologies: ['Video Editing', 'Content Strategy', 'Game Dev'],
    features: ['Regular Updates', 'Technical Deep Dives', 'Project Showcases'],
    status: 'Ongoing',
    releaseDate: 'Ongoing',
    platformText: 'Watch On',
    platform: {
      name: 'YouTube',
      logo: youtubeLogo,
      link: 'https://www.youtube.com/@JellyJamDev/'
    },
    youtubeUrl: '',
    counters: []
    ,
    type: 'YouTube'
  },
  {
    title: 'Open Source Utility',
    description: 'A small open source tool to streamline parts of the workflow.',
    detailedDescription: 'Utility project designed to automate repetitive tasks and improve productivity. Focused on simplicity, reliability, and developer ergonomics. Documentation and examples included.',
    image: jellyjamIcon,
    imagePosition: 'center center',
    technologies: ['TypeScript', 'Node.js'],
    features: ['CLI Tooling', 'Configurable', 'Well-Documented'],
    status: 'In Development',
    releaseDate: '2026',
    platformText: 'Source On',
    platform: {
      name: 'GitHub',
      logo: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
      link: 'https://github.com/JamesJamDev'
    },
    youtubeUrl: '',
    counters: []
    ,
    type: 'Other'
  }
];

export default projects;
