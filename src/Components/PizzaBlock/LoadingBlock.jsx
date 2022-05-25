import React from "react";
import ContentLoader from "react-content-loader"

function  LoadingBlock() {


    return (
        <ContentLoader
            className={"pizza-block"}
            speed={0}
            width={280}
            height={460}
            viewBox="0 0 280 460"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"

        >
            <rect x="561" y="179" rx="6" ry="6" width="88" height="6"/>
            <rect x="561" y="197" rx="6" ry="6" width="52" height="6"/>
            <rect x="513" y="227" rx="6" ry="6" width="410" height="6"/>
            <rect x="513" y="243" rx="63" ry="3" width="380" height="6"/>
            <rect x="513" y="259" rx="3" ry="3" width="178" height="6"/>
            <circle cx="533" cy="191" r="20"/>
            <rect x="522" y="154" rx="0" ry="0" width="201" height="109"/>
            <rect x="82" y="70" rx="0" ry="0" width="1" height="0"/>
            <rect x="89" y="71" rx="0" ry="0" width="1" height="0"/>
            <rect x="473" y="651" rx="0" ry="0" width="176" height="42"/>
            <circle cx="140" cy="140" r="140"/>
            <rect x="0" y="288" rx="0" ry="0" width="280" height="26"/>
            <rect x="0" y="329" rx="3" ry="3" width="281" height="84"/>
            <rect x="0" y="420" rx="3" ry="3" width="70" height="29"/>
            <rect x="143" y="415" rx="20" ry="20" width="130" height="42"/>
        </ContentLoader>
    )


}
export default  LoadingBlock;