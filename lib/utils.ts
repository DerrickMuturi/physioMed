import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Categories = [
  {
    name: "Orthopedic",
    url: "/orthopedics",
    description:
      "Orthopedic Care and Solutions: Topics related to the treatment and prevention of musculoskeletal conditions. Learn about innovative procedures, recovery tips, and how to manage injuries affecting bones, joints, and muscles.",
  },
  {
    name: "Physiotherapy",
    url: "/physiotherapy",
    description:
      " Discover the latest in physiotherapy techniques, exercises, and rehabilitation practices to help you recover from injuries, manage pain, and improve mobility and function",
  },
  {
    name: "Pediatric",
    url: "/pediatric",
    description:
      "Focused on the health of children and adolescents, this blog provides insights into pediatric care, common childhood conditions, and tips to support your child's growth and development.",
  },
  {
    name: "Neurology",
    url: "/neurology",
    description:
      "Stay informed about neurological disorders, treatments, and advances in understanding the brain and nervous system. Our blog offers advice and research on managing conditions like epilepsy, stroke, and neurodegenerative diseases.",
  },
  {
    name: "Patient",
    url: "/patient",
    description:
      "Delve into topics that center around patient care, experiences, and the journey through medical treatment. This blog is for patients and caregivers looking for support, stories, and resources",
  },
  {
    name: "Testimonials and Case Studies",
    url: "/testimonials-and-caseStudies",
    description:
      "Read real-world stories and case studies from patients who have navigated various medical conditions. These testimonials highlight their experiences, treatments, and outcomes.",
  },
  {
    name: "Wellness and Lifestyle",
    url: "/wellness-and-lifestyle",
    description:
      "Read real-world stories and case studies from patients who have navigated various medical conditions. These testimonials highlight their experiences, treatments, and outcomes.",
  },
  {
    name: "Cardiopulmology",
    url: "/cardiopulmology",
    description:
      "Read real-world stories and case studies from patients who have navigated various medical conditions. These testimonials highlight their experiences, treatments, and outcomes.",
  },
  {
    name: "Physiotherapy",
    url: "/physiotherapy",
    description:
      "Focused on issues unique to women’s health, this blog addresses everything from reproductive health to wellness strategies for women at every stage of life.",
  },
  {
    name: "Women’s Health",
    url: "/womens-health",
    description: "",
  },
];

export const strip = (url: string) => {
  console.log("url: ", url);
  if (typeof url === "string") {
    const imageUrl = url.replace(/^http:\/\/physio-med.vercel.app/, "");
    return imageUrl;
  }
};

export const formatDate = (date: string) => {
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  return new Intl.DateTimeFormat("en-GB", options).format(new Date(date));
};

export const Capitalize = (word: string) => {
  return word.toUpperCase();
};

export const convertToOriginalTitle = (formattedTitle: string) => {
  return formattedTitle.replace(/-/g, " ");
};
