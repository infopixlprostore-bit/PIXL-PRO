import { VideoProject, GraphicProject } from "./types";

import imgMarketplace from "./assets/images/marketplace_sonder_1781363359643.jpg";
import imgTuitionManager from "./assets/images/tuition_manager_dashboard_1781363455746.jpg";
import imgLogoMaker from "./assets/images/logo_maker_identity_1781363414958.jpg";
import imgFinanceHub from "./assets/images/finance_hub_dashboard_1781344992638.jpg";
import imgPalettePicker from "./assets/images/palette_picker_1781345437643.jpg";
import imgCalendarPlanning from "./assets/images/calendar_planning_1781345338680.jpg";
import imgChattingRealUsers from "./assets/images/chatting_real_users_1781345320117.jpg";

export const videoProjects: VideoProject[] = [
  {
    id: "v1",
    title: "Marketplace",
    category: "INTERACTIVE UI COMPONENTS",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-and-graphs-31952-large.mp4",
    thumbnailUrl: imgMarketplace,
    description: "An advanced, spring-physics-backed micro-interaction framework designed for tactile web widgets. Engineered to adapt naturally to gestural friction, scroll momentum, and user pointer hover velocities.",
    duration: "0:24",
    specs: {
      fps: 60,
      resolution: "4K UHD",
      codec: "H.264 Main-10"
    }
  },
  {
    id: "v2",
    title: "Tuition Manager",
    category: "MINIMALIST BRANDING",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-abstract-laser-lights-background-31971-large.mp4",
    thumbnailUrl: imgTuitionManager,
    description: "A dynamic branding concept showcasing programmable vector logomarks that mathematically flex and evolve based on active context. Smooth, fluid particles react to real-time client mouse coordinate inputs.",
    duration: "0:18",
    specs: {
      fps: 60,
      resolution: "1080p",
      codec: "H.264 Premium"
    }
  },
  {
    id: "v3",
    title: "Logo Maker",
    category: "SPATIAL ARCHITECTURE",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-retro-futuristic-grid-background-with-laser-lights-31970-large.mp4",
    thumbnailUrl: imgLogoMaker,
    description: "Generate unique, professional logos within seconds using simple prompts.\nCustomize designs with different styles, colors, fonts, and layouts.\nPerfect for startups, creators, and businesses looking for instant branding solutions.\nTurn ideas into visually stunning brand identities effortlessly.",
    duration: "0:22",
    specs: {
      fps: 60,
      resolution: "4K UHD",
      codec: "H.264 Main-10"
    }
  },
  {
    id: "v4",
    title: "Brand Connect",
    category: "MOTION DESIGN",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-tunnel-of-futuristic-purple-neon-lights-41712-large.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1618005198143-e52834643521?auto=format&fit=crop&w=1200&q=80",
    description: "An infinite scrolling responsive viewport matrix, featuring synthetic neon light tunnels designed to create optical depth on flat OLED displays. Developed with optimal file size budgets for mobile page weights.",
    duration: "0:30",
    specs: {
      fps: 60,
      resolution: "1080p",
      codec: "H.264"
    }
  }
];

export const graphicProjects: GraphicProject[] = [
  {
    id: "g1",
    title: "Money Management",
    category: "CATALOGUES",
    imageUrl: imgFinanceHub,
    description: "A clean and highly intuitive personal financial hub designed to streamline collections, earnings tracking, and payment alerts.",
    challenge: "Organize dense payment records and automated notification sequences into a clear, non-intimidating modular utility.",
    solution: "Divided workflows into visual telemetry cards using distinct color pairing, rich tracking widgets, and quick action alert buttons.",
    client: "Finance Hub",
    year: 2026,
    tags: ["Ledgering", "UI Widgets", "Telemetry Cards", "Earnings Tracking"]
  },
  {
    id: "g2",
    title: "Comprehensive Menus",
    category: "INTERACTIVE UI",
    imageUrl: imgPalettePicker,
    description: "Multi-level dynamic navigation systems designed for complex hierarchy and instant tactile item retrieval.",
    challenge: "Reimagine heavy-duty, multi-layered complex navigation systems into an elegant, non-fatiguing menu array.",
    solution: "Engineered ultra-responsive multi-tier dropdown menus, responsive drawer controls, and quick-filter options using clean layout grids.",
    client: "Hyperion Platforms",
    year: 2026,
    tags: ["Navigation UI", "Drop-downs", "Nested Menus", "Responsive Panels"]
  },
  {
    id: "g3",
    title: "Calender planning",
    category: "CATALOGUES",
    imageUrl: imgCalendarPlanning,
    description: "Sleek schedules and booking matrices showcasing timeblocks, drag-and-drop slots, and automated reminder alerts.",
    challenge: "Aestheticise dense schedule blocks, overlapping events, and appointment queues into a clear graphic timeline.",
    solution: "Implemented Swiss modernist layout priorities on calendar cells with flexible column grids and high-contrast status markers.",
    client: "Chronicle Freelancers",
    year: 2025,
    tags: ["Scheduling", "Calendar Grid", "Event Layouts", "Time Blocks"]
  },
  {
    id: "g4",
    title: "Chatting with real users",
    category: "INTERACTIVE UI",
    imageUrl: imgChattingRealUsers,
    description: "An elegant, interactive workspace facilitating smooth conversation streams, bubble presets, and user presence indicators.",
    challenge: "Deliver a premium real-time chatting interface that maximizes screen space and eliminates visual conversation clutter.",
    solution: "Developed highly optimized message components with custom scroll behaviors, distinct chat bubbles, and instant state feedback.",
    client: "Socrates Labs",
    year: 2026,
    tags: ["Chat UI", "Messaging", "User Status", "Presence Indicators"]
  }
];
