import { Html, Head, Main, NextScript } from 'next/document';

function LegacyDocument() {
    return (
        <Html lang="hi">
            <Head>
                {/* Charset & Viewport */}
                <meta charSet="utf-8" />

                {/* Favicon */}
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

                {/* Font Preconnect */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

                {/* Open Graph */}
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="लक्ष्मी कृषि केंद्र" />
                <meta property="og:title" content="लक्ष्मी कृषि केंद्र — 25+ वर्षों का विश्वास" />
                <meta property="og:description" content="गुणवत्तापूर्ण बीज, उर्वरक, कीटनाशक और कृषि उपकरण। सिराथा, मध्य प्रदेश।" />

                {/* Theme Color */}
                <meta name="theme-color" content="#16a34a" />
                <meta name="apple-mobile-web-app-status-bar-style" content="#16a34a" />

                {/* Additional SEO */}
                <meta name="robots" content="index, follow" />
                <meta name="author" content="लक्ष्मी कृषि केंद्र" />
                <link rel="canonical" href="https://laxmikrashikendra.com" />
            </Head>
            <body className="antialiased">
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}

function CleanDocument() {
    return (
        <Html lang="hi">
            <Head>
                <meta charSet="utf-8" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="लक्ष्मी कृषि केंद्र" />
                <meta property="og:title" content="लक्ष्मी कृषि केंद्र — 25+ वर्षों का भरोसा" />
                <meta
                    property="og:description"
                    content="गुणवत्तापूर्ण कृषि उत्पाद, फसल सहायता और भरोसेमंद स्थानीय मार्गदर्शन।"
                />
                <meta name="theme-color" content="#16a34a" />
                <meta name="apple-mobile-web-app-status-bar-style" content="#16a34a" />
                <meta name="robots" content="index, follow" />
                <meta name="author" content="लक्ष्मी कृषि केंद्र" />
                <link rel="canonical" href="https://laxmikrashikendra.com" />
            </Head>
            <body className="antialiased">
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}

export default CleanDocument;
