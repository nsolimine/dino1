import React, { Component } from 'react';
import './App.css';
import { Header } from './header.js';
import { Section } from './job-list.js';
import JobForm from './form.js';
import { Footer } from './footer.js';

class App extends Component {
  state = {jobs: []}

  constructor(props) {
    super(props)
    this.state = {jobs: []}
  }

  componentDidMount() {
    this.getListings();
  }

  getListings = () => {
    return fetch("./listings.json")
    .then(response => response.json())
    .then(jobs => this.setState({jobs}));
  }

  addJob = (job) => {
    const jobs = this.state.jobs
    jobs.push(job)
    this.setState({jobs})
  }

  onSubmit = (event) => {
    event.preventDefault()
    const form = event.target;
    const data = new FormData(form);
    this.addJob({
      id: this.state.jobs.length +1,
      title: data.get("title"),
      pay: data.get("pay"),
      description: data.get("description"),
      interested: []
    })
  }

  render() {
    return (
      <div className="App">
          <Header />
          <main>
            <Section listings={this.state.jobs} />
            <aside id="side-bar">
              <h3>Add a Job</h3>
              <JobForm onSubmit={this.onSubmit}/>
            </aside>
            <Footer />
          </main>
      </div>
    );
  }
}

export default App;
