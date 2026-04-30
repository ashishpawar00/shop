import React from 'react';
import {
  FiBarChart2,
  FiCpu,
  FiMessageCircle,
  FiShield,
  FiShoppingCart,
  FiTruck,
  FiUsers,
  FiZap
} from 'react-icons/fi';

export const HERO_COPY_CLEAN = {
  hi: {
    heroTitleTop: '\u092b\u0938\u0932 \u0915\u0940 \u0924\u0915\u0932\u0940\u092b \u091c\u0932\u094d\u0926\u0940 \u092a\u0915\u0921\u093c\u0947\u0902\u0964',
    heroTitleAccent: '\u092d\u0930\u094b\u0938\u0947 \u0938\u0947 \u0907\u0932\u093e\u091c \u0915\u0930\u0947\u0902\u0964',
    heroDescription: '\u092b\u0938\u0932 \u0915\u0940 \u091c\u093e\u0902\u091a, \u0935\u094d\u092f\u093e\u0935\u0939\u093e\u0930\u093f\u0915 \u0938\u0932\u093e\u0939, \u0914\u0930 \u092d\u0930\u094b\u0938\u0947\u092e\u0902\u0926 \u0915\u0943\u0937\u093f \u0909\u0924\u094d\u092a\u093e\u0926 \u2014 \u090f\u0915 \u091c\u0917\u0939\u0964',
    primaryCta: '\u092b\u0938\u0932 \u091c\u093e\u0902\u091a \u0936\u0941\u0930\u0942 \u0915\u0930\u0947\u0902',
    secondaryCta: '\u0909\u0924\u094d\u092a\u093e\u0926 \u0926\u0947\u0916\u0947\u0902',
    supportDesk: 'AI-\u0906\u0927\u093e\u0930\u093f\u0924 \u092b\u0938\u0932 \u091c\u093e\u0902\u091a\u0964 \u092d\u0930\u094b\u0938\u0947\u092e\u0902\u0926 \u0909\u0924\u094d\u092a\u093e\u0926 \u092e\u093e\u0930\u094d\u0917\u0926\u0930\u094d\u0936\u0928\u0964 \u0939\u0930 \u0916\u0947\u0924\u0940 \u0915\u0947 \u092b\u0948\u0938\u0932\u0947 \u0915\u0947 \u0932\u093f\u090f \u090f\u0915 \u092a\u094d\u0932\u0947\u091f\u092b\u0949\u0930\u094d\u092e\u0964'
  },
  en: {
    heroTitleTop: 'Catch crop stress early.',
    heroTitleAccent: 'Treat with confidence.',
    heroDescription: 'Crop diagnosis, practical guidance, and trusted agricultural products in one place.',
    primaryCta: 'Start crop diagnosis',
    secondaryCta: 'Browse products',
    supportDesk: 'AI-powered crop diagnosis. Trusted product guidance. One platform for every farm decision.'
  }
};

export const TRUST_STATS_CLEAN = {
  hi: [
    { value: 10000, suffix: '+', label: '\u0915\u093f\u0938\u093e\u0928\u094b\u0902 \u0915\u0940 \u0938\u0947\u0935\u093e' },
    { value: 25, suffix: '+', label: '\u0938\u093e\u0932\u094b\u0902 \u0915\u093e \u0905\u0928\u0941\u092d\u0935' },
    { value: 500, suffix: '+', label: '\u0909\u0924\u094d\u092a\u093e\u0926 \u0909\u092a\u0932\u092c\u094d\u0927' }
  ],
  en: [
    { value: 10000, suffix: '+', label: 'Farmers Served' },
    { value: 25, suffix: '+', label: 'Years of Expertise' },
    { value: 500, suffix: '+', label: 'Products Available' }
  ]
};

export const SERVICE_OUTCOMES_CLEAN = {
  hi: [
    '\u0915\u0908 \u0915\u093f\u0938\u093e\u0928 \u092b\u0902\u0917\u0932 \u0938\u092e\u0938\u094d\u092f\u093e \u0915\u0947 \u0938\u0902\u0915\u0947\u0924 \u0932\u0917\u092d\u0917 3 \u0926\u093f\u0928 \u092a\u0939\u0932\u0947 \u092a\u0915\u0921\u093c \u0932\u0947\u0924\u0947 \u0939\u0948\u0902\u0964',
    '\u0917\u0932\u0924 \u0926\u0935\u093e \u092f\u093e \u092e\u093e\u0924\u094d\u0930\u093e \u091a\u0941\u0928\u0928\u0947 \u0915\u0940 \u0938\u0902\u092d\u093e\u0935\u0928\u093e \u0915\u093e\u092b\u0940 \u0915\u092e \u0939\u094b \u091c\u093e\u0924\u0940 \u0939\u0948\u0964',
    '\u091c\u0930\u0942\u0930\u0924 \u0915\u0947 \u0939\u093f\u0938\u093e\u092c \u0938\u0947 \u0938\u0939\u0940 \u0907\u0928\u092a\u0941\u091f \u091c\u0932\u094d\u0926\u0940 \u091a\u0941\u0928\u0928\u093e \u0906\u0938\u093e\u0928 \u0939\u094b \u091c\u093e\u0924\u093e \u0939\u0948\u0964',
    'WhatsApp \u092a\u0930 \u0905\u0915\u094d\u0938\u0930 2 \u0918\u0902\u091f\u0947 \u0915\u0947 \u092d\u0940\u0924\u0930 \u091c\u0935\u093e\u092c \u092e\u093f\u0932 \u091c\u093e\u0924\u093e \u0939\u0948\u0964',
    '\u0926\u0941\u0915\u093e\u0928, \u0938\u0932\u093e\u0939 \u0914\u0930 \u0916\u0930\u0940\u0926 \u0915\u0947 \u092c\u0940\u091a \u092d\u091f\u0915\u093e\u0935 \u0915\u092e \u0939\u094b \u091c\u093e\u0924\u093e \u0939\u0948\u0964',
    '\u092e\u094c\u0938\u092e \u092c\u093f\u0917\u0921\u093c\u0928\u0947 \u0938\u0947 \u092a\u0939\u0932\u0947 \u0915\u0926\u092e \u0924\u092f \u0915\u0930\u0928\u093e \u0906\u0938\u093e\u0928 \u0939\u094b \u091c\u093e\u0924\u093e \u0939\u0948\u0964'
  ],
  en: [
    'Farmers catch fungal issues around 3 days earlier on average.',
    'Cuts down wrong treatment or dosage choices before they reach the field.',
    'Reduces wrong product purchases by up to 60% on repeat buying cycles.',
    'Get a response within 2 hours on WhatsApp for follow-up questions.',
    'Keeps store visits, advice, and buying decisions aligned in one flow.',
    'Helps farmers act before weather shifts make damage harder to contain.'
  ]
};

export const HOME_COPY_CLEAN = {
  hi: {
    metaTitle: '\u0932\u0915\u094d\u0937\u094d\u092e\u0940 \u0915\u0943\u0937\u093f \u0915\u0947\u0902\u0926\u094d\u0930 | \u092b\u0938\u0932 \u0938\u0939\u093e\u092f\u0924\u093e \u0914\u0930 \u092d\u0930\u094b\u0938\u0947\u092e\u0902\u0926 \u0915\u0943\u0937\u093f \u0909\u0924\u094d\u092a\u093e\u0926',
    metaDescription: 'AI \u092b\u0938\u0932 \u091c\u093e\u0902\u091a, \u0924\u0947\u091c \u0938\u0932\u093e\u0939 \u0914\u0930 \u092d\u0930\u094b\u0938\u0947\u092e\u0902\u0926 \u0915\u0943\u0937\u093f \u0909\u0924\u094d\u092a\u093e\u0926\u094b\u0902 \u0915\u0947 \u0932\u093f\u090f \u0932\u0915\u094d\u0937\u094d\u092e\u0940 \u0915\u0943\u0937\u093f \u0915\u0947\u0902\u0926\u094d\u0930 \u092a\u0930 \u0906\u090f\u0902\u0964',
    badge: '25+ \u0935\u0930\u094d\u0937\u094b\u0902 \u0938\u0947 \u0915\u093f\u0938\u093e\u0928\u094b\u0902 \u0915\u093e \u0938\u093e\u0925',
    heroTitleTop: '\u092b\u0938\u0932 \u0915\u0940 \u0924\u0915\u0932\u0940\u092b \u091c\u0932\u094d\u0926\u0940 \u092a\u0915\u0921\u093c\u0947\u0902\u0964',
    heroTitleAccent: '\u092d\u0930\u094b\u0938\u0947 \u0938\u0947 \u0907\u0932\u093e\u091c \u0915\u0930\u0947\u0902\u0964',
    heroDescription: '\u092b\u0938\u0932 \u0915\u0940 \u091c\u093e\u0902\u091a, \u0935\u094d\u092f\u093e\u0935\u0939\u093e\u0930\u093f\u0915 \u0938\u0932\u093e\u0939, \u0914\u0930 \u092d\u0930\u094b\u0938\u0947\u092e\u0902\u0926 \u0915\u0943\u0937\u093f \u0909\u0924\u094d\u092a\u093e\u0926 \u2014 \u090f\u0915 \u091c\u0917\u0939\u0964',
    primaryCta: '\u092b\u0938\u0932 \u091c\u093e\u0902\u091a \u0936\u0941\u0930\u0942 \u0915\u0930\u0947\u0902',
    secondaryCta: '\u0909\u0924\u094d\u092a\u093e\u0926 \u0926\u0947\u0916\u0947\u0902',
    metrics: [
      { value: '500+', label: '\u0915\u093f\u0938\u093e\u0928\u094b\u0902 \u0915\u093e \u092d\u0930\u094b\u0938\u093e' },
      { value: '24/7', label: '\u0924\u0947\u091c \u092b\u0949\u0932\u094b-\u0905\u092a' },
      { value: '25+', label: '\u0935\u0930\u094d\u0937\u094b\u0902 \u0915\u093e \u0905\u0928\u0941\u092d\u0935' }
    ],
    lanyardEyebrow: '\u092b\u093e\u0930\u094d\u092e \u0938\u092a\u094b\u0930\u094d\u091f \u0921\u0947\u0938\u094d\u0915',
    lanyardTitle: '\u0932\u0915\u094d\u0937\u094d\u092e\u0940 \u0915\u0943\u0937\u093f \u0915\u0947\u0902\u0926\u094d\u0930',
    lanyardRole: 'AI \u092b\u0938\u0932 \u0938\u0939\u093e\u092f\u0924\u093e \u0914\u0930 \u092d\u0930\u094b\u0938\u0947\u092e\u0902\u0926 \u0909\u0924\u094d\u092a\u093e\u0926 \u092e\u093e\u0930\u094d\u0917\u0926\u0930\u094d\u0936\u0928',
    lanyardNote: '\u0905\u0902\u0924\u093f\u092e 3D \u090f\u0938\u0947\u091f \u0906\u0928\u0947 \u0924\u0915 \u092f\u0939 \u0938\u094d\u0925\u093f\u0930 \u092a\u094d\u0932\u0947\u0938\u0939\u094b\u0932\u094d\u0921\u0930 \u0932\u0948\u0928\u092f\u093e\u0930\u094d\u0921 \u0926\u093f\u0916\u093e\u092f\u093e \u091c\u093e \u0930\u0939\u093e \u0939\u0948\u0964',
    quickHighlights: [
      { title: '\u0924\u0947\u091c \u0928\u093f\u0926\u093e\u0928', description: '\u092b\u0938\u0932 \u0915\u0940 \u092b\u094b\u091f\u094b \u0938\u0947 \u0936\u0941\u0930\u0941\u0906\u0924\u0940 \u0938\u0902\u0915\u0947\u0924 \u091c\u0932\u094d\u0926\u0940 \u0938\u092e\u091d\u0947\u0902\u0964', icon: <FiCpu /> },
      { title: '\u0938\u094d\u0925\u093e\u0928\u0940\u092f \u092e\u093e\u0930\u094d\u0917\u0926\u0930\u094d\u0936\u0928', description: '\u091c\u092e\u0940\u0928 \u0914\u0930 \u092e\u094c\u0938\u092e \u0915\u0947 \u0939\u093f\u0938\u093e\u092c \u0938\u0947 \u0915\u093e\u092e \u0915\u0940 \u0938\u0932\u093e\u0939\u0964', icon: <FiUsers /> },
      { title: '\u092d\u0930\u094b\u0938\u0947\u092e\u0902\u0926 \u0906\u092a\u0942\u0930\u094d\u0924\u093f', description: '\u091c\u0930\u0942\u0930\u0940 \u0909\u0924\u094d\u092a\u093e\u0926 \u0938\u0939\u0940 \u091a\u092f\u0928 \u0915\u0947 \u0938\u093e\u0925 \u091c\u0932\u094d\u0926\u0940 \u0909\u092a\u0932\u092c\u094d\u0927\u0964', icon: <FiTruck /> }
    ],
    servicesHeading: '\u0938\u0947\u0935\u093e\u090f\u0902 \u091c\u094b \u0938\u0932\u093e\u0939 \u0915\u094b \u0915\u093e\u0930\u094d\u0930\u0935\u093e\u0908 \u092e\u0947\u0902 \u092c\u0926\u0932\u0924\u0940 \u0939\u0948\u0902',
    servicesDescription: '\u0921\u093e\u092f\u0917\u094d\u0928\u094b\u0938\u093f\u0938, \u0938\u0932\u093e\u0939 \u0914\u0930 \u0909\u0924\u094d\u092a\u093e\u0926 \u091a\u092f\u0928 \u0915\u094b \u090f\u0915 \u0939\u0940 \u092b\u094d\u0932\u094b \u092e\u0947\u0902 \u091c\u094b\u0921\u093c\u0915\u0930 \u0915\u093f\u0938\u093e\u0928 \u0915\u092e \u0938\u092e\u092f \u092e\u0947\u0902 \u092c\u0947\u0939\u0924\u0930 \u0928\u093f\u0930\u094d\u0923\u092f \u0932\u0947 \u092a\u093e\u0924\u0947 \u0939\u0948\u0902\u0964',
    services: [
      {
        label: '\u0921\u093e\u092f\u0917\u094d\u0928\u094b\u0938\u093f\u0938',
        title: '\u092b\u094b\u091f\u094b \u0938\u0947 \u092b\u0938\u0932 \u091c\u093e\u0902\u091a',
        description: '\u092a\u0924\u094d\u0924\u094b\u0902, \u0924\u0928\u094b\u0902 \u0914\u0930 \u0926\u093f\u0916\u0928\u0947 \u0935\u093e\u0932\u0947 \u0924\u0928\u093e\u0935 \u0938\u0902\u0915\u0947\u0924\u094b\u0902 \u0915\u0940 \u091c\u0932\u094d\u0926\u0940 \u0938\u092e\u0940\u0915\u094d\u0937\u093e\u0964',
        footer: 'AI + \u0938\u094d\u0925\u093e\u0928\u0940\u092f \u0905\u0928\u0941\u092d\u0935',
        icon: <FiCpu />,
        accent: '34, 197, 94',
        featured: true
      },
      {
        label: '\u0938\u0932\u093e\u0939',
        title: '\u0938\u093e\u092b \u0905\u0917\u0932\u093e \u0915\u0926\u092e',
        description: '\u0909\u092a\u091a\u093e\u0930, \u0930\u094b\u0915\u0925\u093e\u092e \u0914\u0930 \u0909\u092a\u092f\u094b\u0917 \u0915\u0940 \u092e\u093e\u0924\u094d\u0930\u093e \u0915\u094b \u0938\u0930\u0932 \u0936\u092c\u094d\u0926\u094b\u0902 \u092e\u0947\u0902 \u0938\u092e\u091d\u0947\u0902\u0964',
        footer: '\u0938\u0930\u0932, \u0915\u093e\u092e \u0915\u0940 \u0938\u0932\u093e\u0939',
        icon: <FiShield />,
        accent: '34, 211, 238'
      },
      {
        label: '\u0909\u0924\u094d\u092a\u093e\u0926',
        title: '\u092d\u0930\u094b\u0938\u0947\u092e\u0902\u0926 \u0907\u0928\u092a\u0941\u091f \u091a\u092f\u0928',
        description: '\u0938\u0939\u0940 \u0909\u0930\u094d\u0935\u0930\u0915, \u0915\u0940\u091f\u0928\u093e\u0936\u0915 \u0914\u0930 \u092b\u0938\u0932 \u0938\u0941\u0930\u0915\u094d\u0937\u093e \u0909\u0924\u094d\u092a\u093e\u0926 \u091c\u0932\u094d\u0926\u0940 \u091a\u0941\u0928\u0947\u0902\u0964',
        footer: '\u0938\u094d\u091f\u094b\u0930 \u0926\u094d\u0935\u093e\u0930\u093e \u0938\u092e\u0930\u094d\u0925\u093f\u0924',
        icon: <FiShoppingCart />,
        accent: '16, 185, 129'
      },
      {
        label: '\u0938\u092a\u094b\u0930\u094d\u091f',
        title: 'WhatsApp \u0914\u0930 \u0915\u0949\u0932 \u092b\u0949\u0932\u094b-\u0905\u092a',
        description: '\u091c\u0930\u0942\u0930\u0924 \u092a\u0921\u093c\u0928\u0947 \u092a\u0930 \u091f\u0940\u092e \u0938\u0947 \u0938\u0940\u0927\u0947 \u091c\u0941\u0921\u093c\u0947\u0902 \u0914\u0930 \u091c\u0932\u094d\u0926\u0940 \u092a\u0941\u0937\u094d\u091f\u093f \u0932\u0947\u0902\u0964',
        footer: '\u092e\u094b\u092c\u093e\u0907\u0932 \u0915\u0947 \u0932\u093f\u090f \u0906\u0938\u093e\u0928',
        icon: <FiMessageCircle />,
        accent: '14, 165, 233'
      },
      {
        label: '\u092a\u094d\u0930\u092d\u093e\u0935',
        title: '\u0915\u092e \u092d\u091f\u0915\u093e\u0935, \u092c\u0947\u0939\u0924\u0930 \u0928\u093f\u0930\u094d\u0923\u092f',
        description: '\u0928\u093f\u0926\u093e\u0928, \u0938\u0932\u093e\u0939 \u0914\u0930 \u0909\u0924\u094d\u092a\u093e\u0926 \u0916\u094b\u091c \u0915\u0947 \u092c\u0940\u091a \u0909\u0932\u091d\u0928 \u0915\u092e \u0915\u0930\u0947\u0902\u0964',
        footer: '\u0905\u0938\u0932\u0940 farm workflow \u0915\u0947 \u0932\u093f\u090f',
        icon: <FiBarChart2 />,
        accent: '250, 204, 21'
      },
      {
        label: '\u0930\u093f\u0938\u094d\u092a\u0949\u0928\u094d\u0938',
        title: '\u0938\u094d\u0925\u093f\u0924\u093f \u092c\u093f\u0917\u0921\u093c\u0928\u0947 \u0938\u0947 \u092a\u0939\u0932\u0947 \u0915\u093e\u0930\u094d\u0930\u0935\u093e\u0908',
        description: '\u092e\u094c\u0938\u092e \u0914\u0930 \u092b\u0938\u0932 \u0924\u0928\u093e\u0935 \u0938\u0902\u092d\u093e\u0932\u0928\u0947 \u0932\u093e\u092f\u0915 \u0930\u0939\u0924\u0947 \u0939\u0941\u090f \u091c\u0932\u094d\u0926\u0940 \u0915\u0926\u092e \u0909\u0920\u093e\u090f\u0902\u0964',
        footer: '\u0938\u092e\u092f \u0909\u092a\u091c \u092c\u091a\u093e\u0924\u093e \u0939\u0948',
        icon: <FiZap />,
        accent: '249, 115, 22'
      }
    ],
    processEyebrow: '\u0915\u0948\u0938\u0947 \u0915\u093e\u092e \u0915\u0930\u0924\u093e \u0939\u0948',
    processTitle: '\u092b\u094b\u091f\u094b \u0938\u0947 \u0938\u092e\u093e\u0927\u093e\u0928 \u0924\u0915 \u090f\u0915 \u0906\u0938\u093e\u0928 \u092f\u093e\u0924\u094d\u0930\u093e',
    processDescription: '\u0915\u092e \u0915\u094d\u0932\u093f\u0915, \u0938\u093e\u092b \u0926\u093f\u0936\u093e \u0914\u0930 \u0924\u0941\u0930\u0902\u0924 \u0915\u093e\u092e \u0906\u0928\u0947 \u0935\u093e\u0932\u0940 \u0938\u0932\u093e\u0939\u0964',
    processSteps: [
      { step: '01', title: '\u092b\u0938\u0932 \u0915\u0940 \u092b\u094b\u091f\u094b \u0905\u092a\u0932\u094b\u0921 \u0915\u0930\u0947\u0902', description: '\u092a\u094d\u0930\u092d\u093e\u0935\u093f\u0924 \u092a\u0924\u094d\u0924\u0940, \u0924\u0928\u093e \u092f\u093e \u0926\u093f\u0916\u0928\u0947 \u0935\u093e\u0932\u0940 \u0938\u092e\u0938\u094d\u092f\u093e \u0915\u0940 \u0938\u093e\u092b \u0924\u0938\u094d\u0935\u0940\u0930 \u0932\u0947\u0902\u0964' },
      { step: '02', title: '\u0938\u093f\u0938\u094d\u091f\u092e \u0938\u0947 \u0936\u0941\u0930\u0941\u0906\u0924\u0940 \u0938\u092e\u0940\u0915\u094d\u0937\u093e \u0932\u0947\u0902', description: '\u0938\u0902\u092d\u093e\u0935\u093f\u0924 \u0930\u094b\u0917 \u0938\u0902\u0915\u0947\u0924, \u0917\u0902\u092d\u0940\u0930\u0924\u093e \u0914\u0930 \u0905\u0917\u0932\u093e \u0915\u0926\u092e \u091c\u0932\u094d\u0926\u0940 \u0938\u093e\u092e\u0928\u0947 \u0906\u0924\u093e \u0939\u0948\u0964' },
      { step: '03', title: '\u0938\u0939\u0940 \u0909\u0924\u094d\u092a\u093e\u0926 \u0914\u0930 \u0938\u0932\u093e\u0939 \u091a\u0941\u0928\u0947\u0902', description: '\u0909\u092a\u091a\u093e\u0930, \u0909\u092a\u092f\u094b\u0917 \u092e\u093e\u0924\u094d\u0930\u093e \u0914\u0930 \u0916\u0930\u0940\u0926 \u0915\u0947 \u0932\u093f\u090f \u0938\u093e\u092b \u0926\u093f\u0936\u093e \u092a\u093e\u090f\u0902\u0964' }
    ],
    featuredTitle: '\u092b\u093e\u0930\u094d\u092e \u0915\u0947 \u0932\u093f\u090f \u091a\u0941\u0928\u0947 \u0939\u0941\u090f \u0909\u0924\u094d\u092a\u093e\u0926',
    featuredDescription: '\u0905\u0917\u0930 \u092c\u0948\u0915\u090f\u0902\u0921 \u0909\u092a\u0932\u092c\u094d\u0927 \u0928 \u092d\u0940 \u0939\u094b, \u0924\u092c \u092d\u0940 \u092f\u0939 \u0938\u0947\u0915\u094d\u0936\u0928 \u0909\u092a\u092f\u094b\u0917\u0940 \u0921\u0947\u092e\u094b \u0909\u0924\u094d\u092a\u093e\u0926\u094b\u0902 \u0915\u0947 \u0938\u093e\u0925 \u0915\u093e\u092e \u0915\u0930\u0924\u093e \u0930\u0939\u0947\u0917\u093e\u0964',
    productsCta: '\u0938\u092d\u0940 \u0909\u0924\u094d\u092a\u093e\u0926 \u0926\u0947\u0916\u0947\u0902',
    addLabel: '\u091c\u094b\u0921\u093c\u0947\u0902',
    addedLabel: '\u091c\u0941\u0921\u093c \u0917\u092f\u093e',
    featuredFallback: [
      {
        id: 'bio-guard',
        name: 'Bio Guard Mix',
        nameHindi: '\u092c\u093e\u092f\u094b \u0917\u093e\u0930\u094d\u0921 \u092e\u093f\u0915\u094d\u0938',
        price: 480,
        categoryLabel: '\u092b\u0938\u0932 \u0938\u0941\u0930\u0915\u094d\u0937\u093e',
        description: 'Leaf and stem protection blend for regular disease pressure.',
        descriptionHindi: '\u0928\u093f\u092f\u092e\u093f\u0924 \u0930\u094b\u0917 \u0926\u092c\u093e\u0935 \u0915\u0947 \u0932\u093f\u090f \u092a\u0924\u094d\u0924\u0940 \u0914\u0930 \u0924\u0928\u093e \u0938\u0941\u0930\u0915\u094d\u0937\u093e \u092e\u093f\u0936\u094d\u0930\u0923\u0964'
      },
      {
        id: 'yield-plus',
        name: 'Yield Plus',
        nameHindi: '\u092f\u0940\u0932\u094d\u0921 \u092a\u094d\u0932\u0938',
        price: 640,
        categoryLabel: '\u0909\u0924\u094d\u092a\u093e\u0926\u0928 \u0938\u0939\u093e\u092f\u0924\u093e',
        description: 'Balanced nutrition support for stronger crop response.',
        descriptionHindi: '\u092c\u0947\u0939\u0924\u0930 \u092b\u0938\u0932 \u092a\u094d\u0930\u0924\u093f\u0915\u094d\u0930\u093f\u092f\u093e \u0915\u0947 \u0932\u093f\u090f \u0938\u0902\u0924\u0941\u0932\u093f\u0924 \u092a\u094b\u0937\u0923 \u0938\u092e\u0930\u094d\u0925\u0928\u0964'
      },
      {
        id: 'root-active',
        name: 'Root Active',
        nameHindi: '\u0930\u0942\u091f \u090f\u0915\u094d\u091f\u093f\u0935',
        price: 520,
        categoryLabel: '\u091c\u0921\u093c \u0935\u093f\u0915\u093e\u0938',
        description: 'Improves root vigor during early and mid growth stages.',
        descriptionHindi: '\u0936\u0941\u0930\u0941\u0906\u0924\u0940 \u0914\u0930 \u092e\u0927\u094d\u092f \u0935\u0943\u0926\u094d\u0927\u093f \u091a\u0930\u0923\u094b\u0902 \u092e\u0947\u0902 \u091c\u0921\u093c\u094b\u0902 \u0915\u094b \u092e\u091c\u092c\u0942\u0924 \u0915\u0930\u0924\u093e \u0939\u0948\u0964'
      },
      {
        id: 'pest-shield',
        name: 'Pest Shield',
        nameHindi: '\u092a\u0947\u0938\u094d\u091f \u0936\u0940\u0932\u094d\u0921',
        price: 710,
        categoryLabel: '\u0915\u0940\u091f \u0928\u093f\u092f\u0902\u0924\u094d\u0930\u0923',
        description: 'Rapid-action protection for visible pest pressure in the field.',
        descriptionHindi: '\u0916\u0947\u0924 \u092e\u0947\u0902 \u0926\u093f\u0916 \u0930\u0939\u0947 \u0915\u0940\u091f \u0926\u092c\u093e\u0935 \u0915\u0947 \u0932\u093f\u090f \u0924\u0947\u091c \u0905\u0938\u0930 \u0935\u093e\u0932\u0940 \u0938\u0941\u0930\u0915\u094d\u0937\u093e\u0964'
      }
    ],
    ctaTitle: '\u0905\u092a\u0928\u0940 \u0905\u0917\u0932\u0940 \u092b\u0938\u0932 \u091c\u093e\u0902\u091a \u0906\u091c \u0939\u0940 \u0936\u0941\u0930\u0942 \u0915\u0930\u0947\u0902',
    ctaDescription: '\u090f\u0915 \u092b\u094b\u091f\u094b, \u0938\u0939\u0940 \u0938\u0932\u093e\u0939 \u0914\u0930 \u092d\u0930\u094b\u0938\u0947\u092e\u0902\u0926 \u0909\u0924\u094d\u092a\u093e\u0926 \u091a\u092f\u0928 \u0938\u0947 \u0916\u0947\u0924 \u0915\u093e \u0928\u093f\u0930\u094d\u0923\u092f \u091a\u0915\u094d\u0930 \u091b\u094b\u091f\u093e \u0939\u094b \u091c\u093e\u0924\u093e \u0939\u0948\u0964',
    ctaPrimary: '\u0935\u094d\u0939\u093e\u091f\u094d\u0938\u0910\u092a \u092a\u0930 \u092c\u093e\u0924 \u0915\u0930\u0947\u0902',
    ctaSecondary: '\u0915\u0949\u0932 \u0915\u0930\u0947\u0902'
  },
  en: {
    metaTitle: 'Laxmi Krashi Kendra | Crop support and trusted farm inputs',
    metaDescription: 'Use AI crop checks, quick guidance, and dependable farm products from Laxmi Krashi Kendra.',
    badge: '25+ years helping farmers move faster',
    heroTitleTop: 'Catch crop stress early.',
    heroTitleAccent: 'Treat with confidence.',
    heroDescription:
      'Crop diagnosis, practical guidance, and trusted agricultural products in one place. Laxmi Krashi Kendra keeps the next step clear and fast.',
    primaryCta: 'Start crop diagnosis',
    secondaryCta: 'Browse products',
    metrics: [
      { value: '500+', label: 'Farmers supported' },
      { value: '24/7', label: 'Quick follow-up' },
      { value: '25+', label: 'Years of trust' }
    ],
    lanyardEyebrow: 'Farm support desk',
    lanyardTitle: 'Laxmi Krashi Kendra',
    lanyardRole: 'AI crop care and dependable product guidance',
    lanyardNote: 'Stable placeholder lanyard until the final 3D assets are available.',
    quickHighlights: [
      { title: 'Fast diagnosis', description: 'Spot likely crop issues from a simple field photo.', icon: <FiCpu /> },
      { title: 'Grounded guidance', description: 'Advice tuned to local growing conditions and timing.', icon: <FiUsers /> },
      { title: 'Reliable fulfillment', description: 'Get the right input choices without chasing multiple stores.', icon: <FiTruck /> }
    ],
    servicesHeading: 'Services that turn insight into action',
    servicesDescription:
      'Diagnosis, guidance, and product selection are connected into one clear flow for faster farm decisions.',
    services: [
      {
        label: 'Diagnosis',
        title: 'Photo-based crop checks',
        description: 'Review leaves, stems, and visible stress markers in seconds.',
        footer: 'AI + local farm context',
        icon: <FiCpu />,
        accent: '34, 197, 94',
        featured: true
      },
      {
        label: 'Guidance',
        title: 'Clear next actions',
        description: 'Understand treatment, prevention, and application choices quickly.',
        footer: 'Simple, practical advice',
        icon: <FiShield />,
        accent: '34, 211, 238'
      },
      {
        label: 'Products',
        title: 'Trusted input selection',
        description: 'Choose the right fertilizers, pesticides, and protective treatments.',
        footer: 'Backed by the store',
        icon: <FiShoppingCart />,
        accent: '16, 185, 129'
      },
      {
        label: 'Support',
        title: 'WhatsApp and call follow-up',
        description: 'Reach the team directly when you need confirmation or fast help.',
        footer: 'Built for mobile use',
        icon: <FiMessageCircle />,
        accent: '14, 165, 233'
      },
      {
        label: 'Impact',
        title: 'Less drift, better decisions',
        description: 'Reduce the back-and-forth between advice, diagnosis, and product search.',
        footer: 'Made for real farm workflows',
        icon: <FiBarChart2 />,
        accent: '250, 204, 21'
      },
      {
        label: 'Response',
        title: 'Act before conditions worsen',
        description: 'Move early while weather and crop stress are still manageable.',
        footer: 'Time protects yield',
        icon: <FiZap />,
        accent: '249, 115, 22'
      }
    ],
    processEyebrow: 'How it works',
    processTitle: 'A simple path from photo to action',
    processDescription: 'Fewer steps, clearer direction, and treatment guidance farmers can actually use.',
    processSteps: [
      { step: '01', title: 'Upload a crop photo', description: 'Take a clear picture of the affected leaf, stem, or visible issue.' },
      { step: '02', title: 'Let the system review it', description: 'Likely disease signals, urgency, and recommended next steps appear quickly.' },
      { step: '03', title: 'Choose the right treatment', description: 'Move straight into product guidance and follow-up support.' }
    ],
    featuredTitle: 'Featured products for the next field decision',
    featuredDescription: 'If the backend is unavailable, this section still stays useful by falling back to curated demo products.',
    productsCta: 'See all products',
    addLabel: 'Add',
    addedLabel: 'Added',
    featuredFallback: [
      {
        id: 'bio-guard',
        name: 'Bio Guard Mix',
        nameHindi: '\u092c\u093e\u092f\u094b \u0917\u093e\u0930\u094d\u0921 \u092e\u093f\u0915\u094d\u0938',
        price: 480,
        categoryLabel: 'Crop care',
        description: 'Leaf and stem protection blend for regular disease pressure.',
        descriptionHindi: '\u0928\u093f\u092f\u092e\u093f\u0924 \u0930\u094b\u0917 \u0926\u092c\u093e\u0935 \u0915\u0947 \u0932\u093f\u090f \u092a\u0924\u094d\u0924\u0940 \u0914\u0930 \u0924\u0928\u093e \u0938\u0941\u0930\u0915\u094d\u0937\u093e \u092e\u093f\u0936\u094d\u0930\u0923\u0964'
      },
      {
        id: 'yield-plus',
        name: 'Yield Plus',
        nameHindi: '\u092f\u0940\u0932\u094d\u0921 \u092a\u094d\u0932\u0938',
        price: 640,
        categoryLabel: 'Yield support',
        description: 'Balanced nutrition support for stronger crop response.',
        descriptionHindi: '\u092c\u0947\u0939\u0924\u0930 \u092b\u0938\u0932 \u092a\u094d\u0930\u0924\u093f\u0915\u094d\u0930\u093f\u092f\u093e \u0915\u0947 \u0932\u093f\u090f \u0938\u0902\u0924\u0941\u0932\u093f\u0924 \u092a\u094b\u0937\u0923 \u0938\u092e\u0930\u094d\u0925\u0928\u0964'
      },
      {
        id: 'root-active',
        name: 'Root Active',
        nameHindi: '\u0930\u0942\u091f \u090f\u0915\u094d\u091f\u093f\u0935',
        price: 520,
        categoryLabel: 'Root health',
        description: 'Improves root vigor during early and mid growth stages.',
        descriptionHindi: '\u0936\u0941\u0930\u0941\u0906\u0924\u0940 \u0914\u0930 \u092e\u0927\u094d\u092f \u0935\u0943\u0926\u094d\u0927\u093f \u091a\u0930\u0923\u094b\u0902 \u092e\u0947\u0902 \u091c\u0921\u093c\u094b\u0902 \u0915\u094b \u092e\u091c\u092c\u0942\u0924 \u0915\u0930\u0924\u093e \u0939\u0948\u0964'
      },
      {
        id: 'pest-shield',
        name: 'Pest Shield',
        nameHindi: '\u092a\u0947\u0938\u094d\u091f \u0936\u0940\u0932\u094d\u0921',
        price: 710,
        categoryLabel: 'Pest control',
        description: 'Rapid-action protection for visible pest pressure in the field.',
        descriptionHindi: '\u0916\u0947\u0924 \u092e\u0947\u0902 \u0926\u093f\u0916 \u0930\u0939\u0947 \u0915\u0940\u091f \u0926\u092c\u093e\u0935 \u0915\u0947 \u0932\u093f\u090f \u0924\u0947\u091c \u0905\u0938\u0930 \u0935\u093e\u0932\u0940 \u0938\u0941\u0930\u0915\u094d\u0937\u093e\u0964'
      }
    ],
    ctaTitle: 'Start the next crop check today',
    ctaDescription:
      'One photo, clearer advice, and a dependable product path can shorten the decision cycle on the farm.',
    ctaPrimary: 'Chat on WhatsApp',
    ctaSecondary: 'Call now'
  }
};
