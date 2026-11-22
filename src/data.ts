import lineImg from "./assets/robot-line.webp";
import obstacleImg from "./assets/robot-obstacle.webp";
import lightImg from "./assets/robot-light.webp";
import spyImg from "./assets/robot-spy.webp";

export const profile = {
  name: "Bhavin Jha",
  email: "bhavinjha9@gmail.com",
  site: "bhavin-labs.vercel.app",
  siteUrl: "https://bhavin-labs.vercel.app",
  github: "https://github.com/bhavinjha",
  githubLabel: "github.com/bhavinjha",
  location: "Binodpur, Katihar, Bihar, India",
};

export const navLinks = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Projects", id: "projects" },
  { label: "Skills", id: "skills" },
  { label: "Process", id: "process" },
  { label: "Contact", id: "contact" },
];

export const stats = [
  { to: 4, suffix: "+", label: "Robots built" },
  { to: 2, suffix: "+", label: "Languages" },
  { to: null, suffix: "∞", label: "Ideas in progress" },
] as const;

export const tickerItems = [
  "Python",
  "C++",
  "Robotics",
  "Arduino",
  "AI Automation",
  "Website Construction",
  "Presentation Design",
  "Sensors & Motors",
];

export const quickFacts = [
  { label: "Age group", value: "Class 8th Student" },
  { label: "Main interests", value: "Programming, Robotics & AI" },
  { label: "Languages", value: "Python, C++" },
  { label: "Projects built", value: "4+ Robots & Websites", highlight: true },
];

export const projects = [
  {
    no: "01",
    title: "Line-Following Robot",
    kind: "Autonomous · Infrared sensors",
    image: lineImg,
    alt: "A small line-following robot with an array of infrared sensors driving along a glowing white line",
    description:
      "An autonomous robot that uses infrared sensors to detect and follow a pre-defined line path with precision.",
    tags: ["Sensors", "Arduino", "Motor Control"],
  },
  {
    no: "02",
    title: "Obstacle-Avoiding Robot",
    kind: "Autonomous · Ultrasonic sensor",
    image: obstacleImg,
    alt: "A four-wheel robot with an ultrasonic sensor approaching a black block",
    description:
      "A smart robot with an ultrasonic sensor that detects obstacles in its path and navigates around them on its own.",
    tags: ["Ultrasonic", "Navigation", "Automation"],
  },
  {
    no: "03",
    title: "Light-Tracking Robot",
    kind: "Phototropic · LDR sensors",
    image: lightImg,
    alt: "A small robot with light sensors turning toward a glowing red lamp",
    description:
      "A phototropic robot that uses light sensors to detect and move towards or away from light sources intelligently.",
    tags: ["LDR Sensors", "Phototropism", "Control"],
  },
  {
    no: "04",
    title: "Remote Surveillance Robot",
    kind: "Remote-controlled · Camera",
    image: spyImg,
    alt: "A tracked remote-controlled robot with a camera mounted on a short mast",
    description:
      "A remotely controlled robot designed for observation and surveillance, with camera capabilities in the works.",
    tags: ["Remote Control", "Video", "Surveillance"],
  },
];

export const education = [
  {
    title: "Class 8th Student",
    place: "Scottish Public School, Binodpur",
    tag: "Present",
  },
  {
    title: "Python & C++ Programming",
    place: "Self-taught · apps, logic & algorithms",
    tag: "Ongoing",
  },
  {
    title: "Robotics & Electronics",
    place: "Arduino, sensors & motor control",
    tag: "Ongoing",
  },
  {
    title: "AI Automation & Web Construction",
    place: "Smart workflows & modern websites",
    tag: "Learning",
  },
];

export const skills = [
  "Python",
  "C++",
  "Robotics",
  "Arduino",
  "AI Automation",
  "Websites",
  "PowerPoint",
  "Sensors",
  "Motor Control",
  "Circuits",
  "Problem Solving",
  "Curiosity",
];

export const process = [
  {
    no: "01",
    title: "Curiosity",
    text: "Asking how things work and spotting a problem worth solving.",
  },
  {
    no: "02",
    title: "Plan",
    text: "Sketching the idea and choosing the right sensors and parts.",
  },
  {
    no: "03",
    title: "Build",
    text: "Wiring circuits and assembling the robot piece by piece.",
  },
  {
    no: "04",
    title: "Code",
    text: "Writing Python & C++ logic that brings sensors and motors to life.",
  },
  {
    no: "05",
    title: "Test & Improve",
    text: "Testing, debugging and levelling up with every new version.",
  },
] as const;
