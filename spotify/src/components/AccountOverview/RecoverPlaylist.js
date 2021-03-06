/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import {Button} from "reactstrap";
import { Link } from "react-router-dom";
/**
 * Class for the reviewing the notifications 
 */
class RecoverPlaylists extends Component {
  /**
   *
   * @param {Object} props
   * @param props.data_be Essentially contains the data of the users in the database after integrating with backend
   * @param props.isSignedIn Essentially used to check if a user is signed in or not
   * @param props.GetDeletedPlayList Essentially used in RecoverPlaylist for getting the playlists
   * @param props.deletedPlaylists Essentially used in RecoverPlaylist for getting the playlists
   */

  /**
   * Calls the function that recovers the deleted playlist
   */
  HandleDeletedPlaylist(userID,playlisId)
  {
    this.props.RecoverPlayList(userID,playlisId,this.props.token.token);
  }

  render() {
    let Redirect = "";
    if (this.props.isSignedIn.isSignedIn === null){
      Redirect=<Link to="/overview"></Link>
    }
    let RecoverPlaylist = "";
    if (this.props.isSignedIn.isSignedIn !== null){
        RecoverPlaylist = this.props.deletedPlaylists.deletedPlaylists.map((playlist) => {
        return(
          <div key= {playlist._id} >
            <div className="row">
              <div className="col-9">
                <h5 > 
                  {playlist.name} 
                </h5>
              </div>
              <div className="col-3"> 
                <div>
                  <Button 
                  onClick={()=>this.HandleDeletedPlaylist(this.props.data_be.data_be._id,playlist._id)}>
                    Restore
                  </Button>
                </div>   
              </div>
            </div>
            <hr />
          </div>
        )
      })
    }
    return (
      <div className="recover-playlists">
        {Redirect}
        <div className="row">
          <h2 className="RecoverPlaylistsHeader">Recover Playlists</h2>
          <p>Accidentally deleted a playlist? No worries, find the deleted playlist you'd like to recover below then click RESTORE to recover it.</p>
        </div>
        <hr></hr>
        {RecoverPlaylist}
      </div>
    );
  }
}
export default RecoverPlaylists;
