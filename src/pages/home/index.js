import React, { Component } from 'react';
import { Button, Icon, Label } from 'semantic-ui-react';
import { Divider, Form, Grid, Segment } from 'semantic-ui-react';
import axios from 'axios';
import styles from './index.less';

const ButtonExampleLabeledBasic = ({ count }) => (
  <div>
    <Button as="div" labelPosition="right">
      <Button color="red">
        <Icon name="heart" />
        Like
      </Button>
      <Label as="a" basic color="red" pointing="left">
        2,048
      </Label>
    </Button>
    <Button as="div" labelPosition="right">
      <Button basic color="blue">
        <Icon name="fork" />
        Fork
      </Button>
      <Label as="a" basic color="blue" pointing="left">
        {count}
      </Label>
    </Button>
  </div>
);

const DividerExampleVerticalForm = ({ login, text }) => (
  <Segment placeholder>
    <Grid columns={2} relaxed="very" stackable>
      <Grid.Column>
        <Form>
          <Button content="Login" primary onClick={login} />
        </Form>
      </Grid.Column>

      <Grid.Column verticalAlign="middle">
        <Button content="Sign up" icon="signup" size="big" />
      </Grid.Column>
    </Grid>

    <Divider vertical>{text}</Divider>
  </Segment>
);

class Home extends Component {
  state = {
    dataSource: []
  };

  componentDidMount() {
    this.getDate();
  }

  async getDate() {
    const res = await axios({
      url: 'http://admin-api.tgtestv.com/attr',
      method: 'GET',
      params: {
        page: 1,
        page_size: 20
      }
    });

    if (res.status === 200) {
      //console.log(res.data)
      this.setState({ dataSource: res.data.data });
    } else {
      console.log(res.data.message);
    }
  }

  handleClick(item) {
    //console.log(item.id, this.props)
    this.props.history.push({
      pathname: '/about',
      query: {
        id: item.id
      }
    });
  }

  //登录按钮
  loginClick = () => {
    //console.log(this.props)
    this.props.history.push({ pathname: '/video', params: { name: '登录' } });
  };

  render() {
    return (
      <div className={styles.homeBox}>
        <ButtonExampleLabeledBasic count={this.state.dataSource.length} />
        <DividerExampleVerticalForm login={this.loginClick} text="或者" />
        <ul>
          {this.state.dataSource.map((item, index) => {
            return (
              <li
                key={index}
                onClick={() => {
                  this.handleClick(item);
                }}
              >
                {item.name}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Home;
