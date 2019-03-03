// import Axios from "axios";

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            time: null,
            left: null,
            right: null,
            forward: null,
            backward: null,
        }

        // this.timerHandle = this.timerHandle.bind(this);
    }

    componentDidMount() {
        this.tick();

        this.timer = setInterval(this.tick, 250);

        this.timer = this.timer.bind(this);
    }

    tick = function () {
        fetch('/update')
            .then(response => response.json())
            .then(res => {
                console.log(res);
                this.setState({
                    moves: res.moves,
                    left: res.left,
                    right: res.right,
                    forward: res.forward,
                    backward: res.backward,
                })
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        return (
            <div>
                <Timer time={this.state.time} />
                <Stream />
                <Controls left={this.state.left} right={this.state.right} forward={this.state.forward} backward={this.state.backward} />
                <Chat />
            </div>
        );
    }
}

class Timer extends React.Component {
    render() {
        return (
            <div id="timer" className="center">
                {this.props.time}
            </div>
        );
    }
}

class Stream extends React.Component {
    render() {
        return (
            <iframe src="http://10.143.236.177:8000/index.html" height="280" width="340">
            </iframe>
        );
    }
}

class Controls extends React.Component {
    voteForward = () => {
        fetch('/vote?direction=forward')
            .then(response => response.json())
            .then(res => {
                console.log(res);
                this.setState({
                    left: res.left,
                    right: res.right,
                    forward: res.forward,
                    backward: res.backward,
                })
            })
            .catch(err => {
                console.log(err);
            })
    }

    voteLeft = () => {
        fetch('/vote?direction=left')
            .then(response => response.json())
            .then(res => {
                console.log(res);
                this.setState({
                    left: res.left,
                    right: res.right,
                    forward: res.forward,
                    backward: res.backward,
                })
            })
            .catch(err => {
                console.log(err);
            })
    }

    voteRight = () => {
        fetch('/vote?direction=right')
            .then(response => response.json())
            .then(res => {
                console.log(res);
                this.setState({
                    left: res.left,
                    right: res.right,
                    forward: res.forward,
                    backward: res.backward,
                })
            })
            .catch(err => {
                console.log(err);
            })
    }

    voteBackward = () => {
        fetch('/vote?direction=backward')
            .then(response => response.json())
            .then(res => {
                console.log(res);
                this.setState({
                    left: res.left,
                    right: res.right,
                    forward: res.forward,
                    backward: res.backward,
                })
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        return (
            <div id="controls" className="center">
                <table className="center">
                    <tbody>
                        <tr>
                            <td></td>
                            <td></td>
                            <td>{this.props.forward}</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td><a onClick={this.voteForward}><i className="fas fa-arrow-up"></i></a></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>{this.props.left}</td>
                            <td><a onClick={this.voteLeft}><i className="fas fa-arrow-left"></i></a></td>
                            <td></td>
                            <td><a onClick={this.voteRight}><i className="fas fa-arrow-right"></i></a></td>
                            <td>{this.props.right}</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td><a onClick={this.voteBackward}><i className="fas fa-arrow-down"></i></a></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td>{this.props.backward}</td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div >
        );
    }
}

class Chat extends React.Component {
    render() {
        return (
            <div id="chat" className="center">
                This is the chat
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("app"));