
import React, { Component } from 'react'
import { Icon, Input } from 'semantic-ui-react'
import axios from 'axios'
import styles from './index.less'
let Spinner = require('react-spinkit');

const IconUp = ({ prevMusic }) => <Icon name='fast backward' className={styles.iconBtn} style={{ left: '50px' }} onClick={prevMusic} />
const IconDown = ({ nextMusic }) => <Icon name='fast forward' className={styles.iconBtn} style={{ right: '50px' }} onClick={nextMusic} />
const IconExampleDisabled = () => <Icon disabled name='play' style={{ position: 'absolute', transform: 'translateY(10px)', fontSize: '36px', color: '#007d78' }} />
const HotList = ({ list, hotClick }) => (
  <div className={styles.hotList}>{
    list.map((item, index) => {
      return (<span key={index} onClick={hotClick}>{item}</span>)
    })
  }</div>
)
const InputExampleIconElement = ({ text, change, search }) => (
  <Input value={text} onChange={change} icon={<Icon name='search' inverted circular link onClick={search} />} placeholder='Search...' style={{ width: '300px' }} />
)

class Music extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentIndex: -1,
      dataSorce: [],
      musicUrl: '',
      text: '',
      hotSearch: [],
      loading: false
    }
  }

  componentDidMount() {
    this.getMusicList() //获取音乐列表
    const hotMusic = localStorage.getItem('hotMusic')
    if (hotMusic) {
      this.setState({
        hotSearch: JSON.parse(hotMusic)
      })
    }
    window.addEventListener('keydown', this.audioFn, false)
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.audioFn, false)
  }

  audioFn = (event) => {
    const audioEle = this.audioEle
    if (event.keyCode === 32 && this.state.musicUrl) {
      if (audioEle.paused) {
        audioEle.play()
        const index = sessionStorage.getItem('musicIndex')
        this.setState({
          currentIndex: Number(index)
        })
      } else {
        audioEle.pause()
        this.setState({
          currentIndex: -1
        })
      }
    } else if (event.keyCode === 13) {
      this.handleSearch()
    }
  }

  handleClick(item, index) {
    //console.log(item, index)
    console.log(item.lrc)
    sessionStorage.setItem('musicIndex', index)
    this.setState({
      currentIndex: index
    }, () => {
      this.getCurrentMusic(item.songid)
    })
  }

  handleChange = (event) => {
    //console.log(event.target.value)
    this.setState({
      text: event.target.value
    })
  }

  //搜索
  handleSearch = () => {
    //console.log(this.state.text)
    const title = this.state.text;
    const audioEle = this.audioEle
    if (this.state.musicUrl) {
      audioEle.pause() //点击搜索后暂停音乐
      this.setState({
        currentIndex: -1
      })
    }

    if (title.trim() === '') {
      alert('请输入搜索的音乐名称')
    } else {
      this.getMusicList(title).then(() => {
        this.setState({
          text: ''
        })
      })
    }
  }

  //播放热门音乐
  playhotMusic = (event) => {
    //console.log(event.target.innerText)
    const title = event.target.innerText;
    this.getMusicList(title)
  }

  //获取音乐列表
  getMusicList = async (title = '喜欢') => {
    this.setState({
      loading: true
    })
    const res = await axios({
      url: 'https://api.apiopen.top/searchMusic',
      method: 'GET',
      params: { name: title },
    })

    if (res.status === 200) {
      //console.log(res.data);
      if (res.data.result.length !== 0) {
        let arr = [...new Set([...this.state.hotSearch, title])].slice(-5)
        this.setState({
          dataSorce: res.data.result,
          hotSearch: arr
        }, () => {
          localStorage.setItem('hotMusic', JSON.stringify(arr))
        })
      }
    } else {
      console.log(res.data.message)
    }
    setTimeout(() => {
      this.setState({
        loading: false
      })
    }, 1000)

  }

  //获取单个音乐文件url链接地址
  async getCurrentMusic(songId) {
    console.log(this.state.currentIndex)
    const res = await axios({
      url: 'https://api.imjad.cn/cloudmusic/',
      method: 'get',
      params: {
        type: 'song',
        id: songId,
        br: 128000
      }
    })
    if (res.status === 200) {
      console.log(res.data)
      if (res.data.data) {
        this.setState({
          musicUrl: res.data.data[0].url
        }, () => {
          console.log(this.state.musicUrl)
        })
      }
    } else {
      console.log(res.statusText)
    }
  }

  //上一曲
  prevClick = () => {
    if (this.state.currentIndex > 0) {
      this.setState((prevState) => ({
        currentIndex: prevState.currentIndex - 1
      }), () => {
        const index = this.state.currentIndex
        const data = this.state.dataSorce
        const songId = data[index].songid
        this.getCurrentMusic(songId)
      })
    } else {
      return false
    }
  }
  //下一曲
  nextClick = () => {
    if (this.state.currentIndex < this.state.dataSorce.length - 1) {
      this.setState((prevState) => ({
        currentIndex: prevState.currentIndex + 1
      }), () => {
        const index = this.state.currentIndex
        const data = this.state.dataSorce
        const songId = data[index].songid
        this.getCurrentMusic(songId)
      })
    } else {
      return false
    }
  }

  render() {
    return (<div className={styles.musicList}>
      {
        this.state.loading &&
        <div className={styles.loadingBox}>
          <Spinner name="line-scale" color="red" />
        </div>
      }
      <div className={styles.searchBox}>
        <InputExampleIconElement text={this.state.text} change={this.handleChange} search={this.handleSearch} />
        <HotList list={this.state.hotSearch} hotClick={this.playhotMusic} />
      </div>
      <ul>
        {
          this.state.dataSorce.map((item, index) => {
            return (
              <li key={index} onClick={() => this.handleClick(item, index)}>
                <div className={styles.musicBox}>
                  <img src={item.pic} alt={item.title} className={this.state.currentIndex === index ? styles.rotateGo : ''} />
                  {
                    this.state.currentIndex === index ? (<div className={styles.musicLoading}><Spinner name="line-scale-pulse-out" color="orange" /></div>) : (<IconExampleDisabled />)
                  }
                </div>
                <div className={styles.musicInfo}>
                  <p>作曲：{item.author}</p>
                  <p>{item.title}</p>
                </div>
              </li>
            )
          })
        }
      </ul>
      <div style={{ marginTop: '30px' }}>
        {
          this.state.musicUrl &&
          <div className={styles.audiobox} style={{ position: 'relative', width: '500px', margin: '0 auto' }}>
            {this.state.currentIndex !== 0 && <IconUp prevMusic={this.prevClick} />}
            <audio src={this.state.musicUrl} preload="auto" autoPlay controls loop ref={c => this.audioEle = c}></audio>
            {this.state.currentIndex !== this.state.dataSorce.length - 1 && <IconDown nextMusic={this.nextClick} />}
          </div>
        }
      </div>
    </div>)
  }
}

export default Music
