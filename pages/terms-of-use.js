import Header from '../components/Header';
import Footer from '../components/Footer';
import { Container } from 'react-bootstrap';
import configData from "../config.json";
import { NextSeo } from 'next-seo';
import { usePathname } from 'next/navigation'
import NewsLetter from '../components/NewsLetter'
import Floating from '../components/FloatingMenu'
import Popups from '../components/PopUps'
import Head from 'next/head';

const privacy = ({ data }) => {
  const pathname = usePathname();


  const title = "Terms of use  - Walmart Vriddhi";
  const desc = "Explore the rules and regulations, privacy policy, and terms of use for accessing walmartvriddhi. No physical or digital signatures are required for this electronic record.";
  const banner = '/images/Walmart-Vriddhi-logo.svg';
  const url = 'https://www.walmartvriddhi.org/terms-of-use/';

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
      <Container fluid>
        {
          data.map((post, index) => {
            console.log(post)
            return (
              <>
                <Container className="wbg-main d-flex  align-items-center" style={{ height: 150 }}>
                  <h2 className="text-white bogle-medium text-right px-5">{post['title']['rendered']}</h2>
                </Container>
                <Container className="px-5 m-break">
                  <div dangerouslySetInnerHTML={{ __html: post['acf']['terms_of_use'] }} className="fs-4" />

                </Container>
              </>
            )


          })}
      </Container>
      <Popups />
      <Floating />

      <Footer />
    </>
  )
}

export default privacy


export async function getServerSideProps(context) {
  //const {id} = context.params;

  const res = await fetch(`${configData.SERVER_URL}pages?_embed&slug=terms-of-use`);
  const data = await res.json();
  console.log(data)
  return { props: { data } }

}
