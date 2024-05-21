import Head from 'next/head'
import Header from '../components/Header';
import Banner from '../components/HomeBanner';
import BrandLogo from '../components/BrandLogo';
import Arc from '../components/Arc';
import Learning from '../components/LearningPrograme';
import Programme from '../components/ProgramBenefits';
import Growth from '../components/GrowthJourney';
import Testimonials from '../components/Testimonials';
import App from '../components/App';
import Footer from '../components/Footer';
import { NextSeo } from 'next-seo';
import NewsLetter from '../components/NewsLetter'
import Floating from '../components/FloatingMenu'
import Popups from '../components/PopUps'
import MsmeBanner from '../components/msmeSubmit/Banner'

export default function Home() {

  const title = "Learning program for MSME entrepreneurs";
  const desc = "Walmart Vriddhi initiative is designed to support MSMEs in modernising, expanding, and reaching their domestic ambitions.";
  const banner = "/images/banner_1_1.png";
  const url = "https://www.walmartvriddhi.org/"

  const structuredData = {
    "@context": "https://schema.org/",
    "@type": "WebSite",
    "name": "walmartvriddhi",
    "url": "https://www.walmartvriddhi.org/",
    "potentialAction": {
        "@type": "SearchAction",
        "target": `${url}{search_term_string}`,
        "query-input": "required name=search_term_string" 
    }
};

return (
    <>
        <Head>
            <title>{title}</title>
            <meta name="description" content={desc} />
            <meta name="robots" content="index,follow"></meta>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/images/favicon.ico" />
            <link rel="canonical" href={url} />
            <meta property="og:locale" content="en_US" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={desc} />
            <meta property="og:url" content={url} />
            <meta property="og:site_name" content={title} />
            <meta property="article:modified_time" content="2023-07-06T15:35:40+00:00" />
            <meta property="og:image" content={banner} />
            <meta name="twitter:card" content="summary_large_image" />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
        </Head>

    
    <div>
      <Header/>
        <Banner />
        
      <BrandLogo/>
      <Learning/>
      <Programme/>  
      <Arc/>
      <Growth/>
      <Testimonials/>
        <App />
        <Popups/>
            <Floating/> 
            <NewsLetter/>
<Footer/>
    </div>
    </>
  )
}




