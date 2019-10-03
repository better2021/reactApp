import React, { Component } from "react"
import PropTypes from "prop-types"

import UserItem from "./index"
import Spinner from "../spinner"
import styles from "./index.less"

class Item extends Component {
  static propTypes = {
    users: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
  }

  render() {
    const { users, loading } = this.props

    return loading ? (
      <Spinner />
    ) : (
      <div className={styles.wrap}>
        {users.map(user => (
          <UserItem user={user} key={user.id} />
        ))}
      </div>
    )
  }
}

export default Item
