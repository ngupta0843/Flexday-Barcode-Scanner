import React from "react";

import Details from "./details/Details";

const Camera = ({productInfo, setProductInfo, camera, setCamera}) => {
  return (
    <div>
      <Details
        productInfo={productInfo}
        setProductInfo={setProductInfo}
        camera={camera}
        setCamera={setCamera}
      />
    </div>
  );
};

export default Camera;
