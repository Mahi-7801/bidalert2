<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Bid Alert</title>
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: { sans: ['Inter', 'sans-serif'] },
                    colors: {
                        bid: {
                            dark: '#0f172a',
                            green: '#4ade80',
                            greenhover: '#22c55e',
                            light: '#f8fafc'
                        }
                    },
                    boxShadow: { 'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)' },
                    animation: { 'bounce-slow': 'bounce 3s infinite' }
                }
            }
        }
    </script>
    <style>
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        #mobile-menu { transition: all 0.3s ease-in-out; }
        .hero-pattern { background-color: #0f172a; background-image: radial-gradient(#1e293b 1px, transparent 1px); background-size: 32px 32px; }
        /* Chat Widget Animations */
        #bidgpt-window { transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out; transform-origin: bottom right; }
        .chat-hidden { transform: scale(0.9); opacity: 0; pointer-events: none; }
        .chat-visible { transform: scale(1); opacity: 1; pointer-events: all; }
    </style>
</head>
<body class="bg-gray-50 text-gray-800 font-sans flex flex-col min-h-screen relative">

<!-- Header Section -->
<header class="bg-white shadow-soft sticky top-0 z-50 border-b border-gray-100">
    <div class="container mx-auto px-4">
        <div class="flex justify-between items-center h-20">
            <!-- Logo -->
            <div class="flex-shrink-0 flex items-center">
                <a href="index.php" class="block">
                    <img src="assets/logo.png" alt="BidAlert Logo" class="h-10 w-auto">
                </a>
            </div>

            <!-- DESKTOP NAVIGATION -->
            <nav class="hidden lg:flex space-x-1 xl:space-x-4 items-center">
                                                                                    <a href="index.php" class="px-3 py-2 text-sm font-semibold transition duration-150 rounded-md hover:bg-gray-50 text-bid-greenhover">Home</a>
                                                                                                        <a href="login.php" class="px-3 py-2 text-sm font-semibold transition duration-150 rounded-md hover:bg-gray-50 text-bid-green font-bold hover:text-bid-dark">Login</a>
                                                                                                        <a href="register.php" class="px-3 py-2 text-sm font-semibold transition duration-150 rounded-md hover:bg-gray-50 text-bid-dark hover:text-bid-greenhover">Register</a>
                                                                                                        <div class="relative group">
                            <button class="flex items-center px-3 py-2 text-sm font-semibold text-bid-dark hover:text-bid-greenhover transition duration-150 rounded-md hover:bg-gray-50">
                                India Tenders                                <svg class="ml-1 h-4 w-4 text-gray-400 group-hover:text-bid-greenhover transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                            </button>
                            <div class="absolute left-0 origin-top-left mt-0 w-64 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50 border border-gray-100">
                                <div class="h-1 bg-bid-green w-full rounded-t-lg"></div>
                                <div class="py-2">
                                                                                                                        <a href="tenders.php" class="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-bid-greenhover transition-colors">View All Indian Tenders</a>
                                                                                                                                                                <a href="tenders.php?source=Newspaper" class="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-bid-greenhover transition-colors">News Paper Tenders</a>
                                                                                                                                                                <a href="tenders.php?status=archive" class="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-bid-greenhover transition-colors">Archive Tenders</a>
                                                                                                                                                                <a href="tenders.php?q=Empanelment" class="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-bid-greenhover transition-colors">Empanelment</a>
                                                                                                                                                                <a href="samples.php" class="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-bid-greenhover transition-colors">Sample Documents</a>
                                                                                                                                                                <a href="https://document-analyzer-9.onrender.com/" class="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-bid-greenhover transition-colors">Upload Documents</a>
                                                                                                            </div>
                            </div>
                        </div>
                                                                                                        <div class="relative group">
                            <button class="flex items-center px-3 py-2 text-sm font-semibold text-bid-dark hover:text-bid-greenhover transition duration-150 rounded-md hover:bg-gray-50">
                                Tenders By                                <svg class="ml-1 h-4 w-4 text-gray-400 group-hover:text-bid-greenhover transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                            </button>
                            <div class="absolute left-0 origin-top-left mt-0 w-64 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50 border border-gray-100">
                                <div class="h-1 bg-bid-green w-full rounded-t-lg"></div>
                                <div class="py-2">
                                                                                                                        <div class="relative group/nested px-4 py-2 hover:bg-gray-50 cursor-pointer">
                                                <div class="flex items-center justify-between text-sm text-gray-700 font-medium group-hover/nested:text-bid-greenhover">
                                                    <span>State</span>
                                                    <svg class="h-4 w-4 text-gray-400 " fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
                                                </div>
                                                <div class="absolute left-full ml-0 origin-top-left top-0 w-56 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover/nested:opacity-100 group-hover/nested:visible transition-all duration-200 z-50 border border-gray-100">
                                                    <div class="py-2">
                                                                                                                    <a href="tenders.php?state_text=Maharashtra" class="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-bid-greenhover transition-colors">Maharashtra</a>
                                                                                                                    <a href="tenders.php?state_text=Delhi" class="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-bid-greenhover transition-colors">Delhi</a>
                                                                                                                    <a href="tenders.php?state_text=Karnataka" class="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-bid-greenhover transition-colors">Karnataka</a>
                                                                                                                    <a href="tenders.php?state_text=Tamil+Nadu" class="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-bid-greenhover transition-colors">Tamil Nadu</a>
                                                                                                                    <a href="tenders.php?state_text=Uttar+Pradesh" class="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-bid-greenhover transition-colors">Uttar Pradesh</a>
                                                                                                                    <a href="tenders.php?state_text=Gujarat" class="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-bid-greenhover transition-colors">Gujarat</a>
                                                                                                                    <a href="tenders.php" class="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-bid-greenhover transition-colors">View All States</a>
                                                                                                            </div>
                                                </div>
                                            </div>
                                                                                                                                                                <a href="tenders.php" class="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-bid-greenhover transition-colors">Town/City</a>
                                                                                                                                                                <div class="relative group/nested px-4 py-2 hover:bg-gray-50 cursor-pointer">
                                                <div class="flex items-center justify-between text-sm text-gray-700 font-medium group-hover/nested:text-bid-greenhover">
                                                    <span>Category</span>
                                                    <svg class="h-4 w-4 text-gray-400 " fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
                                                </div>
                                                <div class="absolute left-full ml-0 origin-top-left top-0 w-56 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover/nested:opacity-100 group-hover/nested:visible transition-all duration-200 z-50 border border-gray-100">
                                                    <div class="py-2">
                                                                                                                    <a href="tenders.php?category=Electrical" class="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-bid-greenhover transition-colors">Electrical</a>
                                                                                                                    <a href="tenders.php?category=Civil" class="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-bid-greenhover transition-colors">Civil</a>
                                                                                                                    <a href="tenders.php?category=Construction" class="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-bid-greenhover transition-colors">Construction</a>
                                                                                                                    <a href="tenders.php?category=Mechanical" class="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-bid-greenhover transition-colors">Mechanical</a>
                                                                                                                    <a href="tenders.php?category=Transportation" class="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-bid-greenhover transition-colors">Transportation</a>
                                                                                                                    <a href="tenders.php?category=Information+Technology" class="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-bid-greenhover transition-colors">IT & Telecom</a>
                                                                                                                    <a href="tenders.php" class="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-bid-greenhover transition-colors">View All Categories</a>
                                                                                                            </div>
                                                </div>
                                            </div>
                                                                                                                                                                <div class="relative group/nested px-4 py-2 hover:bg-gray-50 cursor-pointer">
                                                <div class="flex items-center justify-between text-sm text-gray-700 font-medium group-hover/nested:text-bid-greenhover">
                                                    <span>Sector/Industry</span>
                                                    <svg class="h-4 w-4 text-gray-400 " fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
                                                </div>
                                                <div class="absolute left-full ml-0 origin-top-left top-0 w-56 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover/nested:opacity-100 group-hover/nested:visible transition-all duration-200 z-50 border border-gray-100">
                                                    <div class="py-2">
                                                                                                                    <a href="tenders.php?category=Healthcare+%26+Medical" class="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-bid-greenhover transition-colors">Health & Medical</a>
                                                                                                                    <a href="tenders.php?category=Education" class="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-bid-greenhover transition-colors">Education</a>
                                                                                                                    <a href="tenders.php?category=Agriculture" class="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-bid-greenhover transition-colors">Agriculture</a>
                                                                                                                    <a href="tenders.php" class="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-bid-greenhover transition-colors">View All Sectors</a>
                                                                                                            </div>
                                                </div>
                                            </div>
                                                                                                                                                                <a href="tenders.php?authority=IREPS" class="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-bid-greenhover transition-colors">IREPS</a>
                                                                                                                                                                <a href="tenders.php?authority_group=Bank" class="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-bid-greenhover transition-colors">Bank</a>
                                                                                                                                                                <a href="tenders.php" class="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-bid-greenhover transition-colors">Keyword</a>
                                                                                                                                                                <a href="tenders.php?status=archive" class="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-bid-greenhover transition-colors">Expired/Closed/Archive</a>
                                                                                                                                                                <div class="relative group/nested px-4 py-2 hover:bg-gray-50 cursor-pointer">
                                                <div class="flex items-center justify-between text-sm text-gray-700 font-medium group-hover/nested:text-bid-greenhover">
                                                    <span>Procurement Type</span>
                                                    <svg class="h-4 w-4 text-gray-400 " fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
                                                </div>
                                                <div class="absolute left-full ml-0 origin-top-left top-0 w-56 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover/nested:opacity-100 group-hover/nested:visible transition-all duration-200 z-50 border border-gray-100">
                                                    <div class="py-2">
                                                                                                                    <a href="tenders.php?type=Services" class="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-bid-greenhover transition-colors">Services</a>
                                                                                                                    <a href="tenders.php?type=Works" class="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-bid-greenhover transition-colors">Works</a>
                                                                                                            </div>
                                                </div>
                                            </div>
                                                                                                            </div>
                            </div>
                        </div>
                                                                                                        <div class="relative group">
                            <button class="flex items-center px-3 py-2 text-sm font-semibold text-bid-dark hover:text-bid-greenhover transition duration-150 rounded-md hover:bg-gray-50">
                                Global Tenders                                <svg class="ml-1 h-4 w-4 text-gray-400 group-hover:text-bid-greenhover transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                            </button>
                            <div class="absolute right-0 origin-top-right mt-0 w-64 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50 border border-gray-100">
                                <div class="h-1 bg-bid-green w-full rounded-t-lg"></div>
                                <div class="py-2">
                                                                                                                        <a href="tenders.php?scope=global" class="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-bid-greenhover transition-colors">View All Tenders</a>
                                                                                                                                                                <div class="relative group/nested px-4 py-2 hover:bg-gray-50 cursor-pointer">
                                                <div class="flex items-center justify-between text-sm text-gray-700 font-medium group-hover/nested:text-bid-greenhover">
                                                    <span>View Tenders By</span>
                                                    <svg class="h-4 w-4 text-gray-400 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
                                                </div>
                                                <div class="absolute right-full mr-1 origin-top-right top-0 w-56 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover/nested:opacity-100 group-hover/nested:visible transition-all duration-200 z-50 border border-gray-100">
                                                    <div class="py-2">
                                                                                                                    <a href="tenders.php" class="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-bid-greenhover transition-colors">Country</a>
                                                                                                                    <a href="tenders.php" class="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-bid-greenhover transition-colors">City</a>
                                                                                                                    <a href="tenders.php" class="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-bid-greenhover transition-colors">Authority</a>
                                                                                                                    <a href="tenders.php" class="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-bid-greenhover transition-colors">MAF</a>
                                                                                                                    <a href="tenders.php" class="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-bid-greenhover transition-colors">Category</a>
                                                                                                            </div>
                                                </div>
                                            </div>
                                                                                                            </div>
                            </div>
                        </div>
                                                                                                        <div class="relative group">
                            <button class="flex items-center px-3 py-2 text-sm font-semibold text-bid-dark hover:text-bid-greenhover transition duration-150 rounded-md hover:bg-gray-50">
                                Services                                <svg class="ml-1 h-4 w-4 text-gray-400 group-hover:text-bid-greenhover transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                            </button>
                            <div class="absolute right-0 origin-top-right mt-0 w-64 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50 border border-gray-100">
                                <div class="h-1 bg-bid-green w-full rounded-t-lg"></div>
                                <div class="py-2">
                                                                                                                        <a href="plans.php" class="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-bid-greenhover transition-colors">Subscription Plans</a>
                                                                                                                                                                <a href="alerts.php" class="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-bid-greenhover transition-colors">RSS/Email Alerts</a>
                                                                                                            </div>
                            </div>
                        </div>
                                                                                                        <div class="relative group">
                            <button class="flex items-center px-3 py-2 text-sm font-semibold text-bid-dark hover:text-bid-greenhover transition duration-150 rounded-md hover:bg-gray-50">
                                Blog                                <svg class="ml-1 h-4 w-4 text-gray-400 group-hover:text-bid-greenhover transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                            </button>
                            <div class="absolute right-0 origin-top-right mt-0 w-64 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50 border border-gray-100">
                                <div class="h-1 bg-bid-green w-full rounded-t-lg"></div>
                                <div class="py-2">
                                                                                                                        <a href="blog.php?category=articles" class="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-bid-greenhover transition-colors">Tender Info Articles</a>
                                                                                                                                                                <a href="blog.php?category=videos" class="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-bid-greenhover transition-colors">Tender Info Videos</a>
                                                                                                                                                                <a href="blog.php?category=trending" class="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-bid-greenhover transition-colors">Trending News</a>
                                                                                                            </div>
                            </div>
                        </div>
                                                                                                        <a href="contact.php" class="ml-2 px-6 py-2.5 rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 bg-bid-dark text-white hover:bg-bid-greenhover">Contact</a>
                                                </nav>

            <!-- Mobile menu button -->
            <div class="flex lg:hidden">
                <button type="button" onclick="toggleMobileMenu()" class="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-bid-dark hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-bid-green">
                    <span class="sr-only">Open main menu</span>
                    <svg id="menu-icon-open" class="block h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
                    <svg id="menu-icon-close" class="hidden h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </div>
        </div>
    </div>

    <!-- MOBILE MENU -->
    <div id="mobile-menu" class="hidden lg:hidden bg-white border-t border-gray-100 max-h-[85vh] overflow-y-auto shadow-inner">
        <div class="px-4 pt-2 pb-6 space-y-1">
                                                <a href="index.php" class="block py-3 text-base font-medium text-bid-dark hover:text-bid-greenhover border-b border-gray-100 ">Home</a>
                                                                <a href="login.php" class="block py-3 text-base font-medium text-bid-dark hover:text-bid-greenhover border-b border-gray-100 ">Login</a>
                                                                <a href="register.php" class="block py-3 text-base font-medium text-bid-dark hover:text-bid-greenhover border-b border-gray-100 ">Register</a>
                                                                <div class="border-b border-gray-100 py-1">
                        <button onclick="toggleSubMenu('mobile-fd73c027ceaf698b45123401f237ba27')" class="w-full flex items-center justify-between py-3 text-base font-medium text-bid-dark hover:text-bid-greenhover">
                            <span>India Tenders</span>
                            <svg id="arrow-mobile-fd73c027ceaf698b45123401f237ba27" class="ml-2 h-4 w-4 text-gray-400 transform transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                        </button>
                        <div id="mobile-fd73c027ceaf698b45123401f237ba27" class="hidden pl-2 space-y-1 bg-gray-50 rounded-lg mb-2">
                                                                                                <a href="tenders.php" class="block px-4 py-3 text-sm font-medium text-gray-600 hover:text-bid-greenhover hover:bg-gray-100 rounded-md">View All Indian Tenders</a>
                                                                                                                                <a href="tenders.php?source=Newspaper" class="block px-4 py-3 text-sm font-medium text-gray-600 hover:text-bid-greenhover hover:bg-gray-100 rounded-md">News Paper Tenders</a>
                                                                                                                                <a href="tenders.php?status=archive" class="block px-4 py-3 text-sm font-medium text-gray-600 hover:text-bid-greenhover hover:bg-gray-100 rounded-md">Archive Tenders</a>
                                                                                                                                <a href="tenders.php?q=Empanelment" class="block px-4 py-3 text-sm font-medium text-gray-600 hover:text-bid-greenhover hover:bg-gray-100 rounded-md">Empanelment</a>
                                                                                                                                <a href="samples.php" class="block px-4 py-3 text-sm font-medium text-gray-600 hover:text-bid-greenhover hover:bg-gray-100 rounded-md">Sample Documents</a>
                                                                                                                                <a href="https://document-analyzer-9.onrender.com/" class="block px-4 py-3 text-sm font-medium text-gray-600 hover:text-bid-greenhover hover:bg-gray-100 rounded-md">Upload Documents</a>
                                                                                    </div>
                    </div>
                                                                <div class="border-b border-gray-100 py-1">
                        <button onclick="toggleSubMenu('mobile-bb06e56bcce1da47b344fdb41c7d07d9')" class="w-full flex items-center justify-between py-3 text-base font-medium text-bid-dark hover:text-bid-greenhover">
                            <span>Tenders By</span>
                            <svg id="arrow-mobile-bb06e56bcce1da47b344fdb41c7d07d9" class="ml-2 h-4 w-4 text-gray-400 transform transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                        </button>
                        <div id="mobile-bb06e56bcce1da47b344fdb41c7d07d9" class="hidden pl-2 space-y-1 bg-gray-50 rounded-lg mb-2">
                                                                                                <div class="border-l-2 border-gray-200 ml-2 my-1">
                                        <button onclick="toggleSubMenu('mobile-nested-46a2a41cc6e552044816a2d04634545d')" class="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-600 hover:text-bid-dark">
                                            <span>State</span>
                                            <svg id="arrow-mobile-nested-46a2a41cc6e552044816a2d04634545d" class="ml-2 h-3 w-3 text-gray-400 transform transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                                        </button>
                                        <div id="mobile-nested-46a2a41cc6e552044816a2d04634545d" class="hidden pl-4 pb-2 space-y-1">
                                                                                            <a href="tenders.php?state_text=Maharashtra" class="block px-3 py-2 text-sm text-gray-500 hover:text-bid-greenhover rounded-md">Maharashtra</a>
                                                                                            <a href="tenders.php?state_text=Delhi" class="block px-3 py-2 text-sm text-gray-500 hover:text-bid-greenhover rounded-md">Delhi</a>
                                                                                            <a href="tenders.php?state_text=Karnataka" class="block px-3 py-2 text-sm text-gray-500 hover:text-bid-greenhover rounded-md">Karnataka</a>
                                                                                            <a href="tenders.php?state_text=Tamil+Nadu" class="block px-3 py-2 text-sm text-gray-500 hover:text-bid-greenhover rounded-md">Tamil Nadu</a>
                                                                                            <a href="tenders.php?state_text=Uttar+Pradesh" class="block px-3 py-2 text-sm text-gray-500 hover:text-bid-greenhover rounded-md">Uttar Pradesh</a>
                                                                                            <a href="tenders.php?state_text=Gujarat" class="block px-3 py-2 text-sm text-gray-500 hover:text-bid-greenhover rounded-md">Gujarat</a>
                                                                                            <a href="tenders.php" class="block px-3 py-2 text-sm text-gray-500 hover:text-bid-greenhover rounded-md">View All States</a>
                                                                                    </div>
                                    </div>
                                                                                                                                <a href="tenders.php" class="block px-4 py-3 text-sm font-medium text-gray-600 hover:text-bid-greenhover hover:bg-gray-100 rounded-md">Town/City</a>
                                                                                                                                <div class="border-l-2 border-gray-200 ml-2 my-1">
                                        <button onclick="toggleSubMenu('mobile-nested-3adbdb3ac060038aa0e6e6c138ef9873')" class="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-600 hover:text-bid-dark">
                                            <span>Category</span>
                                            <svg id="arrow-mobile-nested-3adbdb3ac060038aa0e6e6c138ef9873" class="ml-2 h-3 w-3 text-gray-400 transform transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                                        </button>
                                        <div id="mobile-nested-3adbdb3ac060038aa0e6e6c138ef9873" class="hidden pl-4 pb-2 space-y-1">
                                                                                            <a href="tenders.php?category=Electrical" class="block px-3 py-2 text-sm text-gray-500 hover:text-bid-greenhover rounded-md">Electrical</a>
                                                                                            <a href="tenders.php?category=Civil" class="block px-3 py-2 text-sm text-gray-500 hover:text-bid-greenhover rounded-md">Civil</a>
                                                                                            <a href="tenders.php?category=Construction" class="block px-3 py-2 text-sm text-gray-500 hover:text-bid-greenhover rounded-md">Construction</a>
                                                                                            <a href="tenders.php?category=Mechanical" class="block px-3 py-2 text-sm text-gray-500 hover:text-bid-greenhover rounded-md">Mechanical</a>
                                                                                            <a href="tenders.php?category=Transportation" class="block px-3 py-2 text-sm text-gray-500 hover:text-bid-greenhover rounded-md">Transportation</a>
                                                                                            <a href="tenders.php?category=Information+Technology" class="block px-3 py-2 text-sm text-gray-500 hover:text-bid-greenhover rounded-md">IT & Telecom</a>
                                                                                            <a href="tenders.php" class="block px-3 py-2 text-sm text-gray-500 hover:text-bid-greenhover rounded-md">View All Categories</a>
                                                                                    </div>
                                    </div>
                                                                                                                                <div class="border-l-2 border-gray-200 ml-2 my-1">
                                        <button onclick="toggleSubMenu('mobile-nested-fa1f2ca033c4c43f5cfa8fd5a92d60f4')" class="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-600 hover:text-bid-dark">
                                            <span>Sector/Industry</span>
                                            <svg id="arrow-mobile-nested-fa1f2ca033c4c43f5cfa8fd5a92d60f4" class="ml-2 h-3 w-3 text-gray-400 transform transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                                        </button>
                                        <div id="mobile-nested-fa1f2ca033c4c43f5cfa8fd5a92d60f4" class="hidden pl-4 pb-2 space-y-1">
                                                                                            <a href="tenders.php?category=Healthcare+%26+Medical" class="block px-3 py-2 text-sm text-gray-500 hover:text-bid-greenhover rounded-md">Health & Medical</a>
                                                                                            <a href="tenders.php?category=Education" class="block px-3 py-2 text-sm text-gray-500 hover:text-bid-greenhover rounded-md">Education</a>
                                                                                            <a href="tenders.php?category=Agriculture" class="block px-3 py-2 text-sm text-gray-500 hover:text-bid-greenhover rounded-md">Agriculture</a>
                                                                                            <a href="tenders.php" class="block px-3 py-2 text-sm text-gray-500 hover:text-bid-greenhover rounded-md">View All Sectors</a>
                                                                                    </div>
                                    </div>
                                                                                                                                <a href="tenders.php?authority=IREPS" class="block px-4 py-3 text-sm font-medium text-gray-600 hover:text-bid-greenhover hover:bg-gray-100 rounded-md">IREPS</a>
                                                                                                                                <a href="tenders.php?authority_group=Bank" class="block px-4 py-3 text-sm font-medium text-gray-600 hover:text-bid-greenhover hover:bg-gray-100 rounded-md">Bank</a>
                                                                                                                                <a href="tenders.php" class="block px-4 py-3 text-sm font-medium text-gray-600 hover:text-bid-greenhover hover:bg-gray-100 rounded-md">Keyword</a>
                                                                                                                                <a href="tenders.php?status=archive" class="block px-4 py-3 text-sm font-medium text-gray-600 hover:text-bid-greenhover hover:bg-gray-100 rounded-md">Expired/Closed/Archive</a>
                                                                                                                                <div class="border-l-2 border-gray-200 ml-2 my-1">
                                        <button onclick="toggleSubMenu('mobile-nested-ff79f73cff067a7f22c00fb47b5348cd')" class="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-600 hover:text-bid-dark">
                                            <span>Procurement Type</span>
                                            <svg id="arrow-mobile-nested-ff79f73cff067a7f22c00fb47b5348cd" class="ml-2 h-3 w-3 text-gray-400 transform transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                                        </button>
                                        <div id="mobile-nested-ff79f73cff067a7f22c00fb47b5348cd" class="hidden pl-4 pb-2 space-y-1">
                                                                                            <a href="tenders.php?type=Services" class="block px-3 py-2 text-sm text-gray-500 hover:text-bid-greenhover rounded-md">Services</a>
                                                                                            <a href="tenders.php?type=Works" class="block px-3 py-2 text-sm text-gray-500 hover:text-bid-greenhover rounded-md">Works</a>
                                                                                    </div>
                                    </div>
                                                                                    </div>
                    </div>
                                                                <div class="border-b border-gray-100 py-1">
                        <button onclick="toggleSubMenu('mobile-fde8b95304f1954b1ba018515b442da8')" class="w-full flex items-center justify-between py-3 text-base font-medium text-bid-dark hover:text-bid-greenhover">
                            <span>Global Tenders</span>
                            <svg id="arrow-mobile-fde8b95304f1954b1ba018515b442da8" class="ml-2 h-4 w-4 text-gray-400 transform transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                        </button>
                        <div id="mobile-fde8b95304f1954b1ba018515b442da8" class="hidden pl-2 space-y-1 bg-gray-50 rounded-lg mb-2">
                                                                                                <a href="tenders.php?scope=global" class="block px-4 py-3 text-sm font-medium text-gray-600 hover:text-bid-greenhover hover:bg-gray-100 rounded-md">View All Tenders</a>
                                                                                                                                <div class="border-l-2 border-gray-200 ml-2 my-1">
                                        <button onclick="toggleSubMenu('mobile-nested-af5757d8cce5f6352cc1010c14630814')" class="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-600 hover:text-bid-dark">
                                            <span>View Tenders By</span>
                                            <svg id="arrow-mobile-nested-af5757d8cce5f6352cc1010c14630814" class="ml-2 h-3 w-3 text-gray-400 transform transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                                        </button>
                                        <div id="mobile-nested-af5757d8cce5f6352cc1010c14630814" class="hidden pl-4 pb-2 space-y-1">
                                                                                            <a href="tenders.php" class="block px-3 py-2 text-sm text-gray-500 hover:text-bid-greenhover rounded-md">Country</a>
                                                                                            <a href="tenders.php" class="block px-3 py-2 text-sm text-gray-500 hover:text-bid-greenhover rounded-md">City</a>
                                                                                            <a href="tenders.php" class="block px-3 py-2 text-sm text-gray-500 hover:text-bid-greenhover rounded-md">Authority</a>
                                                                                            <a href="tenders.php" class="block px-3 py-2 text-sm text-gray-500 hover:text-bid-greenhover rounded-md">MAF</a>
                                                                                            <a href="tenders.php" class="block px-3 py-2 text-sm text-gray-500 hover:text-bid-greenhover rounded-md">Category</a>
                                                                                    </div>
                                    </div>
                                                                                    </div>
                    </div>
                                                                <div class="border-b border-gray-100 py-1">
                        <button onclick="toggleSubMenu('mobile-992a0f0542384f1ee5ef51b7cf4ae6c4')" class="w-full flex items-center justify-between py-3 text-base font-medium text-bid-dark hover:text-bid-greenhover">
                            <span>Services</span>
                            <svg id="arrow-mobile-992a0f0542384f1ee5ef51b7cf4ae6c4" class="ml-2 h-4 w-4 text-gray-400 transform transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                        </button>
                        <div id="mobile-992a0f0542384f1ee5ef51b7cf4ae6c4" class="hidden pl-2 space-y-1 bg-gray-50 rounded-lg mb-2">
                                                                                                <a href="plans.php" class="block px-4 py-3 text-sm font-medium text-gray-600 hover:text-bid-greenhover hover:bg-gray-100 rounded-md">Subscription Plans</a>
                                                                                                                                <a href="alerts.php" class="block px-4 py-3 text-sm font-medium text-gray-600 hover:text-bid-greenhover hover:bg-gray-100 rounded-md">RSS/Email Alerts</a>
                                                                                    </div>
                    </div>
                                                                <div class="border-b border-gray-100 py-1">
                        <button onclick="toggleSubMenu('mobile-be8df1f28c0abc85a0ed0c6860e5d832')" class="w-full flex items-center justify-between py-3 text-base font-medium text-bid-dark hover:text-bid-greenhover">
                            <span>Blog</span>
                            <svg id="arrow-mobile-be8df1f28c0abc85a0ed0c6860e5d832" class="ml-2 h-4 w-4 text-gray-400 transform transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                        </button>
                        <div id="mobile-be8df1f28c0abc85a0ed0c6860e5d832" class="hidden pl-2 space-y-1 bg-gray-50 rounded-lg mb-2">
                                                                                                <a href="blog.php?category=articles" class="block px-4 py-3 text-sm font-medium text-gray-600 hover:text-bid-greenhover hover:bg-gray-100 rounded-md">Tender Info Articles</a>
                                                                                                                                <a href="blog.php?category=videos" class="block px-4 py-3 text-sm font-medium text-gray-600 hover:text-bid-greenhover hover:bg-gray-100 rounded-md">Tender Info Videos</a>
                                                                                                                                <a href="blog.php?category=trending" class="block px-4 py-3 text-sm font-medium text-gray-600 hover:text-bid-greenhover hover:bg-gray-100 rounded-md">Trending News</a>
                                                                                    </div>
                    </div>
                                                                <a href="contact.php" class="block py-3 text-base font-medium text-bid-dark hover:text-bid-greenhover border-b border-gray-100 bg-bid-dark text-white text-center mt-4 rounded-lg shadow-md hover:bg-bid-greenhover hover:text-white border-none">Contact</a>
                                    </div>
    </div>
</header>

<!-- ========================================== -->
<!-- BIDGPT FLOATING WIDGET START               -->
<!-- ========================================== -->

<!-- Toggle Button -->
<button id="bidgpt-toggle" onclick="toggleBidGPT()" class="fixed bottom-6 right-6 z-[9999] group flex items-center justify-center w-14 h-14 bg-bid-dark hover:bg-bid-green text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-110 border-2 border-white hover:border-bid-dark focus:outline-none">
    <!-- Icon -->
    <div class="relative">
        <svg class="w-7 h-7 transform transition-transform group-hover:rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
        <span class="absolute -top-1 -right-1 flex h-3 w-3">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-bid-green opacity-75"></span>
            <span class="relative inline-flex rounded-full h-3 w-3 bg-bid-green"></span>
        </span>
    </div>
    <span class="absolute right-full mr-3 bg-bid-dark text-white text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Ask BidGPT</span>
</button>

<!-- Chat Window -->
<div id="bidgpt-window" class="fixed bottom-24 right-6 z-[9999] w-[350px] md:w-[400px] h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden chat-hidden">
    <!-- Chat Header -->
    <div class="bg-bid-dark p-4 flex items-center justify-between shadow-sm cursor-pointer" onclick="toggleBidGPT()">
        <div class="flex items-center">
            <div class="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mr-3 border border-white/20">
                <svg class="w-5 h-5 text-bid-green" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            </div>
            <div>
                <h3 class="font-bold text-white text-sm">BidGPT Assistant</h3>
                <p class="text-[10px] text-gray-300">Powered by AI</p>
            </div>
        </div>
        <button onclick="event.stopPropagation(); toggleBidGPT()" class="text-gray-400 hover:text-white transition">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
    </div>

    <!-- Messages Area -->
    <div id="widget-messages" class="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 scroll-smooth">
        <!-- Initial Bot Message -->
        <div class="flex items-start">
            <div class="w-6 h-6 rounded-full bg-bid-dark flex-shrink-0 flex items-center justify-center mr-2 mt-1">
                <span class="text-[10px] text-bid-green font-bold">AI</span>
            </div>
            <div class="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 max-w-[85%] text-sm text-gray-700">
                Hello! 👋 I can help you find tenders instantly. Try asking: <br>
                <span class="text-bid-green cursor-pointer hover:underline block mt-1" onclick="sendWidgetMsg('Show me Construction tenders')">"Show Construction tenders"</span>
                <span class="text-bid-green cursor-pointer hover:underline block" onclick="sendWidgetMsg('Tenders in Delhi')">"Tenders in Delhi"</span>
            </div>
        </div>
    </div>

    <!-- Input Area -->
    <div class="p-3 bg-white border-t border-gray-100">
        <form id="widget-form" class="relative flex items-center" onsubmit="handleWidgetSubmit(event)">
            <input type="text" id="widget-input" class="w-full bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-full pl-4 pr-10 py-2.5 focus:outline-none focus:ring-1 focus:ring-bid-green focus:border-bid-green transition-all placeholder-gray-400" placeholder="Type your query..." autocomplete="off">
            <button type="submit" class="absolute right-1.5 p-1.5 bg-bid-dark hover:bg-bid-green text-white hover:text-bid-dark rounded-full transition-colors duration-200">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
            </button>
        </form>
    </div>
</div>

<script>
    // Navigation Logic
    function toggleMobileMenu() {
        const menu = document.getElementById('mobile-menu');
        const iconOpen = document.getElementById('menu-icon-open');
        const iconClose = document.getElementById('menu-icon-close');
        
        if (menu.classList.contains('hidden')) {
            menu.classList.remove('hidden');
            iconOpen.classList.add('hidden');
            iconClose.classList.remove('hidden');
        } else {
            menu.classList.add('hidden');
            iconOpen.classList.remove('hidden');
            iconClose.classList.add('hidden');
        }
    }

    function toggleSubMenu(id) {
        const subMenu = document.getElementById(id);
        const arrow = document.getElementById('arrow-' + id);
        
        if (subMenu.classList.contains('hidden')) {
            subMenu.classList.remove('hidden');
            if(arrow) arrow.classList.add('rotate-180');
        } else {
            subMenu.classList.add('hidden');
            if(arrow) arrow.classList.remove('rotate-180');
        }
    }

    // --- BidGPT Widget Logic ---
    const widgetWindow = document.getElementById('bidgpt-window');
    const widgetMessages = document.getElementById('widget-messages');
    const widgetInput = document.getElementById('widget-input');
    let isChatInitialized = false;

    function toggleBidGPT() {
        if (widgetWindow.classList.contains('chat-hidden')) {
            widgetWindow.classList.remove('chat-hidden');
            widgetWindow.classList.add('chat-visible');
            if(!isChatInitialized) {
                isChatInitialized = true;
            }
            setTimeout(() => widgetInput.focus(), 300);
        } else {
            widgetWindow.classList.remove('chat-visible');
            widgetWindow.classList.add('chat-hidden');
        }
    }

    function addWidgetMessage(text, sender) {
        const div = document.createElement('div');
        div.className = sender === 'user' ? 'flex items-end justify-end' : 'flex items-start';
        
        let html = '';
        if (sender === 'user') {
            html = `
                <div class="bg-bid-dark text-white p-2.5 rounded-2xl rounded-tr-none shadow-sm max-w-[85%] text-sm">
                    ${text}
                </div>
            `;
        } else {
            // Bot Message
            html = `
                <div class="w-6 h-6 rounded-full bg-bid-dark flex-shrink-0 flex items-center justify-center mr-2 mt-1">
                    <span class="text-[10px] text-bid-green font-bold">AI</span>
                </div>
                <div class="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 max-w-[85%] text-sm text-gray-700 leading-relaxed">
                    ${text}
                </div>
            `;
        }
        
        div.innerHTML = html;
        widgetMessages.appendChild(div);
        widgetMessages.scrollTop = widgetMessages.scrollHeight;
    }

    async function handleWidgetSubmit(e) {
        if(e) e.preventDefault();
        const message = widgetInput.value.trim();
        if (!message) return;
        sendWidgetMsg(message);
    }

    // Expose this globally so the API's HTML buttons (onclick="askQuestion()") can use it
    window.askQuestion = function(text) {
        if (widgetWindow.classList.contains('chat-hidden')) {
            toggleBidGPT();
        }
        sendWidgetMsg(text);
    };

    async function sendWidgetMsg(message, hidden = false) {
        if(!hidden) {
            addWidgetMessage(message, 'user');
            widgetInput.value = '';
        }

        // Typing Indicator
        const typingId = 'w-typing-' + Date.now();
        const typingDiv = document.createElement('div');
        typingDiv.className = 'flex items-start';
        typingDiv.id = typingId;
        typingDiv.innerHTML = `
            <div class="w-6 h-6 rounded-full bg-bid-dark flex-shrink-0 flex items-center justify-center mr-2 mt-1"><span class="text-[10px] text-bid-green font-bold">AI</span></div>
            <div class="bg-gray-100 p-2.5 rounded-2xl rounded-tl-none flex space-x-1 items-center">
                <div class="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                <div class="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                <div class="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
            </div>
        `;
        widgetMessages.appendChild(typingDiv);
        widgetMessages.scrollTop = widgetMessages.scrollHeight;

        try {
            const response = await fetch('bidgpt_api.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: message })
            });
            const data = await response.json();
            document.getElementById(typingId).remove();
            addWidgetMessage(data.reply, 'bot');
        } catch (error) {
            document.getElementById(typingId).remove();
            addWidgetMessage("Connection error. Please try again.", 'bot');
        }
    }
</script>
<!-- ========================================== -->
<!-- BIDGPT FLOATING WIDGET END                 -->
<!-- ========================================== -->

</body>
</html>
<!-- Hero Section -->
<section class="relative bg-bid-dark text-white py-20 lg:py-28 overflow-hidden">
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-10" style="background-image: radial-gradient(#4ade80 1px, transparent 1px); background-size: 32px 32px;"></div>
    
    <div class="container mx-auto px-4 text-center relative z-10">
        <span class="bg-bid-green/20 text-bid-green px-4 py-1 rounded-full text-sm font-semibold mb-6 inline-block uppercase tracking-wider">
            Boost Your Business
        </span>
        <h1 class="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
            Find the Latest <span class="text-bid-green">Government Tenders</span> <br class="hidden md:block" />and Opportunities
        </h1>
        <p class="text-gray-300 text-lg md:text-xl mb-10 max-w-3xl mx-auto">
            Access over 100,000+ active tenders with our smart tools. Upload documents, get WhatsApp alerts, and use BidGPT for analysis.
        </p>
        
        <!-- Search Bar -->
        <div class="max-w-4xl mx-auto bg-white p-2 rounded-xl shadow-2xl transform hover:scale-[1.01] transition-transform duration-300">
            <form action="tenders.php" method="GET" class="flex flex-col md:flex-row gap-2">
                <div class="flex-grow flex items-center bg-gray-50 rounded-lg px-4 py-3 border border-transparent focus-within:border-bid-green focus-within:bg-white transition-colors">
                    <svg class="h-6 w-6 text-gray-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    <input type="text" name="q" placeholder="Search keywords, authority, ID..." class="w-full bg-transparent outline-none text-gray-800 placeholder-gray-500">
                </div>
                <div class="md:w-1/3 flex items-center bg-gray-50 rounded-lg px-4 py-3 border border-transparent focus-within:border-bid-green focus-within:bg-white transition-colors">
                    <svg class="h-6 w-6 text-gray-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    <select name="state_text" class="w-full bg-transparent outline-none text-gray-800 cursor-pointer appearance-none">
                        <option value="">All States</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Gujarat">Gujarat</option>
                    </select>
                </div>
                <button type="submit" class="bg-bid-green hover:bg-bid-greenhover text-bid-dark font-bold py-3 px-8 rounded-lg text-lg transition duration-150 shadow-md flex items-center justify-center">
                    Search
                </button>
            </form>
        </div>
        
        <!-- Quick Tags -->
        <div class="mt-6 text-sm text-gray-400">
            <span class="mr-2">Trending:</span>
            <a href="tenders.php?category=Construction" class="text-bid-green hover:underline mr-3">Construction</a>
            <a href="tenders.php?category=Railways" class="text-bid-green hover:underline mr-3">Railways</a>
            <a href="tenders.php?category=Solar" class="text-bid-green hover:underline mr-3">Solar</a>
            <a href="tenders.php?category=Medical" class="text-bid-green hover:underline">Medical</a>
        </div>
    </div>
</section>

<!-- Features Section -->
<section class="py-16 bg-white relative z-20 -mt-8">
    <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <!-- Feature 1 -->
            <div class="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow text-center group">
                <div class="w-14 h-14 mx-auto bg-blue-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                    <svg class="w-7 h-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                </div>
                <h3 class="font-bold text-lg text-gray-900 mb-2">Upload Documents</h3>
                <p class="text-sm text-gray-500">Easily upload and manage tender-related documents in one secure place.</p>
            </div>
            
            <!-- Feature 2 -->
            <div class="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow text-center group">
                <div class="w-14 h-14 mx-auto bg-green-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-100 transition-colors">
                    <svg class="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                </div>
                <h3 class="font-bold text-lg text-gray-900 mb-2">WhatsApp Alerts</h3>
                <p class="text-sm text-gray-500">Never miss a deadline. Receive real-time tender notifications on WhatsApp.</p>
            </div>
            
            <!-- Feature 3 -->
            <div class="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow text-center group">
                <div class="w-14 h-14 mx-auto bg-purple-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-purple-100 transition-colors">
                    <svg class="w-7 h-7 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
                <h3 class="font-bold text-lg text-gray-900 mb-2">Smart Search</h3>
                <p class="text-sm text-gray-500">Find exactly what you need in seconds with our advanced filtering system.</p>
            </div>
            
            <!-- Feature 4 -->
            <div class="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow text-center group">
                <div class="w-14 h-14 mx-auto bg-orange-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-orange-100 transition-colors">
                    <svg class="w-7 h-7 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                </div>
                <h3 class="font-bold text-lg text-gray-900 mb-2">BidGPT AI</h3>
                <p class="text-sm text-gray-500">Gain a competitive edge. Use BidGPT for intelligent tender analysis and insights.</p>
            </div>
        </div>
    </div>
</section>

<!-- Categories Section (Tabbed Interface) -->
<section class="py-16 bg-gray-50">
    <div class="container mx-auto px-4">
        <div class="text-center mb-10">
            <h2 class="text-3xl font-bold text-bid-dark">Browse by Category</h2>
            <div class="w-20 h-1 bg-bid-green mx-auto mt-4 rounded-full"></div>
        </div>

        <!-- Tabs -->
        <div class="flex justify-center mb-8">
            <div class="bg-white p-1 rounded-full shadow-md inline-flex">
                <button onclick="switchCategory('work')" id="tab-work" class="px-6 py-2 rounded-full text-sm font-bold text-white bg-bid-dark transition-all duration-200">Work Categories</button>
                <button onclick="switchCategory('service')" id="tab-service" class="px-6 py-2 rounded-full text-sm font-bold text-gray-500 hover:text-bid-dark transition-all duration-200">Service Categories</button>
                <button onclick="switchCategory('product')" id="tab-product" class="px-6 py-2 rounded-full text-sm font-bold text-gray-500 hover:text-bid-dark transition-all duration-200">Product Categories</button>
            </div>
        </div>

        <!-- Content Area -->
        <div id="content-work" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 category-content">
            <a href='tenders.php?category=Mechanical' class='bg-white p-4 rounded-xl shadow-sm hover:shadow-md border border-gray-100 flex flex-col items-center justify-center text-center h-32 hover:-translate-y-1 transition-transform group'>
                        <div class='mb-3 text-gray-400 group-hover:text-bid-green transition-colors'><svg class='w-8 h-8' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' /></svg></div>
                        <div class='font-semibold text-gray-800 text-sm'>Mechanical</div>
                        <span class='text-xs text-bid-green mt-1'>View Tenders &rarr;</span>
                      </a><a href='tenders.php?category=Civil' class='bg-white p-4 rounded-xl shadow-sm hover:shadow-md border border-gray-100 flex flex-col items-center justify-center text-center h-32 hover:-translate-y-1 transition-transform group'>
                        <div class='mb-3 text-gray-400 group-hover:text-bid-green transition-colors'><svg class='w-8 h-8' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 01 1v5m-4 0h4' /></svg></div>
                        <div class='font-semibold text-gray-800 text-sm'>Civil</div>
                        <span class='text-xs text-bid-green mt-1'>View Tenders &rarr;</span>
                      </a><a href='tenders.php?category=Construction' class='bg-white p-4 rounded-xl shadow-sm hover:shadow-md border border-gray-100 flex flex-col items-center justify-center text-center h-32 hover:-translate-y-1 transition-transform group'>
                        <div class='mb-3 text-gray-400 group-hover:text-bid-green transition-colors'><svg class='w-8 h-8' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z' /></svg></div>
                        <div class='font-semibold text-gray-800 text-sm'>Construction</div>
                        <span class='text-xs text-bid-green mt-1'>View Tenders &rarr;</span>
                      </a><a href='tenders.php?category=Transportation' class='bg-white p-4 rounded-xl shadow-sm hover:shadow-md border border-gray-100 flex flex-col items-center justify-center text-center h-32 hover:-translate-y-1 transition-transform group'>
                        <div class='mb-3 text-gray-400 group-hover:text-bid-green transition-colors'><svg class='w-8 h-8' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0' /></svg></div>
                        <div class='font-semibold text-gray-800 text-sm'>Transportation</div>
                        <span class='text-xs text-bid-green mt-1'>View Tenders &rarr;</span>
                      </a><a href='tenders.php?category=Coal & Mining' class='bg-white p-4 rounded-xl shadow-sm hover:shadow-md border border-gray-100 flex flex-col items-center justify-center text-center h-32 hover:-translate-y-1 transition-transform group'>
                        <div class='mb-3 text-gray-400 group-hover:text-bid-green transition-colors'><svg class='w-8 h-8' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' /></svg></div>
                        <div class='font-semibold text-gray-800 text-sm'>Coal & Mining</div>
                        <span class='text-xs text-bid-green mt-1'>View Tenders &rarr;</span>
                      </a><a href='tenders.php?category=Electrical' class='bg-white p-4 rounded-xl shadow-sm hover:shadow-md border border-gray-100 flex flex-col items-center justify-center text-center h-32 hover:-translate-y-1 transition-transform group'>
                        <div class='mb-3 text-gray-400 group-hover:text-bid-green transition-colors'><svg class='w-8 h-8' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M13 10V3L4 14h7v7l9-11h-7z' /></svg></div>
                        <div class='font-semibold text-gray-800 text-sm'>Electrical</div>
                        <span class='text-xs text-bid-green mt-1'>View Tenders &rarr;</span>
                      </a>        </div>

        <div id="content-service" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 category-content hidden">
             <a href='tenders.php?category=Telecom' class='bg-white p-4 rounded-xl shadow-sm hover:shadow-md border border-gray-100 flex flex-col items-center justify-center text-center h-32 hover:-translate-y-1 transition-transform group'>
                        <div class='mb-3 text-gray-400 group-hover:text-bid-green transition-colors'><svg class='w-8 h-8' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0' /></svg></div>
                        <div class='font-semibold text-gray-800 text-sm'>Telecom</div>
                        <span class='text-xs text-bid-green mt-1'>View Tenders &rarr;</span>
                      </a><a href='tenders.php?category=Financial' class='bg-white p-4 rounded-xl shadow-sm hover:shadow-md border border-gray-100 flex flex-col items-center justify-center text-center h-32 hover:-translate-y-1 transition-transform group'>
                        <div class='mb-3 text-gray-400 group-hover:text-bid-green transition-colors'><svg class='w-8 h-8' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' /></svg></div>
                        <div class='font-semibold text-gray-800 text-sm'>Financial</div>
                        <span class='text-xs text-bid-green mt-1'>View Tenders &rarr;</span>
                      </a><a href='tenders.php?category=Consultancy' class='bg-white p-4 rounded-xl shadow-sm hover:shadow-md border border-gray-100 flex flex-col items-center justify-center text-center h-32 hover:-translate-y-1 transition-transform group'>
                        <div class='mb-3 text-gray-400 group-hover:text-bid-green transition-colors'><svg class='w-8 h-8' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' /></svg></div>
                        <div class='font-semibold text-gray-800 text-sm'>Consultancy</div>
                        <span class='text-xs text-bid-green mt-1'>View Tenders &rarr;</span>
                      </a><a href='tenders.php?category=IT & Software' class='bg-white p-4 rounded-xl shadow-sm hover:shadow-md border border-gray-100 flex flex-col items-center justify-center text-center h-32 hover:-translate-y-1 transition-transform group'>
                        <div class='mb-3 text-gray-400 group-hover:text-bid-green transition-colors'><svg class='w-8 h-8' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' /></svg></div>
                        <div class='font-semibold text-gray-800 text-sm'>IT & Software</div>
                        <span class='text-xs text-bid-green mt-1'>View Tenders &rarr;</span>
                      </a><a href='tenders.php?category=Event Mgmt' class='bg-white p-4 rounded-xl shadow-sm hover:shadow-md border border-gray-100 flex flex-col items-center justify-center text-center h-32 hover:-translate-y-1 transition-transform group'>
                        <div class='mb-3 text-gray-400 group-hover:text-bid-green transition-colors'><svg class='w-8 h-8' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' /></svg></div>
                        <div class='font-semibold text-gray-800 text-sm'>Event Mgmt</div>
                        <span class='text-xs text-bid-green mt-1'>View Tenders &rarr;</span>
                      </a><a href='tenders.php?category=Security' class='bg-white p-4 rounded-xl shadow-sm hover:shadow-md border border-gray-100 flex flex-col items-center justify-center text-center h-32 hover:-translate-y-1 transition-transform group'>
                        <div class='mb-3 text-gray-400 group-hover:text-bid-green transition-colors'><svg class='w-8 h-8' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' /></svg></div>
                        <div class='font-semibold text-gray-800 text-sm'>Security</div>
                        <span class='text-xs text-bid-green mt-1'>View Tenders &rarr;</span>
                      </a>        </div>

        <div id="content-product" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 category-content hidden">
             <a href='tenders.php?category=Textile' class='bg-white p-4 rounded-xl shadow-sm hover:shadow-md border border-gray-100 flex flex-col items-center justify-center text-center h-32 hover:-translate-y-1 transition-transform group'>
                        <div class='mb-3 text-gray-400 group-hover:text-bid-green transition-colors'><svg class='w-8 h-8' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01' /></svg></div>
                        <div class='font-semibold text-gray-800 text-sm'>Textile</div>
                        <span class='text-xs text-bid-green mt-1'>View Tenders &rarr;</span>
                      </a><a href='tenders.php?category=Electronics' class='bg-white p-4 rounded-xl shadow-sm hover:shadow-md border border-gray-100 flex flex-col items-center justify-center text-center h-32 hover:-translate-y-1 transition-transform group'>
                        <div class='mb-3 text-gray-400 group-hover:text-bid-green transition-colors'><svg class='w-8 h-8' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z' /></svg></div>
                        <div class='font-semibold text-gray-800 text-sm'>Electronics</div>
                        <span class='text-xs text-bid-green mt-1'>View Tenders &rarr;</span>
                      </a><a href='tenders.php?category=Medical' class='bg-white p-4 rounded-xl shadow-sm hover:shadow-md border border-gray-100 flex flex-col items-center justify-center text-center h-32 hover:-translate-y-1 transition-transform group'>
                        <div class='mb-3 text-gray-400 group-hover:text-bid-green transition-colors'><svg class='w-8 h-8' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z' /></svg></div>
                        <div class='font-semibold text-gray-800 text-sm'>Medical</div>
                        <span class='text-xs text-bid-green mt-1'>View Tenders &rarr;</span>
                      </a><a href='tenders.php?category=Machinery' class='bg-white p-4 rounded-xl shadow-sm hover:shadow-md border border-gray-100 flex flex-col items-center justify-center text-center h-32 hover:-translate-y-1 transition-transform group'>
                        <div class='mb-3 text-gray-400 group-hover:text-bid-green transition-colors'><svg class='w-8 h-8' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' /></svg></div>
                        <div class='font-semibold text-gray-800 text-sm'>Machinery</div>
                        <span class='text-xs text-bid-green mt-1'>View Tenders &rarr;</span>
                      </a><a href='tenders.php?category=Furniture' class='bg-white p-4 rounded-xl shadow-sm hover:shadow-md border border-gray-100 flex flex-col items-center justify-center text-center h-32 hover:-translate-y-1 transition-transform group'>
                        <div class='mb-3 text-gray-400 group-hover:text-bid-green transition-colors'><svg class='w-8 h-8' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' /></svg></div>
                        <div class='font-semibold text-gray-800 text-sm'>Furniture</div>
                        <span class='text-xs text-bid-green mt-1'>View Tenders &rarr;</span>
                      </a><a href='tenders.php?category=Chemical' class='bg-white p-4 rounded-xl shadow-sm hover:shadow-md border border-gray-100 flex flex-col items-center justify-center text-center h-32 hover:-translate-y-1 transition-transform group'>
                        <div class='mb-3 text-gray-400 group-hover:text-bid-green transition-colors'><svg class='w-8 h-8' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z' /></svg></div>
                        <div class='font-semibold text-gray-800 text-sm'>Chemical</div>
                        <span class='text-xs text-bid-green mt-1'>View Tenders &rarr;</span>
                      </a>        </div>
    </div>
</section>

<!-- Industries Section -->
<section class="py-16 bg-white">
    <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row justify-between items-end mb-8">
            <div>
                <h2 class="text-3xl font-bold text-bid-dark">Tenders by Sector</h2>
                <p class="text-gray-500 mt-2">Explore sector-specific opportunities tailored to your industry.</p>
            </div>
            <a href="tenders.php" class="text-bid-green font-semibold hover:underline mt-4 md:mt-0">View All Sectors &rarr;</a>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
                <a href='tenders.php?category=Agriculture' class='group block bg-white border border-gray-100 p-5 rounded-xl hover:shadow-lg transition-all'>
                    <div class='h-10 w-10 rounded-lg bg-green-50 text-green-700 flex items-center justify-center mb-4 font-bold text-lg'>A</div>
                    <h4 class='font-bold text-lg text-gray-800 group-hover:text-bid-dark'>Agriculture</h4>
                    <p class='text-sm text-gray-500 mt-2'>Explore new opportunities in Agriculture.</p>
                </a>
                
                <a href='tenders.php?category=Arts & Culture' class='group block bg-white border border-gray-100 p-5 rounded-xl hover:shadow-lg transition-all'>
                    <div class='h-10 w-10 rounded-lg bg-pink-50 text-pink-700 flex items-center justify-center mb-4 font-bold text-lg'>A</div>
                    <h4 class='font-bold text-lg text-gray-800 group-hover:text-bid-dark'>Arts & Culture</h4>
                    <p class='text-sm text-gray-500 mt-2'>Discover the latest tenders in Arts & Culture.</p>
                </a>
                
                <a href='tenders.php?category=Education' class='group block bg-white border border-gray-100 p-5 rounded-xl hover:shadow-lg transition-all'>
                    <div class='h-10 w-10 rounded-lg bg-yellow-50 text-yellow-700 flex items-center justify-center mb-4 font-bold text-lg'>E</div>
                    <h4 class='font-bold text-lg text-gray-800 group-hover:text-bid-dark'>Education</h4>
                    <p class='text-sm text-gray-500 mt-2'>Find top education sector tenders to bid on.</p>
                </a>
                
                <a href='tenders.php?category=Health' class='group block bg-white border border-gray-100 p-5 rounded-xl hover:shadow-lg transition-all'>
                    <div class='h-10 w-10 rounded-lg bg-red-50 text-red-700 flex items-center justify-center mb-4 font-bold text-lg'>H</div>
                    <h4 class='font-bold text-lg text-gray-800 group-hover:text-bid-dark'>Health</h4>
                    <p class='text-sm text-gray-500 mt-2'>Get access to current tenders in health.</p>
                </a>
                
                <a href='tenders.php?category=Social' class='group block bg-white border border-gray-100 p-5 rounded-xl hover:shadow-lg transition-all'>
                    <div class='h-10 w-10 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center mb-4 font-bold text-lg'>S</div>
                    <h4 class='font-bold text-lg text-gray-800 group-hover:text-bid-dark'>Social</h4>
                    <p class='text-sm text-gray-500 mt-2'>Check out the latest social tenders.</p>
                </a>
                
                <a href='tenders.php?category=Sports' class='group block bg-white border border-gray-100 p-5 rounded-xl hover:shadow-lg transition-all'>
                    <div class='h-10 w-10 rounded-lg bg-orange-50 text-orange-700 flex items-center justify-center mb-4 font-bold text-lg'>S</div>
                    <h4 class='font-bold text-lg text-gray-800 group-hover:text-bid-dark'>Sports</h4>
                    <p class='text-sm text-gray-500 mt-2'>Apply for the latest sports tenders.</p>
                </a>
                
                <a href='tenders.php?category=Housing' class='group block bg-white border border-gray-100 p-5 rounded-xl hover:shadow-lg transition-all'>
                    <div class='h-10 w-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center mb-4 font-bold text-lg'>H</div>
                    <h4 class='font-bold text-lg text-gray-800 group-hover:text-bid-dark'>Housing</h4>
                    <p class='text-sm text-gray-500 mt-2'>Browse housing & urban development tenders.</p>
                </a>
                
                <a href='tenders.php?category=Employment' class='group block bg-white border border-gray-100 p-5 rounded-xl hover:shadow-lg transition-all'>
                    <div class='h-10 w-10 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center mb-4 font-bold text-lg'>E</div>
                    <h4 class='font-bold text-lg text-gray-800 group-hover:text-bid-dark'>Employment</h4>
                    <p class='text-sm text-gray-500 mt-2'>New job market and employment tenders.</p>
                </a>
                        </div>
    </div>
</section>

<!-- Location/States Section with Clean Map-Like Grid -->
<section class="py-16 bg-bid-dark text-white">
    <div class="container mx-auto px-4">
        <div class="text-center mb-10">
            <h2 class="text-3xl font-bold">Tenders by State</h2>
            <p class="text-gray-400 mt-2">Find opportunities in your preferred location.</p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            
                <a href='tenders.php?state_text=Maharashtra' class='bg-gray-800/50 hover:bg-bid-green hover:text-bid-dark p-4 rounded-lg text-center transition-colors border border-gray-700 hover:border-bid-green group'>
                    <div class='font-semibold text-sm'>Maharashtra</div>
                </a>
                
                <a href='tenders.php?state_text=Rajasthan' class='bg-gray-800/50 hover:bg-bid-green hover:text-bid-dark p-4 rounded-lg text-center transition-colors border border-gray-700 hover:border-bid-green group'>
                    <div class='font-semibold text-sm'>Rajasthan</div>
                </a>
                
                <a href='tenders.php?state_text=Uttar Pradesh' class='bg-gray-800/50 hover:bg-bid-green hover:text-bid-dark p-4 rounded-lg text-center transition-colors border border-gray-700 hover:border-bid-green group'>
                    <div class='font-semibold text-sm'>Uttar Pradesh</div>
                </a>
                
                <a href='tenders.php?state_text=West Bengal' class='bg-gray-800/50 hover:bg-bid-green hover:text-bid-dark p-4 rounded-lg text-center transition-colors border border-gray-700 hover:border-bid-green group'>
                    <div class='font-semibold text-sm'>West Bengal</div>
                </a>
                
                <a href='tenders.php?state_text=Karnataka' class='bg-gray-800/50 hover:bg-bid-green hover:text-bid-dark p-4 rounded-lg text-center transition-colors border border-gray-700 hover:border-bid-green group'>
                    <div class='font-semibold text-sm'>Karnataka</div>
                </a>
                
                <a href='tenders.php?state_text=Tamil Nadu' class='bg-gray-800/50 hover:bg-bid-green hover:text-bid-dark p-4 rounded-lg text-center transition-colors border border-gray-700 hover:border-bid-green group'>
                    <div class='font-semibold text-sm'>Tamil Nadu</div>
                </a>
                
                <a href='tenders.php?state_text=Gujarat' class='bg-gray-800/50 hover:bg-bid-green hover:text-bid-dark p-4 rounded-lg text-center transition-colors border border-gray-700 hover:border-bid-green group'>
                    <div class='font-semibold text-sm'>Gujarat</div>
                </a>
                
                <a href='tenders.php?state_text=Madhya Pradesh' class='bg-gray-800/50 hover:bg-bid-green hover:text-bid-dark p-4 rounded-lg text-center transition-colors border border-gray-700 hover:border-bid-green group'>
                    <div class='font-semibold text-sm'>Madhya Pradesh</div>
                </a>
                
                <a href='tenders.php?state_text=Andhra Pradesh' class='bg-gray-800/50 hover:bg-bid-green hover:text-bid-dark p-4 rounded-lg text-center transition-colors border border-gray-700 hover:border-bid-green group'>
                    <div class='font-semibold text-sm'>Andhra Pradesh</div>
                </a>
                
                <a href='tenders.php?state_text=Delhi' class='bg-gray-800/50 hover:bg-bid-green hover:text-bid-dark p-4 rounded-lg text-center transition-colors border border-gray-700 hover:border-bid-green group'>
                    <div class='font-semibold text-sm'>Delhi</div>
                </a>
                
                <a href='tenders.php?state_text=Punjab' class='bg-gray-800/50 hover:bg-bid-green hover:text-bid-dark p-4 rounded-lg text-center transition-colors border border-gray-700 hover:border-bid-green group'>
                    <div class='font-semibold text-sm'>Punjab</div>
                </a>
                
                <a href='tenders.php?state_text=Haryana' class='bg-gray-800/50 hover:bg-bid-green hover:text-bid-dark p-4 rounded-lg text-center transition-colors border border-gray-700 hover:border-bid-green group'>
                    <div class='font-semibold text-sm'>Haryana</div>
                </a>
                        </div>
        
        <div class="text-center mt-10">
            <a href="tenders.php" class="inline-block border border-gray-600 hover:border-bid-green text-gray-300 hover:text-bid-green px-6 py-2 rounded-full transition-all">View All States</a>
        </div>
    </div>
</section>

<!-- Enhanced Footer -->
<footer class="bg-gray-900 text-white pt-16 pb-8 border-t border-gray-800">
    <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <!-- Brand -->
            <div>
                <img src="assets/logo.png" alt="BidAlert" class="h-8 bg-white rounded px-2 py-1 mb-6">
                <p class="text-gray-400 text-sm leading-relaxed mb-6">
                    India's most trusted tender information portal. We provide comprehensive details on government and private tenders across all states, helping you grow your business.
                </p>
            </div>
            
            <!-- Quick Links 1 -->
            <div>
                <h4 class="font-bold text-lg mb-6 text-white border-b border-gray-700 pb-2 inline-block">India Tenders</h4>
                <ul class="space-y-3 text-sm text-gray-400">
                    <li><a href="tenders.php" class="hover:text-bid-green transition">By State</a></li>
                    <li><a href="tenders.php" class="hover:text-bid-green transition">By Town/City</a></li>
                    <li><a href="tenders.php" class="hover:text-bid-green transition">By Department</a></li>
                    <li><a href="tenders.php" class="hover:text-bid-green transition">By Sector</a></li>
                    <li><a href="tenders.php" class="hover:text-bid-green transition">By IREPS</a></li>
                </ul>
            </div>
            
            <!-- Quick Links 2 -->
            <div>
                <h4 class="font-bold text-lg mb-6 text-white border-b border-gray-700 pb-2 inline-block">Company</h4>
                <ul class="space-y-3 text-sm text-gray-400">
                    <li><a href="#" class="hover:text-bid-green transition">About Us</a></li>
                    <li><a href="plans.php" class="hover:text-bid-green transition">Pricing</a></li>
                    <li><a href="contact.php" class="hover:text-bid-green transition">Contact Us</a></li>
                    <li><a href="#" class="hover:text-bid-green transition">Terms of Use</a></li>
                    <li><a href="#" class="hover:text-bid-green transition">Privacy Policy</a></li>
                </ul>
            </div>
            
            <!-- Contact -->
            <div>
                <h4 class="font-bold text-lg mb-6 text-white border-b border-gray-700 pb-2 inline-block">Contact Us</h4>
                <div class="text-sm text-gray-400 space-y-4">
                    <p class="flex items-start">
                        <svg class="w-5 h-5 text-bid-green mt-0.5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        <span>Ramannapet 1st Ln, Lakshmipuram, Naidupet, Guntur, Andhra Pradesh 522007</span>
                    </p>
                    <p class="flex items-center">
                        <svg class="w-5 h-5 text-bid-green mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                        <span>support@bidalert.in</span>
                    </p>
                </div>
            </div>
        </div>
        
        <div class="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
            <p>&copy; 2026 BidAlert. All rights reserved.</p>
            <div class="flex space-x-6 mt-4 md:mt-0">
                <a href="#" class="hover:text-white">Refund Policy</a>
                <a href="#" class="hover:text-white">Shipping Policy</a>
                <a href="#" class="hover:text-white">TOS</a>
            </div>
        </div>
    </div>
</footer>

<script>
    // Simple Tab Switcher Logic
    function switchCategory(cat) {
        // Hide all contents
        document.querySelectorAll('.category-content').forEach(el => el.classList.add('hidden'));
        // Show selected
        document.getElementById('content-' + cat).classList.remove('hidden');
        
        // Reset buttons
        const tabs = ['work', 'service', 'product'];
        tabs.forEach(t => {
            const btn = document.getElementById('tab-' + t);
            if(t === cat) {
                btn.classList.remove('bg-transparent', 'text-gray-500');
                btn.classList.add('bg-bid-dark', 'text-white');
            } else {
                btn.classList.add('bg-transparent', 'text-gray-500');
                btn.classList.remove('bg-bid-dark', 'text-white');
            }
        });
    }
</script>

</body>
</html>