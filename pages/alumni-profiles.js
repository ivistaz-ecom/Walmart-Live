import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Head from 'next/head';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import configData from "../config.json";

import Header from '../components/Header';
import Brand from '../components/BrandLogo';
import Footer from '../components/Footer';
import Carousel from '../components/AlumniCarousel';
import Video from '../components/AlumniVideo';
import News from '../components/AlumniNew';
import Share from '../components/AlumniShare';
import Profile from '../components/AlumniProfile';
import NewsLetter from '../components/NewsLetter';
import Floating from '../components/FloatingMenu';
import Popups from '../components/PopUps';

const AlumniProfiles = () => {
  const pathname = usePathname();

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [next, setNext] = useState(null);
  const [total, setTotal] = useState(null);
  const [end, setEnd] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('all');

  const title = "Business Owner Training, Business Owner Training Programs, Sell Products Online in India";
  const desc = "The MSME spotlight and industry connect series is a collection of webinars that define Walmart Vriddhi’s MSME business training programs Learn more about these webinars here";
  const banner = '/images/alumni_profile_banner.png';
  const url = 'https://www.walmartvriddhi.org/alumni-profiles/';

  // Determine server based on domain
  const domain = typeof window !== 'undefined' ? window.location.hostname : '';
  let server;
  if (domain === 'walmartvriddhi.org' || domain === 'www.walmartvriddhi.org') {
    server = configData.LIVE_SERVER;
  } else if (domain === 'staging.walmartvriddhi.org') {
    server = configData.STAG_SERVER;
  } else {
    server = configData.STAG_SERVER; // Default to staging server
  }

  // Fetch movies
  const fetchMovies = async () => {
    setLoading(true);
    const urlPage = `${page}`;
    const url = `${server}msme_speaks?_embed&production[]=${server}&status[]=publish&per_page=${urlPage}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch next categories
  const fetchNos = async () => {
    setLoading(true);
    const catUrl = `${server}categories/12`;

    try {
      const response = await fetch(catUrl);
      const cats = await response.json();
      setNext(cats);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Handle component mount
  useEffect(() => {
    fetchMovies();
    fetchNos();
  }, [page]);

  // Load more data
  const loadMore = () => {
    if (next && total === page) {
      setEnd(false);
    } else {
      setPage((prevPage) => prevPage + 2);
    }
  };

  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org/",
    "@type": "WebSite",
    "name": "walmartvriddhi",
    "url": "https://www.walmartvriddhi.org/",
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${url}{search_term_string}`,
      "query-input": "required name=search_term_string",
    }
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <meta name="robots" content="index,follow" />
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

      <Header />
      <Image
        src={banner}
        width={900}
        height={620}
        className="banner-img w-100 h-auto"
        alt="Alumni Profile Banner"
      />
      <Brand />

      <Container className="text-center">
        <h1 className="fs-1 bogle-medium pt-4">Walmart Vriddhi Alumni</h1>
        <Image src="/images/line-svg-png-1.png" width={100} height={20} alt="Walmart Vriddhi Alumni" />
        <p className="fs-3">
          Walmart Vriddhi supplier development program has assisted over 25,000 MSMEs in India to help them enhance their domestic capabilities and participate in the global economy.
        </p>
      </Container>

      <Container fluid className='wbg-gy pt-4'>
        <Container className="text-center">
          <p className="fs-1 bogle-medium">Meet the Walmart Vriddhi Graduates</p>
          <Image src="/images/line-svg-png-1.png" width={100} height={20} alt="Walmart Vriddhi Alumni" />
          <p className="fs-3">Introducing our graduates who successfully finished the program.</p>
        </Container>
        <Container>
          <Profile />
        </Container>
      </Container>

      <Container fluid className="text-center wbg-main pt-5">
        <Container>
          <p className="fs-1 bogle-medium text-white">Program Beneficiaries</p>
          <Image src="/images/line-svg-png-1.png" width={100} height={20} alt="Program Beneficiaries" />
          <Carousel />
        </Container>
      </Container>

      <Container className="text-center pt-5">
        <p className="fs-1 bogle-medium walmart-default">MSME Speaks</p>
        <Image src="/images/line-svg-png-1.png" width={100} height={20} alt="MSME Speaks" />
        <p className="fs-4">Hear from our graduates about their experience of the Walmart Vriddhi program and how it benefitted them.</p>
        <Video />
      </Container>

      <Container fluid className='wbg-gy pt-5 pb-5 mt-5'>
        <Container className="text-center">
          <p className="fs-1 bogle-medium walmart-default">Alumni Achievements</p>
          <Image src="/images/line-svg-png-1.png" width={100} height={20} alt="Alumni Achievements" />
          <p className="fs-3">A collection of events that define the journey of Walmart Vriddhi graduates.</p>
        </Container>
        <Container>
          <News />
        </Container>
      </Container>

      <Container className="text-center wbg-main" fluid>
        <p className="fs-1 bogle-medium text-white mt-5">Alumni Corner</p>
        <Image src="/images/line-svg-png-1.png" width={100} height={20} alt="Alumni Corner" />
        <Share />
      </Container>

      <Popups />
      <Floating />
      <NewsLetter />
      <Footer />
    </>
  );
};

export default AlumniProfiles;
