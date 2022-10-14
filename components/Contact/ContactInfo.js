import React, { Component } from 'react';

class ContactInfo extends Component {
  render() {
    return (
      <div className="contact-info-area pt-100 pb-70">
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-3 col-sm-6">
              <div className="single-contact-info">
                <i className="bx bx-envelope"></i>
                <h3>Email Us:</h3>
                <p><a href="mailto:baohiem@ezin.vn">baohiem@ezin.vn</a></p>
                <p>&nbsp;</p>
              </div>
            </div>

            <div className="col-lg-3 col-sm-6">
              <div className="single-contact-info">
                <i className="bx bx-phone-call"></i>
                <h3>Call Us:</h3>
                <p>Hotline  <a href="tel:02899966333">028.999.66.333</a></p>
                <p>Zalo  <a href="tel:0909088313">0909.088.313</a></p>
              </div>
            </div>

            <div className="col-lg-3 col-sm-6">
              <div className="single-contact-info">
                <i className="bx bx-location-plus"></i>
                <h3>TP.HCM</h3>
                <p>Tòa nhà Petro Vietnam, số 1-5 Lê Duẩn, Phường Bến Nghé, Quận 1</p>
              </div>
            </div>

            {/* <div className="col-lg-3 col-sm-6"> */}
            {/*   <div className="single-contact-info"> */}
            {/*     <i className="bx bx-support"></i> */}
            {/*     <h3>Live Chat</h3> */}
            {/*     <p>live chat all the time with our company 24/7</p> */}
            {/*   </div> */}
            {/* </div> */}
          </div>
        </div>
      </div >
    );
  }
}

export default ContactInfo;
