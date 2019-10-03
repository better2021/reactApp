import React from "react"
import PropTypes from "prop-types"
import styles from "./index.less"

// 无状态组件
const UserItem = props => {
  const { avatar_url, login, html_url } = props.user
  return (
    <div className={styles.card}>
      <div className={styles.pic}>
        <img src={avatar_url} alt="" className={styles.roundImg} />
      </div>
      <h3>{login}</h3>
      <p>
        <a href={html_url}>more</a>
      </p>
    </div>
  )
}

UserItem.propType = {
  user: PropTypes.object.isRequired
}

export default UserItem
