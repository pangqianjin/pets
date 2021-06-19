import React, { Component } from 'react'
import {Typography, Divider, BackTop, Pagination} from 'antd'
import Pubsub from 'pubsub-js'
import {reqPets, showResult, showFeedback} from '../../utils'

const {Paragraph, Text} = Typography
const pettypes = {0:'猫科', 1:'犬科', 2:'爬行类', 3:'小宠物类', 4:'水族类'}
export default class Main extends Component {
    state = {
        newslist: [],
        current: 1,
        type: 0
    }

    componentDidMount(){
        // 从sessionStorage中读取缓存
        let newslist = window.sessionStorage.getItem('newslist')
        if(newslist!==undefined && newslist!==null)
            this.setState({newslist: JSON.parse(newslist)})

        Pubsub.subscribe('result', (_, newslist)=>{
            this.setState({newslist})
        })
    }

    componentWillUnmount(){
        Pubsub.unsubscribe('result')
    }

    onPageChange = (page)=>{
        this.setState({current: page})
        const type = this.state.newslist[0].pettype
        const promise = reqPets({type, page})
        promise.then(response=>{
            this.props.history.push(`/pettypes/?type=${type}&page=${page}`)
            showResult(response.data)
        }).catch(err=>{
            showFeedback(err)
        })
    }

    render() {
        const {newslist} = this.state 
        const displayPagination = newslist.length===0||newslist.length===1?'none':'block'

        return (
            <div>
                <BackTop />
                {
                newslist.map(news=>{
                    const {pettype, name, engName,
                        characters, nation, easyOfDisease,
                        life, price, desc, feature, characterFeature,
                        careKnowledge, feedPoints, url, coverURL
                        } = news
                    return <Typography key={url}>
                        <a style={{float: 'right'}} href={url}>
                        <img src={coverURL} alt={name} style={{width:'200px', height:'150px'}} />
                        </a>
                        <Paragraph> 
                            <ul>
                                <li><Text strong>宠物类型: </Text> {pettypes[pettype]}</li>
                                <li><Text strong>宠物名字: </Text> {name}</li>
                                <li><Text strong>宠物英文名: </Text> {engName}</li>
                                <li><Text strong>性格特点: </Text> {characters}</li>
                                <li><Text strong>祖籍: </Text> {nation}</li>
                                <li><Text strong>易患病: </Text> {easyOfDisease}</li>
                                <li><Text strong>寿命: </Text> {life}</li>
                                <li><Text strong>价格: </Text> {price?price:'未知'}</li>
                            </ul>
                        </Paragraph>
                        <Paragraph><Text strong>描述: </Text>{desc}</Paragraph>
                        <Paragraph><Text strong>体态特征: </Text>{feature}</Paragraph>
                        <Paragraph><Text strong>特点: </Text>{characterFeature}</Paragraph>
                        <Paragraph><Text strong>照顾须知: </Text>{careKnowledge}</Paragraph>
                        <Paragraph><Text strong>喂养注意: </Text>{feedPoints}</Paragraph>
                        <Divider/> 
                    </Typography>
                    })
                }
                <Pagination hideOnSinglePage pageSize={5}
                    style={{display:displayPagination}}
                    total={50} current={this.state.current}
                    onChange={this.onPageChange}/>
            </div>
        )
    }
}
