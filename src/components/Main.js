import React, { Component } from 'react';

class App extends Component {
    constructor() {
      super();
      this.state = {
        requestTime: '',
        rideOrigin: '',
        rideDestin: '',
        username: '',
        items: [],
        user: null
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.login = this.login.bind(this);
      this.logout = this.logout.bind(this);
    }
  
    handleChange(event) {
      this.setState({
        [event.target.name]: event.target.value
      });
    }
  
    handleSubmit(event) {
      event.preventDefault();
      const itemsRef = firebase.database().ref('items');
      const item = {
        requestTime: Date.now(),
        rideOrigin: this.state.rideOrigin,
        rideDestin: this.state.rideDestin,
        title: this.state.rideOrigin,
        user: this.state.username || this.state.user.displayName || this.state.user.email
      }
      itemsRef.push(item);
      this.setState({
        requestTime: '',
        rideOrigin: '',
        rideDestin: '',
        username: ''
      });
    }
  
    componentDidMount() {
      const itemsRef = firebase.database().ref('items');
      itemsRef.on('value', (snapshot) => {
        let items = snapshot.val();
        let newState = [];
        for (let item in items) {
          newState.push({
            id: item,
            title: items[item].title,
            user: items[item].user,
            rideOrigin: items[item].rideOrigin,
            rideDestin: items[item].rideDestin,
            requestTime: items[item].requestTime
          });
        }
        this.setState({
          items: newState
        });
      });
  
      auth.onAuthStateChanged((user) => {
        if (user) {
          this.setState({ user });
        } 
      });
    }
  
    removeItem(itemId) {
      const itemRef = firebase.database().ref(`/items/${itemId}`);
      itemRef.remove();
    }
  
    logout() {
      auth.signOut()
        .then(() => {
          this.setState({
            user: null
          });
        });
    }
  
    login() {
      auth.signInWithPopup(provider) 
        .then((result) => {
          const user = result.user;
          this.setState({
            user
          });
        });
      }
    
    render() {
      return (
        <div className="App">
          <header>
            <div className='wrapper'>
              <h1>Homobiles</h1>
              {this.state.user ? <button onClick={this.logout}>Log Out</button> : <button onClick={this.login}>Log In</button> }
            </div>
          </header>
          {this.state.user ?
            <div>
              <div className='user-profile'>
                <img alt="User profile" height="128px" width="128px" src={this.state.user.photoURL} />
              </div>
              <div className='container'>
                <section className='add-item'>
                  <form onSubmit={this.handleSubmit}>
                    <input type="text" name="username" placeholder="What's your name?" onChange={this.handleChange} value={this.state.username || this.state.user.displayName || this.state.user.email} />
                    <input type="text" name="rideOrigin" placeholder="Starting address" onChange={this.handleChange} value={this.state.rideOrigin} required />
                    <input type="text" name="rideDestin" placeholder="Destination" onChange={this.handleChange} value={this.state.rideDestin} required />
                    <button>Request Ride</button>
                  </form>
                </section>
                <section className='display-item'>
                  <div className='wrapper'>
                    <ul>
                      {this.state.items.map((item) => {
                        return (
                          <li key={item.id}>
                            <h3>{item.title}</h3>
                            From {item.rideOrigin} to {item.rideDestin}
                            <p>
                              Requested by: {item.user}
                              {item.user === this.state.user.displayName || item.user === this.state.user.email ? <button onClick={() => this.removeItem(item.id)}>Cancel Request</button> : null}
                            </p>
                            <p>
                              Requested {Math.round((Date.now() - item.requestTime)/1000/60)} minutes ago
                            </p>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                </section>
              </div>
            </div>
          :
            <div className='wrapper'>
              <p>You must be logged in to see and make ride requests.</p>
            </div>
          }
        </div>
      );
    }
  }
  
  export default App;