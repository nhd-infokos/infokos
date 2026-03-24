import {
  // Furniture & Room
  Bed, Bathtub, Television, Wind, WifiHigh, Thermometer, Martini,
  Couch, Desk, Lamp, DoorOpen, Shower, Broom, Armchair,

  // Tags & Classification
  GenderIntersex, GenderMale, GenderFemale,
  Train, BagSimple, ShoppingBag, MapPin, Buildings,

  // Transport
  Car, Bicycle, Bus, Taxi, Airplane, Motorcycle, Scooter, Boat,

  // Property & Building
  House, HouseLine, Lock, Garage, Elevator, Warehouse, SwimmingPool,
  BuildingOffice, Storefront, Factory, Hospital, Mosque, Church,
  Synagogue, Cross, Bank,

  // Kitchen & Dining
  CookingPot, Coffee, ForkKnife, ShoppingCart, Hamburger, Pizza,
  BowlFood, BeerBottle, Wine,

  // Nature & Weather
  PawPrint, Leaf, Sun, Moon, Drop, Fire, Lightning, Fan, Tree,
  Mountains, Campfire, Tent, Umbrella, Park, Flower, Cactus,
  Cloud, CloudRain, CloudSun, Snowflake, Rainbow, ThermometerHot,
  ThermometerCold,

  // Utilities & Appliances
  Plug, Clock, Phone, Envelope, Globe, Camera, Microphone,
  MusicNote, GameController, Desktop, Printer, Package,
  WashingMachine, Flashlight, Lightbulb,
  Wrench, Hammer, PaintBrush,
  Scissors,

  // Education & Health
  BookOpen, GraduationCap, Stethoscope, FirstAid, Barbell,
  Pill, Syringe, Heartbeat, Brain, Student, Chalkboard,

  // Security & Status
  ShieldCheck, ShieldWarning, Star, Heart, CheckCircle,
  WarningCircle, Info, Eye, LockKey, SecurityCamera, Fingerprint,
  Key, SealCheck,

  // Finance
  Wallet, CreditCard, HandCoins, Money, CurrencyDollar, Receipt,
  Coins, PiggyBank, Bank as Banking,

  // People & Pets
  Users, UserCircle, Baby, Dog, Cat, Footprints, Binoculars,
  Person, HandWaving, Handshake, UsersFour,

  // Tools & Work
  Toolbox, Briefcase, CalendarBlank, Clipboard, FileText,
  FolderOpen, MagnifyingGlass, PencilSimple, Trash, Archive,
  Download, Upload, ShareNetwork,

  // Communication
  ChatCircle, ChatDots, Megaphone, Bell, At,
  WhatsappLogo, InstagramLogo, FacebookLogo, TiktokLogo,

  // Fashion & Personal
  TShirt, Pants, Hoodie, Sneaker, Sunglasses, Watch,

  // Food & Market
  Storefront as Market, Basket, Tag, Barcode,

  // Direction & Location
  NavigationArrow, Compass, MapTrifold, SignIn, SignOut,
  ArrowRight, ArrowLeft, CaretRight, CaretDown,

  // Media
  Play, Pause, MicrophoneStage, VideoCamera, Monitor,
  SpeakerHigh, Radio, Headphones,

  // Misc
  Rocket, Medal, Trophy, Crown, Diamond, Gift, Confetti,
  Smiley, ThumbsUp, HandsClapping, Sparkle, FireSimple,
  Prohibit, XCircle, MinusCircle, PlusCircle, Question,
  Checks, ListChecks,
} from "@phosphor-icons/react"
import type { ComponentType } from "react"

// Map icon name strings (from DB) to Phosphor icon components
// This file must only be imported from client components ("use client")
// To find icon names, visit: https://phosphoricons.com
export const iconMap: Record<string, ComponentType<any>> = {
  // Furniture & Room
  Bed, Bathtub, Television, Wind, WifiHigh, Thermometer, Martini,
  Couch, Desk, Lamp, DoorOpen, Shower, Broom, Armchair,

  // Tags & Classification
  GenderIntersex, GenderMale, GenderFemale,
  Train, BagSimple, ShoppingBag, MapPin, Buildings,

  // Transport
  Car, Bicycle, Bus, Taxi, Airplane, Motorcycle, Scooter, Boat,

  // Property & Building
  House, HouseLine, Lock, Garage, Elevator, Warehouse, SwimmingPool,
  BuildingOffice, Storefront, Factory, Hospital, Mosque, Church,
  Synagogue, Cross, Bank,

  // Kitchen & Dining
  CookingPot, Coffee, ForkKnife, ShoppingCart, Hamburger, Pizza,
  BowlFood, BeerBottle, Wine,

  // Nature & Weather
  PawPrint, Leaf, Sun, Moon, Drop, Fire, Lightning, Fan, Tree,
  Mountains, Campfire, Tent, Umbrella, Park, Flower, Cactus,
  Cloud, CloudRain, CloudSun, Snowflake, Rainbow, ThermometerHot,
  ThermometerCold,

  // Utilities & Appliances
  Plug, Clock, Phone, Envelope, Globe, Camera, Microphone,
  MusicNote, GameController, Desktop, Printer, Package,
  WashingMachine, Flashlight, Lightbulb,
  Wrench, Hammer, PaintBrush,
  Scissors,

  // Education & Health
  BookOpen, GraduationCap, Stethoscope, FirstAid, Barbell,
  Pill, Syringe, Heartbeat, Brain, Student, Chalkboard,

  // Security & Status
  ShieldCheck, ShieldWarning, Star, Heart, CheckCircle,
  WarningCircle, Info, Eye, LockKey, SecurityCamera, Fingerprint,
  Key, SealCheck,

  // Finance
  Wallet, CreditCard, HandCoins, Money, CurrencyDollar, Receipt,
  Coins, PiggyBank,

  // People & Pets
  Users, UserCircle, Baby, Dog, Cat, Footprints, Binoculars,
  Person, HandWaving, Handshake, UsersFour,

  // Tools & Work
  Toolbox, Briefcase, CalendarBlank, Clipboard, FileText,
  FolderOpen, MagnifyingGlass, PencilSimple, Trash, Archive,
  Download, Upload, ShareNetwork,

  // Communication
  ChatCircle, ChatDots, Megaphone, Bell, At,
  WhatsappLogo, InstagramLogo, FacebookLogo, TiktokLogo,

  // Fashion & Personal
  TShirt, Pants, Hoodie, Sneaker, Sunglasses, Watch,

  // Food & Market
  Basket, Tag, Barcode,

  // Direction & Location
  NavigationArrow, Compass, MapTrifold, SignIn, SignOut,
  ArrowRight, ArrowLeft, CaretRight, CaretDown,

  // Media
  Play, Pause, MicrophoneStage, VideoCamera, Monitor,
  SpeakerHigh, Radio, Headphones,

  // Misc
  Rocket, Medal, Trophy, Crown, Diamond, Gift, Confetti,
  Smiley, ThumbsUp, HandsClapping, Sparkle, FireSimple,
  Prohibit, XCircle, MinusCircle, PlusCircle, Question,
  Checks, ListChecks,
}
