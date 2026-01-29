import { CreditCard, Files, LayoutDashboard, Receipt, Upload } from "lucide-react";

export const features = [
  {
    iconName: "ArrowUpCircle",
    iconColor: "text-orange-500",
    title: "Unlimited Uploads",
    description: "Upload large files seamlessly without speed restrictions.",
  },
  {
    iconName: "Shield",
    iconColor: "text-red-500",
    title: "Secure Files",
    description: "Your files are protected with strong end-to-end encryption.",
  },
  {
    iconName: "Share2",
    iconColor: "text-indigo-500",
    title: "Easy Sharing",
    description: "Generate shareable links with optional password protection.",
  },
  {
    iconName: "CreditCard",
    iconColor: "text-purple-500",
    title: "Flexible Pricing",
    description: "Affordable plans with secure and easy payment options.",
  },
  {
    iconName: "FileText",
    iconColor: "text-green-500",
    title: "Multiple File Types",
    description:
      "Share documents, images, videos, and archives without limits.",
  },
  {
    iconName: "Clock",
    iconColor: "text-blue-500",
    title: "Fast Transfers",
    description: "Upload and share files instantly with high-speed servers.",
  },
];

export const testimonials = [
  {
    name: "Rahul Mehta",
    role: "Startup Founder",
    company: "CloudNest",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    quote:
      "Sharing large files with my team is now instant and secure. It has completely streamlined our workflow.",
    rating: 5,
  },
  {
    name: "Priya Kapoor",
    role: "Product Manager",
    company: "TechFlow",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    quote:
      "The clean interface and fast uploads make collaboration effortless across teams.",
    rating: 4,
  },
  {
    name: "Sneha Kulkarni",
    role: "Creative Designer",
    company: "PixelStudio",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    quote:
      "Uploading and sharing high-resolution design files has never been this smooth.",
    rating: 5,
  },
];

export const pricingPlans = [
  {
    name: "Free",
    price: "₹0",
    description: "Effortless file sharing.",
    features: [
      "1 GB secure storage",
      "100 MB uploads",
      "Standard encryption",
      "Public share links"
    ],
    cta: "Start Free",
    highlighted: false
  },
  {
    name: "Pro",
    price: "₹199 / month",
    description: "Built for focused work and study.",
    features: [
      "50 GB storage",
      "5 GB uploads",
      "End-to-end encryption",
      "Password-protected links",
      "High-speed transfers"
    ],
    cta: "Go Pro",
    highlighted: true
  },
  {
    name: "Pro Max",
    price: "₹499 / month",
    description: "Designed for teams that scale.",
    features: [
      "500 GB shared storage",
      "Unlimited file size",
      "Advanced security",
      "Team access control",
      "Priority support"
    ],
    cta: "Upgrade Team",
    highlighted: false
  },
  {
    name: "Ultimate",
    price: "₹999 / month",
    description: "Enterprise-grade sharing at scale.",
    features: [
      "Unlimited storage",
      "Unlimited transfers",
      "Military-grade security",
      "Role-based permissions",
      "24/7 priority support"
    ],
    cta: "Talk to Sales",
    highlighted: false
  }
];





export const SIDE_MENU_DATA = [
  {
    id: "01",
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    id: "02",
    label: "Upload",
    icon: Upload,
    path: "/upload",
  },
  {
    id: "03",
    label: "My Files",
    icon: Files,
    path: "/my-files",
  },
  {
    id: "04",
    label: "Subscription",
    icon: CreditCard,
    path: "/subscription",
  },
  {
    id: "05",
    label: "Transactions",
    icon: Receipt,
    path: "/transactions",
  },

];
