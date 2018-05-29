import React, { Component } from 'react';
import firebase, { auth } from '../Firebase.js';

class Requests extends Component {
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
    render() {
        return (
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
        )
    }
}
  
export default Requests;