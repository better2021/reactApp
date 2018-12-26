
import React, { Component } from 'react'
import { Card, Feed, Icon, Input } from 'semantic-ui-react'
import Weather from '../../component/weather'

const InputExampleIconElement = ({ text, change, search }) => (
  <Input value={text} onChange={change} icon={<Icon name='search' inverted circular link onClick={search} />} placeholder='Search...' style={{ width: '280px' }} />
)

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
              You added group.
            </Feed.Summary>
          </Feed.Content>
        </Feed.Event>

        <Feed.Event>
          <Feed.Label image='https://react.semantic-ui.com/images/avatar/small/molly.png' />
          <Feed.Content>
            <Feed.Date content='3 days ago' />
            <Feed.Summary>
              You added as a friend.
            </Feed.Summary>
          </Feed.Content>
        </Feed.Event>

        <Feed.Event>
          <Feed.Label image='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' />
          <Feed.Content>
            <Feed.Date content='4 days ago' />
            <Feed.Summary>
              You added group.
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
    this.weather = React.createRef()
  }

  state = {
    txt: ""
  }

  onChange = (event) => {
    this.setState({
      txt: event.target.value
    })
  }

  //搜索
  handleSearch = () => {
    let area = this.state.txt
    console.log(this.weather.current)
    this.weather.current.getData(area)
  }

  render() {
    return (
      <div>
        <p>{JSON.stringify(this.props)}</p>
        <Weather content={this.state.txt} ref={this.weather} />
        <CardExampleContentBlock time={new Date().toLocaleString()} />
        <InputExampleIconElement text={this.state.txt} change={this.onChange} search={this.handleSearch} />
      </div>
    )
  }
}

export default videoList
