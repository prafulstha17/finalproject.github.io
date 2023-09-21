import React from 'react';
import { ref, onValue, push, remove } from 'firebase/database';
import { Table } from 'react-bootstrap';
import { database } from '../../../config/firebase';

export class DisplayData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
      replyMessage: '', // State for reply message
    };
  }

  componentDidMount() {
    const dbRef = ref(database, 'ContactFormData');

    onValue(dbRef, (snapshot) => {
      try {
        if (snapshot.exists()) {
          let records = [];
          snapshot.forEach((childSnapshot) => {
            records.push({ key: childSnapshot.key, data: childSnapshot.val() });
          });
          this.setState({ tableData: records });
        } else {
          console.log('No data available.');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    });
  }

  handleDelete = (key) => {
    const userRef = ref(database, `ContactFormData/${key}`);

    remove(userRef)
      .then(() => {
        console.log(`User with key ${key} deleted.`);
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
      });
  };

  handleReplyChange = (event) => {
    this.setState({ replyMessage: event.target.value });
  };

  handleSendReply = (key) => {
    const { replyMessage } = this.state;
    if (replyMessage.trim() === '') {
      return; // Don't send empty replies
    }

    const userRef = ref(database, `ContactFormData/${key}/replies`);

    // Push the reply message to the "replies" node for the user
    push(userRef, {
      message: replyMessage,
    })
      .then(() => {
        console.log('Reply sent.');
        this.setState({ replyMessage: '' }); // Clear the input field after sending
      })
      .catch((error) => {
        console.error('Error sending reply:', error);
      });
  };

  render() {
    return (
      <Table>
        <thead>
          <tr>
            <th>Name: </th>
            <th>Email: </th>
            <th>Message: </th>
            <th>Action</th>
            <th>Reply</th> {/* Add a column for the reply input and button */}
          </tr>
        </thead>
        <tbody>
          {this.state.tableData.map((data, index) => {
            return (
              <tr key={index}>
                <td>{data.data.Name}</td>
                <td>{data.data.email}</td>
                <td>{data.data.message}</td>
                <td>
                  <button onClick={() => this.handleDelete(data.key)}>
                    Delete
                  </button>
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Type your reply"
                    value={this.state.replyMessage}
                    onChange={this.handleReplyChange}
                  />
                  <button onClick={() => this.handleSendReply(data.key)}>
                    Send
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  }
}
