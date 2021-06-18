import React, { Component } from 'react'
import Main from './containers/Main';
import {Input, Layout, Menu } from 'antd'
import PubSub from 'pubsub-js'
import {QqOutlined,GithubOutlined,
  GitlabOutlined,AliwangwangOutlined,
  BugOutlined,RedditOutlined
} from '@ant-design/icons'
import { reqPets, showFeedback} from './utils';
import {Switch, Route, withRouter} from 'react-router-dom'

const {Header, Content, Sider} = Layout
class App extends Component {
  state = {
    value: '',
    data: {},
    collapsed: false
  }

  onCollapse = (collapsed)=>{
    this.setState({collapsed})
  }
  
  inputOnChange = (event)=>{
    const {value} = event.target
    this.setState({value})
  }

  onSearch=(value)=>{
    const promise = reqPets({name: value})
    promise.then(response=>{
      this.setState({data:response.data})
      this.props.history.replace(`/?name=${value}`)
      this.showResult()
    }).catch(err=>{
      showFeedback(err)
    })
  }

  searchByPettype = (node)=>{
    this.setState({value: ''})
    
    const promise = reqPets({type: node.key})
    promise.then(response=>{
      this.setState({data:response.data})
      this.props.history.push(`/pettypes/?type=${node.key}`)
      this.showResult()
    }).catch(err=>{
      showFeedback(err)
    })
  }

  showResult = ()=>{
    const {data} = this.state
    if(data.code!==200){
      showFeedback(data.msg)
    }else{
      PubSub.publish('result', data.newslist)
    }   
  }

  render() {
    const {collapsed} = this.state
    return (
      <div id='app'>
        <Layout style={{ minHeight: '100vh'}}>
          <Header style={{padding:20}}>
            <Input.Search placeholder="输入宠物名称" 
            value={this.state.value}
            onChange={this.inputOnChange}
            onSearch={this.onSearch} enterButton style={{width:200}} />
          </Header>
        
          <Layout>
            <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
              <Menu
              defaultSelectedKeys={['sub1']}
              defaultOpenKeys={['sub1']}
              mode="inline"
              theme="dark"
              >
                <Menu.SubMenu key="sub1" title='宠物类型' icon={<QqOutlined />}>
                  <Menu.Item key="0" icon={<GithubOutlined />} onClick={this.searchByPettype}>猫科</Menu.Item>
                  <Menu.Item key="1" icon={<GitlabOutlined />} onClick={this.searchByPettype}>犬科</Menu.Item>
                  <Menu.Item key="2" icon={<BugOutlined />} onClick={this.searchByPettype}>爬行类</Menu.Item>
                  <Menu.Item key="3" icon={<RedditOutlined />} onClick={this.searchByPettype}>小宠物类</Menu.Item>
                  <Menu.Item key="4" icon={<AliwangwangOutlined />} onClick={this.searchByPettype}>水族类</Menu.Item>
                </Menu.SubMenu>
              </Menu>
            </Sider>
        
            <Layout>
              <Content style={{padding: 20}}>
                <Switch>
                  <Route path='/pettypes' component={Main} />
                  <Route component={Main} />
                </Switch>
              </Content>
            </Layout>   
          </Layout>
        </Layout>  
      </div>
    )
  }
}

export default withRouter(App)