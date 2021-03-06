import axios from "axios";
import * as ActionTypes from "./ActionTypes";
import {
  baseUrl,
  SignUpUrl,
  SignInUrl,
  PremiumUrl,
  PlaylistsUrl,
  CategoriesUrl,
  FollowURL,
  UnFollowURL, AllSongsUrl,
  AlbumsUrl,
  Confirmation,
  GetSongsByCategory,
  RecoverPlayListUrl,
  RecoverUrl,
  AddToQueueUrl,
  RemoveFromQueueUrl,
  GetQueueUrl,
  LikeSongUrl,
  DisLikeSongUrl,
  FollowArtistUrl,
  UnFollowArtistUrl,
  ShareSongUrl
} from "../shared/baseUrl";
import { ArtistsUrl } from "./../shared/baseUrl";


/**
 * Mocking
 */
export const fetchUserData = () => (dispatch) => {
  return fetch(baseUrl + "users")
    .then((response) => response.json())
    .then((data) => dispatch(addUserData(data)));
  // axios.get(`${baseUrl3}`)
  // .then(data => dispatch(addUserData(JSON.stringify(data))));
};
/**
 * Mocking
 * @param {Object} data 
 */
export const addUserData = (data) => ({
  type: ActionTypes.ADD_USERDATA,
  payload: data,
});
export const GetPassword = (id) => (dispatch) => {
  axios
    .get(`${baseUrl}users/${id - 1}`)
    .then((response) => JSON.stringify(response.data.password));
};

export const PostPassword = (password, id) => (dispatch) => {
  const newPassword = { password: password };
  axios.patch(`${PremiumUrl}/${id}`, newPassword);
};
/**
 * This function handels the sign up with facebook 
 * @param {String} email 
 * @param {URL} image 
 * @param {String} name 
 */
export const postFacebookLogin = (email, image, name) => (dispatch) => {
  const newFacebookLogin = {
    email,
    image,
    name,
  };
  newFacebookLogin.date = new Date().toISOString();
  newFacebookLogin.premium = false;
  axios.post(`${baseUrl}users`, newFacebookLogin).then((response) => {
    //here i want to get the id of the last elment i posted from the
    let id = response.data.id; // comming response which is coming in jason format and then i need
    dispatch(addUserId(id)); //to send it to the function addUserId to add it in my store
    // alert(response.data.id)
  });
  // .then((response) => alert(JSON.parse(response)));
};

/**
 * Mocking
 * @param {Number} id 
 */
export const handleLoginId = (id) => (dispatch) => {
  dispatch(addUserId(id));
};
/**
 * Mocking
 * @param {Number} id 
 */
export const addUserId = (data) => ({
  type: ActionTypes.ADD_USERID,
  payload: data,
});
/**
 * Mocking
 * @param {Number} id 
 */
export const getEmail = (id) => (dispatch) => {
  return axios
    .get(`${baseUrl}users/${id - 1}`)
    .then((response) => JSON.stringify(response.data.email));
};

/**
 * Mocking
 * @param {Number} id 
 */
export const getPassword = (id) => (dispatch) => {
  axios.get(`${baseUrl}users/${id - 1}`).then((response) => {
    return response.data.password;
  });
};
/**
 * Mocking
 * @param {Number} id 
 */
export const handleLogoutId = (id) => (dispatch) => {
  dispatch(removeUserId(id));
  // dispatch(removeUserData());
};
// export const removeUserData= () => ({
//   type: ActionTypes.REMOVE_USERDATA
// });
/**
 * Mocking 
 */
export const removeUserId = (id) => ({
  //it recieves an empty string
  type: ActionTypes.ADD_LOGOUT,
  payload: id,
});
/**
 * Mocking 
 */
export const getArtist = (id) => (dispatch) => {
  axios
    .get(`${baseUrl}artists/${id}`)
    .then((response) => dispatch(console.log(response.name)));
};
/*
export const getPopularSongs = id => dispatch => {
  axios.get(`${baseUrl}artists/${id - 1}`).then(response => {
    return response.data.popularSongs;
  });
}

export const getAlbums = id => dispatch => {
  axios.get(`${baseUrl}artists/${id - 1}`).then(response => {
    return response.data.albums;
  });
}

export const getAbout = id => dispatch => {
  axios.get(`${baseUrl}artists/${id - 1}`).then(response => {
    return response.data.about;
  });
}*/
/**
 * Mocking 
 */
export const fetchUserPlaylist = () => (dispatch) => {
  axios
    .get(`${baseUrl}playlist`)
    .then((response) => dispatch(addUserPlaylist(response.data)));
};
/**
 * Mocking 
 */
export const addUserPlaylist = (data) => ({
  type: ActionTypes.ADD_PLAYLIST,
  payload: data,
});
/**
 * Mocking 
 */
export const fetchArtist = () => (dispatch) => {
  axios
    .get(`${baseUrl}artists`)
    .then((response) => dispatch(addArtist(response.data)));
};
/**
 * Mocking 
 */
export const addArtist = (data) => ({
  type: ActionTypes.ADD_ARTIST,
  payload: data,
});
/**
 * Mocking 
 */
export const fetchAlbum = () => (dispatch) => {
  axios
    .get(`${baseUrl}albums`)
    .then((response) => dispatch(addAlbum(response.data)));
};
/**
 * Mocking 
 */
export const addAlbum = (data) => ({
  type: ActionTypes.ADD_ALBUM,
  payload: data,
});
// export const removeUserPlayList= () => ({
//   type: ActionTypes.REMOVE_PLAYLIST
// });
/////////////////////////////////////////////////////// Not Mocking//////////////////////////////////
/**
 * it takes the user email and password entered in the sign im page and Post it to the database if it exist it will pass
 * and i will get his data by getting userdata by id and set the state of isSignedIn to true also i get the categories to
 *  be rendered in the home of web player if the user is not signed in 
 * and if the user is not exist in the data base i set the isSignedIn to false    
 * @param {Object} data 
 */

export const handleSignIn_BE = (data) => (dispatch) => {
  axios
    .post(SignInUrl, data)
    .then((response) => {
      console.log("Response from sign in", response);
      dispatch(addLogin(true));
      var token = response.data.token;
      const Authstr = "Bearer ".concat(token);
      test(response.data.user._id, token);
      dispatch(addToken(token));
      axios
        .get(`${SignUpUrl}/${response.data.user._id}`, {
          headers: { Authorization: Authstr },
        })
        .then((response2) =>
          dispatch(addUserData_BE(response2.data.data.user))
        );
      axios
        .get(`${CategoriesUrl}`)
        .then((response2) =>
          dispatch(addCategories(response2.data.data.Categories))
        );
      axios
        .get(`${ArtistsUrl}`)
        .then((response2) =>

          dispatch(addAllArtists(response2.data.data.artists))
        );
      axios
        .get(`${AllSongsUrl}`)
        .then((response2) =>
          dispatch(addAllTracks(response2.data.data.tracks))
        );
    })
    .catch((error) => dispatch(addLogin(false)));
};
const publicVapidKey =
  "BDGd6_hu_pl5u_eEPBImTWFn5WBzDPHoXucwGEIx8-aNq8AtrAa_V5W1MlJbduW5SoB3_r3UyYMQmRM-lGetgg0";

// Check for service worker
export const test = (id, token) => {
  if ("serviceWorker" in navigator) {
    send(id, token).catch(err => console.error(err));
  }
}

async function send(id, token) {
  // Register Service Worker
  console.log("Registering service worker...");
  const swUrl = `${process.env.PUBLIC_URL}/service-worker-custom.js`
  const register = await navigator.serviceWorker.register(swUrl);
  console.log("Service Worker Registered...");

  // Register Push
  console.log("Registering Push...");
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
  });
  console.log("Push Registered...");

  // Send Push Notification
  console.log("Sending Push...");
  const body =
  {
    pushSubscription: subscription
  }
  const Authstr = "Bearer ".concat(token);
  axios.post(`${SignUpUrl}/me/update-push`, body, {
    headers: { Authorization: Authstr },
  })
    .then(response => console.log(response))
    .catch(err => console.log(err));
  // await fetch(`${SignUpUrl}/${id}/update-push`, {
  //   method: "POST",
  //   body: JSON.stringify({
  //     subscription: subscription
  //   }),
  //   headers: {
  //     "content-type": "application/json"
  //   }
  // }).catch(err=>console.log(err));
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export const postupdatedFeedback = (id, isemail, isage, isID, country, token) => (dispatch) => {
  const Authstr = "Bearer ".concat(token);

  const newFeedback = {
    email: isemail,
    age: isage,
    name: isID,
    country: country
  };
  axios.patch(`${PremiumUrl}/${id}`, newFeedback, {
    headers: { Authorization: Authstr },
  });
};
////////////////////////////////////For Handling the playlist either adding or removing it from the playlist /////////////////////////////////
/**
 * This function handles the playlist either adding or removing it from the playlist
 */
export const PatchAddPlaylist = (idPlaylist, idSong, token) => (dispatch) => {
  const Authstr = "Bearer ".concat(token);

  axios.patch(`${PlaylistsUrl}/tracks/${idPlaylist}/${idSong}`, {
    headers: { Authorization: Authstr },
  })
    .then(response => console.log(response.data));
};
export const DeleteAddPlaylist = (idPlaylist, idSong, token) => (dispatch) => {
  const Authstr = "Bearer ".concat(token);

  axios.patch(`${PlaylistsUrl}/deleteTrack/${idPlaylist}/${idSong}`, {
    headers: { Authorization: Authstr },
  })
    .then(response => console.log(response.data));
};
export const addToken = (data) => ({
  type: ActionTypes.ADD_TOKEN,
  payload: data,
});
export const handleChangeData_BE = (id, token) => (dispatch) => {
  const Authstr = "Bearer ".concat(token);
  axios
    .get(`${SignUpUrl}/${id}`, {
      headers: { Authorization: Authstr },
    })
    .then((response) =>
      dispatch(addUserData_BE(response.data.data.user))
    );
};
export const addAllTracks = (data) => ({
  type: ActionTypes.ADD_FULLSONGS,
  payload: data,
});
export const addAllArtists = (data) => ({
  type: ActionTypes.ADD_FULLARTISTS,
  payload: data,
});

/**
 * 
 * @param {*} data 
 */
export const addCategories = (data) => ({
  type: ActionTypes.ADD_CATEGORIES,
  payload: data,
});
export const addUserData_BE = (data) => ({
  type: ActionTypes.ADD_USERDATA_BE,
  payload: data,
});
export const addLogin = (data) => ({
  type: ActionTypes.ADD_LOGIN,
  payload: data,
});
////////////////////////sign up ///////////////////////////////
/**
 * it is not used yet but this will reset the userstate with null 
 */
export const makeSignupRedirectable = () => (dispatch) => {
  dispatch(addUser(null));
};
////////////////////////////////////////fetch Playlist by id/////////////////////
// export const fetchPlaylistById_be = (id) => dispatch => {
//   axios.get(`${PlaylistsUrl}${id}`)
//   .then(response => console.log(response))
// };
// export const addPlayList = data => ({
//   type: ActionTypes.ADD_PLAYLIST_BYID,
//   payload: data
// });
//////////////////////////////log out///////////////////////////
/**
 * When we call it function if dispatch the action of logout so it empty the data considered with the Backend
 */
export const handleLogout_BE = () => (dispatch) => {
  dispatch(LogOut_BE());
};
/**
 * The action of Logout
 */
export const LogOut_BE = () => ({
  type: ActionTypes.ADD_LOGOUT_BE,
});
////////////////////currnt playlist////////////
/**
 * This function takes the id of the playlist we are going to render and request the data of it from the data base to be rendered 
 * in the playlist interface and put in a state we called currentplayList  
 * @param {String} id 
 */
export const handleCurrentPlayList = (id, token) => (dispatch) => {
  dispatch(CurrentLoading(true));
  const Authstr = "Bearer ".concat(token);

  axios
    .get(`${PlaylistsUrl}/${id}`, {
      headers: { Authorization: Authstr },
    })
    .then((response) =>
      dispatch(addCurrentPlaylist(response.data.data.playlist))
    );
};


// export const handleCurrentQueue = (queue) => (dispatch) => {
//   dispatch(CurrentLoading(true));
//   dispatch(addCurrentPlaylist(queue))
// };

/**
 * This function takes the id of the artist we are going to render and request the data of it from the data base to be rendered 
 * in the playlist interface and put in a state we called currentplayList  
 * @param {String} id 
 */
export const handleCurrentArtists = (id, token) => (dispatch) => {
  dispatch(CurrentLoading(true));
  const Authstr = "Bearer ".concat(token);

  axios
    .get(`${ArtistsUrl}/${id}`, {
      headers: { Authorization: Authstr },
    })
    .then((response) =>
      dispatch(addCurrentPlaylist(response.data.data.artist))
    );
};
/**
 * This function takes the id of the Album we are going to render and request the data of it from the data base to be rendered 
 * in the playlist interface and put in a state we called currentplayList  
 * @param {String} id 
 */
export const handleCurrentAlbums = (id, token) => (dispatch) => {
  dispatch(CurrentLoading(true));
  const Authstr = "Bearer ".concat(token);

  axios
    .get(`${AlbumsUrl}/${id}`, {
      headers: { Authorization: Authstr },
    })
    .then((response) => dispatch(addCurrentPlaylist(response.data.data.album)));
};
/**
 * This is the action that when it is called the data of the current playlist, Album or Artist is stored in currentPlaylist
 * @param {Object} data 
 */
export const addCurrentPlaylist = (data) => ({
  type: ActionTypes.ADD_CURRENT_PLAYLIST,
  payload: data,
});
/**
 * New technique we are going to use in many functions in the future as waiting the data to be geted from the server 
 * we will put the isLoading of each state with true so we will render a certain component and when the data will came
 * the isLoading will be false and the actual component will be rendered 
 */
export const CurrentLoading = () => ({
  type: ActionTypes.CURRENT_LOADING,
});

/**
 * Takes the data of the user and put it in data_be 
 * @param {Object} data 
 */
export const addUser = (data) => ({
  type: ActionTypes.ADD_USER,
  payload: data,
});

export const patchedunfollow = (iduser, idplaylist, token) => (dispatch) => {
  const data = { id: iduser };
  console.log(data);
  const Authstr = "Bearer ".concat(token);

  axios.patch(`${UnFollowURL}/${idplaylist}`, data, {
    headers: { Authorization: Authstr },
  });
};
export const patchedfollow = (iduser, idplaylist, token) => (dispatch) => {
  const data = { id: iduser };
  const Authstr = "Bearer ".concat(token);

  console.log(data);
  axios.patch(`${FollowURL}/${idplaylist}`, data, {
    headers: { Authorization: Authstr },
  });
};
//=============================Sign Up==================================
/**
 * this functions saves all the data that the user enters while signing up + saves the random code that is sent to the
 * useer email so when the user enters the righ code the saved data is send to PostFeedback that handels the sign up
 * @param {Object} data 
 */
export const ForSignUpVerification = (data) => (dispatch) => {
  dispatch(addNewUser(data));
};
/**
 * the action that saves the signup data in a state to be used when the user enters the righ code
 * @param {Object} data 
 */
export const addNewUser = (data) => ({
  type: ActionTypes.ADD_NEW_USER,
  payload: data,
});
/**
 * This Function controls the modal appears in many cases for example the moadl appears in the Sign up 
 * to enter the code required
 * @param {Boolean} data 
 */
export const ControlModal = (data) => (dispatch) => {
  dispatch(changeModalState(data));
  //  dispatch(Play());

};
/**
 * this action changes the state of the Modal 
 * @param {Boolean} data 
 */
export const changeModalState = (data) => ({
  type: ActionTypes.CONTROLMODAL,
  payload: data,
});
/**
* I takes an object that Contains_All_The_Required_Data_To_SignUp and post it to the data base and if the email is already exist it will set the user state to false 
* else it will be true 
* @param {Object} newFeedback
*/
export const postFeedback = (
  newFeedback
) => (dispatch) => {

  newFeedback.date = new Date().toISOString();
  newFeedback.premium = false;
  var d = new Date();
  var n = d.getFullYear();
  newFeedback.age = n - newFeedback.year;
  axios
    .post(`${SignUpUrl}/SignUp`, newFeedback)
    .then((response) => {
      console.log(response.data.data.token);
      console.log(response.data.data.id);
      const body = {
        id: response.data.data.id
      }
      axios.patch(`${Confirmation}/${response.data.data.token}`, body).then(
        response => {
          dispatch(addUser(true))
        }
      )
    })
    .catch((error) => {
      console.log(error);
      dispatch(addUser(false))
    });
};
export const PremiumPost = (id, isPremium, token) => (dispatch) => {
  const data = {
    premium: isPremium,
    previouslyPremium: true,
  };
  const Authstr = "Bearer ".concat(token);

  // data.date = new Date().toISOString();
  axios.patch(`${PremiumUrl}/${id}`, data, {
    headers: { Authorization: Authstr },
  });
  // .then(response => alert(response.data.premium ));
};
//======================The Play Footer========================================
/**
 * This Function sets the Song that the footer will play in a state 
 * @param {Object} songSrc 
 */
export const PlayTheFooter = (songSrc) => (dispatch) => {
  dispatch(addSongSrc(songSrc));
  //  dispatch(Play());
};
/**
 * the action that sets the state of the Song 
 * @param {Object} data 
 */
export const addSongSrc = (data) => ({
  type: ActionTypes.CURRENT_SONG_URL,
  payload: data,
});
/**
 * this takes the previous song and save it in a state to get it when the user press the previous song 
 * @param {Object} songSrc 
 */
export const AddPrevSong = (songSrc) => (dispatch) => {
  dispatch(addPrevSong(songSrc));
  //  dispatch(Play());

};
/**
 * the action that sets the state of the previous song 
 * @param {object} data 
 */
export const addPrevSong = (data) => ({
  type: ActionTypes.ADD_PREVIOUS,
  payload: data,
});
//=======================Shuffle======================
/**
 * This function Starts the shuffle and dispatch the action Play that put the shuffle state with true
 */
export const PlayShuffle = () => (dispatch) => {
  dispatch(Play());
};
export const Play = () => ({
  type: ActionTypes.START_SHUFFLE
});
/**
  * This function Pauses the shuffle and dispatch the action Pause that put the shuffle state with false
  */
export const PauseShuffle = () => (dispatch) => {
  dispatch(Pause());
};
export const Pause = () => ({
  type: ActionTypes.PAUSE_SHUFFLE
});
/**
 * Not Used
 * @param {*} progress 
 */
export const ChangeSongProgress = (progress) => (dispatch) => {
  dispatch(songProgress(progress));
};
/**
 * Not Used
 * @param {*} data 
 */
export const songProgress = (data) => ({
  type: ActionTypes.CHANGE_SONG_PROGRESS,
  payload: data,
});
/**
 * Not Used
 * @param {*} progress_mode 
 */
export const ChangeProgressMode = (progress_mode) => (dispatch) => {
  dispatch(progressMode(progress_mode));
};
/**
 * Not Used
 * @param {*} data 
 */
export const progressMode = (data) => ({
  type: ActionTypes.CHANGE_PROGRESS_Mode,
  payload: data,
});
/**
 * Not Used
 * @param {*} progress_dirty 
 */
export const ChangeProgressDirty = (progress_dirty) => (dispatch) => {
  dispatch(progressDirty(progress_dirty));
};
/**
 * Not Used
 * @param {*} data 
 */
export const progressDirty = (data) => ({
  type: ActionTypes.CHANGE_PROGRESS_Dirty,
  payload: data,
});
/**
 * Not Used
 * @param {*} time 
 */
export const ChangeTotalTime = (time) => (dispatch) => {
  dispatch(totalTime(time));
};
/**
 * Not Used
 * @param {*} data 
 */
export const totalTime = (data) => ({
  type: ActionTypes.TOTAL_TIME,
  payload: data,
});
/**
 * Not Used
 * @param {*} time 
 */
export const ChangeCurrentTime = (time) => (dispatch) => {
  dispatch(currentTime(time));
};
/**
 * Not Used
 * @param {*} data 
 */
export const currentTime = (data) => ({
  type: ActionTypes.CURRENT_TIME,
  payload: data,
});
//========================= Read Notifications===============================
/**
 *  Hashish
 * @param {*} UserId 
 * @param {*} notificationid 
 * @param {*} token 
 */
export const ReadNotifications = (UserId, notificationid, token) => (dispatch) => {
  const data = { read: true };
  const Authstr = "Bearer ".concat(token);
  // data.date = new Date().toISOString();
  console.log(data);
  axios.patch(`http://localhost:3000/api/v1/users/me/notifications/${notificationid}`, data, {
    headers: { Authorization: Authstr }
  })
    .then(response => {
      axios
        .get(`${SignUpUrl}/${UserId}`, {
          headers: { Authorization: Authstr },
        })
        .then((response) =>
          dispatch(addUserData_BE(response.data.data.user))
        );
    })
};
//========================= Share Songs ===============================
/**
 * This function takes the id of the track that will be shared, the email of the user that the 
 * user will share this song with and the token of the signed user for authentication and make post request 
 * for the back end to handle it
 * @param {String} trackid 
 * @param {String} recEmail 
 * @param {String} token 
 */
export const ShareSongs = (trackid, recEmail, token) => (dispatch) => {
  const data = {
    recipientEmail: recEmail,
    trackId: trackid
  };
  const Authstr = "Bearer ".concat(token);

  console.log(data);
  axios.post(`${ShareSongUrl}`, data, {
    headers: { Authorization: Authstr },
  }).then(response=> console.log(response,data))
  .catch(err => console.log(err));
};

//==================================Artist Module=================================
/**
 *this function takes the id of an artist and updates its information with the parameters 
 * @param {String} id 
 * @param {String} isemail 
 * @param {String} Bio 
 * @param {String} Name
 * @param {String} Image
 */export const postUpdatedArtist = (id, isemail, bio, Name, Image, token) => (dispatch) => {
  const Authstr = "Bearer ".concat(token);

  const newArtist = {
    name: Name,
    email: isemail,
    Bio: bio,
    image: Image
  };
  axios.patch(`${ArtistsUrl}/${id}`, newArtist, {
    headers: { Authorization: Authstr },
  });
};

//=================================Create New Playlist================
/**
 * This Function takes the user that creates the playlist and the name of the new playlsit and the token of the signed user 
 * for authentication and makes a post request for the backend then we get the user's updated data to have the new playlist added to
 * users data we save 
 * @param {String} userID 
 * @param {String} playlist_Name 
 * @param {String} token 
 */
export const CreatePlayList_BE = (userID, playlist_Name, token) => (dispatch) => {
  const data = {
    name: playlist_Name,
    image: "https://iwitness.com.ng/wp-content/uploads/2018/08/unnamed-1484220845.png",
    description: "Private PlayList",
    tracks: [],
    artists: [],
    author: "5e877b8fae42032b7c867feb",
    followers: [userID],
    likers: [],
  };
  const Authstr = "Bearer ".concat(token);
  axios.post(`${PlaylistsUrl}/${userID}`, data, {
    headers: { Authorization: Authstr },
  })
    .then(response => {
      axios
        .get(`${SignUpUrl}/${userID}`, {
          headers: { Authorization: Authstr },
        })
        .then((response) =>
          dispatch(addUserData_BE(response.data.data.user))
        );
    })
    .catch(error => console.log(error));
}
//============================Add Song Id=================================
/**
 * Ezzat 
 * @param {} data 
 */
export const AddSong_inPlaylist_id = (data) => (dispatch) => {
  dispatch(addSongID(data));
}
export const addSongID = (data) => ({
  type: ActionTypes.ADDSONGID,
  payload: data,
});
//===================Get Deleted PlayList ====================================
/**
 * Gets the User Deleted PlayList to render it 
 * @param {*} UserId 
 * @param {*} token 
 */
export const GetDeletedPlayList = (UserId, token) => (dispatch) => {
  console.log("entered here");
  const Authstr = "Bearer ".concat(token);
  axios.get(`${RecoverPlayListUrl}/${UserId}`, {
    headers: { Authorization: Authstr }
  })
    .then(response => {
      dispatch(addDeletedPlaylists(response.data.data.playlist_array))
    })
    .catch(error => console.log(error));
}
/**
 * the action that sets tha state with the user deleted playlsit
 * @param {*} data 
 */
export const addDeletedPlaylists = (data) => ({
  type: ActionTypes.ADD_DELETED_PLAYLISTS,
  payload: data,
});
//=================== Recover PlayList ====================================
/**
 * the function that recovers the deleted playlist and put it back in the users playlist
 * @param {*} userID 
 * @param {*} PlaylistId 
 * @param {*} token 
 */
export const RecoverPlayList = (userID, PlaylistId, token) => (dispatch) => {
  const data = {
    id: userID
  }
  const Authstr = "Bearer ".concat(token);
  axios.patch(`${RecoverUrl}/${PlaylistId}`, data, {
    headers: { Authorization: Authstr },
  })
    .then(response => {
      axios
        .get(`${SignUpUrl}/${userID}`, {
          headers: { Authorization: Authstr },
        })
        .then((response) =>
          dispatch(addUserData_BE(response.data.data.user))
        );
    })
    .catch(error => console.log(error));
}
//=====================Get Songs by Generes===============================
/**
 * Hashish
 * @param {*} categoryId 
 * @param {*} token 
 */
export const GetSongsByGeneres = (categoryId, token) => (dispatch) => {
  dispatch(ShowSongsByCategoryLoading());
  const Authstr = "Bearer ".concat(token);

  axios.get(`${GetSongsByCategory}/${categoryId}`, {
    headers: { Authorization: Authstr },
  })
    .then(response => dispatch(addTracksByCategory(response.data.data.array)))
    .catch(err => console.log(err));
}
export const addTracksByCategory = (data) => ({
  type: ActionTypes.ADD_SONGS_BY_CATEGORY,
  payload: data,
});
export const ShowSongsByCategoryLoading = () => ({
  type: ActionTypes.SONGS_BYCATEGORY_LOADING,
});
//==================================Queue=================================
/**
 * Hashish 
 * @param {*} userId 
 * @param {*} token 
 */
export const GetQueue = (userId, token) => (dispatch) => {
  dispatch(AddQueueLoading());
  const Authstr = "Bearer ".concat(token);
  axios.get(`${GetQueueUrl}/${userId}`, {
    headers: { Authorization: Authstr },
  })
    .then(response => {
      console.log()
      dispatch(AddQueue(response.data.queue_tracks))
    })
    .catch(err => console.log(err));
}
export const AddQueueLoading = () => ({
  type: ActionTypes.ADDQUEUE_LOADING,
});
export const AddQueue = (data) => ({
  type: ActionTypes.ADDQUEUE,
  payload: data,
});
export const AddToQueue = (trackId, userId, token) => (dispatch) => {
  const data = {
    id: userId
  }
  const Authstr = "Bearer ".concat(token);
  axios.patch(`${AddToQueueUrl}/${trackId}`, data, {
    headers: { Authorization: Authstr },
  })
    .then(response => {
      axios
        .get(`${SignUpUrl}/${userId}`, {
          headers: { Authorization: Authstr },
        })
        .then((response) => {
          dispatch(addUserData_BE(response.data.data.user))
          axios.get(`${GetQueueUrl}/${userId}`, {
            headers: { Authorization: Authstr },
          })
            .then(response2 => {
              console.log()
              dispatch(AddQueue(response2.data.queue_tracks))
            })
            .catch(err1 => console.log(err1));
        });
    })
    .catch(err => console.log(err));
}
export const RemoveQueue = (trackId, userId, token,isqueue) => (dispatch) => {
  const data = {
    id: userId
  }
  const Authstr = "Bearer ".concat(token);
  axios.patch(`${RemoveFromQueueUrl}/${trackId}`, data, {
    headers: { Authorization: Authstr },
  })
    .then(response => {
      axios
        .get(`${SignUpUrl}/${userId}`, {
          headers: { Authorization: Authstr },
        })
        .then((response) => {
          dispatch(addUserData_BE(response.data.data.user))
          axios.get(`${GetQueueUrl}/${userId}`, {
            headers: { Authorization: Authstr },
          })
            .then(response2 => {
              console.log()
              dispatch(AddQueue(response2.data.queue_tracks))
              if(isqueue && response2.data.queue_tracks.length>0)
              {
                dispatch(addSongSrc(response2.data.queue_tracks[0]))
              }
              dispatch()
            })
            .catch(err1 => console.log(err1));
        }
        );
    })
    .catch(err => console.log(err));
}
export const SetIsQueue = (isqueue) => (dispatch) => {
  dispatch(IsQueue(isqueue));
}
export const IsQueue = (isqueue) => ({
  type: ActionTypes.ISQUEUE,
  payload: isqueue
});
//=======================LikeSong & Follow Artist=========================
/**
 * this function implements the like song
 * @param {*} trackId 
 * @param {*} userId 
 * @param {*} token 
 */
export const LikeSong = (trackId, userId, token) => (dispatch) => {
  const data = {
    id: userId
  }
  const Authstr = "Bearer ".concat(token);
  axios.patch(`${LikeSongUrl}/${trackId}`, data, {
    headers: { Authorization: Authstr },
  })
    .then(response => {
      axios
        .get(`${SignUpUrl}/${userId}`, {
          headers: { Authorization: Authstr },
        })
        .then((response) =>
          dispatch(addUserData_BE(response.data.data.user))
        );
    })
    .catch(err => console.log(err));
}
/**
 * this function implements the dislike song
 * @param {*} trackId 
 * @param {*} userId 
 * @param {*} token 
 */
export const DisLikeSong = (trackId, userId, token) => (dispatch) => {

  const data = {
    id: userId
  }
  const Authstr = "Bearer ".concat(token);
  axios.patch(`${DisLikeSongUrl}/${trackId}`, data, {
    headers: { Authorization: Authstr },
  })
    .then(response => {
      axios
        .get(`${SignUpUrl}/${userId}`, {
          headers: { Authorization: Authstr },
        })
        .then((response) =>
          dispatch(addUserData_BE(response.data.data.user))
        );
    })
    .catch(err => console.log(err));
}
/**
 * this function implements following an artist 
 * @param {*} ArtistId 
 * @param {*} userId 
 * @param {*} token 
 */
export const FollowArtist = (ArtistId, userId, token) => (dispatch) => {
  const data = {
    id: userId
  }
  const Authstr = "Bearer ".concat(token);
  axios.patch(`${FollowArtistUrl}/${ArtistId}`, data, {
    headers: { Authorization: Authstr },
  })
    .then(response => {
      axios
        .get(`${SignUpUrl}/${userId}`, {
          headers: { Authorization: Authstr },
        })
        .then((response) =>
          dispatch(addUserData_BE(response.data.data.user))
        );
    })
    .catch(err => console.log(err));
}
/**
 *  * this function implements unfollowing an artist 
 * @param {*} ArtistId 
 * @param {*} userId 
 * @param {*} token 
 */
export const UnFollowArtist = (ArtistId, userId, token) => (dispatch) => {
  const data = {
    id: userId
  }
  const Authstr = "Bearer ".concat(token);
  axios.patch(`${UnFollowArtistUrl}/${ArtistId}`, data, {
    headers: { Authorization: Authstr },
  })
    .then(response => {
      axios
        .get(`${SignUpUrl}/${userId}`, {
          headers: { Authorization: Authstr },
        })
        .then((response) =>
          dispatch(addUserData_BE(response.data.data.user))
        );
    })
    .catch(err => console.log(err));
} 
