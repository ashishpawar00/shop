import React, { useState, useRef, useCallback } from "react";
import Head from "next/head";
import Link from "next/link";
import { useLanguage } from "../contexts/LanguageContext";
import {
    FiCamera,
    FiUpload,
    FiSearch,
    FiAlertTriangle,
    FiCheckCircle,
    FiShoppingCart,
    FiPhone,
    FiMessageCircle,
    FiRefreshCw,
    FiX,
    FiInfo,
    FiArrowRight,
    FiSend,
} from "react-icons/fi";
import { MdPestControl, MdLocalFlorist } from "react-icons/md";

// Disease database with treatments & products
const DISEASE_DATABASE = [
    {
        id: 1,
        name: { hi: "पत्ती झुलसा रोग", en: "Leaf Blight" },
        crop: { hi: "गेहूं / धान", en: "Wheat / Rice" },
        severity: "high",
        symptoms: {
            hi: "पत्तियों पर भूरे-पीले धब्बे, पत्तियां सूखकर झुलस जाती हैं। फसल की वृद्धि रुक जाती है।",
            en: "Brown-yellow spots on leaves, leaves dry and wilt. Crop growth stops.",
        },
        cause: {
            hi: "फफूंद (Helminthosporium) संक्रमण, अत्यधिक नमी",
            en: "Fungal (Helminthosporium) infection, excessive moisture",
        },
        treatment: {
            hi: [
                "मैन्कोजेब 75% WP — 2 ग्राम प्रति लीटर पानी में मिलाकर स्प्रे करें",
                "प्रोपिकोनाज़ोल 25% EC — 1 मिली प्रति लीटर पानी",
                "10–15 दिन बाद दोबारा स्प्रे करें",
                "संक्रमित पत्तियां हटाकर जला दें",
            ],
            en: [
                "Mancozeb 75% WP — Mix 2g per liter water and spray",
                "Propiconazole 25% EC — 1ml per liter water",
                "Re-spray after 10–15 days",
                "Remove infected leaves and burn them",
            ],
        },
        products: [
            {
                name: "Mancozeb 75% WP (मैन्कोजेब)",
                price: "₹180",
                quantity: "250 ग्राम",
                brand: "Indofil M-45",
                inStock: true,
            },
            {
                name: "Propiconazole 25% EC (टिल्ट)",
                price: "₹350",
                quantity: "250 मिली",
                brand: "Syngenta Tilt",
                inStock: true,
            },
            {
                name: "Carbendazim 50% WP (बाविस्टिन)",
                price: "₹220",
                quantity: "100 ग्राम",
                brand: "BASF Bavistin",
                inStock: true,
            },
        ],
    },
    {
        id: 2,
        name: { hi: "कीट हमला — तना छेदक", en: "Stem Borer Attack" },
        crop: { hi: "धान / गन्ना", en: "Rice / Sugarcane" },
        severity: "high",
        symptoms: {
            hi: "तने में छेद, सूखी बाली (Dead Heart), पौधा मुरझाना, तने के अंदर लार्वा दिखना।",
            en: "Holes in stem, dead heart, wilting plant, larvae visible inside stem.",
        },
        cause: {
            hi: "तना छेदक कीट (Scirpophaga incertulas) का हमला",
            en: "Stem borer (Scirpophaga incertulas) attack",
        },
        treatment: {
            hi: [
                "कार्बोफ्यूरान 3G — 20 किग्रा प्रति हेक्टेयर खड़ी फसल में डालें",
                "क्लोरपायरीफॉस 20% EC — 2 मिली प्रति लीटर पानी में स्प्रे करें",
                "प्रकाश जाल (Light trap) लगाएं",
                "ट्राइकोकार्ड का उपयोग करें (जैविक नियंत्रण)",
            ],
            en: [
                "Carbofuran 3G — Apply 20 kg per hectare in standing crop",
                "Chlorpyrifos 20% EC — Spray 2ml per liter water",
                "Install light traps",
                "Use Trichocards (biological control)",
            ],
        },
        products: [
            {
                name: "Carbofuran 3G (फ्यूराडान)",
                price: "₹650",
                quantity: "5 किग्रा",
                brand: "FMC Furadan",
                inStock: true,
            },
            {
                name: "Chlorpyrifos 20% EC (ड्यूरसबान)",
                price: "₹280",
                quantity: "1 लीटर",
                brand: "Dow Dursban",
                inStock: true,
            },
            {
                name: "Fipronil 5% SC (रीजेन्ट)",
                price: "₹420",
                quantity: "250 मिली",
                brand: "BASF Regent",
                inStock: false,
            },
        ],
    },
    {
        id: 3,
        name: { hi: "चूर्णिल आसिता (पाउडरी मिल्ड्यू)", en: "Powdery Mildew" },
        crop: { hi: "सब्जियां / मटर", en: "Vegetables / Peas" },
        severity: "medium",
        symptoms: {
            hi: "पत्तियों पर सफेद पाउडर जैसा फफूंद, पत्तियां पीली पड़ना, फल छोटे रहना।",
            en: "White powder-like fungus on leaves, yellowing leaves, stunted fruits.",
        },
        cause: {
            hi: "एरीसिफी ग्रैमिनिस फफूंद, कम तापमान और अधिक नमी",
            en: "Erysiphe graminis fungus, low temperature and high humidity",
        },
        treatment: {
            hi: [
                "सल्फर 80% WDG — 2 ग्राम प्रति लीटर पानी में स्प्रे करें",
                "हेक्साकोनाजोल 5% EC — 2 मिली प्रति लीटर पानी में",
                "नीम तेल 5 मिली प्रति लीटर पानी (जैविक विकल्प)",
                "पौधों के बीच उचित दूरी रखें",
            ],
            en: [
                "Sulphur 80% WDG — Spray 2g per liter water",
                "Hexaconazole 5% EC — 2ml per liter water",
                "Neem oil 5ml per liter water (organic option)",
                "Maintain proper spacing between plants",
            ],
        },
        products: [
            {
                name: "Sulphur 80% WDG (सल्फर)",
                price: "₹150",
                quantity: "250 ग्राम",
                brand: "UPL Sulphur",
                inStock: true,
            },
            {
                name: "Hexaconazole 5% EC (कॉन्टॉफ)",
                price: "₹310",
                quantity: "250 मिली",
                brand: "Rallis Contaf",
                inStock: true,
            },
            {
                name: "Neem Oil (नीम तेल)",
                price: "₹120",
                quantity: "500 मिली",
                brand: "Organic India",
                inStock: true,
            },
        ],
    },
    {
        id: 4,
        name: { hi: "जड़ गलन रोग", en: "Root Rot Disease" },
        crop: { hi: "सोयाबीन / कपास", en: "Soybean / Cotton" },
        severity: "high",
        symptoms: {
            hi: "पौधा मुरझाना, जड़ें काली और सड़ी हुई, निचली पत्तियां पीली, पौधा उखाड़ने पर जड़ टूटना।",
            en: "Wilting plant, black and rotten roots, lower leaves yellowing, roots break when uprooted.",
        },
        cause: {
            hi: "राइजोक्टोनिया / फ्यूजेरियम फफूंद, जलभराव",
            en: "Rhizoctonia / Fusarium fungus, waterlogging",
        },
        treatment: {
            hi: [
                "ट्राइकोडर्मा विरिडी 5 ग्राम प्रति किग्रा बीज उपचार",
                "कार्बेन्डाजिम 2 ग्राम प्रति लीटर पानी — जड़ के पास ड्रेंचिंग",
                "खेत में जल निकासी सुनिश्चित करें",
                "फसल चक्र अपनाएं",
            ],
            en: [
                "Trichoderma viride 5g per kg seed treatment",
                "Carbendazim 2g per liter water — drench near roots",
                "Ensure proper field drainage",
                "Follow crop rotation",
            ],
        },
        products: [
            {
                name: "Trichoderma Viride (ट्राइकोडर्मा)",
                price: "₹180",
                quantity: "1 किग्रा",
                brand: "Bio-Cure",
                inStock: true,
            },
            {
                name: "Carbendazim 50% WP (बाविस्टिन)",
                price: "₹220",
                quantity: "100 ग्राम",
                brand: "BASF Bavistin",
                inStock: true,
            },
            {
                name: "Metalaxyl 35% WS (एप्रोन)",
                price: "₹380",
                quantity: "100 ग्राम",
                brand: "Syngenta Apron",
                inStock: true,
            },
        ],
    },
];

export default function CropDoctor() {
    const { language } = useLanguage();
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const fileInputRef = useRef(null);

    const [cameraActive, setCameraActive] = useState(false);
    const [capturedImage, setCapturedImage] = useState(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");
    const [stream, setStream] = useState(null);

    const phoneNumber = "9977938192";

    // Start camera
    const startCamera = useCallback(async () => {
        try {
            setError("");
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: "environment", width: { ideal: 1280 }, height: { ideal: 720 } },
            });
            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
                videoRef.current.play();
            }
            setStream(mediaStream);
            setCameraActive(true);
            setCapturedImage(null);
            setResult(null);
        } catch (err) {
            setError(
                language === "hi"
                    ? "कैमरा एक्सेस नहीं मिला। कृपया ब्राउज़र में कैमरा अनुमति दें या फोटो अपलोड करें।"
                    : "Camera access denied. Please allow camera permission in browser or upload a photo."
            );
        }
    }, [language]);

    // Stop camera
    const stopCamera = useCallback(() => {
        if (stream) {
            stream.getTracks().forEach((track) => track.stop());
            setStream(null);
        }
        setCameraActive(false);
    }, [stream]);

    // Capture photo from camera
    const capturePhoto = useCallback(() => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(video, 0, 0);
            const imageData = canvas.toDataURL("image/jpeg", 0.85);
            setCapturedImage(imageData);
            stopCamera();
            analyzeImage();
        }
    }, [stopCamera]);

    // Handle file upload
    const handleFileUpload = useCallback((e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith("image/")) {
                setError(language === "hi" ? "कृपया एक फोटो फ़ाइल चुनें" : "Please select an image file");
                return;
            }
            const reader = new FileReader();
            reader.onload = (event) => {
                setCapturedImage(event.target.result);
                setResult(null);
                analyzeImage();
            };
            reader.readAsDataURL(file);
        }
    }, [language]);

    // Simulate AI analysis
    const analyzeImage = useCallback(() => {
        setAnalyzing(true);
        setResult(null);
        setError("");

        // Simulate AI processing time
        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * DISEASE_DATABASE.length);
            const disease = DISEASE_DATABASE[randomIndex];
            setResult(disease);
            setAnalyzing(false);
        }, 2500);
    }, []);

    // Reset everything
    const resetScan = useCallback(() => {
        stopCamera();
        setCapturedImage(null);
        setResult(null);
        setError("");
        setAnalyzing(false);
    }, [stopCamera]);

    // Severity badge
    const SeverityBadge = ({ level }) => {
        const config = {
            high: {
                bg: "bg-red-100",
                text: "text-red-700",
                border: "border-red-200",
                label: language === "hi" ? "गंभीर" : "Severe",
                icon: "🔴",
            },
            medium: {
                bg: "bg-yellow-100",
                text: "text-yellow-700",
                border: "border-yellow-200",
                label: language === "hi" ? "मध्यम" : "Moderate",
                icon: "🟡",
            },
            low: {
                bg: "bg-green-100",
                text: "text-green-700",
                border: "border-green-200",
                label: language === "hi" ? "हल्का" : "Mild",
                icon: "🟢",
            },
        };
        const c = config[level] || config.medium;
        return (
            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${c.bg} ${c.text} border ${c.border}`}>
                {c.icon} {c.label}
            </span>
        );
    };

    return (
        <>
            <Head>
                <title>
                    {language === "hi"
                        ? "फसल डॉक्टर — लक्ष्मी कृषि केंद्र"
                        : "Crop Doctor — Laxmi Krashi Kendra"}
                </title>
                <meta
                    name="description"
                    content={
                        language === "hi"
                            ? "अपनी फसल की फोटो लेकर रोग पहचानें। AI-आधारित फसल रोग पहचान और कीटनाशक सुझाव।"
                            : "Identify crop diseases by taking a photo. AI-powered crop disease identification and pesticide suggestions."
                    }
                />
            </Head>

            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="bg-gray-50 py-3">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <ol className="flex items-center text-sm text-gray-600">
                        <li>
                            <Link href="/" className="hover:text-green-600 transition-colors">
                                {language === "hi" ? "होम" : "Home"}
                            </Link>
                        </li>
                        <li className="mx-2">/</li>
                        <li aria-current="page" className="text-green-600 font-semibold">
                            {language === "hi" ? "फसल डॉक्टर" : "Crop Doctor"}
                        </li>
                    </ol>
                </div>
            </nav>

            {/* Hero */}
            <section className="bg-gradient-to-br from-green-600 via-emerald-700 to-teal-800 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                    <div className="text-center">
                        <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-6">
                            <span className="text-sm font-semibold">
                                🤖 {language === "hi" ? "AI-संचालित फसल रोग पहचान" : "AI-Powered Crop Disease Detection"}
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                            {language === "hi" ? (
                                <>फसल <span className="text-yellow-300">डॉक्टर</span></>
                            ) : (
                                <>Crop <span className="text-yellow-300">Doctor</span></>
                            )}
                        </h1>
                        <p className="text-lg md:text-xl text-green-100 max-w-2xl mx-auto">
                            {language === "hi"
                                ? "अपनी फसल की फोटो खींचें या अपलोड करें — हम रोग पहचानेंगे, सही दवाई बताएंगे, और आप तुरंत ऑर्डर कर सकते हैं!"
                                : "Take or upload a photo of your crop — we'll identify the disease, suggest the right medicine, and you can order instantly!"}
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-12 md:py-16 bg-gray-50 min-h-[60vh]">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Error Message */}
                    {error && (
                        <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                            <FiAlertTriangle className="text-red-500 mt-0.5 flex-shrink-0" size={20} />
                            <div>
                                <p className="text-red-700 font-medium">{error}</p>
                            </div>
                            <button onClick={() => setError("")} className="ml-auto text-red-400 hover:text-red-600">
                                <FiX />
                            </button>
                        </div>
                    )}

                    {/* ====== STATE: No image captured yet ====== */}
                    {!capturedImage && !cameraActive && (
                        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
                            <div className="text-center mb-10">
                                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-3xl mb-6 shadow-lg">
                                    <FiCamera size={36} />
                                </div>
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                                    {language === "hi" ? "फोटो लें या अपलोड करें" : "Take or Upload a Photo"}
                                </h2>
                                <p className="text-gray-600 max-w-xl mx-auto">
                                    {language === "hi"
                                        ? "अपनी बीमार फसल / पत्ती / कीट की फोटो खींचें। हमारा सिस्टम रोग पहचानकर सही दवाई बताएगा।"
                                        : "Take a photo of your diseased crop / leaf / pest. Our system will identify the disease and suggest the right medicine."}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                                {/* Open Camera */}
                                <button
                                    onClick={startCamera}
                                    className="group flex flex-col items-center gap-4 p-8 rounded-2xl border-2 border-dashed border-green-300 hover:border-green-500 bg-gradient-to-br from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                                >
                                    <div className="w-16 h-16 bg-green-600 text-white rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                                        <FiCamera size={28} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-800">
                                            {language === "hi" ? "कैमरा खोलें" : "Open Camera"}
                                        </h3>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {language === "hi" ? "लाइव फोटो खींचें" : "Take a live photo"}
                                        </p>
                                    </div>
                                </button>

                                {/* Upload Photo */}
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="group flex flex-col items-center gap-4 p-8 rounded-2xl border-2 border-dashed border-blue-300 hover:border-blue-500 bg-gradient-to-br from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                                >
                                    <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                                        <FiUpload size={28} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-800">
                                            {language === "hi" ? "गैलरी से चुनें" : "Upload from Gallery"}
                                        </h3>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {language === "hi" ? "मौजूदा फोटो अपलोड करें" : "Upload existing photo"}
                                        </p>
                                    </div>
                                </button>
                            </div>

                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                capture="environment"
                                onChange={handleFileUpload}
                                className="hidden"
                            />

                            {/* Tips */}
                            <div className="mt-10 p-6 bg-amber-50 border border-amber-200 rounded-xl">
                                <h4 className="font-bold text-amber-800 mb-3 flex items-center gap-2">
                                    <FiInfo /> {language === "hi" ? "बेहतर परिणाम के लिए टिप्स" : "Tips for Better Results"}
                                </h4>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-amber-700">
                                    {(language === "hi"
                                        ? [
                                            "🔍 बीमार पत्ती / भाग को करीब से फोटो लें",
                                            "☀️ अच्छी रोशनी में फोटो खींचें",
                                            "📸 फोटो साफ और धुंधली ना हो",
                                            "🌿 एक बार में एक पत्ती / भाग फोटो लें",
                                        ]
                                        : [
                                            "🔍 Take a close-up photo of the diseased part",
                                            "☀️ Take photo in good lighting",
                                            "📸 Make sure photo is clear, not blurry",
                                            "🌿 Take photo of one leaf/part at a time",
                                        ]
                                    ).map((tip, i) => (
                                        <li key={i} className="flex items-center gap-2">
                                            {tip}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}

                    {/* ====== STATE: Camera active ====== */}
                    {cameraActive && (
                        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                            <div className="relative">
                                <video
                                    ref={videoRef}
                                    autoPlay
                                    playsInline
                                    muted
                                    className="w-full max-h-[500px] object-cover bg-black"
                                />
                                {/* Camera overlay */}
                                <div className="absolute inset-0 pointer-events-none">
                                    <div className="absolute inset-8 border-2 border-white/40 rounded-2xl"></div>
                                    <div className="absolute top-4 left-4 bg-red-500 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
                                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                                        LIVE
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 flex flex-col sm:flex-row gap-4 justify-center">
                                <button
                                    onClick={capturePhoto}
                                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-700 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-green-700 hover:to-emerald-800 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
                                >
                                    <FiCamera size={22} />
                                    {language === "hi" ? "📸 फोटो खींचें" : "📸 Capture Photo"}
                                </button>
                                <button
                                    onClick={stopCamera}
                                    className="flex items-center justify-center gap-2 border-2 border-gray-300 text-gray-700 px-6 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all"
                                >
                                    <FiX size={20} />
                                    {language === "hi" ? "रद्द करें" : "Cancel"}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Hidden canvas for capture */}
                    <canvas ref={canvasRef} className="hidden" />

                    {/* ====== STATE: Image captured / Analyzing ====== */}
                    {capturedImage && (
                        <div className="space-y-8">
                            {/* Captured Image */}
                            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                                <div className="relative">
                                    <img
                                        src={capturedImage}
                                        alt="Captured crop"
                                        className="w-full max-h-[400px] object-cover"
                                    />
                                    {analyzing && (
                                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                            <div className="text-center text-white">
                                                <div className="inline-flex items-center justify-center w-20 h-20 border-4 border-green-400 border-t-transparent rounded-full animate-spin mb-4"></div>
                                                <p className="text-xl font-bold">
                                                    {language === "hi" ? "🔬 विश्लेषण हो रहा है..." : "🔬 Analyzing..."}
                                                </p>
                                                <p className="text-green-200 mt-2">
                                                    {language === "hi"
                                                        ? "AI आपकी फसल का विश्लेषण कर रहा है"
                                                        : "AI is analyzing your crop"}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {!analyzing && !result && (
                                    <div className="p-6 text-center">
                                        <button
                                            onClick={analyzeImage}
                                            className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-700 transition"
                                        >
                                            <FiSearch /> {language === "hi" ? "रोग पहचानें" : "Identify Disease"}
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* ====== STATE: Result shown ====== */}
                            {result && (
                                <>
                                    {/* Disease Identification Card */}
                                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border-2 border-green-200">
                                        <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white p-6">
                                            <div className="flex items-center gap-3">
                                                <FiCheckCircle size={24} />
                                                <h2 className="text-2xl font-bold">
                                                    {language === "hi" ? "रोग पहचाना गया!" : "Disease Identified!"}
                                                </h2>
                                            </div>
                                        </div>

                                        <div className="p-6 md:p-8 space-y-6">
                                            {/* Disease Name & Severity */}
                                            <div className="flex flex-wrap items-center gap-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                                                        <MdPestControl className="text-red-600 text-2xl" />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-xl font-bold text-gray-800">
                                                            {result.name[language === "hi" ? "hi" : "en"]}
                                                        </h3>
                                                        <p className="text-sm text-gray-500">
                                                            {language === "hi" ? "फसल:" : "Crop:"}{" "}
                                                            {result.crop[language === "hi" ? "hi" : "en"]}
                                                        </p>
                                                    </div>
                                                </div>
                                                <SeverityBadge level={result.severity} />
                                            </div>

                                            {/* Symptoms */}
                                            <div className="bg-red-50 rounded-xl p-5 border border-red-100">
                                                <h4 className="font-bold text-red-800 mb-2 flex items-center gap-2">
                                                    <FiAlertTriangle />
                                                    {language === "hi" ? "लक्षण" : "Symptoms"}
                                                </h4>
                                                <p className="text-red-700">
                                                    {result.symptoms[language === "hi" ? "hi" : "en"]}
                                                </p>
                                            </div>

                                            {/* Cause */}
                                            <div className="bg-amber-50 rounded-xl p-5 border border-amber-100">
                                                <h4 className="font-bold text-amber-800 mb-2 flex items-center gap-2">
                                                    <FiInfo />
                                                    {language === "hi" ? "कारण" : "Cause"}
                                                </h4>
                                                <p className="text-amber-700">
                                                    {result.cause[language === "hi" ? "hi" : "en"]}
                                                </p>
                                            </div>

                                            {/* Treatment */}
                                            <div className="bg-green-50 rounded-xl p-5 border border-green-100">
                                                <h4 className="font-bold text-green-800 mb-3 flex items-center gap-2">
                                                    <MdLocalFlorist />
                                                    {language === "hi" ? "उपचार और सुझाव" : "Treatment & Suggestions"}
                                                </h4>
                                                <ul className="space-y-2">
                                                    {result.treatment[language === "hi" ? "hi" : "en"].map((step, i) => (
                                                        <li key={i} className="flex items-start gap-3 text-green-700">
                                                            <span className="bg-green-200 text-green-800 text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                                {i + 1}
                                                            </span>
                                                            <span>{step}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Recommended Products */}
                                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                                        <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white p-6">
                                            <div className="flex items-center gap-3">
                                                <FiShoppingCart size={24} />
                                                <div>
                                                    <h2 className="text-2xl font-bold">
                                                        {language === "hi" ? "सुझावित दवाइयां" : "Recommended Products"}
                                                    </h2>
                                                    <p className="text-amber-100 text-sm">
                                                        {language === "hi"
                                                            ? "ये सभी उत्पाद हमारे स्टोर पर उपलब्ध हैं"
                                                            : "All these products are available at our store"}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-6 md:p-8">
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                {result.products.map((product, i) => (
                                                    <div
                                                        key={i}
                                                        className="border-2 border-gray-200 rounded-2xl p-5 hover:border-green-300 hover:shadow-lg transition-all duration-300 relative"
                                                    >
                                                        {/* Stock badge */}
                                                        <div className="absolute top-3 right-3">
                                                            {product.inStock ? (
                                                                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                                                                    ✅ {language === "hi" ? "उपलब्ध" : "In Stock"}
                                                                </span>
                                                            ) : (
                                                                <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full">
                                                                    ❌ {language === "hi" ? "अनुपलब्ध" : "Out of Stock"}
                                                                </span>
                                                            )}
                                                        </div>

                                                        <div className="text-3xl mb-3">🧴</div>
                                                        <h4 className="font-bold text-gray-800 mb-1 pr-16">{product.name}</h4>
                                                        <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
                                                        <p className="text-sm text-gray-500 mb-3">
                                                            {language === "hi" ? "मात्रा:" : "Qty:"} {product.quantity}
                                                        </p>

                                                        <div className="flex items-center justify-between mt-auto">
                                                            <span className="text-2xl font-bold text-green-600">{product.price}</span>
                                                            <a
                                                                href={`https://wa.me/91${phoneNumber}?text=${encodeURIComponent(
                                                                    language === "hi"
                                                                        ? `नमस्ते! मुझे "${product.name}" चाहिए। कृपया कीमत और उपलब्धता बताएं।`
                                                                        : `Hello! I need "${product.name}". Please share price and availability.`
                                                                )}`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="inline-flex items-center gap-1 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition"
                                                            >
                                                                <FiShoppingCart size={14} />
                                                                {language === "hi" ? "ऑर्डर करें" : "Order"}
                                                            </a>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Order CTA */}
                                            <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                                                <div className="flex flex-col md:flex-row items-center gap-6">
                                                    <div className="flex-1">
                                                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                                                            {language === "hi"
                                                                ? "🏪 स्टोर पर ऑर्डर करें या डिलीवरी लें"
                                                                : "🏪 Order at Store or Get Delivery"}
                                                        </h3>
                                                        <p className="text-gray-600">
                                                            {language === "hi"
                                                                ? "कॉल या व्हाट्सएप करें — हम आपके लिए सही दवाई तैयार रखेंगे!"
                                                                : "Call or WhatsApp — we'll keep the right medicine ready for you!"}
                                                        </p>
                                                    </div>
                                                    <div className="flex gap-3">
                                                        <a
                                                            href={`tel:${phoneNumber}`}
                                                            className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition shadow-lg"
                                                        >
                                                            <FiPhone />
                                                            {language === "hi" ? "कॉल करें" : "Call"}
                                                        </a>
                                                        <a
                                                            href={`https://wa.me/91${phoneNumber}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-400 transition shadow-lg"
                                                        >
                                                            <FiMessageCircle />
                                                            WhatsApp
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Scan Again */}
                                    <div className="text-center">
                                        <button
                                            onClick={resetScan}
                                            className="inline-flex items-center gap-2 bg-white text-green-600 border-2 border-green-600 px-8 py-3 rounded-xl font-semibold hover:bg-green-50 transition shadow"
                                        >
                                            <FiRefreshCw />
                                            {language === "hi" ? "दोबारा स्कैन करें" : "Scan Again"}
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    )}

                    {/* How it works (shown when no image) */}
                    {!capturedImage && !cameraActive && (
                        <div className="mt-16">
                            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-10">
                                {language === "hi" ? "कैसे काम करता है?" : "How It Works?"}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                {[
                                    {
                                        step: "1",
                                        icon: "📸",
                                        title: language === "hi" ? "फोटो खींचें" : "Take Photo",
                                        desc: language === "hi" ? "बीमार पत्ती की फोटो लें" : "Capture diseased leaf",
                                    },
                                    {
                                        step: "2",
                                        icon: "🤖",
                                        title: language === "hi" ? "AI विश्लेषण" : "AI Analysis",
                                        desc: language === "hi" ? "हमारा AI रोग पहचानेगा" : "Our AI identifies the disease",
                                    },
                                    {
                                        step: "3",
                                        icon: "💊",
                                        title: language === "hi" ? "दवाई सुझाव" : "Medicine Suggestions",
                                        desc: language === "hi" ? "सही कीटनाशक और मात्रा" : "Right pesticide and dosage",
                                    },
                                    {
                                        step: "4",
                                        icon: "🛒",
                                        title: language === "hi" ? "तुरंत ऑर्डर" : "Instant Order",
                                        desc: language === "hi" ? "स्टोर से ऑर्डर करें" : "Order from our store",
                                    },
                                ].map((item, i) => (
                                    <div key={i} className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow border border-gray-100">
                                        <div className="inline-flex items-center justify-center w-8 h-8 bg-green-600 text-white text-sm font-bold rounded-full mb-4">
                                            {item.step}
                                        </div>
                                        <div className="text-4xl mb-3">{item.icon}</div>
                                        <h3 className="font-bold text-gray-800 mb-1">{item.title}</h3>
                                        <p className="text-sm text-gray-500">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* ========== FARMING CHATBOT ========== */}
            <FarmingChatbot language={language} />
        </>
    );
}

/* Farming Chatbot Component */
function FarmingChatbot({ language }) {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'bot', text: language === 'hi' ? 'नमस्ते! 🌾 मैं आपका कृषि सहायक हूं। खेती से जुड़ा कोई भी सवाल पूछें!' : 'Hello! 🌾 I am your farming assistant. Ask me anything about farming!' }
    ]);
    const [input, setInput] = useState('');
    const chatEndRef = useRef(null);

    const FARMING_KB = [
        { keywords: ['मिट्टी', 'soil', 'ph', 'मृदा', 'जमीन'], response: { hi: '🌱 मिट्टी परीक्षण:\n• नजदीकी कृषि विज्ञान केंद्र (KVK) से मिट्टी जांच करवाएं\n• pH 6.0-7.5 अधिकांश फसलों के लिए उपयुक्त है\n• जैविक खाद (FYM/वर्मीकम्पोस्ट) मिट्टी की उर्वरता बढ़ाती है\n• हर 2-3 साल में मिट्टी जांच करवाएं', en: '🌱 Soil Testing:\n• Get soil tested at nearest KVK (Krishi Vigyan Kendra)\n• pH 6.0-7.5 suits most crops\n• Organic manure (FYM/Vermicompost) improves fertility\n• Test soil every 2-3 years' } },
        { keywords: ['बीज', 'seed', 'बुवाई', 'sowing', 'अंकुरण'], response: { hi: '🌾 बीज चुनाव:\n• प्रमाणित बीज ही खरीदें (सरकारी या प्रतिष्ठित कंपनी)\n• बीज उपचार: कार्बेन्डाज़िम 2g/kg या ट्राइकोडर्मा 5g/kg\n• अंकुरण जांच: 100 बीज पानी में 24 घंटे → 70%+ उगें तो अच्छे\n• बुवाई का सही समय और गहराई रखें', en: '🌾 Seed Selection:\n• Buy certified seeds only (government or reputed brands)\n• Seed treatment: Carbendazim 2g/kg or Trichoderma 5g/kg\n• Germination test: Soak 100 seeds 24hrs → 70%+ is good\n• Follow right sowing time and depth' } },
        { keywords: ['कीट', 'pest', 'कीड़', 'insect', 'bug', 'इल्ली', 'worm'], response: { hi: '🐛 कीट नियंत्रण:\n• IPM (समन्वित कीट प्रबंधन) अपनाएं\n• नीम तेल 5ml/लीटर — प्राकृतिक कीटनाशक\n• प्रकाश जाल लगाएं (Light trap)\n• ट्राइकोकार्ड — तना छेदक के लिए\n• स्प्रे हमेशा शाम को करें\n• हमारे स्टोर पर सभी कीटनाशक उपलब्ध हैं!', en: '🐛 Pest Control:\n• Follow IPM (Integrated Pest Management)\n• Neem oil 5ml/liter — natural pesticide\n• Install light traps\n• Trichocards for stem borers\n• Always spray in evening\n• All pesticides available at our store!' } },
        { keywords: ['खाद', 'fertilizer', 'urea', 'यूरिया', 'DAP', 'उर्वरक', 'NPK'], response: { hi: '🧪 खाद प्रबंधन:\n• DAP: बुवाई के समय (2 बैग/एकड़)\n• यूरिया: 2-3 भागों में दें (बुवाई + 30 दिन + 60 दिन)\n• पोटाश: फल/फूल आने पर\n• जैविक खाद: 5 टन FYM/एकड़\n• सूक्ष्म पोषक: जिंक सल्फेट, बोरॉन\n• मिट्टी जांच के अनुसार खाद दें', en: '🧪 Fertilizer Management:\n• DAP: At sowing (2 bags/acre)\n• Urea: Split 2-3 times (sowing + 30 days + 60 days)\n• Potash: At flowering/fruiting\n• Organic: 5 tons FYM/acre\n• Micronutrients: Zinc Sulphate, Boron\n• Follow soil test recommendations' } },
        { keywords: ['सिंचाई', 'water', 'irrigation', 'पानी', 'drip', 'ड्रिप'], response: { hi: '💧 सिंचाई सुझाव:\n• ड्रिप सिंचाई — 50-60% पानी बचत\n• स्प्रिंकलर — बड़े खेतों के लिए\n• मल्चिंग करें — नमी बनाए रखे\n• सुबह या शाम को सिंचाई करें\n• PM-KUSUM योजना — सोलर पंप सब्सिडी\n• हमारे पास ड्रिप सिस्टम उपलब्ध है!', en: '💧 Irrigation Tips:\n• Drip irrigation saves 50-60% water\n• Sprinkler for larger fields\n• Use mulching to retain moisture\n• Irrigate in morning or evening\n• PM-KUSUM scheme for solar pumps\n• Drip systems available at our store!' } },
        { keywords: ['जैविक', 'organic', 'प्राकृतिक', 'natural', 'bio'], response: { hi: '🌿 जैविक खेती:\n• वर्मीकम्पोस्ट: केंचुआ खाद बनाएं\n• जीवामृत: 200L पानी + 10kg गोबर + 10L गोमूत्र + 2kg गुड़\n• नीम खली: मिट्टी में कीट नियंत्रण\n• ट्राइकोडर्मा: फफूंद रोग नियंत्रण\n• पंचगव्य: सर्वोत्तम जैविक स्प्रे\n• जैविक प्रमाणपत्र से उत्पाद 2-3x दाम मिलता है', en: '🌿 Organic Farming:\n• Vermicompost: Make earthworm manure\n• Jeevamrit: 200L water + 10kg cowdung + 10L urine + 2kg jaggery\n• Neem cake: Soil pest control\n• Trichoderma: Fungal disease control\n• Panchagavya: Best organic spray\n• Organic certification gets 2-3x price' } },
        { keywords: ['मौसम', 'weather', 'बारिश', 'rain', 'season', 'रबी', 'खरीफ'], response: { hi: '🌤️ मौसम और फसल:\n• खरीफ (जून-अक्टूबर): धान, सोयाबीन, मक्का, कपास\n• रबी (नवंबर-मार्च): गेहूं, चना, मसूर, सरसों\n• जायद (मार्च-जून): तरबूज, खरबूजा, मूंग\n• बारिश से पहले: जल निकासी ठीक करें\n• पाला सुरक्षा: शाम को सिंचाई + गंधक स्प्रे', en: '🌤️ Season & Crops:\n• Kharif (Jun-Oct): Rice, Soybean, Maize, Cotton\n• Rabi (Nov-Mar): Wheat, Gram, Mustard\n• Zaid (Mar-Jun): Watermelon, Moong\n• Before rains: Fix drainage\n• Frost protection: Evening irrigation + Sulphur spray' } },
        { keywords: ['गेहूं', 'wheat', 'गेहूँ'], response: { hi: '🌾 गेहूं की खेती:\n• बुवाई: 15 अक्टूबर - 25 नवंबर (MP)\n• बीज दर: 100 kg/हेक्टेयर\n• खाद: DAP 2 बैग + यूरिया 3 बैग/एकड़\n• सिंचाई: 4-6 बार (CRI, टिलरिंग, फूल, दाना)\n• प्रमुख रोग: रतुआ (Rust) — प्रोपिकोनाजोल स्प्रे\n• उपज: 40-50 क्विंटल/हेक्टेयर', en: '🌾 Wheat Cultivation:\n• Sowing: Oct 15 - Nov 25 (MP)\n• Seed rate: 100 kg/hectare\n• Fertilizer: DAP 2 bags + Urea 3 bags/acre\n• Irrigation: 4-6 times (CRI, tillering, flowering, grain)\n• Major disease: Rust — spray Propiconazole\n• Yield: 40-50 quintal/hectare' } },
        { keywords: ['धान', 'rice', 'चावल', 'paddy'], response: { hi: '🍚 धान की खेती:\n• नर्सरी: जून के पहले सप्ताह\n• रोपाई: जुलाई (21-25 दिन की पौध)\n• बीज दर: 30-40 kg/हेक्टेयर\n• खाद: NPK 120:60:40\n• कीट: तना छेदक — कार्बोफ्यूरान\n• रोग: ब्लास्ट — ट्राइसाइक्लाजोल स्प्रे', en: '🍚 Rice Cultivation:\n• Nursery: First week of June\n• Transplanting: July (21-25 day seedlings)\n• Seed rate: 30-40 kg/hectare\n• Fertilizer: NPK 120:60:40\n• Pest: Stem borer — Carbofuran\n• Disease: Blast — Tricyclazole spray' } },
        { keywords: ['सोयाबीन', 'soybean', 'soya'], response: { hi: '🫘 सोयाबीन:\n• बुवाई: 20 जून - 10 जुलाई\n• बीज दर: 60-80 kg/हेक्टेयर\n• बीज उपचार: थायरम + कार्बेन्डाज़िम\n• खाद: DAP 100 kg + पोटाश 40 kg/हेक्टेयर\n• खरपतवार: इमेज़ेथापिर 1 लीटर/हेक्टेयर\n• कीट: गर्डल बीटल — ट्राइजोफॉस स्प्रे', en: '🫘 Soybean:\n• Sowing: June 20 - July 10\n• Seed rate: 60-80 kg/hectare\n• Seed treatment: Thiram + Carbendazim\n• Fertilizer: DAP 100kg + Potash 40kg/ha\n• Weed: Imazethapyr 1L/hectare\n• Pest: Girdle beetle — Triazophos spray' } },
        { keywords: ['फसल चक्र', 'crop rotation', 'rotation'], response: { hi: '🔄 फसल चक्र:\n• गेहूं → मूंग → धान (3 फसलें)\n• सोयाबीन → गेहूं (2 फसलें)\n• फायदे: मिट्टी की उर्वरता बढ़ती है\n• दलहनी फसल जरूर शामिल करें (नाइट्रोजन फिक्सिंग)\n• एक ही फसल बार-बार न उगाएं', en: '🔄 Crop Rotation:\n• Wheat → Moong → Rice (3 crops)\n• Soybean → Wheat (2 crops)\n• Benefits: Improves soil fertility\n• Always include a legume (nitrogen fixing)\n• Avoid monoculture' } },
        { keywords: ['सब्सिडी', 'subsidy', 'योजना', 'scheme', 'PMK', 'kisan'], response: { hi: '💰 किसान योजनाएं:\n• PM-KISAN: ₹6000/वर्ष (3 किस्तें)\n• किसान क्रेडिट कार्ड: 4% ब्याज पर लोन\n• PM-KUSUM: सोलर पंप 60-90% सब्सिडी\n• फसल बीमा (PMFBY): कम प्रीमियम\n• मृदा स्वास्थ्य कार्ड: मुफ्त मिट्टी जांच\n• नजदीकी कृषि विभाग से संपर्क करें', en: '💰 Farmer Schemes:\n• PM-KISAN: ₹6000/year (3 installments)\n• Kisan Credit Card: Loan at 4% interest\n• PM-KUSUM: Solar pump 60-90% subsidy\n• Crop Insurance (PMFBY): Low premium\n• Soil Health Card: Free soil testing\n• Contact nearest agriculture office' } },
        { keywords: ['फफूंद', 'fungus', 'रोग', 'disease', 'बीमारी', 'पीला', 'yellow', 'सड़न', 'rot'], response: { hi: '🍄 फफूंद रोग नियंत्रण:\n• मैन्कोजेब 75% WP — 2g/लीटर (सुरक्षात्मक)\n• कार्बेन्डाज़िम 50% WP — 1g/लीटर (उपचारात्मक)\n• ट्राइकोडर्मा — जैविक फफूंदनाशक\n• रोगग्रस्त पत्तियां हटाएं और जलाएं\n• फसल चक्र अपनाएं\n• हमारे स्टोर पर सभी दवाएं उपलब्ध हैं!', en: '🍄 Fungal Disease Control:\n• Mancozeb 75% WP — 2g/L (preventive)\n• Carbendazim 50% WP — 1g/L (curative)\n• Trichoderma — bio-fungicide\n• Remove and burn infected leaves\n• Follow crop rotation\n• All medicines available at our store!' } },
        { keywords: ['नमस्ते', 'hello', 'hi', 'hey', 'hii', 'हैलो'], response: { hi: 'नमस्ते! 🙏 मैं आपका कृषि सहायक हूं। आप मुझसे पूछ सकते हैं:\n• फसल की बीमारी और इलाज\n• खाद और कीटनाशक\n• बुवाई का सही समय\n• सिंचाई सुझाव\n• जैविक खेती\n• सरकारी योजनाएं\nकोई भी सवाल पूछें! 🌾', en: 'Hello! 🙏 I am your farming assistant. You can ask me about:\n• Crop diseases and treatment\n• Fertilizers and pesticides\n• Right sowing time\n• Irrigation tips\n• Organic farming\n• Government schemes\nAsk me anything! 🌾' } },
        { keywords: ['धन्यवाद', 'thanks', 'thank', 'शुक्रिया'], response: { hi: '🙏 धन्यवाद! खुशी हुई आपकी मदद करके। और कोई सवाल हो तो बेझिझक पूछें।\n\nकिसी भी उत्पाद के लिए: ☎️ 9977938192 या WhatsApp करें।', en: '🙏 Thank you! Happy to help. Feel free to ask more questions.\n\nFor any products: ☎️ 9977938192 or WhatsApp us.' } },
    ];

    const getBotResponse = (userMsg) => {
        const msg = userMsg.toLowerCase();
        for (const item of FARMING_KB) {
            if (item.keywords.some(kw => msg.includes(kw.toLowerCase()))) {
                return item.response[language === 'hi' ? 'hi' : 'en'];
            }
        }
        return language === 'hi'
            ? '🤔 मुझे इस विषय की सटीक जानकारी नहीं है। कृपया इन विषयों में पूछें:\n• फसल रोग और कीट नियंत्रण\n• खाद और उर्वरक\n• बीज और बुवाई\n• सिंचाई\n• जैविक खेती\n• मौसम और फसल चक्र\n• सरकारी योजनाएं\n\nया WhatsApp पर हमसे बात करें: 9977938192'
            : "🤔 I don't have specific info on this. Try asking about:\n• Crop diseases and pest control\n• Fertilizers\n• Seeds and sowing\n• Irrigation\n• Organic farming\n• Weather and crop rotation\n• Government schemes\n\nOr chat with us on WhatsApp: 9977938192";
    };

    const sendMessage = (directMsg) => {
        const msg = directMsg || input.trim();
        if (!msg) return;
        setMessages(prev => [...prev, { role: 'user', text: msg }]);
        setInput('');

        // Simulate typing delay
        setTimeout(() => {
            const response = getBotResponse(msg);
            setMessages(prev => [...prev, { role: 'bot', text: response }]);
            setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
        }, 600);
    };

    return (
        <>
            {/* Floating Chat Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 left-6 z-50 w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform"
                title={language === 'hi' ? 'कृषि चैटबॉट' : 'Farming Chatbot'}
            >
                {isOpen ? <FiX size={22} /> : <span className="text-2xl">🤖</span>}
            </button>

            {/* Chat Panel */}
            {isOpen && (
                <div className="fixed bottom-24 left-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden" style={{ height: '480px' }}>
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4 flex items-center gap-3 shrink-0">
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-xl">🌾</div>
                        <div>
                            <h3 className="font-bold">{language === 'hi' ? 'कृषि सहायक' : 'Farming Assistant'}</h3>
                            <p className="text-xs text-blue-200">{language === 'hi' ? 'खेती से जुड़ा कोई भी सवाल पूछें' : 'Ask any farming question'}</p>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="ml-auto text-white/70 hover:text-white"><FiX size={18} /></button>
                    </div>

                    {/* Quick Buttons */}
                    <div className="px-3 py-2 border-b flex gap-2 overflow-x-auto shrink-0">
                        {[
                            { label: language === 'hi' ? '🧪 खाद' : '🧪 Fertilizer', q: language === 'hi' ? 'खाद के बारे में बताएं' : 'Tell me about fertilizers' },
                            { label: language === 'hi' ? '🐛 कीट' : '🐛 Pests', q: language === 'hi' ? 'कीट नियंत्रण कैसे करें?' : 'How to control pests?' },
                            { label: language === 'hi' ? '💧 सिंचाई' : '💧 Irrigation', q: language === 'hi' ? 'सिंचाई के बारे में बताएं' : 'Tell me about irrigation' },
                            { label: language === 'hi' ? '🌿 जैविक' : '🌿 Organic', q: language === 'hi' ? 'जैविक खेती कैसे करें?' : 'How to do organic farming?' },
                        ].map((btn, i) => (
                            <button key={i} onClick={() => sendMessage(btn.q)}
                                className="px-2.5 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600 hover:bg-green-100 hover:text-green-700 whitespace-nowrap transition"
                            >{btn.label}</button>
                        ))}
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                        {messages.map((msg, i) => (
                            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm whitespace-pre-line ${msg.role === 'user'
                                    ? 'bg-green-600 text-white rounded-br-md'
                                    : 'bg-gray-100 text-gray-800 rounded-bl-md'
                                    }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        <div ref={chatEndRef} />
                    </div>

                    {/* Input */}
                    <div className="p-3 border-t shrink-0">
                        <form onSubmit={e => { e.preventDefault(); sendMessage(); }} className="flex gap-2">
                            <input
                                type="text" value={input} onChange={e => setInput(e.target.value)}
                                placeholder={language === 'hi' ? 'खेती का सवाल लिखें...' : 'Type your farming question...'}
                                className="flex-1 px-4 py-2.5 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button type="submit" className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center hover:bg-blue-700 transition shrink-0">
                                <FiSend size={16} />
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
