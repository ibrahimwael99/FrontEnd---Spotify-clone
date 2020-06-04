import React ,{ Component} from 'react';
import './RecentActivities.css'
import {connect} from "react-redux";
import * as actionTypes from "../../Store/actions";
import { BASEURL } from '../../Constants/BaseURL';
import  HomePageNavbar  from '../HomePage/HomePageNavbar';

/** Class RecentActivities 
 * @category RecentActivities
 * @extends Component
 */
export class RecentActivities extends Component{

    state={
         /**Text that shown when someone liked artist album
         * @memberof RecentActivities
         * @type {sring}
         */
        loveTextArtist:" liked your Album ",

        /**Text that shown when someone liked your playlist
         * @memberof RecentActivities
         * @type {sring}
         */
        loveTextUser:" liked your playlist ",

        /**Array of notifications
         * @memberof RecentActivities
         * @type {Array<notifications>}
         */
        notifications:[],
    }

    /**Function that is called when the component renders
   * @memberof RecentActivities
   * @func componentDidMount
   */
    componentDidMount(){
        
        /** A variable that contains URL 
         * @memberof RecentActivities
         * @type {string}
         */
        var url = BASEURL+ "/get-notification-user"; 
        const requestOptions = {
            method: 'GET',
          };
          fetch(url,requestOptions)
            .then((response) => { return response.json()})
            .then((data) => {
              this.setState({ 
               notifications:data.Notifications
              });
              
            })
            
            .catch((error)=>{console.log(error);
          
            })
    }

     /**Function to open the current notification linked page
   * @memberof RecentActivities
   * @func openPage
   * @param pageLink
   */
    openPage = (pageLink) =>
    {
        window.location.replace(pageLink);
    }

    /**Function to hide notification  
   * @memberof RecentActivities
   * @func hide
   * @param index
   */
    hide = (index) =>{
        this.state.notifications[index]=""
    }

    /**Function to mark unread notifications as read  
   * @memberof RecentActivities
   * @func MarkRead
   * @param index
   */
    MarkRead = (index) =>{
        this.state.notifications[index].status="read"
    }
    
    render(){
    return(
        <div>
            <HomePageNavbar/>
        <div className="recent-activities-page">
            <h2 className="notif-title"><i class="far fa-bell"></i> Notifications</h2>
            <div className="border-divider"></div>
                <div className=" container ">
                    
                { this.state.notifications.map((Card,index)=>(
                  <span>{Card!=""?
                <div key={index} className={Card.status=="unread" ? "row notifications unread":"row notifications read"  }>

                <div className="col-2 d-flex justify-content-center">
                {Card.actionType == "follow" ? <i class="fas fa-user-plus follow"></i>:null}
                {Card.actionType == "Like" ? <i class="fas fa-heart love"></i>:null}
                {Card.actionType == "recommend" ? <i class="fas fa-compact-disc recommend"></i>:null}
                {Card.actionType == "upload" ? <i class="fas fa-upload upload"></i>:null}
                </div>

                <div className="col-9 list-unstyled">
                {Card.actionType == "follow" ?
                <div> 
                    <li className="notification-main-content">{Card.actionMaker} started following you.</li>
                    <li className="date"><span>{Card.date}</span></li>
                </div>
                :null}
                {Card.actionType == "Like" ?
                <div onClick={()=>this.openPage('/webplayer/playlist')}> 
                    <li className="notification-main-content">{Card.actionMaker} {this.state.loveTextUser} {Card.playList}</li>
                    <li className="date"><span>{Card.date}</span></li>
                </div>
                :null}
                {Card.actionType == "recommend" ?
                <div> 
                    <li className="notification-main-content">Since you follow {Card.liked} you might like {Card.recommended}. CHECK IT!</li>
                    <li className="date"><span>{Card.date}</span></li>
                </div>
                :null}
                {Card.actionType == "upload" ?
                <div> 
                    <li className="notification-main-content">{Card.actionMaker} that you're following uploaded a new song. CHECK IT!</li>
                    <li className="date"><span>{Card.date}</span></li>
                </div>
                :null}
                </div>

            <div className="col-1">
                <div className="dropdown d-flex align-items-center ">
                    <a className="song-menu Menu mt-4" href="/account" id="Dropdown" data-toggle="dropdown" > ••• </a>
                    <div className="dropdown-menu notifi-dropdown-content dropdown-menu-right ">
                        <a onClick={()=>this.hide(index)} className="dropdown-item drop-class" href="#">Remove</a>
                        {Card.status=="unread" ? 
                        <a onClick={()=>this.MarkRead(index)} className="dropdown-item drop-class" href="#">Mark as read</a>
                        :null}
                    </div>
                </div>
            </div>
            </div>
            :null
        }</span>
                ))}
                </div>
            </div>
            </div>

                    
    )
    }
}

export default RecentActivities;