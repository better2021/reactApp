import React, { Fragment } from "react"

const Spinner = () => {
  const imgUrl =
    "https://cdn.dribbble.com/users/507701/screenshots/5267614/0916_3d______.gif"
  return (
    <div>
      <Fragment>
        <img
          src={imgUrl}
          alt="loading..."
          style={{ display: "block", width: "200px", margin: "auto" }}
        />
      </Fragment>
    </div>
  )
}

export default Spinner
