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
            <div id="timer">
                {this.props.time}
            </div>
        );
    }
}

class Stream extends React.Component {
    render() {
        return (
            <video width="320" height="240">
                <source src="/videos/movie.mp4" type="video/mp4" />
                {/* <source src="movie.ogg" type="video/ogg" /> */}
                Your browser does not support the video tag.
            </video>
        );
    }
}

class Controls extends React.Component {
    render() {
        return (
            <div id="controls" className="container-flex">
                <div className="row">
                    <div className="col"></div>
                    <div className="col">{this.props.forward}</div>
                    <div className="col"></div>
                </div>
                <div className="row">
                    <div className="col"></div>
                    <div className="col"><i class="fas fa-arrow-up"></i></div>
                    <div className="col"></div>
                </div>
                <div className="row">
                    <div className="col">{this.props.left}<i class="fas fa-arrow-left"></i></div>
                    <div className="col"></div>
                    <div className="col">{this.props.right}<i class="fas fa-arrow-right"></i></div>
                </div>
                <div className="row">
                    <div className="col"></div>
                    <div className="col"><i class="fas fa-arrow-down"></i></div>
                    <div className="col"></div>
                </div>
                <div className="row">
                    <div className="col"></div>
                    <div className="col">{this.props.backward}</div>
                    <div className="col"></div>
                </div>
            </div>
        );
    }
}

class Chat extends React.Component {
    render() {
        return (
            <div id="chat">
                This is the chat
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("app"));