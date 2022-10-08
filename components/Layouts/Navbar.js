import React, { Component, useEffect, useState } from 'react';
import Link from '../../utils/ActiveLink';

const Navbar = ({ headers }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [display, setDisplay] = useState(false);
  const [collapsed, setCollapse] = useState(true);

  /**
   * If collapse is true, set collapse to false. If collapse is false, set collapse to true.
   */
  const toggleNavbar = () => {
    setCollapse(!collapse);
  }

  useEffect(() => {
    let elementId = document.getElementById("navbar");
    document.addEventListener("scroll", () => {
      if (window.scrollY > 170) {
        elementId.classList.add("is-sticky");
      } else {
        elementId.classList.remove("is-sticky");
      }
    });

    return function cleanup() {
      setIsMounted(false);
    }

  }, [])

  const classOne = collapsed ? 'collapse navbar-collapse' : 'collapse navbar-collapse show';
  const classTwo = collapsed ? 'navbar-toggler navbar-toggler-right collapsed' : 'navbar-toggler navbar-toggler-right';
  return (
    <>
      <div id="navbar" className="navbar-area fixed-top">
        <nav className="navbar navbar-expand-md navbar-light">
          <div className="container">
            <Link href="/">
              <a className="navbar-brand">
                <img src="/images/logo.png" alt="logo" />
              </a>
            </Link>

            <button
              onClick={toggleNavbar}
              className={classTwo}
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="icon-bar top-bar"></span>
              <span className="icon-bar middle-bar"></span>
              <span className="icon-bar bottom-bar"></span>
            </button>

            <div className={classOne} id="navbarSupportedContent">
              <ul className="navbar-nav m-auto align-item-baseline">
                {headers && headers.map((header) => {
                  return (
                    <li className="nav-item">
                      <Link href={header.link} key={header.key}>
                        <a className="nav-link text-black" onClick={e => e.preventDefault()}>
                          {header.label}
                          {/* <i className='bx bx-chevron-down'></i> */}
                        </a>
                      </Link>

                      {/* <ul className="dropdown-menu">
                                  <li className="nav-item">
                                      <Link href="/" activeClassName="active">
                                          <a className="nav-link">Home One</a>
                                      </Link>
                                  </li>

                                  <li className="nav-item">
                                      <Link href="/index-2" activeClassName="active">
                                          <a className="nav-link">Home Two</a>
                                      </Link>
                                  </li>

                                  <li className="nav-item">
                                      <Link href="/index-3" activeClassName="active">
                                          <a className="nav-link">Home Three</a>
                                      </Link>
                                  </li>

                                  <li className="nav-item">
                                      <Link href="/index-4" activeClassName="active">
                                          <a className="nav-link">Home Four</a>
                                      </Link>
                                  </li>
                                  
                                  <li className="nav-item">
                                      <Link href="/index-5" activeClassName="active">
                                          <a className="nav-link">Home Five</a>
                                      </Link>
                                  </li>
                              </ul> */}
                    </li>
                  )
                })}

              </ul>

              <div className="others-options">
                <Link href="/login">
                  <a className="default-btn">
                    Log In <i className="bx bx-log-in-circle"></i>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  )

}

// class Navbar extends Component {
//     _isMounted = false;
//     state = {
//         display: false,
//         collapsed: true
//     };
//     toggleNavbar = () => {
//         this.setState({
//             collapsed: !this.state.collapsed,
//         });
//     }
//     componentDidMount() {
//         let elementId = document.getElementById("navbar");
//         document.addEventListener("scroll", () => {
//             if (window.scrollY > 170) {
//                 elementId.classList.add("is-sticky");
//             } else {
//                 elementId.classList.remove("is-sticky");
//             }
//         });
//     }
//     componentWillUnmount() {
//         this._isMounted = false;
//     }

//     render() {
//         const { collapsed } = this.state;
//         const classOne = collapsed ? 'collapse navbar-collapse' : 'collapse navbar-collapse show';
//         const classTwo = collapsed ? 'navbar-toggler navbar-toggler-right collapsed' : 'navbar-toggler navbar-toggler-right';
//         return (
// <>
//     <div id="navbar" className="navbar-area fixed-top">
//         <nav className="navbar navbar-expand-md navbar-light">
//             <div className="container">
//                 <Link href="/">
//                     <a className="navbar-brand">
//                         <img src="/images/logo.png" alt="logo" />
//                     </a>
//                 </Link>

//                 <button 
//                     onClick={this.toggleNavbar} 
//                     className={classTwo}
//                     type="button" 
//                     data-toggle="collapse" 
//                     data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" 
//                     aria-expanded="false" 
//                     aria-label="Toggle navigation"
//                 >
//                     <span className="icon-bar top-bar"></span>
//                     <span className="icon-bar middle-bar"></span>
//                     <span className="icon-bar bottom-bar"></span>
//                 </button>

//                 <div className={classOne} id="navbarSupportedContent">
//                     <ul className="navbar-nav m-auto align-item-baseline">
//                         <li className="nav-item">
//                             <Link href="#">
//                                 <a className="nav-link text-black" onClick={e => e.preventDefault()}>
//                                     Trang chủ 
//                                     {/* <i className='bx bx-chevron-down'></i> */}
//                                 </a>
//                             </Link>

//                             {/* <ul className="dropdown-menu">
//                                 <li className="nav-item">
//                                     <Link href="/" activeClassName="active">
//                                         <a className="nav-link">Home One</a>
//                                     </Link>
//                                 </li>

//                                 <li className="nav-item">
//                                     <Link href="/index-2" activeClassName="active">
//                                         <a className="nav-link">Home Two</a>
//                                     </Link>
//                                 </li>

//                                 <li className="nav-item">
//                                     <Link href="/index-3" activeClassName="active">
//                                         <a className="nav-link">Home Three</a>
//                                     </Link>
//                                 </li>

//                                 <li className="nav-item">
//                                     <Link href="/index-4" activeClassName="active">
//                                         <a className="nav-link">Home Four</a>
//                                     </Link>
//                                 </li>

//                                 <li className="nav-item">
//                                     <Link href="/index-5" activeClassName="active">
//                                         <a className="nav-link">Home Five</a>
//                                     </Link>
//                                 </li>
//                             </ul> */}
//                         </li>

//                         <li className="nav-item">
//                             <Link href="#">
//                                 <a className="nav-link text-black" onClick={e => e.preventDefault()}>
//                                     Sản phẩm <i className='bx bx-chevron-down'></i>
//                                 </a>
//                             </Link>

//                             <ul className="dropdown-menu">
//                                 <li className="nav-item">
//                                     <Link href="/about-1" activeClassName="active">
//                                         <a className="nav-link">Ô tô</a>
//                                     </Link>
//                                 </li>

//                                 <li className="nav-item">
//                                     <Link href="/about-2" activeClassName="active">
//                                         <a className="nav-link">Xe máy</a>
//                                     </Link>
//                                 </li>

//                                 <li className="nav-item">
//                                     <Link href="/about-2" activeClassName="active">
//                                         <a className="nav-link">Con người</a>
//                                     </Link>
//                                 </li>
//                             </ul>
//                         </li>

//                         <li className="nav-item">
//                             <Link href="#">
//                                 <a className="nav-link text-black" onClick={e => e.preventDefault()}>
//                                     Ezcoin 
//                                     {/* <i className='bx bx-chevron-down'></i> */}
//                                 </a>
//                             </Link>

//                             {/* <ul className="dropdown-menu">
//                                 <li className="nav-item">
//                                     <Link href="/services" activeClassName="active">
//                                         <a className="nav-link">Services Style One</a>
//                                     </Link>
//                                 </li>

//                                 <li className="nav-item">
//                                     <Link href="/services-2" activeClassName="active">
//                                         <a className="nav-link">Services Style Two</a>
//                                     </Link>
//                                 </li>

//                                 <li className="nav-item">
//                                     <Link href="/services-3" activeClassName="active">
//                                         <a className="nav-link">Services Style Three</a>
//                                     </Link>
//                                 </li>

//                                 <li className="nav-item">
//                                     <Link href="/services-4" activeClassName="active">
//                                         <a className="nav-link">Services Style Four</a>
//                                     </Link>
//                                 </li>

//                                 <li className="nav-item">
//                                     <Link href="/service-details" activeClassName="active">
//                                         <a className="nav-link">Service Details</a>
//                                     </Link>
//                                 </li>
//                             </ul> */}
//                         </li>

//                         <li className="nav-item">
//                             <Link href="#">
//                                 <a className="nav-link text-black" onClick={e => e.preventDefault()}>
//                                     EzLife <i className='bx bx-chevron-down'></i>
//                                 </a>
//                             </Link>

//                             <ul className="dropdown-menu">
//                                 <li className="nav-item">
//                                     <Link href="/pricing" activeClassName="active">
//                                         <a className="nav-link">Ezin life</a>
//                                     </Link>
//                                 </li>

//                                 <li className="nav-item">
//                                     <Link href="#">
//                                         <a className="nav-link" onClick={e => e.preventDefault()}>
//                                             BH tai nạn <i className='bx bx-chevron-down'></i>
//                                         </a>
//                                     </Link>

//                                     {/* <ul className="dropdown-menu">
//                                         <li className="nav-item">
//                                             <Link href="/login" activeClassName="active">
//                                                 <a className="nav-link">Quyền lợi</a>
//                                             </Link>
//                                         </li>
//                                     </ul> */}
//                                 </li>

//                                 <li className="nav-item">
//                                     <Link href="/faq" activeClassName="active">
//                                         <a className="nav-link">Các quy tắc</a>
//                                     </Link>
//                                 </li>

//                                 <li className="nav-item">
//                                     <Link href="#">
//                                         <a className="nav-link" onClick={e => e.preventDefault()}>
//                                             TNDS <i className='bx bx-chevron-down'></i>
//                                         </a>
//                                     </Link>

//                                     {/* <ul className="dropdown-menu">
//                                         <li className="nav-item">
//                                             <Link href="/login" activeClassName="active">
//                                                 <a className="nav-link">TNDS xe máy</a>
//                                             </Link>
//                                         </li>

//                                         <li className="nav-item">
//                                             <Link href="/sign-up" activeClassName="active">
//                                                 <a className="nav-link">TNDS xe ô tô</a>
//                                             </Link>
//                                         </li>
//                                     </ul> */}
//                                 </li>

//                                 {/* <li className="nav-item">
//                                     <Link href="/terms-conditions" activeClassName="active">
//                                         <a className="nav-link">Terms & Conditions</a>
//                                     </Link>
//                                 </li> 

//                                 <li className="nav-item">
//                                     <Link href="/privacy-policy" activeClassName="active">
//                                         <a className="nav-link">Privacy Policy</a>
//                                     </Link>
//                                 </li>

//                                 <li className="nav-item">
//                                     <Link href="/coming-soon" activeClassName="active">
//                                         <a className="nav-link">Coming Soon</a>
//                                     </Link>
//                                 </li>

//                                 <li className="nav-item">
//                                     <Link href="/login" activeClassName="active">
//                                         <a className="nav-link">Log In</a>
//                                     </Link>
//                                 </li>

//                                 <li className="nav-item">
//                                     <Link href="/sign-up" activeClassName="active">
//                                         <a className="nav-link">Sign Up</a>
//                                     </Link>
//                                 </li> 

//                                 <li className="nav-item">
//                                     <Link href="/404" activeClassName="active">
//                                         <a className="nav-link">404 error</a>
//                                     </Link>
//                                 </li> */}
//                             </ul>
//                         </li>

//                         <li className="nav-item">
//                             <Link href="#">
//                                 <a className="nav-link text-black" onClick={e => e.preventDefault()}>
//                                     Tiện ích 
//                                     {/* <i className='bx bx-chevron-down'></i> */}
//                                 </a>
//                             </Link>

//                             {/* <ul className="dropdown-menu">
//                                 <li className="nav-item">
//                                     <Link href="/news-grid" activeClassName="active">
//                                         <a className="nav-link">News Grid</a>
//                                     </Link>
//                                 </li>

//                                 <li className="nav-item">
//                                     <Link href="/news-right-sidebar" activeClassName="active">
//                                         <a className="nav-link">News Right Sidebar</a>
//                                     </Link>
//                                 </li>

//                                 <li className="nav-item">
//                                     <Link href="/news-details" activeClassName="active">
//                                         <a className="nav-link">News Details</a>
//                                     </Link>
//                                 </li>
//                             </ul> */}
//                         </li>

//                         <li className="nav-item">
//                             <Link href="#">
//                                 <a className="nav-link text-black" onClick={e => e.preventDefault()}>
//                                     Đối tác 
//                                     {/* <i className='bx bx-chevron-down'></i> */}
//                                 </a>
//                             </Link>

//                             {/* <ul className="dropdown-menu">
//                                 <li className="nav-item">
//                                     <Link href="/contact" activeClassName="active">
//                                         <a className="nav-link">Contact Style One</a>
//                                     </Link>
//                                 </li>

//                                 <li className="nav-item">
//                                     <Link href="/contact-2" activeClassName="active">
//                                         <a className="nav-link">Contact Style Two</a>
//                                     </Link>
//                                 </li>
//                             </ul> */}
//                         </li>

//                         <li className="nav-item">
//                             <Link href="#">
//                                 <a className="nav-link text-black" onClick={e => e.preventDefault()}>
//                                     Trở thành EzStore 
//                                     {/* <i className='bx bx-chevron-down'></i> */}
//                                 </a>
//                             </Link>
//                         </li>
//                     </ul>

//                     <div className="others-options">
//                         <Link href="/login">
//                             <a className="default-btn">
//                                 Log In <i className="bx bx-log-in-circle"></i>
//                             </a>
//                         </Link>
//                     </div>
//                 </div>
//             </div>
//         </nav>
//     </div>
// </>
//         );
//     }
// }

export default Navbar;

