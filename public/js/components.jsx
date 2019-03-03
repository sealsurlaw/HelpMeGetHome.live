// import Axios from "axios";

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: null,
            moves: null,
            left: null,
            right: null,
            forward: null,
            backward: null,
        }

        this.tick = this.tick.bind(this);
    }

    componentDidMount() {
        fetch('/name')
            .then(response => response.json())
            .then(res => {
                console.log(res);
                this.setState({
                    name: res.name,
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

        this.timer = setInterval(this.tick, 250);
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
                <Moves moves={this.state.moves} />
                <Stream />
                <Controls left={this.state.left} right={this.state.right} forward={this.state.forward} backward={this.state.backward} />
                <Chat name={this.state.name} />
            </div>
        );
    }
}

class Moves extends React.Component {
    render() {
        return (
            <div id="moves" className="text-center">
                I've made {this.props.moves} moves and counting!
            </div>
        );
    }
}

class Stream extends React.Component {
    render() {
        return (
            <iframe src="http://10.143.236.177:8000/index.html" height="280" width="320" className="center border-none stream">
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
            <div id="controls" className="border container-fluid">
                <table className="border">
                    <tbody className="border">
                        <tr className="border">
                            <td></td>
                            <td></td>
                            <td className="text-center border">{this.props.forward}</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr className="border">
                            <td></td>
                            <td></td>
                            <td className="text-center border"><a onClick={this.voteForward}><i className="fas fa-arrow-up"></i></a></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr className="border">
                            <td className="align-middle text-left padding-lr border">{this.props.left}</td>
                            <td><a onClick={this.voteLeft}><i className="fas fa-arrow-left"></i></a></td>
                            <td></td>
                            <td><a onClick={this.voteRight}><i className="fas fa-arrow-right"></i></a></td>
                            <td className="align-middle text-right padding-lr border">{this.props.right}</td>
                        </tr>
                        <tr className="border">
                            <td></td>
                            <td></td>
                            <td className="text-center border"><a onClick={this.voteBackward}><i class="fas fa-ban"></i></a></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr className="border">
                            <td></td>
                            <td></td>
                            <td className="text-center border">{this.props.backward}</td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: null,
            names: [null, null, null, null, null],
            messages: [null, null, null, null, null],
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(event) {
        this.setState({
            value: event.target.value,
        });
    }

    handleClick(event) {
        fetch('/message?value=' + this.state.value + '&name=' + this.props.name)
            .then(_ => {
                this.setState({
                    message: '',
                })
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        return (
            <div id="chat" className="container-fluid">
                <div className="full-width">{this.props.name}</div>
                <input type="text" className="full-width" value={this.state.value} onChange={this.handleChange} />
                <input type="submit" className="full-width" onClick={this.handleClick} />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("app"));