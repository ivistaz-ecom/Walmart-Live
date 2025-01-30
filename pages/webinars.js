import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Card, Button, Col, Row, Modal } from 'react-bootstrap';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/navigation';
import Header from '../components/Header';
import Brand from '../components/BrandLogo';
import Footer from '../components/Footer';
import configData from "../config.json";
import NewsLetter from '../components/NewsLetter'
import Floating from '../components/FloatingMenu'
import Popups from '../components/PopUps'
import Image from 'next/image'
import IndustryConnect from '../utils/fetchIndustry'
import SpotLight from '../utils/SpotLight'
import Head from 'next/head';


const ITEMS_PER_LOAD = 6; // Number of items to load initially and on "Load More"

const Webinars = ({ webinarvideo, spotlightvideo }) => {
  const router = useRouter();

  useEffect(() => {
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);
    const tabs = $$(".tab-item");
    const panes = $$(".tab-pane");
    const tabActive = $(".tab-item.active");
    const line = $(".tabs .line");

    tabs.forEach((tab, index) => {
      const pane = panes[index];

      tab.onclick = function () {
        $(".tab-item.active").classList.remove("active");
        $(".tab-pane.active").classList.remove("active");

        line.style.left = this.offsetLeft + "px";
        line.style.width = this.offsetWidth + "px";

        this.classList.add("active");
        pane.classList.add("active");
      };
    });

  }, []);

  const title = "MSME Business Training Programs: Small Business Training Online"
  const desc = "Walmart Vriddhi is a supplier development program tailored to help MSMEs grow their business by expanding their domestic and international markets Know more about us here"
  const banner = "/images/banner_webinar.jpeg"
  const url = "https://www.walmartvriddhi.org/webinars/"

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
      <Image
        src="/images/banner_webinar.jpeg"
        width="900"
        height="620"
        background="no-repeat"
        background-size="cover"
        className="banner-img w-100 h-auto"
      />
      <Brand />
      <Container fluid className="wbg-main p-0">
        <Container className="text-center">
          <h1 className="fs-2 bogle-medium text-white pt-3">Webinars</h1>
          <Image src="/images/line-svg-png-1.png" width={100} height={20} alt="Industry Connect Series" />
          <p className="fs-3 text-white w-60">
            A collection of webinars that define the Walmart Vriddhi story through
            <br /> the MSME spotlight and industry connect series
          </p>
        </Container>
        <Container>
          <div className="tabs">
            <div className="tab-item active">
              <Image src="/images/settings.svg" alt="msme training Program online" className="img" width={300} height={90} />
              <span className="eael-tab-title walmart-default bogle-medium">Industry Connect Series</span>
            </div>
            <div className="tab-item">
              <Image src="/images/peoples.svg" alt="msme training Program online" className="img" width={300} height={90} />
              <span className="eael-tab-title walmart-default bogle-medium">MSME Spotlight Series</span>
            </div>

            <div className="line"></div>
          </div>
        </Container>

        <Container fluid className="wbg_grey">
          {/* Webinars tab */}
          <div className="tab-content">
            <div className="tab-pane active">
              <IndustryConnect />
            </div>

            {/* Spotlights tab */}
            <div className="tab-pane">
              <SpotLight />
            </div>
          </div>
        </Container>
      </Container>
      <Popups />
      <Floating />

      <Footer />
    </>
  );
};

export default Webinars;

