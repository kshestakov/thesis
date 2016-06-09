import React from 'react';
import Radium from 'radium';

let TestUser = {
  name: "Kirill",
  contacts: [
    {
      name: "Keith Cameron",
      message: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur quas quibusdam facilis saepe nisi impedit repudiandae architecto, iure voluptate, officia porro at consectetur, unde ratione fugiat, quae deleniti nihil! Inventore.",
      status: "OFFLINE"
    },
    {
      name: "Alice Jackson",
      message: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur quas quibusdam facilis saepe nisi impedit repudiandae architecto, iure voluptate, officia porro at consectetur, unde ratione fugiat, quae deleniti nihil! Inventore.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur quas quibusdam facilis saepe nisi impedit repudiandae architecto, iure voluptate, officia porro at consectetur, unde ratione fugiat, quae deleniti nihil! Inventore.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur quas quibusdam facilis saepe nisi impedit repudiandae architecto, iure voluptate, officia porro at consectetur, unde ratione fugiat, quae deleniti nihil! Inventore.",
      status: "ONLINE"
    },
    {
      name: "Owen Davies",
      message: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur quas quibusdam facilis saepe nisi impedit repudiandae architecto, iure voluptate, officia porro at consectetur, unde ratione fugiat, quae deleniti nihil! Inventore.",
      status: "OFFLINE"
    },
    {
      name: "Samantha Terry",
      message: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur quas quibusdam facilis saepe nisi impedit repudiandae architecto, iure voluptate, officia porro at consectetur, unde ratione fugiat, quae deleniti nihil! Inventore."  
    },
    {name: "Brendan Eich"},
    {name: "Eric Elliot"},
    {name: "Jason Born"},
    {name: "Robert Plant"},
    {name: "Jimmy Page"},
    {name: "John Bohnem"},
    {name: "John Paul Jones"},
    {name: "John Carmack"},
    {name: "Matthew Bellamy"},
    {name: "Linus Torvalds"},
    {name: "David Flanagan"},
    {name: "Douglas Crockford"},
    {name: "Wwalter white"},
    {
      name: "Alice Jackson",
      message: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur quas quibusdam facilis saepe nisi impedit repudiandae architecto, iure voluptate, officia porro at consectetur, unde ratione fugiat, quae deleniti nihil! Inventore."
    }
  ],
  selectedContact: {
    name: "Alice Jackson",
    status: "OFFLINE"
  }
};

let peer = new Peer({
  key: 'r7jd35v5u9fcg14i',
  debug: 3,
  logFunction() {
    let copy = Array.prototype.slice.call(arguments).join(' ');
    console.log(copy);
  }
});

let connectedPeers = {};

peer.on('open', function(id){
  console.log('My peer ID is: ' + id);
});

peer.on('connection', connect);

peer.on('error', function(err) {
  console.log(err);
});

function connect(c) {
  c.on('data', function(data) {
    console.log("Received: " + data);
  });
  c.on('close', function() {
    alert(c.peer + ' has left the chat.');
    delete connectedPeers[c.peer];
  });   
  connectedPeers[c.peer] = 1;
};

class App extends React.Component {
  render() {

    let style = {
      height: "100%",
      minWidth: "320px"
    };

    return (
      <div style={style}>
        <SideBar />
        <ChatContainer />
      </div>
    );
  }
};

App = Radium(App);

class SideBar extends React.Component {
	render() {

    let style = {
      backgroundColor: "FFFFFF",
      width: "26%",
      maxWidth: "280px",
      minWidth: "190px",
      zIndex: "100",
      height: "100%",
      borderRight: "1px solid #D7DBDD",
      float: "left"
      // display: "flex",
      // position: "fixed",
      // top: "0",
      // bottom: "0",
      // left: "0",
      // overflow: "visible",
      // visibility: "visible"
    };

    return ( 
      <aside style={style}>
        <SideBarHeader />
        <ContactsSection />
        <SideBarFooter />
      </aside>        
    );
	}
};

SideBar = Radium(SideBar);

class SideBarHeader extends React.Component {
  render() {

    let headerStyle = {
      height: "80px",
      backgroundColor: "#1EB6D2",
      display: "flex",
      alignItems: "center"
      // width: "100%",
      // maxWidth: "280px",
      // width: "279px",
      // minWidth: "190px",
    };

    return (
      <header style={headerStyle}>
        <MenuIcon />
        <Title>Contacts</Title>
      </header>
    );
  }
};

SideBarHeader = Radium(SideBarHeader);

class MenuIcon extends React.Component {
  render() {

    let burgerDivStyle = {
      width: "24px",
      height: "20px",
      marginLeft: "24px",
      cursor: "pointer"
      // display: "inline-block",
    };
    let lineDivStyle = {
      height: "2px",
      marginBottom: "4px",
      backgroundColor: "#FFFFFF"
    };

    return (
      <div style={burgerDivStyle}>
        <div style={lineDivStyle}></div>
        <div style={lineDivStyle}></div>
        <div style={lineDivStyle}></div>
        <div style={lineDivStyle}></div>
      </div>
    );
  }
};

MenuIcon = Radium(MenuIcon);

class Title extends React.Component {
  render() {

    let style = {
      margin: "0 15px",
      fontWeight: "300",
      fontSize: "27px",
      color: "#FFFFFF"
      // position: "absolute",
      // display: "inline-block",
      // lineHeight: "80px",
    };

    return (
      <div style={style}>
        {this.props.children}
      </div>
    );
  }
};

Title = Radium(Title);

class ContactsSection extends React.Component {
  render() {

    let styleSection = {
      position: "relative",
      height: "calc(100% - 141px)"
      // width: "100%",
      // maxHeight:"calc(100%-400px)",
      // display: "flex",
      // flexFlow: "wrap",
      // flexDirection: "column",
      // flex: "1 auto"
    };

    return (
      <section style={styleSection}>
        <SearchBox />
        <ContactList />
      </section>
    );
  }
};

ContactsSection = Radium(ContactsSection);

class SearchBox extends React.Component {
  render() {

    let style = {
      padding: "10px",
      backgroundColor: "#F3F8F9",
      position: "relative",
      borderBottom: "1px solid #D7DBDD"
    };

    let iconStyle = {
      // background: "url(/svg/ic_search_black_18px.svg) center center no-repeat",
      height: "30px",
      width: "29px",
      position: "absolute",
      top: "10px",
      left: "15px",
      cursor: "pointer",
      opacity: "0.3",
      textAlign: "center",
      lineHeight: "29px",
      ':hover': {
        opacity: "0.5",
        transform: "scale(1.1,1.1)"
      }
    }

    let styleInput = {
      width: "100%",
      backgroundColor: "#FFFFFF",
      fontSize: "15px",
      height: "30px",
      border: "1px solid #D7DBDD",
      outline: "none",
      paddingLeft: "31px"
      // fontWeight: "400",
      // background: "#FFFFFF url(src/svg/ic_search_black_18px.svg) no-repeat 10px center",
    };

    return (
      <div style={style}>
        <span style={iconStyle} className="fa fa-search"></span>
        <input style={styleInput} type="search" placeholder="Filter"></input>
      </div>
    );
  }
};

SearchBox = Radium(SearchBox);

class ContactList extends React.Component {
  render() {

    let style = {
      position: "absolute",
      top: "51px",
      bottom: "0",
      left: "0",
      right: "0",
      overflowY: "auto",
      overflowX: "hidden"
      // width: "100%",
      // height: "100%"
      // maxHeight: "calc(100%-400px)"
    }
    let contactNodes = TestUser.contacts.map(function(contact) {
      return (
        <Contact>
          {contact.name}
        </Contact>
      );
    });
    return (
      <div style={style}>
        {contactNodes}
      </div>
    );
  }
};

ContactList = Radium(ContactList);

class Contact extends React.Component {
  onClick() {
    let index = $('#msg').val().indexOf(' ');
    let requestedPeer = $('#msg').val().substr(0, index);
    if (!connectedPeers[requestedPeer]) {
      let c = peer.connect(requestedPeer, {
        label: 'chat',
        serialization: 'none',
        metadata: {message: 'hi i want to chat with you!'}
      });
      c.on('open', function() {
        connect(c);
      });
      c.on('error', function(err) { alert(err); });
    }
    connectedPeers[requestedPeer] = 1;
  };

  render() {

    let avatarBackground = "#"+Math.floor(Math.random()*16777215).toString(16);
    // '#'+(Math.random()*0xFFFFFF<<0).toString(16);

    let avatar = this.props.children.substr(0, 2).toUpperCase();

    let style = {
      padding: "5px",
      width: "100%",
      height: "50px",
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
      ':hover': {
        backgroundColor: "#F3F3F3"
        // opacity: "0.5",
        // transform: "rotate(90deg) scale(1.1,1.1)"
      }
    };

    let photoStyle = {
      width: "40px",
      height: "40px",
      borderRadius: "5px",      
      margin: "0 10px 0 5px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "23px",
      backgroundColor: avatarBackground
      // border: "1px solid #000000",
      // background: "url(src/svg/ic_insert_photo_black_48px.svg) center center no-repeat"
    };

    return (
      <div style={style} onClick={this.onClick}>
        <div style={photoStyle}>{avatar}</div>
        <div>{this.props.children}</div>
      </div>
    );
  }
};

Contact = Radium(Contact);

// @Radium
class SideBarFooter extends React.Component {
  render() {

    let style = {
      borderTop: "1px solid #D7DBDD",
      height: "60px",
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
      backgroundColor: "#FFFFFF",
      ':hover': {
        backgroundColor: "#F3F3F3"
      }
      // width: "100%",
      // alignSelf: "flex-end",
      // paddingLeft: "18px",
      // position:"absolute",
      // bottom: "0",
      // left: "0",
      // right: "0",
      // maxWidth:"280px",
      // minWidth: "190px",
    };

    let iconStyle = {
      // background: "url(/svg/ic_settings_black_24px.svg) center center no-repeat",
      width: "24px",
      height: "24px",
      lineHeight: "24px",
      textAlign: "center",
      margin: "0 18px 0 20px"
    };

    let textStyle = {
    };

    return (
      <footer style={style}>
        <span style={iconStyle} className="fa fa-cog fa-lg"></span>
        <div style={textStyle}>Settings</div>
      </footer>
    );
  }
};

SideBarFooter = Radium(SideBarFooter);

class ChatContainer extends React.Component {
  render() {

    let style = {
      backgroundColor: "#FFFFFF",
      overflow: "hidden",
      height: "100%"
      // maxWidth: "100%",
      // minWidth: "100px",
      // display: "flex",
      // flexFlow: "column",
      // position: "absolute",
      // display: "inline-block",
      // maxWidth: "100%",
      // position: "relative"
      // borderLeft: "1px solid #D7DBDD",
      // width: "100%"
      // top: "0",
      // bottom: "0",
      // left: "280px",
      // right: "0",
      // transition: "width 0.25s cubic-bezier(0.5, 0, 0.1, 1)" 
    };

    return (       
      <div style={style}>
        <Header />
        <ChatSection />
        <ChatContainerFooter />
      </div>
    );   
  } 
};

ChatContainer = Radium(ChatContainer);

class Header extends React.Component {
  render() {

    let headerStyle = {
      height: "80px",
      backgroundColor: "#1EB6D2",
      paddingLeft: "15px",
      display: "flex",
      alignItems: "center",
      position: "relative"
      // width: "100%",
    };

    return (
      <header style={headerStyle}>
        <Title>{TestUser.selectedContact.name}</Title>
        <ButtonCall path="/svg/ic_mic_white_24px.svg" />
        <ButtonVideocall path="/svg/ic_videocam_white_24px.svg" />
        <StatusBar />
      </header>
    );
  }
};

Header = Radium(Header);

class ButtonCall extends React.Component {
  render() {

    let style = {
      marginLeft: "10px",
      height: "40px",
      width: "40px",
      borderRadius: "20px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      backgroundColor: "#1BA3BD",
      ':hover': {
        backgroundColor: "#178DA3"
      }

      // background: "url(/svg/ic_mic_white_24px.svg) center center no-repeat",
      // display: "flex",
      // backgroundImage: "url(src/svg/ic_insert_photo_black_24px.svg)",
      // backgroundRepeat: "none"
      // transform: "scale(1.1, 1.1)",
    };

    let iconStyle = {
      margin:"auto"
    };

    return (
      <div style={style}>
        <span style={iconStyle} className="fa fa-microphone fa-inverse fa-lg"></span>
      </div>
    );
  }
};

ButtonCall = Radium(ButtonCall);

class ButtonVideocall extends React.Component {
  render() {

    let style = {
      marginLeft: "10px",
      height: "40px",
      width: "40px",
      borderRadius: "20px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      backgroundColor: "#1BA3BD",
      ':hover': {
        backgroundColor: "#178DA3"
      }
      // background: "#1BA3BD url(/svg/ic_videocam_white_24px.svg) center center no-repeat"
      // display: "flex",
      // backgroundImage: "url(src/svg/ic_insert_photo_black_24px.svg)",
      // backgroundRepeat: "none"
      // transform: "scale(1.1, 1.1)",
    };

    let iconStyle = {
      margin: "auto"
    };

    return (
      <div style={style}>
        <span style={iconStyle} className="fa fa-video-camera fa-inverse fa-lg"></span>
      </div>
    );
  }
};

ButtonVideocall = Radium(ButtonVideocall);

class StatusBar extends React.Component {
  render() {

    let style = {
      display: "flex",
      alignItems: "center",
      borderRadius: "15px",
      fontWeight: "400",
      fontSize: "12px",
      padding: "4px 13px 5px 6px",
      color: "#FFFFFF",
      backgroundColor: "#1BA3BD",
      position: "absolute",
      right: "22px",
      top: "calc(50% - 0.5 * 23px)"
      // height: "40px",
      // width: "40px",
      // cursor: "pointer",
      // background: "#1BA3BD url(" + this.props.path + ") center center no-repeat"
      // display: "flex",
      // backgroundImage: "url(src/svg/ic_insert_photo_black_24px.svg)",
      // backgroundRepeat: "none"
      // transform: "scale(1.1, 1.1)",
    };

    let markerColor = TestUser.selectedContact.status === "ONLINE" ? "#B2EA5A" : "#EB5E67";

    let markerStyle = {
      marginRight: "4px",
      borderRadius: "7px",
      width: "10px",
      height: "10px",
      border: "2px solid #FFFFFF",
      backgroundColor: markerColor
    };

    return (
      <div style={style}>
        <div style={markerStyle}></div>
        {TestUser.selectedContact.status}
      </div>
    );
  }
};

StatusBar = Radium(StatusBar);

class ChatSection extends React.Component {
  render() {

    let styleSection = {
      position: "relative",
      height: "calc(100% - 141px)"
    };

    return (
      <section style={styleSection}>
        <MessageList />
      </section>
    );
  }
};

ChatSection = Radium(ChatSection);

class MessageList extends React.Component {
  render() {

    let style = {
      position: "absolute",
      top: "0",
      bottom: "0",
      left: "0",
      right: "0",
      overflowY: "auto",
      overflowX: "hidden",
      display: "flex",
      flexDirection: "column-reverse",
      paddingBottom: "45px"
      // alignContent: "flex-end",
      // width: "100%",
      // height: "100%"
      // maxHeight: "calc(100%-400px)"
    };
    
    let messages = TestUser.contacts.map(function(contact) {
      if (contact.name === TestUser.selectedContact.name) { 
        let boldStyle = {
          margin: "12px 0 7px 0"
        };
        return (
          <Message>
            <p style={boldStyle}><b>{contact.name}</b></p>
            {contact.message}
          </Message>
        );
      };
    });
    
    return (
      <div style={style}>
        {messages}
        <div></div>
      </div>
    );
  }
};

MessageList = Radium(MessageList);

class Message extends React.Component {
  render() {

    let style = {
      padding: "5px 15px 25px 16px",
      display: "flex",
      position: "relative",
      borderBottom: "1px solid rgba(215, 219, 221, 0.3)"
      // width: "100%",
      // alignContent: "center",
      // flexDirection: "row",
      // alignItems: "flex-start",
    };

    let photoStyle = {
      marginTop: "14px",
      minWidth: "70px",
      border: "1px solid #000000",
      height: "70px",      
      borderRadius: "35px",
      display: "flex",
      alignItems: "center"
      // background: "url(/svg/ic_insert_photo_black_48px.svg) center center no-repeat"
      // backgroundImage: "url(src/svg/ic_insert_photo_black_24px.svg)",
      // backgroundRepeat: "none"
      // transform: "scale(1.1, 1.1)",
    };

    let textStyle = {
      margin: "3px 105px 0 27px",
      lineHeight: "20px",
      fontSize: "14px"
      // paddingTop: "5px"
      // marginTop: "10px"
      // marginBottom: "10px"
      // display: "flex"
    };
    let timeStyle = {
      marginTop: "16px",
      marginRight: "7px",
      fontWeight: "300",
      minWidth: "90px",
      fontSize: "13px",
      position: "absolute",
      right: "0",
      textAlign: "center"
      // float: "right",
      // marginRight: "30px",
      // minWidth: "50px"
      // display: "flex"
    };

    let iconStyle = {
      margin: "auto"
    };

    let date = new Date();
    date = date.getHours() + ":" + ((date.getMinutes() < 10) ? ("0" + date.getMinutes()) : date.getMinutes());

    return (
      <div>
        <div style={style}>
        <div style={photoStyle}>
          <span style={iconStyle} className="fa fa-user fa-3x"></span>
        </div>
          <div style={textStyle}>{this.props.children}</div>
          <div style={timeStyle}>{date}</div>
        </div>
      </div>
    );
  }
};

Message = Radium(Message);

class ChatContainerFooter extends React.Component {
  onSubmit(e) {
    e.preventDefault();
    let index = $('#msg').val().indexOf(' ');
    let requestedPeer = $('#msg').val().substr(0, index);
    let msg = $('#msg').val().substr(index + 1);
    let conns = peer.connections[requestedPeer];
    // conns.send(msg);
    // console.log("You: " + msg);
    for (let i = 0; i < conns.length; i++) {
      let conn = conns[i];
      conn.send(msg);
      console.log("You: " + msg);
    };
    $('#msg').val(requestedPeer + ' ');
    $('#msg').focus();
  };

  render() {
    let style = {
      borderTop: "1px solid #D7DBDD",
      height: "60px",
      display: "flex",
      alignItems: "center",
      backgroundColor: "#FFFFFF"
      // position: "relative",
      // padding: "10px"
    };

    let wrapperStyle = {
      display: "flex",
      width: "100%"
    };

    let textareaStyle = {
      height: "20px",
      width: "calc(100% - 54px)",
      display: "block",
      resize: "none",
      lineHeight: "20px",
      outline: "none",
      overflowY: "auto",
      padding: "9px 40px 8px 13px",
      border: "1px solid #D7DBDD",
      fontWeight: "300",
      fontSize: "14px"
    };

    let wrapperTextareaStyle = {
      position: "relative",
      width: "100%",
      margin: "0 110px 0 10px" 
      // height: "40px",
    };

    let iconStyle = {
      position: "absolute",
      width: "39px",
      height: "40px",      
      right: "0",
      top: "0",
      opacity: "0.3",
      cursor: "pointer",
      textAlign: "center",
      lineHeight: "39px",
      transform: "rotate(90deg)",
      ':hover': {
        // backgroundColor: "#CCCCCC",
        opacity: "0.5",
        transform: "rotate(90deg) scale(1.1,1.1)"
      }
      // background: "url(/svg/ic_attach_file_black_24px.svg) center center no-repeat"
      // backgroundImage: "url(src/svg/ic_insert_photo_black_24px.svg)",
      // backgroundRepeat: "none"
      // transform: "scale(1.1, 1.1)",
    };

    let submitStyle = {
      // background: "#1EB6D2 url(/svg/ic_send_white_24px.svg) center center no-repeat",
      height: "39px",
      width: "90px",
      position: "absolute",
      right: "10",
      outline: "none",
      cursor: "pointer",
      backgroundColor: "#1EB6D2",
      fontFamily: "FontAwesome",
      color: "#FFFFFF",
      fontSize: "20px",
      border: "0",
      ':hover': {
        backgroundColor: "#1A9FB8"
      }
      // marginRight: "10px",
    };

    let formStyle = {
      width: "100%"
    };

    return (
      <footer style={style}>
        <form onSubmit={this.onSubmit} style={formStyle}>
          <div style={wrapperStyle}>
            <div style={wrapperTextareaStyle}>
              <textarea style={textareaStyle} placeholder="Message" id="msg"></textarea>
              <div style={iconStyle} className="fa fa-link fa-lg" key="0"></div>
            </div>
            <input style={submitStyle} type="submit" value="&#xf1d8;" key="1"></input>
          </div>
        </form>
      </footer>
    );
  }
};

ChatContainerFooter = Radium(ChatContainerFooter);

export default App
