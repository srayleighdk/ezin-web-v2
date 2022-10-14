import React, { Component } from 'react';
import Link from 'next/link';
import { getImageUrl } from "../../utils/helpers";

class PageBanner extends Component {
    render() {

        let { pageTitle, img, name, homePageUrl, homePageText, activePageText } = this.props;

        return (
            <div className="page-title-area item-bg1 bg-white pt-banner pb-0">
                <div className="container">
                    <div className="page-title-content">
                        <img src={getImageUrl(img)} alt={name} style={{width: "100%"}} />
                        <h2 className="text-dark product-banner">{pageTitle}</h2>
                        {/* <ul>
                            <li>
                                <Link href={homePageUrl}>
                                    <a>{homePageText}</a>
                                </Link>
                            </li>
                            <li>{activePageText}</li>
                        </ul> */}
                    </div>
                </div>
            </div>
        );
    }
}

export default PageBanner;