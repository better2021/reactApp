
import React, { Component } from 'react'
import { Card, Feed } from 'semantic-ui-react'

const CardExampleContentBlock = ({ time }) => (
  <Card>
    <Card.Content>
      <Card.Header>Recent Activity</Card.Header>
      <p>{time}</p>
    </Card.Content>
    <Card.Content>
      <Feed>
        <Feed.Event>
          <Feed.Label image='https://react.semantic-ui.com/images/avatar/small/jenny.jpg' />
          <Feed.Content>
            <Feed.Date content='1 day ago' />
            <Feed.Summary>
              You added <a>Jenny Hess</a> to your <a>coworker</a> group.
            </Feed.Summary>
          </Feed.Content>
        </Feed.Event>

        <Feed.Event>
          <Feed.Label image='https://react.semantic-ui.com/images/avatar/small/molly.png' />
          <Feed.Content>
            <Feed.Date content='3 days ago' />
            <Feed.Summary>
              You added <a>Molly Malone</a> as a friend.
            </Feed.Summary>
          </Feed.Content>
        </Feed.Event>

        <Feed.Event>
          <Feed.Label image='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' />
          <Feed.Content>
            <Feed.Date content='4 days ago' />
            <Feed.Summary>
              You added <a>Elliot Baker</a> to your <a>musicians</a> group.
            </Feed.Summary>
          </Feed.Content>
        </Feed.Event>
      </Feed>
    </Card.Content>
  </Card>
)

class videoList extends Component {
  constructor(props) {
    super(props)
    console.log(props.location)
  }

  render() {
    return (
      <div>
        <p>{JSON.stringify(this.props)}</p>
        <CardExampleContentBlock time={new Date().toLocaleString()} />
      </div>
    )
  }
}

export default videoList
