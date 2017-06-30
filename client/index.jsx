import React from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';
import TicketList from './components/ticketList.jsx';
import TicketSubmission from './components/ticketSubmission.jsx';
import Login from './components/login.jsx';
import Nav from './components/nav.jsx';
import AdminDashboard from './components/adminDashboard.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      ticketList: [],
      ticketCategoryList: ['React', 'Socket.IO', 'Recursion', 'Postgres'],
      user: null,
      statistic: {},
      hasClaimed: false
    };
    this.socket = {};
  }

  componentWillMount() {
    $.ajax({
      url: '/api/users/:id',
      type: 'GET',
      async: false,
      success: (response) => {
        return response ? this.setState({ user: response.user }) : null;
      },
      error: () => {
        console.log('failed');
      }
    });
  }

  componentDidMount() {
    if (!this.state.user) { return; }
    let option = {
      id: this.state.user.id,
      role: this.state.user.role
    };
    this.socket = io({ query: option });
    this.socket.on('update or submit ticket', () => {
      return option.role === 'admin' ? this.filterTickets() : this.getTickets(option);
    });
    this.getTickets(option);
  }

  getTickets(option) {
    $.get('/api/tickets', option, (tickets) => {
      this.setState({ ticketList: tickets });
      this.socket.emit('get wait time');
      this.socket.on('student wait time', data => this.setState({ statistic: data }));
      this.hasClaimed(this.state.user.id);
    });
  }

  submitTickets(e) {
    e.preventDefault();
    let ticket = {
      userId: this.state.user.id,
      description: document.getElementById('ticket_submission_description').value,
      category: document.getElementById('ticket_submission_category').value,
      location: document.getElementById('ticket_submission_location').value,
      status: 'Opened'
    };

    $.ajax({
      url: '/api/tickets',
      type: 'POST',
      data: ticket,
      success: (response) => {
        this.socket.emit('refresh');
        document.getElementById('ticket_submission_description').value = '';
      },
      error: () => {
        console.log('Error submitting ticket');
      }
    });
  }

  updateTickets(data) {
    if (data.status === 'Claimed') {
      data.claimedBy = this.state.user.id;
    }

    $.ajax({
      url: `/api/tickets/${data.id}`,
      type: 'PUT',
      data: data,
      success: (response) => {
        this.socket.emit('refresh');
      },
      error: (err) => {
        console.log('failed to update ticket');
      }
    });
  }

  filterTickets(e) {
    if (e) { e.preventDefault(); }
    let timeWindow = document.getElementById('time-window').value;
    let category = document.getElementById('select-category').value;
    let status = document.getElementById('ticket-status').value;

    let createdAt = timeWindow === 'All' ? { $lte: new Date().toISOString() }
      : { $gte: new Date(new Date() - timeWindow * 24 * 60 * 60 * 1000).toISOString() };
    if (category === 'All') { category = { $not: null }; }
    if (status === 'All') { status = { $not: null }; }
    let option = {
      id: this.state.user.id,
      role: this.state.user.role,
      category: category,
      status: status,
      createdAt: createdAt
    };
    console.log('filering tickets...');
    this.getTickets(option);
  }

  hasClaimed(id) {
    const ticketList = this.state.ticketList;
    for (let i = 0; i < ticketList.length; i++) {
      if (ticketList[i].status !== 'Claimed') { break; }
      if (ticketList[i].status === 'Claimed' && ticketList[i].claimedBy === id) {
        return $('.claim_btn').prop('disabled', true);
      }
    }
    return $('.claim_btn').prop('disabled', false);
  }

  render() {
    let user = this.state.user;
    let render = null;
    if (!user) {
      render = <Login />;
    } else if (user.role === 'student') {
      render = <TicketSubmission submitTickets={this.submitTickets.bind(this)} ticketCategoryList={this.state.ticketCategoryList}/>;
    } else if (user.role === 'mentor') {
      // render HIR view
    } else if (user.role === 'admin') {
      render = <AdminDashboard filterTickets={this.filterTickets.bind(this)} statistic={this.state.statistic} ticketCategoryList={this.state.ticketCategoryList}/>;
    }
    return (
      <div>
        <Nav statistic={this.state.statistic} user={this.state.user}/>
        <div className="col-md-8">
          {render}
          <TicketList user={this.state.user} ticketList={this.state.ticketList} updateTickets={this.updateTickets.bind(this)} hasClaimed={this.state.hasClaimed} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
