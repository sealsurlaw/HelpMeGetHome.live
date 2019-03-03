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
            users: [null, null, null, null, null],
            messages: [null, null, null, null, null],
            ip: "http://10.143.230.108:8000/index.html",
        }

        this.tick = this.tick.bind(this);
    }

    componentWillMount() {
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
                    users: res.users,
                    messages: res.messages,
                    ip: res.ip + ":8000"
                })
            })
            .catch(err => {
                console.log(err);
            })
    }

    componentDidMount() {
        // fetch('/name')
        //     .then(response => response.json())
        //     .then(res => {
        //         //console.log(res);
        //         this.setState({
        //             name: res.name,
        //             moves: res.moves,
        //             left: res.left,
        //             right: res.right,
        //             forward: res.forward,
        //             backward: res.backward,
        //             users: res.users,
        //             messages: res.messages,
        //             ip: res.ip + ":8000"
        //         })
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     })

        this.timer = setInterval(this.tick, 250);
    }

    tick = function () {
        fetch('/update')
            .then(response => response.json())
            .then(res => {
                //console.log(res);
                this.setState({
                    moves: res.moves,
                    left: res.left,
                    right: res.right,
                    forward: res.forward,
                    backward: res.backward,
                    users: res.users,
                    messages: res.messages,
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
                <Stream src={this.state.ip} />
                <Controls left={this.state.left} right={this.state.right} forward={this.state.forward} backward={this.state.backward} />
                <Chat name={this.state.name} users={this.state.users} messages={this.state.messages} />
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
    constructor(props) {
        super(props);


    }

    componentDidUpdate() {
        console.log(this.props.ip);
    }

    render() {
        return (
            <iframe src={this.props.ip} height="280" width="320" className="center border-none stream" >
            </iframe >
        );
    }
}

class Controls extends React.Component {
    voteForward = () => {
        fetch('/vote?direction=forward')
            .then(response => response.json())
            .then(res => {
                // console.log(res);
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
                // console.log(res);
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
                // console.log(res);
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
                // console.log(res);
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
            <div id="controls" className="">
                <table className=" table-width">
                    <tbody className="">
                        <tr className="">
                            <td></td>
                            <td></td>
                            <td className="text-center ">{this.props.forward}</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr className="">
                            <td></td>
                            <td></td>
                            <td className="text-center "><a onClick={this.voteForward}><i className="fas fa-arrow-up"></i></a></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr className="">
                            <td></td>
                            <td className="text-right">{this.props.left}&nbsp;&nbsp;<a onClick={this.voteLeft}><i className="fas fa-arrow-left"></i></a></td>
                            <td></td>
                            <td><a onClick={this.voteRight}><i className="fas fa-arrow-right"></i></a>&nbsp;&nbsp;{this.props.right}</td>
                            <td></td>
                        </tr>
                        <tr className="">
                            <td></td>
                            <td></td>
                            <td className="text-center "><a onClick={this.voteBackward}><i className="fas fa-ban"></i></a></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr className="">
                            <td></td>
                            <td></td>
                            <td className="text-center ">{this.props.backward}</td>
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
            value: '',
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(event) {
        this.setState({
            value: event.target.value,
        });

        console.log(this.props.users);
        console.log(this.props.messages);
    }

    handleClick(event) {
        fetch('/message?value=' + this.state.value + '&name=' + this.props.name)
            .then(_ => {
                this.setState({
                    value: '',
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
                <div className="full-width bg-white">
                    <span className="username">{this.props.users[0]}</span>: {this.props.messages[0]}<br />
                    <span className="username">{this.props.users[1]}</span>: {this.props.messages[1]}<br />
                    <span className="username">{this.props.users[2]}</span>: {this.props.messages[2]}<br />
                    <span className="username">{this.props.users[3]}</span>: {this.props.messages[3]}<br />
                    <span className="username">{this.props.users[4]}</span>: {this.props.messages[4]}<br />
                    <span className="username">{this.props.users[5]}</span>: {this.props.messages[5]}<br />
                    <span className="username">{this.props.users[6]}</span>: {this.props.messages[6]}<br />
                    <span className="username">{this.props.users[7]}</span>: {this.props.messages[7]}<br />
                    <span className="username">{this.props.users[8]}</span>: {this.props.messages[8]}<br />
                    <span className="username">{this.props.users[9]}</span>: {this.props.messages[9]}
                </div>
            </div >
        );
    }
}

ReactDOM.render(<App />, document.getElementById("app"));