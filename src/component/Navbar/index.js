import React from "react"
import PropTypes from "prop-types"

/*
  无状态组件
 */
const Navbar = ({ icon, title }) => {
  //  设置默认属性值
  Navbar.defaultProps = {
    title: "Github Finder",
    icon: "fa fa-github"
  }

  // 定义属性类型
  Navbar.propTypes = {
    title: PropTypes.string.isRequired, // title 為必须的
    icon: PropTypes.string.isRequired
  }

  return (
    <div style={{ background: "pink", padding: "5px 0" }}>
      <i className={icon}>{title}</i>
    </div>
  )
}

export default Navbar
