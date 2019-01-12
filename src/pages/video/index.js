import React, { Component } from 'react';
import { Card, Feed, Icon, Input } from 'semantic-ui-react';
import Weather from '../../component/weather';

const url = require('url'); //属于nodejs的内置方法
const path = require('path'); //属于nodejs的内置方法
const crypto = require('crypto'); //属于nodejs的内置方法
const hash = crypto.createHash('md5');

// 可任意多次调用update():
hash.update('hello');
//hash.update('node');
//console.log(hash.update('hello'));
console.log(hash.digest('hex')); //生成md5加密后的字符

let Spinner = require('react-spinkit');
const InputExampleIconElement = ({ text, change, search }) => (
  <Input
    value={text}
    onChange={change}
    icon={<Icon name="search" inverted circular link onClick={search} />}
    placeholder="Search..."
    style={{ width: '280px' }}
  />
);

const CardExampleContentBlock = ({ time }) => (
  <Card>
    <Card.Content>
      <Card.Header>Recent Activity</Card.Header>
      <p>{time}</p>
    </Card.Content>
    <Card.Content>
      <Feed>
        <Feed.Event>
          <Feed.Label image="https://react.semantic-ui.com/images/avatar/small/jenny.jpg" />
          <Feed.Content>
            <Feed.Date content="1 day ago" />
            <Feed.Summary>You added group.</Feed.Summary>
          </Feed.Content>
        </Feed.Event>

        <Feed.Event>
          <Feed.Label image="https://react.semantic-ui.com/images/avatar/small/molly.png" />
          <Feed.Content>
            <Feed.Date content="3 days ago" />
            <Feed.Summary>You added as a friend.</Feed.Summary>
          </Feed.Content>
        </Feed.Event>

        <Feed.Event>
          <Feed.Label image="https://react.semantic-ui.com/images/avatar/small/elliot.jpg" />
          <Feed.Content>
            <Feed.Date content="4 days ago" />
            <Feed.Summary>You added group.</Feed.Summary>
          </Feed.Content>
        </Feed.Event>
      </Feed>
    </Card.Content>
  </Card>
);

class videoList extends Component {
  constructor(props) {
    super(props);
    this.weather = React.createRef();
  }

  state = {
    txt: ''
  };

  onChange = event => {
    this.setState({
      txt: event.target.value.trim()
    });
  };

  //搜索
  handleSearch = () => {
    let area = this.state.txt;
    console.log(this.weather.current);
    this.weather.current.getData(area);
  };

  // 生命周期相当于vue的mount
  componentDidMount() {
    const curUrl = window.location.href;
    const workDir = path.resolve('.'); //解析当前目录
    console.log(path.join(workDir, 'video', 'index.html')); //组合完整的文件路径:当前目录+'video'+'index.html':
    console.log(url.parse(curUrl)); //通过parse()将一个字符串解析为一个Url对象
  }

  render() {
    return (
      <div>
        <p>{JSON.stringify(this.props)}</p>
        <Weather content={this.state.txt} ref={this.weather} />
        <CardExampleContentBlock time={new Date().toLocaleString()} />
        <InputExampleIconElement
          text={this.state.txt}
          change={this.onChange}
          search={this.handleSearch}
        />
        <div style={{ marginLeft: '30px' }}>
          <Spinner name="pacman" color="coral" />
        </div>
      </div>
    );
  }
}

export default videoList;
