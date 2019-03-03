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
        fetch('/update')
            .then(response => response.json())
            .then(res => {
                console.log(res);
                this.setState({
                    time: res.time,
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

    // timerHandler() {
    //     console.log("Time up");
    // }

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
            <iframe src="http://sealsurlaw-54353.portmap.host:49979/index.html" style="height:240px; width:320px; border: none;">
            </iframe>
        );
    }
}

class Controls extends React.Component {
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
                            <td><a href="http://helpmegethome.herokuapp.com/vote?direction=forward"><i className="fas fa-arrow-up"></i></a></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>{this.props.left}</td>
                            <td><a href="http://helpmegethome.herokuapp.com/vote?direction=left"><i className="fas fa-arrow-left"></i></a></td>
                            <td></td>
                            <td><a href="http://helpmegethome.herokuapp.com/vote?direction=right"><i className="fas fa-arrow-right"></i></a></td>
                            <td>{this.props.right}</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td><a href="http://helpmegethome.herokuapp.com/vote?direction=backward"><i className="fas fa-arrow-down"></i></a></td>
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
            </div>
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