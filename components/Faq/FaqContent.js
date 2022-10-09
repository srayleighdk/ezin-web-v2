import React, { Component } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemPanel,
  AccordionItemButton
} from 'react-accessible-accordion';
import Link from 'next/link';
// import { getFAQ, getFAQContent } from '../../pages/api/index';

// export async function getStaticProps() {
//   const res = await getFAQ();
//   return {
//     props: {
//       faq: res?.data?.data,
//     }
//   }
// }

function FaqContent({ faq }) {
  console.log(faq);
  return (
    <div className='container'>
      <div className='news-details-area'>
        <div className="widget-area" id="secondary" >
          <div className="widget widget_categories" >
            <h3 className="widget-title">Tổng Quan</h3>
            <div className='row'>
              <div className="col-2 post-wrap">
                <ul>
                  {faq && faq?.map((child) => {
                    return (

                      <li key={child._id}>
                        <Link href={`/life/chu-de/tin-nong`}>
                          <p>{child.title}</p>
                        </Link>
                      </li>
                    )
                  })}
                  <li>
                    <Link href={`/life/chu-de/tin-nong`}>
                      <p>Tin nóng</p>
                    </Link>
                  </li>
                  <li>
                    <Link href={`/life/chu-de/covid`}>
                      <a>COVID</a>
                    </Link>
                  </li>
                  <li>
                    <Link href={`/life/chu-de/video`}>
                      <a>Video</a>
                    </Link>
                  </li>
                  <li>
                    <Link href={`/life/chu-de/tai-nan`}>
                      <a>Tai nạn</a>
                    </Link>
                  </li>
                </ul>
              </div>

              <div className='col-16'></div>

            </div>

          </div>
        </div>
      </div>
    </div>);
  {/* <section className="faq-area ptb-100"> */ }
  {/*   <div className="container"> */ }

  {/*               <div className="row align-items-center"> */ }
  {/*                   <div className="col-lg-8"> */ }
  {/*                       <div className="faq-accordion"> */ }
  {/*                           <Accordion preExpanded={['a']}> */ }
  {/*                               <AccordionItem uuid="a"> */ }
  {/*                                   <AccordionItemHeading> */ }
  {/*                                       <AccordionItemButton> */ }
  {/*                                           What Are The Business Advisory Company? */ }
  {/*                                       </AccordionItemButton> */ }
  {/*                                   </AccordionItemHeading> */ }

  {/*                                   <AccordionItemPanel> */ }
  {/*                                       <p> */ }
  {/*                                           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. */ }
  {/*                                       </p> */ }
  {/*                                   </AccordionItemPanel> */ }
  {/*                               </AccordionItem> */ }

  {/*                               <AccordionItem uuid="b"> */ }
  {/*                                   <AccordionItemHeading> */ }
  {/*                                       <AccordionItemButton> */ }
  {/*                                           Research Is What Makes An Effective Business Plan? */ }
  {/*                                       </AccordionItemButton> */ }
  {/*                                   </AccordionItemHeading> */ }

  {/*                                   <AccordionItemPanel> */ }
  {/*                                       <p> */ }
  {/*                                           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. */ }
  {/*                                       </p> */ }
  {/*                                   </AccordionItemPanel> */ }
  {/*                               </AccordionItem> */ }

  {/*                               <AccordionItem uuid="c"> */ }
  {/*                                   <AccordionItemHeading> */ }
  {/*                                       <AccordionItemButton> */ }
  {/*                                           How Achieving Small Business Success? */ }
  {/*                                       </AccordionItemButton> */ }
  {/*                                   </AccordionItemHeading> */ }
  {/*                                   <AccordionItemPanel> */ }
  {/*                                       <p> */ }
  {/*                                           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. */ }
  {/*                                       </p> */ }
  {/*                                   </AccordionItemPanel> */ }
  {/*                               </AccordionItem> */ }

  {/*                               <AccordionItem uuid="d"> */ }
  {/*                                   <AccordionItemHeading> */ }
  {/*                                       <AccordionItemButton> */ }
  {/*                                           Why Business Planing Is Important? */ }
  {/*                                       </AccordionItemButton> */ }
  {/*                                   </AccordionItemHeading> */ }
  {/*                                   <AccordionItemPanel> */ }
  {/*                                       <p> */ }
  {/*                                           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. */ }
  {/*                                       </p> */ }
  {/*                                   </AccordionItemPanel> */ }
  {/*                               </AccordionItem> */ }

  {/*                               <AccordionItem uuid="e"> */ }
  {/*                                   <AccordionItemHeading> */ }
  {/*                                       <AccordionItemButton> */ }
  {/*                                           How Do You Startup? */ }
  {/*                                       </AccordionItemButton> */ }
  {/*                                   </AccordionItemHeading> */ }
  {/*                                   <AccordionItemPanel> */ }
  {/*                                       <p> */ }
  {/*                                           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. */ }
  {/*                                       </p> */ }
  {/*                                   </AccordionItemPanel> */ }
  {/*                               </AccordionItem> */ }
  {/*                           </Accordion> */ }
  {/*                       </div> */ }
  {/*                   </div> */ }

  {/*                   <div className="col-lg-4"> */ }
  {/*                       <div className="faq-img"> */ }
  {/*                           <img src="/images/faq-img.png" alt="Image" /> */ }
  {/*                       </div> */ }
  {/*                   </div> */ }
  {/*               </div> */ }
  {/*   </div> */ }
  {/* </section> */ }
}

export default FaqContent;
