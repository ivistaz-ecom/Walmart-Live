import React, { useEffect, useState } from "react";
import { Card, Button, Col, Row, Container } from 'react-bootstrap';
import Link from 'next/link';
import Image from 'next/image';
import Header from '../components/Header';
import Brand from '../components/BrandLogo';
import Footer from '../components/Footer';
import configData from "../config.json";
import { NextSeo } from 'next-seo';
import date from 'date-and-time';
import News from '../utils/fetchNews'
import Banner from '../components/msmeSubmit/Banner'
import Submit from '../components/msmeSubmit/Summit2024'
import SubmitHight from '../components/msmeSubmit/SummitHighlights'
import Flipkart from '../components/msmeSubmit/InteractiveFlipkart'
import Gallery from '../components/msmeSubmit/MsmeGallery'
import Register from '../components/msmeSubmit/Register'
import Head from "next/head";
function Summit() {

  const title = "Walmart Vriddhi MSME Summit 2024: Unlocking Success with MSME Growth Program Benefits";
  const desc = "Join us to discover unparalleled opportunities at the Walmart Vriddhi MSME Summit 2024. Unleash the potential of your business with insights from MSME growth program.";
  const banner = '/images/msme.png';
  const url = 'https://www.walmartvriddhi.org/walmart-vriddhi-msme-summit-2024/';

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
      <Header />
      <Banner />
      <Brand />
      <Submit />
      <SubmitHight />
      <Flipkart />
      <Gallery />
      <Register />
      <Footer />
    </>
  )
}

export default Summit
